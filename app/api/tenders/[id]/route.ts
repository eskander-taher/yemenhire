import { proxyRequest } from "@/app/api/_utils"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/tenders/${params.id}`)
}
