import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AuthForm } from "@/components/auth-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign In | NVHub",
  description: "Sign in to your NVHub account",
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  let user = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    // "Auth session missing!" is expected for unauthenticated users—treat as no user
    if (error && error.message !== "Auth session missing!") {
      console.error("[AUTH] LoginPage getUser error:", error);
    }

    user = data?.user ?? null;
  } catch (error) {
    console.error("[AUTH] LoginPage failed to initialize Supabase:", error);
    // Silently ignore and continue—user is simply not authenticated
  }

  if (user) {
    redirect("/");
  }

  const params = await searchParams;
  const redirectTo = params.redirectTo || "/";

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
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="login" redirectTo={redirectTo} />
        </CardContent>
      </Card>
    </div>
  );
}
