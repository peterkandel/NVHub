"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  Bell,
  Bookmark,
  ChevronDown,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/mock-data"
import { CurrentUser, Notification } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type UserMenuProps = {
  user: CurrentUser
  notifications: Notification[]
  savedProjects: Project[]
}

export function UserMenu({ user, notifications, savedProjects }: UserMenuProps) {
  const [activePanel, setActivePanel] = useState<"notifications" | "menu" | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setActivePanel(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div ref={rootRef} className="relative flex items-center gap-2">
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-10 rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          onClick={() => setActivePanel(activePanel === "notifications" ? null : "notifications")}
          aria-haspopup="dialog"
          aria-expanded={activePanel === "notifications"}
          aria-label="Open notifications"
        >
          <Bell className="size-4" />
          {notifications.length > 0 ? <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan-300 shadow-[0_0_0_3px_rgba(8,15,32,1)]" /> : null}
        </Button>

        <PanelShell open={activePanel === "notifications"} className="right-0 mt-3 w-full max-w-[24rem] sm:w-[24rem]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-heading text-sm font-semibold text-white">Notifications</div>
                <p className="text-xs text-slate-400">Mock activity for Peter</p>
              </div>
              <Badge variant="outline" className="border-cyan-400/20 bg-cyan-500/10 text-cyan-100">
                {notifications.length} new
              </Badge>
            </div>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div key={notification.title} className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-cyan-300" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white">{notification.title}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{notification.description}</p>
                      <div className="mt-2 text-xs text-slate-500">{notification.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PanelShell>
      </div>

      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 pr-3 text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          onClick={() => setActivePanel(activePanel === "menu" ? null : "menu")}
          aria-haspopup="menu"
          aria-expanded={activePanel === "menu"}
        >
          <Avatar className="size-8 border border-white/10">
            <AvatarFallback className="bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-600 text-xs font-semibold text-white">
              {user.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <div className="text-sm font-medium text-white">{user.name}</div>
            <div className="text-xs text-slate-400">{user.role}</div>
          </div>
          <ChevronDown className="size-4 text-slate-400" />
        </Button>

        <PanelShell open={activePanel === "menu"} className="right-0 mt-3 w-full max-w-[19rem] sm:w-[19rem]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <Avatar className="size-10 border border-white/10">
                <AvatarFallback className="bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-600 text-sm font-semibold text-white">
                  {user.avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-heading text-sm font-semibold text-white">{user.name}</div>
                <div className="text-sm text-slate-400">{user.username}</div>
              </div>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                Signed in
              </Badge>
            </div>

            <div className="grid gap-2">
              <MenuLink href="/bookmarks" icon={Bookmark} title="Bookmarks" description="Your saved projects" />
              <MenuLink href="/bookmarks" icon={Sparkles} title="Saved projects" description="Open your collection" />
              <MenuLink href="/upload" icon={UserRound} title="Upload as Peter" description="Use the current fake session" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Saved preview</div>
                <Link className="text-xs text-cyan-300 hover:text-cyan-200" href="/bookmarks">
                  View all
                </Link>
              </div>
              {savedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/project/${project.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-500/5"
                >
                  <div className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-semibold text-white", gradientForTitle(project.title))}>
                    {project.title.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{project.title}</div>
                    <div className="truncate text-xs text-slate-400">{project.creatorName}</div>
                  </div>
                </Link>
              ))}
            </div>

            <Button variant="outline" className="w-full justify-start gap-2 border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
              <LogOut className="size-4" />
              Sign out of fake session
            </Button>
          </div>
        </PanelShell>
      </div>
    </div>
  )
}

function PanelShell({
  open,
  className,
  children,
}: {
  open: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 max-w-full rounded-[1.4rem] border border-white/10 bg-slate-950/95 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-200",
        open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0",
        className
      )}
      aria-hidden={!open}
    >
      {children}
    </div>
  )
}

function MenuLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-500/5">
      <Icon className="size-4 text-cyan-300" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </Link>
  )
}

function gradientForTitle(title: string) {
  const gradients = ["from-cyan-400 via-sky-500 to-indigo-600", "from-fuchsia-500 via-rose-500 to-orange-400", "from-emerald-400 via-teal-500 to-cyan-600"]
  return gradients[title.length % gradients.length]
}