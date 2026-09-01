import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseUrl, getServiceRoleKey } from "../env";

/** Service-role client. Use only in local scripts or protected server jobs. */
export function createAdminSupabaseClient(): SupabaseClient {
  return createClient(getPublicSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
