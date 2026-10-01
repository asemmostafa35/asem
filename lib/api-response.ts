import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getSession } from "@/lib/auth"

export class NotFoundError extends Error {}

export const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
export const ok = <T>(data: T, status = 200) => NextResponse.json({ success: true, data }, { status })

/** Returns an error response when the caller is not the logged-in admin, otherwise null. */
export async function guardAdmin() {
  return (await getSession()) ? null : fail("Unauthorized", 401)
}

/** Runs a mutation, refreshes the public page cache, and turns storage errors into clean JSON. */
export async function runMutation<T>(work: () => Promise<T>) {
  try {
    const data = await work()
    revalidatePath("/")
    return ok(data)
  } catch (error) {
    if (error instanceof NotFoundError) return fail("Project not found.", 404)
    return fail("Could not save changes. On Vercel, connect Upstash Redis / Vercel KV (see README) so edits can persist.", 500)
  }
}
