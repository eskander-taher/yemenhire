const BASE = "https://api.yemenhire.com/api"

export async function proxyRequest(req: Request, path: string) {
  const url = new URL(req.url)
  const target = `${BASE}${path}${url.search}`

  const init: RequestInit = {
    method: req.method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // stream the body only when needed (POST / PUT)
    body: ["POST", "PUT", "PATCH"].includes(req.method) ? await req.text() : undefined,
    // don't forward cookies / credentials
  }

  try {
    const res = await fetch(target, init)
    const data = await res.arrayBuffer()
    return new Response(data, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
    })
  } catch (err) {
    console.error("Proxy error →", err)
    return new Response(JSON.stringify({ message: "Upstream API unreachable" }), { status: 502 })
  }
}
