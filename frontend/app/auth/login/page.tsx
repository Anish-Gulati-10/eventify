"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { isTokenExpired } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.replace("/events");
    }
  }, [router]);

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
