import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "./profile";

export type ProjectRow = {
  id: string;
  creator_id: string;
  title: string;
  slug: string;
  description: string;
  problem_solved: string;
  tech_stack: string[];
  difficulty: string;
  stage: string;
  demo_video_url: string | null;
  created_at: string;
  category?: string;
  solution?: string;
  thumbnail_url?: string | null;
  video_duration?: string | null;
  live_url?: string | null;
  repo_url?: string | null;
  notes?: string | null;
  creator?: Pick<ProfileRow, "id" | "username" | "avatar_url" | "bio">;
};

export type CreateProjectPayload = Omit<ProjectRow, "id" | "created_at" | "creator">;

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, creator_id, title, slug, description, problem_solved, tech_stack, difficulty, stage, demo_video_url, created_at"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) return null;

  // fetch creator separately to avoid relying on DB foreign-key relationships in nested selects
  try {
    const { getProfileById } = await import("./profile");
    const creator = data.creator_id ? await getProfileById(data.creator_id) : null;
    return { ...data, creator } as ProjectRow;
  } catch (e) {
    return data as ProjectRow;
  }
}

export async function getProjectsByCreatorId(creatorId: string): Promise<ProjectRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, creator_id, title, slug, description, problem_solved, tech_stack, difficulty, stage, demo_video_url, created_at"
    )
    .eq("creator_id", creatorId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProjectRow[];
}

export async function createProject(project: CreateProjectPayload) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select("id, slug")
    .single();

  return { data, error };
}
