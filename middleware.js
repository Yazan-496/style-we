import { NextRequest, NextResponse, userAgent } from 'next/server';
import { cookies } from 'next/headers';

// Set pathname where middleware will be executed
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/data|_next/image|favicon.ico|en|ae|assets|image/catalog|1.jpg|2.png|3.jpg|4.jpg|mirage-mobile).*)',
    ],
};

export function middleware(req) {
    let cookie = req.cookies.get('lang');
    let site_name = req.cookies.get('site_name');
    let token = req.cookies.get('TOKEN_LOCAL_STORAGE');

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-next-pathname', req.nextUrl.pathname);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    if (!req.cookies.has('lang')) {
        response.cookies.set('lang', 'en');
    }
    // if (!site_name) {
        response.cookies.set({
            name: 'site_name',
            value: 'overstock',
            domain: 'clearance.ae',
        });
    // }
    return response;
}
