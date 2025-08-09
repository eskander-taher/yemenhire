import { proxyRequest } from "@/app/api/_utils"

export async function GET(req: Request) {
  return proxyRequest(req, "/health")
}
