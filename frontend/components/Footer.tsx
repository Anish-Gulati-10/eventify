"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    if (token && storedUser) {
      setUsername(storedUser);
    } else {
      setUsername(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>

        <nav className="flex space-x-6 text-gray-600">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/events" className="hover:text-primary">
            Events
          </Link>

          {username ? (
            <button
              onClick={handleSignOut}
              className="hover:text-red-600 cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-primary">
                Login
              </Link>
              <Link href="/auth/signup" className="hover:text-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </footer>
  );
}
