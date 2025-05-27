"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced clear status on input change
  const clearStatus = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setStatus(""), 600);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearStatus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("⏳ Sending reset email...");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setStatus(
        `✅ If an account with "${email.trim()}" exists, a password reset email has been sent.`
      );
    } catch (err: unknown) {
      let msg = "Failed to send reset email.";
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code: unknown }).code === "string"
      ) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/invalid-email") msg = "Invalid email address.";
      }
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        msg = (err as { message: string }).message;
      }
      setStatus(`❌ ${msg}`);
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background">
      <NeonCard>
        <h2 className="neon-header text-3xl mb-6 tracking-widest">RESET PASSWORD</h2>
        <p className="text-accent font-mono mb-4 text-lg tracking-widest neon-glow uppercase">
          Enter your email to reset your password
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full"
          aria-describedby="reset-status"
          autoComplete="email"
        >
          <label htmlFor="email" className="text-accent font-mono text-sm neon-glow uppercase mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            className="w-full rounded-lg p-3 bg-background-alt text-foreground border-2 border-primary neon-glow focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
            aria-label="Email address"
          />
          <NeonButton
            type="submit"
            className="w-full"
            disabled={loading || !email.trim()}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </NeonButton>
          <div
            id="reset-status"
            aria-live="polite"
            className={`min-h-[1.5em] font-mono neon-glow text-center text-base ${
              status.startsWith("❌")
                ? "text-red-500"
                : status.startsWith("✅")
                ? "text-accent"
                : "text-foreground"
            }`}
          >
            {status}
          </div>
        </form>
        <p className="text-foreground text-sm mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-accent underline hover:text-primary neon-glow">
            Log In
          </Link>
        </p>
      </NeonCard>
    </section>
  );
}
