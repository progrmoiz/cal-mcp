"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-2xl">Connect Google Calendar</h1>
        
        <Button onClick={handleGoogleLogin}>
          Connect Google Calendar
        </Button>

        <div>
          <Link 
            href="/" 
            className="text-zinc-500 hover:text-zinc-700 text-sm"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}