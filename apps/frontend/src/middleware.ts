import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check for protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Note: In a real app we would verify the token here properly, 
        // but client-side token is in localStorage which middleware can't access directly.
        // For middleware, we'd typically use cookies.
        // For this POC, we'll rely on client-side check largely or assume cookie set if we upgraded auth.
        // However, simply checking existence of a cookie "access_token" or similar is best practice.

        // Since our current login approach uses localStorage, middleware can't act as a secure gate 
        // without cookies. We'll skip middleware enforcement for now and rely on API 401s 
        // and client-side checks in layout/pages.

        // In a prod app -> Set cookie on login -> Verify here.
        return NextResponse.next();
    }
}

export const config = {
    matcher: '/dashboard/:path*',
};
