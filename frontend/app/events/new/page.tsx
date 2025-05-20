"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isTokenExpired } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
});

type EventForm = z.infer<typeof eventSchema>;

export default function NewEventPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.replace("/auth/login");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventForm) => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("You must be logged in to create an event.");
        return;
      }

      const res = await axios.post("/api/events", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setErrorMsg("");
      // Redirect to the newly created event's page
      router.push(`/events/${res.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.error || "Something went wrong";
      setErrorMsg(message);
    }
  };

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card>
          <CardContent>
            <Link
              href="/events"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:underline mb-6">
              <ArrowLeft size={16} />
              Back to Events
            </Link>

            <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Input type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div>
                <Input placeholder="Location" {...register("location")} />
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
              {errorMsg && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="hover:cursor-pointer">
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
