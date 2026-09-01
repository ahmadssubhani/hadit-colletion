"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function EditProfileForm() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(profile?.full_name || (user?.user_metadata?.full_name as string | undefined) || "");
    setBio(profile?.bio || "");
    setAvatarUrl(profile?.avatar_url || "");
  }, [profile, user]);

  if (loading) return <div className="loading-state">Loading profile…</div>;
  if (!user) return null;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!user || saving) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    const supabase = createBrowserSupabaseClient();
    const { error: metaError } = await supabase.auth.updateUser({
      data: { full_name: fullName.trim() },
    });
    if (metaError) {
      setError(metaError.message);
      setSaving(false);
      return;
    }

    const payload = {
      id: user.id,
      full_name: fullName.trim() || null,
      bio: bio.trim() || null,
      avatar_url: avatarUrl.trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { error: profileError } = await supabase.from("profiles").upsert(payload);
    setSaving(false);
    if (profileError) {
      setError(
        profileError.message.includes("Could not find") || profileError.code === "PGRST205"
          ? "Profile table is not installed yet. Run database/migrations/003_profiles.sql in Supabase, then try again. Your display name was still saved on the account."
          : profileError.message,
      );
      return;
    }
    await refreshProfile();
    setMessage("Profile updated.");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {error ? (
        <div className="form-alert error" role="alert">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="form-alert success" role="status">
          {message}
        </div>
      ) : null}
      <label>
        Full name
        <input name="name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={user.email ?? ""} readOnly />
      </label>
      <label>
        Biography
        <textarea rows={4} value={bio} onChange={(event) => setBio(event.target.value)} />
      </label>
      <label>
        Avatar URL
        <input
          type="url"
          value={avatarUrl}
          onChange={(event) => setAvatarUrl(event.target.value)}
          placeholder="https://"
        />
      </label>
      <button className="primary" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
