"use client";

import { SignupForm } from "@/components/signup-form";
import { isTokenExpired } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.replace("/events");
    }
  }, [router]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
