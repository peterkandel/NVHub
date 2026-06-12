"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthenticatedUserMenuProps {
  email: string;
}

export function AuthenticatedUserMenu({ email }: AuthenticatedUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials = email
    .split("@")[0]
    .split(".")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 pr-3 text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Avatar className="size-8 border border-white/10">
          <AvatarFallback className="bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-600 text-xs font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden text-left sm:block">
          <div className="text-sm font-medium text-white">Account</div>
          <div className="truncate text-xs text-slate-400">{email}</div>
        </div>
        <ChevronDown className="size-4 text-slate-400" />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-3 w-full max-w-[19rem] rounded-[1.4rem] border border-white/10 bg-slate-950/95 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-200 sm:w-[19rem]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <Avatar className="size-10 border border-white/10">
              <AvatarFallback className="bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-600 text-sm font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-heading text-sm font-semibold text-white">
                {email.split("@")[0]}
              </div>
              <div className="truncate text-sm text-slate-400">{email}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-500/5"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm font-medium text-white">My Profile</div>
            </Link>
          </div>

          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start gap-2 border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
