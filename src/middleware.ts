import { withAuth } from 'next-auth/middleware'
import { NextMiddleware } from 'next/server'
import wildstring from 'wildstring'

const protectedPaths = ['/admin']

const isProtectedPath = (currentURL: string) => {
  return protectedPaths.some((path) => wildstring.match(path, currentURL))
}

export const middleware: NextMiddleware = async (req, event) => {
  if (isProtectedPath(req.nextUrl.pathname)) {
    // @ts-ignore
    return await withAuth(req, event)
  }
}
