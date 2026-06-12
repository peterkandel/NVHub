"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initializeAuth = async () => {
      try {
        const supabase = createClient();

        console.log("[AUTH] Checking current session...");
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          // "Auth session missing!" is expected for unauthenticated users—only log unexpected errors
          if (error.message !== "Auth session missing!") {
            console.error("[AUTH] Error fetching user session:", {
              message: error.message,
              status: error.status,
              code: (error as any).code,
            });
          }
        } else if (user) {
          console.log("[AUTH] User session found:", user.id);
        } else {
          console.log("[AUTH] No active user session");
        }

        setUser(user ?? null);

        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("[AUTH] Auth state changed - Event:", event);
          console.log(
            "[AUTH] Auth state changed - Session user:",
            session?.user?.id || null
          );
          setUser(session?.user ?? null);
        });

        subscription = authSubscription;
      } catch (error) {
        console.error("[AUTH] Unexpected error initializing auth:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
