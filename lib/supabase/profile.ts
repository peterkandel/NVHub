import { createClient } from "@/lib/supabase/server";

export type ProfileRow = {
  id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export async function getProfileByUsername(username: string): Promise<ProfileRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, bio, avatar_url, created_at")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? null;
}

export async function getProfileById(id: string): Promise<ProfileRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, bio, avatar_url, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? null;
}

export async function createProfileForUser(userId: string, email: string) {
  const supabase = await createClient();
  const baseUsername = email.split("@")[0] ?? `user-${userId.slice(0, 8)}`;
  const username = await generateUniqueUsername(supabase, baseUsername, userId);

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      username,
      bio: "",
      avatar_url: null,
    })
    .select("id, username, bio, avatar_url, created_at")
    .single();

  if (error) {
    return { error };
  }

  return { data };
}

function normalizeUsername(candidate: string, fallback: string) {
  let username = candidate
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/^\d+/, "")
    .slice(0, 18);

  if (!username) {
    username = fallback;
  }

  return username;
}

async function generateUniqueUsername(supabase: any, baseUsername: string, userId: string) {
  const fallback = `user${userId.slice(0, 8)}`;
  let username = normalizeUsername(baseUsername, fallback);

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data?.length) {
      return username;
    }

    username = `${normalizeUsername(baseUsername, fallback)}${Math.floor(100 + Math.random() * 900)}`;
  }

  return `${fallback}${Math.floor(100 + Math.random() * 900)}`;
}
