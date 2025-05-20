import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;
  console.log("eventId", eventId);

  try {
    const res = await api.get(`/participants/${eventId}`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}