import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://calendar-mcp.vercel.app' 
      : 'http://localhost:3000');

  const currentDate = new Date().getDate();

  return {
    title: "Google Calendar MCP",
    description: "Connect Google Calendar to Claude. Skip the Google Cloud setup BS. Connect your calendar in 30 seconds, not 3 hours.",
    openGraph: {
      title: "Google Calendar MCP",
      description: "Connect Google Calendar to Claude. Skip the Google Cloud setup BS. Connect your calendar in 30 seconds, not 3 hours.",
      url: baseUrl,
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Google Calendar MCP",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Google Calendar MCP",
      description: "Connect Google Calendar to Claude. Skip the Google Cloud setup BS. Connect your calendar in 30 seconds, not 3 hours.",
      images: [`${baseUrl}/api/og`],
    },
    icons: {
      icon: `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${currentDate}.ico`,
      apple: `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${currentDate}_256.ico`,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
