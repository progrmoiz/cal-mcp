"use client";

import { ClaudeLogo } from "@/components/ClaudeLogo";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

const Step = ({
  number,
  title,
  children,
  isLast,
  isDisabled,
  isActive,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
}) => (
  <div className="flex">
    <div className="flex flex-col pr-4">
      <div
        className={`text-xs h-4 leading-none uppercase font-mono transition-all duration-500 ${
          isActive ? "text-blue-700" : "text-zinc-500"
        }`}
      >
        0{number}
      </div>
      {!isLast && <div className="m-auto flex-1 w-[1px] my-4 bg-zinc-200" />}
    </div>
    <div
      className={`flex-1 flex flex-col transition-all duration-500 ${
        isLast ? "" : "pb-12"
      } ${isDisabled ? "opacity-40" : ""}`}
    >
      <h2 className="text-zinc-700 leading-none pb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://cal-mcp.com' 
      : 'http://localhost:3000');
  const mcpUrl = `${baseUrl}/api/mcp`;

  const { data: session, isPending } = authClient.useSession();

  const handleAuth = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  const handleCopyMcpUrl = () => {
    navigator.clipboard.writeText(mcpUrl);
    setIsCopied(true);
  };

  if (isPending) {
    return (
      <div className="flex flex-col font-sans h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  const isAuthenticated = !!session?.user;

  return (
    <div className="flex flex-col font-sans h-screen">
      <main className="flex-1 flex flex-col items-center">
        <section className="px-4 pt-16 pb-10 w-full flex flex-col max-w-2xl">
          <h1 className="text-3xl leading-[1.5]">
            Connect{" "}
            <span className="whitespace-nowrap">
              <Image
                className="inline -mt-1 mr-[6px] w-7 h-7"
                src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${new Date().getDate()}_2x.png`}
                alt=""
                width={128}
                height={128}
              />
              Google Calendar
            </span>{" "}
            to{" "}
            <span className="whitespace-nowrap">
              <ClaudeLogo className="w-6 h-6 inline -mt-1 mr-[6px]" />
              Claude
            </span>
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed mt-4">
            Skip the Google Cloud setup BS. Connect your calendar in 30 seconds, not 3 hours.
          </p>
        </section>

        <section className="px-4 pb-16 w-full flex flex-col max-w-2xl">
          <Step
            isActive={!isAuthenticated}
            number={1}
            title="Connect Google Calendar"
          >
            <p className="text-zinc-500 mb-4">
              Authorize access to your Google Calendar to generate your MCP configuration.
            </p>
            {!isAuthenticated ? (
              <Button onClick={handleAuth} 
                variant="outline" 
                size="sm" 
                className="w-fit"
              >
                Connect Google Calendar
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-600 font-medium">
                  <span>Connected as {session?.user?.email}</span>
                </div>
                <Button 
                  onClick={() => authClient.signOut()}
                  variant="outline" 
                  size="sm"
                  className="w-fit"
                >
                  Disconnect
                </Button>
              </div>
            )}
          </Step>

          <Step
            isActive={isAuthenticated && !isCopied}
            isDisabled={!isAuthenticated}
            number={2}
            title="Copy MCP URL to Claude"
          >
            <p className="text-zinc-500 mb-4">
              Add this URL to your Claude Desktop configuration to enable calendar access.
            </p>
            <div className="space-y-4">
              <div className="border border-zinc-200 rounded-md px-3 py-2">
                <code className="text-sm break-all text-zinc-700 font-mono">{mcpUrl}</code>
              </div>
              <Button 
                onClick={handleCopyMcpUrl}
                variant="outline"
                size="sm"
                className="w-fit"
                disabled={!isAuthenticated}
              >
                {isCopied ? "Copied!" : "Copy URL"}
              </Button>
            </div>
          </Step>

          <Step
            isLast
            isActive={isAuthenticated && isCopied}
            isDisabled={!isAuthenticated}
            number={3}
            title="Ask Claude about your calendar"
          >
            <p className="text-zinc-500">
              Some examples:
              <br />
              &ldquo;What meetings do I have tomorrow?&rdquo;
              <br />
              &ldquo;Schedule a 30-minute call with John next week&rdquo;
              <br />
              &ldquo;What&apos;s free on Friday afternoon?&rdquo;
            </p>
          </Step>
        </section>
      </main>
      
      <footer className="flex justify-center">
        <div className="flex-1 px-4 max-w-2xl">
          <div className="py-4 flex-1 flex justify-between border-t border-zinc-200 text-zinc-400 flex-col">
            <div className="leading-relaxed pt-3 text-xs">
              Works with TeamAI, Claude Desktop, Cursor, Zed, and any MCP-compatible client
            </div>
            <div className="leading-relaxed pt-2 text-xs space-x-4">
              <a 
                href="https://github.com/progrmoiz/cal-mcp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Open Source on GitHub
              </a>
              <a 
                href="/privacy" 
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}