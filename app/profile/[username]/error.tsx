"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[PROFILE] Route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background/80 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-destructive/20 bg-destructive/10 p-10 text-center shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)]">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />
        <h1 className="text-2xl font-semibold text-foreground">Unable to load profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error?.message || "Something went wrong while loading this profile."}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => router.push("/")}>Go home</Button>
        </div>
      </div>
    </div>
  );
}
