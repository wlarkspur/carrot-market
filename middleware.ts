import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("CHATS MIDDLEWARE");
  }
}
