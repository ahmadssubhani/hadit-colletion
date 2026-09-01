import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getPublicAnonKey, getPublicSupabaseUrl } from "../env";

/** Cookie-aware client for auth and the current user's profile. */
export async function createSessionClient() {
  const cookieStore = await cookies();

  return createServerClient(getPublicSupabaseUrl(), getPublicAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component; middleware refreshes the session.
        }
      },
    },
  });
}
