import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const res = await api.get(`/events/${id}`);

    return NextResponse.json(res.data, { status: res.status });
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
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token: string | null =
    request.headers.get("Authorization")?.split(" ")[1] || null;
  try {
    const res = await api.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
