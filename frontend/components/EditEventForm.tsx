"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { useState } from "react";

const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
});

type FormData = z.infer<typeof eventSchema>;

export function EditEventForm({ event, onSuccess }: { event: Event; onSuccess?: (updatedEvent: Event) => void; }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event.name,
      description: event.description,
      date: event.date.slice(0, 10), // yyyy-mm-dd
      location: event.location,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/events/${event.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onSuccess) onSuccess(res.data);
      setErrorMsg(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.error || "Something went wrong";
      setErrorMsg(message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete(`/api/events/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/events");
    } catch (err) {
      console.error("Failed to delete event", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <Input placeholder="Name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
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
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>
      {ErrorMsg && (
        <p className="text-sm text-red-500">{ErrorMsg}</p>
      )}
      <div className="flex justify-between pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Event"}
        </Button>
      </div>
    </form>
  );
}
