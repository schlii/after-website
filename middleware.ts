import { NextRequest, NextResponse } from 'next/server'

// Simple mobile detection regex (iOS, Android, etc.)
const mobileRegex = /iphone|ipod|ipad|android|blackberry|bb10|mini|windows\sce|palm/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/mobile')) return NextResponse.next()

  const ua = request.headers.get('user-agent') || ''
  if (mobileRegex.test(ua)) {
    const url = request.nextUrl.clone()
    url.pathname = '/mobile'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/', // root
    '/((?!_next).*)', // all paths except Next.js internals
  ],
}
