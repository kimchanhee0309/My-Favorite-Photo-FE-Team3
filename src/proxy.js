import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/marketplace"];
const AUTH_PATHS = ["/login", "/signup"];

export function proxy(request) {
  //TODO middleware로 함수명 변경 필요
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!token;

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthPath = AUTH_PATHS.includes(pathname);

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !isAuthPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|fonts|favicon.ico|.*\\.(?:png|svg|ico)$).*)",
  ],
};
