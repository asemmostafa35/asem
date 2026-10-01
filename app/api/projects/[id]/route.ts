import { NextRequest } from "next/server"
import { NotFoundError, fail, guardAdmin, runMutation } from "@/lib/api-response"
import { deleteProject, updateProject } from "@/lib/projects"
import { parseProjectInput } from "@/lib/validators"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const denied = await guardAdmin()
  if (denied) return denied

  const parsed = parseProjectInput(await req.json().catch(() => null))
  if (!parsed.ok) return fail(parsed.error)

  const { id } = await params
  return runMutation(async () => {
    const updated = await updateProject(id, parsed.data)
    if (!updated) throw new NotFoundError()
    return updated
  })
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const denied = await guardAdmin()
  if (denied) return denied

  const { id } = await params
  return runMutation(async () => {
    if (!(await deleteProject(id))) throw new NotFoundError()
    return { id }
  })
}
