import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  if (
    pathname.startsWith('/admin') &&
    !(
      pathname === '/admin/login' ||
      pathname === '/admin/forgot-password' ||
      pathname.startsWith('/admin/reset-password')
    )
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export default proxy

export const config = {
  matcher: ['/admin/:path*'],
}
