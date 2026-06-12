import { Loader2 } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background/80 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-[2rem] border border-foreground/10 bg-card/90 p-10 text-center shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)]">
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-cyan-400" />
        <p className="text-lg font-semibold text-foreground">Loading creator profile...</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Fetching the latest profile information from Supabase.
        </p>
      </div>
    </div>
  );
}
