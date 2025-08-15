"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type ClientSession = {
  user?: { id?: string; email?: string | null; name?: string | null; image?: string | null };
} | null;

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = (await authClient.getSession()) as unknown as ClientSession;
        setIsAuthenticated(!!session?.user);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="gradient-text">Google Calendar</span>
          <br />
          MCP
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          I got tired of the Google Cloud setup BS, so I built this.
          <br />
          <span className="text-accent font-medium">Connect your calendar in 30 seconds, not 3 hours.</span>
        </p>
        
        <div className="pt-6">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-400 font-medium">
                <span>✅</span>
                <span>Connected & Ready!</span>
              </div>
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/setup">
                  Copy Configuration
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/login">
                  Connect Google Calendar
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Already connected?{" "}
                <Link href="/setup" className="text-accent hover:text-accent/80 underline">
                  Copy your config
                </Link>
              </p>
            </div>
          )}
        </div>
        
        <footer className="pt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            Works with Claude Desktop, Cursor, Zed, and any MCP-compatible client
          </p>
          <p className="text-sm text-muted-foreground">
            <a 
              href="https://github.com/progrmoiz/calendar-mcp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 underline"
            >
              Open Source on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}