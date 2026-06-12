import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { difficultyMapper, stageMapper } from "@/lib/enum-utils";

const requiredFields = [
  "title",
  "slug",
  "description",
  "problem",
  "stack",
  "difficulty",
];

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim().length === 0) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tech_stack = Array.isArray(payload.stack)
    ? payload.stack.filter((item: unknown) => typeof item === "string")
    : typeof payload.stack === "string"
    ? payload.stack
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean)
    : [];

  let difficulty: string;
  let stage: string;

  try {
    difficulty = difficultyMapper.map(payload.difficulty, "difficulty");
    stage = stageMapper.map(payload.stage ?? "Published", "stage");
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid enum value." }, { status: 400 });
  }

  const projectPayload = {
    creator_id: authData.user.id,
    title: String(payload.title).trim(),
    slug: String(payload.slug).trim(),
    description: String(payload.description).trim(),
    problem_solved: String(payload.problem).trim(),
    tech_stack,
    difficulty,
    stage,
    demo_video_url: payload.demoVideoUrl ? String(payload.demoVideoUrl).trim() : null,
  };

  console.log("[projects API] insert payload:", projectPayload);

  const { data, error } = await supabase
    .from("projects")
    .insert(projectPayload)
    .select("slug")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slug: data.slug }, { status: 201 });
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, creator_id, title, slug, description, problem_solved, tech_stack, difficulty, stage, demo_video_url, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[projects API] GET projects error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const projects = data ?? [];

    // fetch creators separately to avoid nested select (works even if no FK exists)
    const creatorIds = Array.from(new Set(projects.map((p: any) => p.creator_id).filter(Boolean)));

    let creatorsById: Record<string, any> = {};
    if (creatorIds.length > 0) {
      const { data: creators, error: creatorsError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, bio")
        .in("id", creatorIds);

      if (!creatorsError && Array.isArray(creators)) {
        creatorsById = creators.reduce((acc: any, cur: any) => ({ ...acc, [cur.id]: cur }), {});
      }
    }

    const merged = projects.map((proj: any) => ({ ...proj, creator: creatorsById[proj.creator_id] ?? null }));

    return NextResponse.json(merged);
  } catch (error) {
    console.error("[projects API] GET handler failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load projects." },
      { status: 500 }
    );
  }
}
