import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const { isBot } = userAgent(req);

  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("CHATS MIDDLEWARE");
  }
  if (isBot) {
    return new Response("Plz fuck off Bot", { status: 403 });
  }

  if (!req.cookies.has("carrotsession") && !req.url.includes("/enter")) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
