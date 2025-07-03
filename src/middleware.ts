import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { CheckAuth } from './actions/checkAuth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/profile', '/admin/products/create','/admin/orders','/admin/products'];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const isValid=await CheckAuth()
    if(isValid)
      return NextResponse.next()
    else
    return NextResponse.redirect(new URL('/',request.url))

  }

  return NextResponse.next();
}
