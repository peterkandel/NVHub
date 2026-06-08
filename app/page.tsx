import Link from "next/link";

import { CreatorCard } from "@/components/creator-card";
import { FilterBar } from "@/components/filter-bar";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { feedFilters, mockCreators, mockProjects } from "@/lib/mock-data";

const featuredProject = mockProjects[0];
const spotlightCreators = mockCreators.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.12),transparent_28%)]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Developer video grid</Badge>
              <Badge variant="outline">Frontend only</Badge>
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="balance-text text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Show projects the way YouTube shows videos.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Kitab Studio is a route-first Next.js scaffold for browsing,
                previewing, and publishing developer projects without a backend.
                Every surface is a placeholder that can later attach to real data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/upload">Upload a project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/project/${featuredProject.slug}`}>View featured project</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Projects", "128 live mock entries"],
                ["Creators", "32 active profiles"],
                ["Signals", "Likes, saves, follows"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-foreground/10 bg-background/80 p-4 backdrop-blur-sm"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-2 text-sm font-medium text-foreground">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-foreground/10 bg-card p-5 shadow-sm">
            <div className="text-sm font-medium text-foreground">Featured creator</div>
            <div className="mt-4">
              <CreatorCard creator={spotlightCreators[0]} compact />
            </div>
          </div>
          <div className="rounded-3xl border border-foreground/10 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-foreground">Live sections</div>
                <p className="text-sm text-muted-foreground">
                  Feed filters, cards, profiles, and uploads.
                </p>
              </div>
              <Badge variant="outline">App Router</Badge>
            </div>
            <Separator className="my-4" />
            <p className="text-sm leading-6 text-muted-foreground">
              The entire experience stays client-free where possible, so these
              pages remain simple to replace with real APIs later.
            </p>
          </div>
        </div>
      </section>

      <FilterBar filters={feedFilters} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mockProjects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-foreground/10 bg-card p-5 shadow-sm">
            <div className="text-sm font-medium text-foreground">Trending creators</div>
            <div className="mt-4 space-y-3">
              {spotlightCreators.map((creator) => (
                <CreatorCard key={creator.username} creator={creator} compact />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-dashed border-foreground/15 bg-background/70 p-5">
            <div className="text-sm font-medium text-foreground">Architecture notes</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Home is a feed. Project pages are watch pages. Profiles are channel
              pages. Upload is a publishing stub.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
