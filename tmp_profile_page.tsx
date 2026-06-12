import Link from "next/link"
import { notFound } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProfileByUsername } from "@/lib/supabase/profile"
import { mockProjects } from "@/lib/mock-data"
import {
  Bookmark,
  CalendarDays,
  ExternalLink,
  Heart,
  LayoutGrid,
  SquareUserRound,
} from "lucide-react"

type ProfilePageProps = {
  params: { username: string }
}

function formatJoinDate(createdAt: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(createdAt))
  } catch {
    return "Unknown"
  }
}

export async function generateStaticParams() {
  return []
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params
  const profile = await getProfileByUsername(username)

  if (!profile) {
    notFound()
  }

  const creatorProjects = mockProjects.filter((project) => project.creatorUsername === username)
  const bookmarkedProjects = mockProjects.filter((project) => project.creatorUsername !== username).slice(0, 6)
  const joinedAt = formatJoinDate(profile.created_at)

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Creator profile</Badge>
          <Badge variant="outline">Supabase data</Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.55fr)] lg:items-end">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <Avatar className="size-20 shrink-0 ring-1 ring-foreground/10 sm:size-24">
              {profile.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username} />
              ) : (
                <AvatarFallback className="text-xl">{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                  {profile.username}
                </h1>
                <p className="text-base text-muted-foreground">@{profile.username}</p>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {profile.bio || "This user has not added a bio yet."}
              </p>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${profile.username}@example.com`}>Contact</a>
                </Button>
              </div>
            </div>
          </div>

          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="grid gap-3 p-5 text-sm text-muted-foreground">
              <StatRow icon={CalendarDays} label="Joined" value={joinedAt} />
              <StatRow icon={LayoutGrid} label="Projects" value={String(creatorProjects.length)} />
              <StatRow icon={Heart} label="Source" value="Supabase" />
              <StatRow icon={SquareUserRound} label="Member" value={profile.id.slice(0, 8)} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button>Follow creator</Button>
          <Button asChild variant="outline">
            <Link href="/upload">Upload with this creator</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <div className="space-y-6">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start gap-2 rounded-none border-b border-foreground/10 bg-transparent p-0"
            >
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-6 outline-none">
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {creatorProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="mt-6 outline-none">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Bookmark className="size-4" />
                Curated from the shared mock feed.
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {bookmarkedProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6 outline-none">
              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="border-foreground/10 bg-card/90 shadow-sm">
                  <CardContent className="space-y-4 p-5">
                    <div className="text-sm font-medium text-foreground">Profile details</div>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <StatLine label="Joined" value={joinedAt} />
                      <StatLine label="Projects" value={String(creatorProjects.length)} />
                      <StatLine label="User id" value={profile.id} />
                      <StatLine label="Username" value={profile.username} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-foreground/10 bg-card/90 shadow-sm">
                  <CardContent className="space-y-4 p-5">
                    <div className="text-sm font-medium text-foreground">Bio</div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {profile.bio || "No bio provided yet."}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Profile links</div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm">
                          <a href={`/profile/${profile.username}`}>Profile page</a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a href="/upload">Upload project</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="text-sm font-medium text-foreground">Channel stats</div>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <StatLine label="Projects" value={String(creatorProjects.length)} />
                <StatLine label="Joined" value={joinedAt} />
                <StatLine label="Username" value={profile.username} />
                <StatLine label="User id" value={profile.id.slice(0, 8)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/15 bg-background/70 shadow-none">
            <CardContent className="space-y-3 p-5 text-sm leading-6 text-muted-foreground">
              <div className="text-sm font-medium text-foreground">About this profile</div>
              <p>
                This page is driven entirely by mock data and is structured to support future posts,
                collections, and follower interactions without changing the route shape.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-cyan-300" />
        <span>{label}</span>
      </div>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-2 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
