import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = req.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/me", req.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/me'],
};
