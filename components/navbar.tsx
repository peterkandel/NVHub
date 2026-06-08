import Link from "next/link"
import { Clapperboard, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-foreground text-background">
            <Clapperboard className="size-4" />
          </span>
          <span className="text-sm uppercase tracking-[0.25em]">Kitab Studio</span>
        </Link>

        <div className="hidden flex-1 items-center px-4 md:flex">
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search projects"
              placeholder="Search projects, creators, and stacks"
              className="h-10 rounded-full bg-card pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/profile/maya-singh">Profile</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/upload">
              <Upload className="size-4" />
              Upload
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}