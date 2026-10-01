import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, createSessionToken, isAuthConfigured, sessionCookieOptions, verifyCredentials } from "@/lib/auth"
import { fail } from "@/lib/api-response"

// Minimal in-memory brute-force throttle: 5 failed attempts / 15 minutes / IP.
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

export async function POST(req: NextRequest) {
  if (!isAuthConfigured()) return fail("Admin login is not configured on the server (set ADMIN_PASSWORD and AUTH_SECRET).", 503)

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  const now = Date.now()
  const entry = attempts.get(ip)
  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) return fail("Too many attempts. Try again in a few minutes.", 429)

  const body = (await req.json().catch(() => null)) as { email?: unknown; password?: unknown } | null
  const email = typeof body?.email === "string" ? body.email : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (!verifyCredentials(email, password)) {
    const current = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS }
    attempts.set(ip, { count: current.count + 1, resetAt: current.resetAt })
    return fail("Invalid email or password.", 401)
  }

  attempts.delete(ip)
  const token = createSessionToken(email.trim().toLowerCase())
  if (!token) return fail("Auth secret is not configured.", 503)

  const res = NextResponse.json({ success: true })
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions)
  return res
}
