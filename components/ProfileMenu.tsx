"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

function initials(name: string | null | undefined, email: string | null | undefined): string {
  const source = (name || email || "U").trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export function ProfileMenu() {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const name = profile?.full_name || (user?.user_metadata?.full_name as string | undefined) || user?.email || "Account";

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="profile-container" ref={root}>
      <button
        className="avatar-btn"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((value) => !value)}
      >
        {profile?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar_url} alt="" />
        ) : (
          <span>{initials(profile?.full_name || (user.user_metadata?.full_name as string), user.email)}</span>
        )}
      </button>
      {open ? (
        <div className="profile-dropdown" role="menu">
          <div className="dropdown-ident">
            <strong>{name}</strong>
            <span>{user.email}</span>
          </div>
          <Link href="/profile" role="menuitem" onClick={() => setOpen(false)}>
            My Profile
          </Link>
          <Link href="/profile#saved" role="menuitem" onClick={() => setOpen(false)}>
            Saved Hadiths
          </Link>
          <Link href="/profile/edit" role="menuitem" onClick={() => setOpen(false)}>
            Account Settings
          </Link>
          <button
            className="dropdown-item signout"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
