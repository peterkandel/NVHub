import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NVHub",
  description: "A creator-first platform for showcasing developer projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-cyan-300 selection:text-slate-950">
        <AuthProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)] opacity-25" />
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
