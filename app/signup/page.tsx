import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AuthForm } from "@/components/auth-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign Up | NVHub",
  description: "Create a new NVHub account",
};

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  let user = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    // "Auth session missing!" is expected for unauthenticated users—treat as no user
    if (error && error.message !== "Auth session missing!") {
      console.error("[AUTH] SignupPage getUser error:", error);
    }

    user = data?.user ?? null;
  } catch (error) {
    console.error("[AUTH] SignupPage failed to initialize Supabase:", error);
    // Silently ignore and continue—user is simply not authenticated
  }

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-80 transition-opacity"
            >
              NVHub
            </Link>
          </div>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Sign up to start sharing your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="signup" />
        </CardContent>
      </Card>
    </div>
  );
}
