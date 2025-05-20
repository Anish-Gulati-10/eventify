import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await api.post(`/participants/register`, body);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data;

    // Extract meaningful error message
    const message =
      typeof data === "string"
        ? data
        : data?.error || data?.message || "Internal server error";

    return NextResponse.json({ error: message }, { status });
  }
}
