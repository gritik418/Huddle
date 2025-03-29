import type { NextRequest } from "next/server";
import { HUDDLE_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  console.log(
    "🔥 Middleware Headers:",
    JSON.stringify(request.headers, null, 2)
  );

  const authHeader = request.headers;
  console.log("cookies", request.cookies.get(HUDDLE_TOKEN));
  console.log(authHeader, "hello");
  //   const token = authHeader?.split(" ")[1];

  //   console.log(token);

  //   return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/", "/login/:path*", "/signup/:path*"],
};
