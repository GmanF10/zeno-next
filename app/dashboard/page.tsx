"use client";

import { useEffect, useState, useCallback } from "react";
import { auth } from "@/firebase";
import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Auth state check with retry logic
  const checkAuth = useCallback(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = auth.onAuthStateChanged(
      (usr) => {
        if (!usr) {
          router.push("/login");
          return;
        }
        if (!usr.emailVerified) {
          router.push("/verify-email");
          return;
        }
        setUser(usr);
        setDisplayName(usr.displayName || "");
        setLoading(false);
      },
      (err) => {
        setError("Error checking auth state. Please try again.");
        setLoading(false);
        console.error("Auth listener error:", err);
      }
    );

    // Timeout after 10 seconds if no auth event fires
    const timeout = setTimeout(() => {
      setError("Auth check timed out. Please retry.");
      setLoading(false);
      unsubscribe();
    }, 10000);

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const cleanup = checkAuth();
    return cleanup;
  }, [checkAuth]);

  // Save profile displayName
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveStatus("");
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      setSaveStatus("✅ Profile updated successfully.");
      setUser({ ...user, displayName: displayName.trim() } as User);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSaveStatus(`❌ Failed to update profile: ${err.message}`);
      } else {
        setSaveStatus(`❌ Failed to update profile: ${String(err)}`);
      }
    }
    setSaving(false);
  };

  if (loading)
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-background text-accent font-mono">
        <svg
          className="animate-spin h-12 w-12 mb-4 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="neon-glow text-lg">Loading dashboard...</p>
      </section>
    );

  if (error)
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-background text-red-600 font-mono p-6">
        <p className="mb-4 neon-glow">{error}</p>
        <NeonButton onClick={checkAuth} aria-label="Retry authentication">
          Retry
        </NeonButton>
      </section>
    );

  return (
    <section className="flex items-center justify-center min-h-screen bg-background">
      <NeonCard>
        <h1 className="neon-header text-4xl mb-6">Your Dashboard</h1>
        <p className="mb-4 neon-glow">
          <span className="font-bold">Logged in as:</span>{" "}
          <span className="text-accent">{user?.email}</span>
        </p>
        <div className="mb-6 w-full">
          <label htmlFor="displayName" className="block mb-2 font-mono neon-glow text-accent">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
            className="w-full rounded-lg p-3 bg-background-alt border-2 border-primary text-foreground focus:outline-none focus:ring-2 focus:ring-primary neon-glow"
            placeholder="Enter your display name"
            aria-label="Display name"
          />
        </div>
        <NeonButton
          onClick={handleSave}
          disabled={saving || displayName.trim() === (user?.displayName || "").trim()}
          className="w-full"
          aria-label="Save profile"
        >
          {saving ? "Saving..." : "Save Profile"}
        </NeonButton>
        {saveStatus && (
          <p
            aria-live="polite"
            className={`mt-4 font-mono text-lg neon-glow ${
              saveStatus.startsWith("❌") ? "text-red-500" : "text-accent"
            }`}
          >
            {saveStatus}
          </p>
        )}
      </NeonCard>
    </section>
  );
}
