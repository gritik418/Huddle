import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { HUDDLE_TOKEN } from "./constants/variables";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const token = request.cookies.get(HUDDLE_TOKEN);

  const isPublicPath: boolean =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify-email");

  console.log("Token:", token);
  console.log("Pathname:", pathname);

  if (token?.value && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login/:path*", "/signup/:path*", "/verify-email/:path*"],
};
