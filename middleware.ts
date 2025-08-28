import { NextRequest, NextResponse } from 'next/server'

// Broader device detection regex to include common mobile & tablet user-agents.
// Covers: Android phones/tablets, iOS devices, Kindle/Silk, Windows Phone, Opera Mini/Mobi, Blackberry, etc.
const mobileRegex = /android|webos|iphone|ip(ad|od)|blackberry|bb10|playbook|kindle|silk|opera mini|opera mobi|iemobile|windows phone|mobile/i

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
