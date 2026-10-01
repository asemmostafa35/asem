import { NextRequest } from "next/server"
import { fail, guardAdmin, runMutation } from "@/lib/api-response"
import { createProject } from "@/lib/projects"
import { parseProjectInput } from "@/lib/validators"

export async function POST(req: NextRequest) {
  const denied = await guardAdmin()
  if (denied) return denied

  const parsed = parseProjectInput(await req.json().catch(() => null))
  if (!parsed.ok) return fail(parsed.error)

  return runMutation(() => createProject(parsed.data))
}
