/**
 * Many sites forbid being shown inside an iframe (X-Frame-Options / CSP frame-ancestors).
 * Browsers give no error for this, so we read the site's headers on the server and decide up front.
 * If the check itself fails (timeout, offline) we assume the site CAN be embedded and let the iframe try.
 */
export async function canEmbed(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioEmbedCheck/1.0)" },
      next: { revalidate: 3600 },
    })
    void res.body?.cancel()

    const xfo = res.headers.get("x-frame-options")?.toLowerCase()
    if (xfo && (xfo.includes("deny") || xfo.includes("sameorigin") || xfo.includes("allow-from"))) return false

    const csp = res.headers.get("content-security-policy")
    const directive = csp?.split(";").map((d) => d.trim()).find((d) => d.toLowerCase().startsWith("frame-ancestors"))
    if (directive) {
      const sources = directive.split(/\s+/).slice(1)
      return sources.includes("*") || sources.includes("https:")
    }
    return true
  } catch {
    return true
  }
}
