"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClaudeLogo } from "@/components/ClaudeLogo";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-3">
              <Image
                className="w-8 h-8"
                src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${new Date().getDate()}_2x.png`}
                alt="Google Calendar"
                width={32}
                height={32}
              />
              <span className="text-2xl text-zinc-400">×</span>
              <ClaudeLogo className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Connect Your Calendar</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Sign in with Google to connect your calendar to Claude. 
              This enables powerful AI-powered calendar management and scheduling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleGoogleLogin} 
              className="w-full h-11 text-base"
              size="lg"
            >
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-3"
              />
              Continue with Google
            </Button>
            
            <div className="text-center text-sm text-zinc-500 leading-relaxed">
              <p>
                By connecting, you authorize this app to access your Google Calendar data. 
                Your data remains secure and is only used for calendar operations.
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                href="/" 
                className="text-zinc-500 hover:text-zinc-700 text-sm inline-flex items-center"
              >
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-xs text-zinc-400">
          <p>
            This will redirect you to Google&apos;s secure authentication page.
            <br />
            No passwords are stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}