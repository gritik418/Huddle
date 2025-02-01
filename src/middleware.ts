import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HUDDLE_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(HUDDLE_TOKEN);
  const pathname: string = request.nextUrl.pathname;

  const isPublicPath: boolean =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (token && token?.value && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login/:path*", "/signup/:path*"],
};
