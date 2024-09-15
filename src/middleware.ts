import axios from 'axios';

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function getRole(id: number) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/role/${id}`);
        return result.data;
    } catch (error) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const user = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    // Redirect to login if user is not authenticated
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { id: userId } = user;
    const url = request.nextUrl.pathname;
    
    // Admin routes protection
    if (url.startsWith('/admin')) {
        const role = await getRole(userId as number);
        if (role && role === 'admin') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Management routes protection
    if (url.startsWith('/menage')) {
        const role = await getRole(userId as number);
        if (role && role === 'entrepreneur' || role === 'admin') {
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('userId', userId as string);
            // const safeFullname = fullname ?? '';
            // const encodedFullname = Buffer.from(safeFullname, 'utf-8').toString('base64');
            // requestHeaders.set('name', encodedFullname);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
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

    if (url.startsWith('/dormitory')) {
        const role = await getRole(userId as number);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('userId', userId as string);
        requestHeaders.set('role', role as string);
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    if (url.startsWith('/chat')) {
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
    matcher: [
        '/menage/:path*', 
        '/admin/:path*', 
        '/favorites/:path*', 
        '/reservations/:path*', 
        '/dormitory/:path*', 
        '/chat/:path*',
        '/chat-dormitory/:path*'
    ]
};
