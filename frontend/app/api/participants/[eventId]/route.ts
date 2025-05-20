import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const eventId = pathname.split("/").pop();

  console.log("eventId", eventId);

  try {
    const res = await api.get(`/participants/${eventId}`);

    return NextResponse.json(res.data, { status: res.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
