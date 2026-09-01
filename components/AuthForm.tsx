"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const { signIn, signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError(null);
    setMessage(null);

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (mode === "signup") {
      if (!fullName.trim()) {
        setError("Full name is required.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirm) {
        setError("Password confirmation does not match.");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const result = await signIn(email.trim(), password);
        if (result.error) {
          setError(result.error);
        } else {
          router.push(next);
          router.refresh();
        }
      } else {
        const result = await signUp({ fullName: fullName.trim(), email: email.trim(), password });
        if (result.error) {
          setError(result.error);
        } else if (result.needsConfirmation) {
          setMessage("Account created. Check your email to confirm, then sign in.");
        } else {
          router.push(next);
          router.refresh();
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email first, then choose Forgot password.");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createBrowserSupabaseClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/profile/edit`,
    });
    setLoading(false);
    if (resetError) setError(resetError.message);
    else setMessage("If that email is registered, a reset link has been sent.");
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
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

      {mode === "signup" ? (
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </label>
      ) : null}

      <label>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Password
        <span className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={mode === "signup" ? 8 : undefined}
            required
          />
          <button type="button" className="ghost" onClick={() => setShowPassword((value) => !value)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
      </label>

      {mode === "signup" ? (
        <label>
          Confirm password
          <input
            type={showPassword ? "text" : "password"}
            name="confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            required
          />
        </label>
      ) : (
        <div className="auth-row">
          <label className="inline">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Remember me
          </label>
          <button type="button" className="text-link" onClick={() => void onForgotPassword()}>
            Forgot password?
          </button>
        </div>
      )}

      <button className="primary auth-submit" type="submit" disabled={loading}>
        {loading ? (mode === "signin" ? "Signing in…" : "Creating account…") : mode === "signin" ? "Sign In" : "Create Account"}
      </button>

      <p className="auth-switch">
        {mode === "signin" ? (
          <>
            Don’t have an account? <Link href="/signup">Create one</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/signin">Sign In</Link>
          </>
        )}
      </p>
    </form>
  );
}
