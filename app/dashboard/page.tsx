import type { Metadata } from "next"
import DashboardClient from "@/components/dashboard/DashboardClient"
import LoginForm from "@/components/dashboard/LoginForm"
import { getSession, isAuthConfigured } from "@/lib/auth"
import { isEphemeralHost } from "@/lib/project-store"
import { getProjects } from "@/lib/projects"

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } }

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    const devHint = process.env.NODE_ENV !== "production" ? "Dev mode default login: admin@asem.com / Admin@123456 (override with ADMIN_EMAIL / ADMIN_PASSWORD)." : undefined
    return <LoginForm configured={isAuthConfigured()} devHint={devHint} />
  }

  return <DashboardClient email={session.email} initialProjects={await getProjects()} storageWarning={isEphemeralHost()} />
}
