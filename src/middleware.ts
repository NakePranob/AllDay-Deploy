import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const user = await getToken({ req: request });
    
    // Redirect to login if user is not authenticated
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { id: userId , roleId: userRoleId } = user;
    const url = request.nextUrl.pathname;

    // Admin routes protection
    if (url.startsWith('/admin')) {
        if (userRoleId === '3') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Management routes protection
    if (url.startsWith('/menage')) {
        if (userRoleId === '2' || userRoleId === '3') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/registerEntrepreneur', request.url));
        }
    }

    // Favorites routes with additional headers
    if (url.startsWith('/favorites')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('userId', userId as string);
        
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    // Reservations routes with additional headers
    if (url.startsWith('/reservations')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('userId', userId as string);
        
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    // Default action if no routes are matched
    return NextResponse.next();
}

export const config = {
    matcher: ['/menage/:path*', '/admin/:path*', '/favorites/:path*', '/reservations/:path*'],
};
