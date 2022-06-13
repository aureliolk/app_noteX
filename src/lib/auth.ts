// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';


export async function verifyAuth(request: NextRequest) {
  const token = request.cookies["c.token"]
  
  if (!token) {
    console.log("Você não tem o Token")
    return false
  }
  
  return true
}
