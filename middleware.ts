import { NextRequest, NextResponse } from 'next/server'

// Regex fallback for common mobile & tablet identifiers in UA string
const uaMobileRegex = /android|webos|iphone|ip(ad|od)|blackberry|bb10|playbook|kindle|silk|opera mini|opera mobi|iemobile|windows phone|mobile/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for assets, API routes, and already-mobile paths
  if (pathname.startsWith('/mobile') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 1. Check the Client Hint header (more reliable where supported)
  const chMobile = request.headers.get('sec-ch-ua-mobile') // "?1" for mobile, "?0" otherwise
  const isMobileByCH = chMobile === '?1'

  // 2. Fallback to UA sniffing
  const ua = (request.headers.get('user-agent') || '').toLowerCase()
  const isMobileByUA = uaMobileRegex.test(ua)

  if (isMobileByCH || isMobileByUA) {
    const url = request.nextUrl.clone()
    url.pathname = '/mobile'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware on all paths except Next.js internals & static assets
  matcher: ['/', '/((?!_next/|static/|favicon.ico).*)'],
}
