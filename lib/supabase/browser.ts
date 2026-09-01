import { createBrowserClient } from "@supabase/ssr";
import { getPublicAnonKey, getPublicSupabaseUrl } from "../env";

export function createBrowserSupabaseClient() {
  return createBrowserClient(getPublicSupabaseUrl(), getPublicAnonKey());
}
