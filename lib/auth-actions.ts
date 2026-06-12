"use server";

import { createClient } from "@/lib/supabase/server";
import { createProfileForUser } from "@/lib/supabase/profile";
import { redirect } from "next/navigation";

export async function signUp(email: string, password: string) {
  try {
    const supabase = await createClient();

    console.log("[AUTH] URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "[AUTH] KEY EXISTS:",
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("[AUTH] Attempting signUp with email:", email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("[AUTH] signUp response - Data:", data);
    console.log("[AUTH] signUp response - Error:", error);

    if (error) {
      const errorMessage = error.message || "Unknown signup error";
      console.error("[AUTH] Signup failed with error:", {
        message: errorMessage,
        status: error.status,
        code: (error as any).code,
      });
      return { error: errorMessage };
    }

    const userId = data?.user?.id;
    if (userId) {
      const profileResult = await createProfileForUser(userId, email);
      if (profileResult?.error) {
        const errorMessage = profileResult.error.message || "Unable to create profile";
        console.error("[AUTH] Profile creation failed:", profileResult.error);
        return { error: errorMessage };
      }
    } else {
      console.warn("[AUTH] No user id returned from Supabase signup; profile creation skipped.");
    }

    console.log("[AUTH] Signup successful. User created:", userId);
    redirect("/login?message=Check your email to confirm your account");
  } catch (error) {
    console.error("[AUTH] Unexpected error during signup:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during signup";
    return { error: errorMessage };
  }
}

export async function signIn(email: string, password: string, redirectTo: string = "/") {
  try {
    const supabase = await createClient();

    console.log("[AUTH] Attempting signIn with email:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("[AUTH] signIn response - Data:", data);
    console.log("[AUTH] signIn response - Error:", error);

    if (error) {
      const errorMessage = error.message || "Unknown signin error";
      console.error("[AUTH] SignIn failed with error:", {
        message: errorMessage,
        status: error.status,
        code: (error as any).code,
      });
      return { error: errorMessage };
    }

    console.log("[AUTH] SignIn successful. User authenticated:", data?.user?.id);
    redirect(redirectTo);
  } catch (error) {
    console.error("[AUTH] Unexpected error during signin:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during login";
    return { error: errorMessage };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();

    console.log("[AUTH] Attempting signOut");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("[AUTH] SignOut failed with error:", {
        message: error.message,
        status: error.status,
        code: (error as any).code,
      });
    } else {
      console.log("[AUTH] SignOut successful");
    }
  } catch (error) {
    console.error("[AUTH] Unexpected error during signOut:", error);
  }

  redirect("/");
}
