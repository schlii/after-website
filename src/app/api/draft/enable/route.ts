import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // Enable draft mode to allow Visual Editing overlays and draft content
  draftMode().enable()

  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirect') || '/'
  redirect(redirectTo)
}
