import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello from Next.js get!" });
}

export function POST() {
  return Response.json({ message: "Hello from Next.js post!" });
}
