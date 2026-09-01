import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicAnonKey, getPublicSupabaseUrl } from "../env";

export function createServerSupabaseClient(): SupabaseClient {
  return createClient(getPublicSupabaseUrl(), getPublicAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
