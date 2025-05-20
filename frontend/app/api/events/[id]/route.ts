import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname; // e.g. /api/events/123
  const id = pathname.split('/').pop();
  const body = await request.json();
  const token: string | null =
    request.headers.get("Authorization")?.split(" ")[1] || null;

  try {
    const res = await api.put(`/events/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(
  request: NextRequest
) {
  const { pathname } = request.nextUrl; // e.g. /api/events/123
  const id = pathname.split("/").pop(); // get last segment (id)
  try {
    const res = await api.get(`/events/${id}`);

    return NextResponse.json(res.data, { status: res.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
) {
  const { pathname } = request.nextUrl; // e.g. /api/events/123
  const id = pathname.split("/").pop();
  const token: string | null =
    request.headers.get("Authorization")?.split(" ")[1] || null;
  try {
    const res = await api.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
