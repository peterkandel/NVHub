"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-actions";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  type: "login" | "signup";
  redirectTo?: string;
}

export function AuthForm({ type, redirectTo = "/" }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (type === "signup") {
        if (password !== confirmPassword) {
          const validationError = "Passwords do not match";
          console.warn("[AUTH-FORM] Validation error:", validationError);
          setError(validationError);
          setIsLoading(false);
          return;
        }
        console.log("[AUTH-FORM] Submitting signup form with email:", email);
        const result = await signUp(email, password);
        if (result?.error) {
          console.error("[AUTH-FORM] Signup returned error:", result.error);
          setError(result.error);
        } else {
          console.log("[AUTH-FORM] Signup completed successfully");
        }
      } else {
        console.log("[AUTH-FORM] Submitting signin form with email:", email);
        const result = await signIn(email, password, redirectTo);
        if (result?.error) {
          console.error("[AUTH-FORM] SignIn returned error:", result.error);
          setError(result.error);
        } else {
          console.log("[AUTH-FORM] SignIn completed successfully");
        }
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      console.error("[AUTH-FORM] Unexpected error:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {type === "signup" && (
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {type === "login" ? "Sign In" : "Create Account"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
