import { NextResponse } from 'next/server'
// This middleware will be fire first before any request

const SignedInPages = ['/', '/playlist', '/library']

export default function middleware(req) {
  if (SignedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN
    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
