import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { feedFilters, mockProjects } from "@/lib/mock-data";
import { Search, Sparkles, TrendingUp, Upload } from "lucide-react";

const featuredProject = mockProjects[0];
const trendingProjects = mockProjects.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.14),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] shadow-[0_30px_120px_-50px_rgba(0,0,0,0.9)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:px-10 lg:py-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/10 bg-white/10 text-white">Discovery feed</Badge>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                Modern dark theme
              </Badge>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="balance-text text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover developer projects like you discover videos.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Kitab Studio turns launches, demos, and side projects into a feed
                built for browsing, saving, and following what matters.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-200">
                <Link href="/upload">
                  <Upload className="size-4" />
                  Upload project
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                <Link href={`/project/${featuredProject.slug}`}>Explore featured project</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["20 projects", "Fresh mock discovery feed"],
                ["Trending now", "What people are opening next"],
                ["Built for scroll", "Responsive cards and sections"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
                  <div className="mt-2 text-sm font-medium text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="size-4 text-cyan-300" />
              Search across the feed
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                aria-label="Search projects"
                placeholder="Search projects, creators, stacks"
                className="h-12 rounded-full border-white/10 bg-slate-950/60 pl-10 text-white placeholder:text-slate-500"
              />
            </div>
            <Separator className="bg-white/10" />
            <div className="grid gap-3 sm:grid-cols-2">
              {trendingProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/project/${project.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 transition-colors hover:bg-slate-950/70"
                >
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{project.creatorName}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <TrendingUp className="size-4" />
              Trending projects
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              What the community is opening right now
            </h2>
          </div>
          <div className="text-sm text-slate-400">Updated from the mock discovery feed</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trendingProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
              Browse all
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Responsive project grid
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {feedFilters.slice(0, 5).map((filter) => (
              <Badge key={filter} variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {mockProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
