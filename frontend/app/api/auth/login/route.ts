import api from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await api.post(`/auth/login`, body);

    return NextResponse.json(res.data, { status: res.status });

  } catch (error: any) {
    console.error("Login proxy error:", error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
