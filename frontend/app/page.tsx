import Link from "next/link";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-20 px-6 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">Eventify</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan, organize, and track events without the chaos. Eventify helps you stay ahead with smooth participant handling and smart scheduling.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/events">Browse Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events/new">Create New Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-10 bg-muted/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">What You Can Do with Eventify</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card rounded-xl shadow p-6 hover:shadow-xl transition">
              <Calendar className="h-9 w-9 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-1">Create Events Fast</h3>
              <p className="text-sm text-muted-foreground">
                Set up events in minutes with full details—date, time, and venue.
              </p>
            </div>
            <div className="bg-card rounded-xl shadow p-6 hover:shadow-xl transition">
              <Users className="h-9 w-9 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-1">Manage Attendees</h3>
              <p className="text-sm text-muted-foreground">
                Easily register and keep tabs on all your attendees in one place.
              </p>
            </div>
            <div className="bg-card rounded-xl shadow p-6 hover:shadow-xl transition">
              <MapPin className="h-9 w-9 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-1">Pinpoint Locations</h3>
              <p className="text-sm text-muted-foreground">
                Add and manage venue locations with clarity for your guests.
              </p>
            </div>
            <div className="bg-card rounded-xl shadow p-6 hover:shadow-xl transition">
              <Clock className="h-9 w-9 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-1">Stay on Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Organize event timelines and sessions using intuitive views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary/10 py-20 px-6 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let Eventify Simplify Your Workflow
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you're hosting a meetup or a major conference, Eventify has the tools to streamline your event from start to finish.
          </p>
          <Button size="lg">
            <Link href="/events/new">Start Planning</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
