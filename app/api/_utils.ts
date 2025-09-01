const BASE =
  process.env.NODE_ENV === "production"
    ? "https://api.yemenhire.com/api"
    : "http://localhost:5000/api";

export async function proxyRequest(req: Request, path: string) {
  const url = new URL(req.url);
  const target = `${BASE}${path}${url.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // stream the body only when needed (POST / PUT)
    body: ["POST", "PUT", "PATCH"].includes(req.method)
      ? await req.text()
      : undefined,
    // don't forward cookies / credentials
  };

  try {
    const res = await fetch(target, init);
    const data = await res.arrayBuffer();

    // Log authentication errors for debugging
    if (res.status === 401) {
      console.error(
        `Authentication failed for ${req.method} ${path}. API may require authentication.`
      );
    }

    return new Response(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (err) {
    console.error("Proxy error →", err);
    return new Response(
      JSON.stringify({
        message: "Upstream API unreachable",
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
