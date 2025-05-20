"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ArrowLeft, CalendarIcon, MapPin, Pencil, User, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event, Participant } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserId } from "@/lib/utils";
import { EditEventForm } from "@/components/EditEventForm";

const participantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type ParticipantForm = z.infer<typeof participantSchema>;

export default function EventDetailsPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParticipantForm>({
    resolver: zodResolver(participantSchema),
  });

  const onSubmit = async (data: ParticipantForm) => {
    try {
      const res = await axios.post(`/api/participants/register`, {
        ...data,
        event_id: id,
      });
      setParticipants((prev) => [...prev, res.data]);
      reset();
      setShowForm(false);
      setErrorMsg(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.error || "Something went wrong";
      setErrorMsg(message);
    }
  };

  useEffect(() => {
    setUserId(getUserId(localStorage.getItem("token") || ""))
    async function fetchEvent() {
      try {
        const res = await axios.get(`/api/events/${id}`);
        const participantsRes = await axios.get(`/api/participants/${id}`);

        setEvent(res.data);
        setParticipants(participantsRes.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const bannerSrc = event
    ? `/banners/banner${Number(event.id) % 2 === 0 ? "2" : "1"}.jpg`
    : "";

  return (
    <div className="min-h-screen w-full">
      {/* Banner */}
      <div className="w-full h-60 sm:h-72 md:h-80 relative">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
          <img
            src={bannerSrc}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {loading || !event ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 mb-6">
            <Link
              href={"/events"}
              className="text-base text-muted-foreground flex items-center gap-2 p-2 ml-[-8] hover:bg-muted/80 hover:cursor-pointer rounded-md">
              <ArrowLeft size={16} /> Events
            </Link>
            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <div className="flex items-center text-muted-foreground gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(event.date)}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
              )}
            </div>

            <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground">
              {event.description}
            </p>
            <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground font-semibold">
              Organized by: {event.owner_name}
            </p>
            <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger>
                <Button className="flex gap-2 items-center text-sm leading-relaxed whitespace-pre-line text-muted-foreground font-medium p-2 hover:bg-muted/40 hover:cursor-pointer rounded-md" variant="outline"><Users size={14} /> Participants</Button>

              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Participants</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div className="flex flex-col gap-2 mt-2">
                      {participants.length > 0 ? (
                        participants.map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center justify-between px-2 py-4 border-b border-muted/50 hover:bg-muted/50 hover:cursor-pointer rounded-md">
                            <div className="flex gap-2 text-base items-center">
                              <User size={16} />
                              <span>{participant.name}</span>
                            </div>
                            <span>{participant.email}</span>
                          </div>
                        ))
                      ) : (
                        "No participants yet."
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-fit mt-4"
                        onClick={() => setShowForm((prev) => !prev)}>
                        {showForm ? "Cancel" : "+ Add Participant"}
                      </Button>

                      
                    </div>
                  </DialogDescription>
                  {showForm && (
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className="border px-2 py-1 rounded-md text-sm"
                          />
                          {errors.name && (
                            <span className="text-sm text-red-500">
                              {errors.name.message}
                            </span>
                          )}

                          <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="border px-2 py-1 rounded-md text-sm"
                          />
                          {errors.email && (
                            <span className="text-sm text-red-500">
                              {errors.email.message}
                            </span>
                          )}
                          {errorMsg && (
                            <span className="text-sm text-red-500">
                              {errorMsg}
                            </span>
                          )}
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                              ? "Submitting..."
                              : "Register Participant"}
                          </Button>
                        </form>
                      )}
              </DialogContent>
            </Dialog>
            {userId === event.owner_id && 
              <Dialog>
                <DialogTrigger>
                <Button className="flex gap-2 items-center text-sm leading-relaxed whitespace-pre-line font-medium p-2 hover:cursor-pointer rounded-md">
                  <Pencil size={14} /> Edit Event
                </Button>                  
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                  </DialogHeader>
                    <EditEventForm event={event} onSuccess={(updatedEvent) => setEvent(updatedEvent)}/>                  
                </DialogContent>
              </Dialog>
            }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
