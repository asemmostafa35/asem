import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

export const SESSION_COOKIE = "asem_admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

const isProd = process.env.NODE_ENV === "production"

/**
 * Admin credentials come from env vars.
 * In development a default (admin@asem.com / Admin@123456) is used so you can log in immediately.
 * In production ADMIN_PASSWORD and AUTH_SECRET MUST be set, otherwise login is disabled.
 */
function getCredentials(): { email: string; password: string } | null {
  const email = (process.env.ADMIN_EMAIL || "admin@asem.com").toLowerCase()
  const password = process.env.ADMIN_PASSWORD || (isProd ? "" : "Admin@123456")
  return password ? { email, password } : null
}

function getSecret(): string | null {
  return process.env.AUTH_SECRET || (isProd ? null : "dev-only-secret-change-me")
}

export function isAuthConfigured(): boolean {
  return Boolean(getCredentials() && getSecret())
}

const sha256 = (value: string) => createHash("sha256").update(value).digest()

/** Constant-time comparison (hashing first makes both buffers equal length). */
function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b))
}

export function verifyCredentials(email: string, password: string): boolean {
  const creds = getCredentials()
  if (!creds) return false
  const emailOk = safeEqual(email.trim().toLowerCase(), creds.email)
  const passOk = safeEqual(password, creds.password)
  return emailOk && passOk
}

const sign = (payload: string, secret: string) => createHmac("sha256", secret).update(payload).digest("base64url")

export function createSessionToken(email: string): string | null {
  const secret = getSecret()
  if (!secret) return null
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url")
  return `${payload}.${sign(payload, secret)}`
}

export function verifySessionToken(token: string | undefined): { email: string } | null {
  const secret = getSecret()
  if (!token || !secret) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  if (!safeEqual(signature, sign(payload, secret))) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; exp?: number }
    if (!data.email || !data.exp || data.exp < Date.now()) return null
    return { email: data.email }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{ email: string } | null> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProd,
  path: "/",
  maxAge: SESSION_MAX_AGE,
}
