import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token: string | null =
    req.headers.get("Authorization")?.split(" ")[1] || null;

  try {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await api.post(`/events`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(_req: NextRequest) {
  try {
    const res = await api.get(`/events`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
