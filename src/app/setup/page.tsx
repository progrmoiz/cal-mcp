"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Not connected</h2>
          <p className="text-muted-foreground mb-6">You need to connect your Google account first.</p>
          <Button asChild>
            <Link href="/login">Connect Google Calendar</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Connecting to Google Calendar MCP</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to get started and plug Google Calendar into your AI tool.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p>
            This guide walks you through connecting your AI tool to Google Calendar using the Model Context Protocol (MCP).
          </p>
        </div>

        {/* Connect through your AI tool */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Connect through your AI tool</h2>
          <p className="text-muted-foreground">
            To connect, search for "Google Calendar MCP" in your tool's MCP directory or use this configuration:
          </p>

          {/* Streamable HTTP */}
          <Card>
            <CardHeader>
              <CardTitle>Streamable HTTP (Recommended)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>URL:</strong> <code className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded border border-zinc-600">{typeof window !== 'undefined' ? window.location.origin : ''}/api/mcp</code>
              </p>
              <div>
                <p className="text-sm font-medium mb-2">JSON config:</p>
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg font-mono text-sm text-zinc-100">
                  <pre>{`{
  "mcpServers": {
    "google-calendar": {
      "url": "${typeof window !== 'undefined' ? window.location.origin : ''}/api/mcp"
    }
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* STDIO Alternative */}
          <Card>
            <CardHeader>
              <CardTitle>STDIO (Local Server)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-2">JSON config:</p>
              <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg font-mono text-sm text-zinc-100">
                <pre>{`{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${typeof window !== 'undefined' ? window.location.origin : ''}/api/mcp"]
    }
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Troubleshooting connection issues</h2>
          <p className="text-muted-foreground">
            If you're experiencing issues connecting your AI tool to Google Calendar MCP, here are some common solutions:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Check MCP Client Support</h3>
              <p className="text-muted-foreground">
                First, verify that your AI tool supports MCP clients and can connect to MCP servers. Not all AI tools have this capability built-in yet.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Verify Remote Server Support</h3>
              <p className="text-muted-foreground">
                Some AI tools have MCP clients but don't support remote connections. If this is the case, try the STDIO configuration above.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication Issues</h3>
              <p className="text-muted-foreground">
                Make sure you completed the Google OAuth flow and granted calendar permissions. You can try reconnecting from the main page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Request MCP Support</h3>
              <p className="text-muted-foreground">
                If your AI tool doesn't support MCP at all, reach out to the tool's developers to request MCP server connection support. This helps expand the ecosystem of MCP-compatible tools.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}