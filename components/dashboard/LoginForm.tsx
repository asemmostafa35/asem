"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Alert from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { LockIcon } from "@/components/ui/Icons"

export default function LoginForm({ devHint, configured }: { devHint?: string; configured: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
      const json = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(json.error || "Login failed.")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.")
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-3xl border border-text-secondary/20 bg-background p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-text-primary p-3 text-background">
            <LockIcon />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-text-primary">Admin Portal</h1>
            <p className="text-sm font-medium text-text-secondary">Sign in to manage your portfolio.</p>
          </div>
        </div>

        {!configured && <Alert type="error">Admin login isn&apos;t configured. Set ADMIN_PASSWORD and AUTH_SECRET in your environment.</Alert>}
        {devHint && <Alert type="info">{devHint}</Alert>}
        {error && <Alert type="error">{error}</Alert>}

        <Input label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <Button type="submit" size="lg" loading={loading} disabled={!configured} className="w-full">
          Sign in
        </Button>
        <Link href="/" className="block text-center text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
          &larr; Back to portfolio
        </Link>
      </form>
    </main>
  )
}
