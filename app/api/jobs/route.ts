import { proxyRequest } from "@/app/api/_utils"

export async function GET(req: Request) {
  return proxyRequest(req, "/jobs")
}

export async function POST(req: Request) {
  return proxyRequest(req, "/jobs")
}
