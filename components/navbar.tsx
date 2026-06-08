import Link from "next/link"
import { Clapperboard, Search, Upload } from "lucide-react"

import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProjectsBySlugs, mockCurrentUser } from "@/lib/mock-data"

const savedProjectPreview = getProjectsBySlugs(mockCurrentUser.savedProjectSlugs).slice(0, 3)

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-foreground">
          <span className="flex size-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(56,189,248,0.75)]">
            <Clapperboard className="size-4" />
          </span>
          <span className="text-sm uppercase tracking-[0.34em] text-slate-200">NVHub</span>
        </Link>

        <div className="hidden flex-1 items-center px-4 md:flex">
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              aria-label="Search projects"
              placeholder="Search projects, creators, and stacks"
              className="h-11 rounded-full border-white/10 bg-white/5 pl-11 text-slate-100 placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus-visible:border-cyan-400/40 focus-visible:bg-white/8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-white text-slate-950 shadow-[0_12px_36px_-18px_rgba(255,255,255,0.8)] hover:bg-slate-200">
            <Link href="/upload">
              <Upload className="size-4" />
              Upload
            </Link>
          </Button>
          <UserMenu user={mockCurrentUser} notifications={mockCurrentUser.notifications} savedProjects={savedProjectPreview} />
        </div>
      </div>
    </header>
  )
}