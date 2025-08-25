import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // Disable draft mode
  (await draftMode()).disable()

  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirect') || '/'
  redirect(redirectTo)
}
