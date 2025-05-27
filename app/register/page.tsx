"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setStatus("❌ Passwords do not match.");
      return;
    }
    setStatus("⏳ Creating account...");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setStatus("✅ Account created!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: unknown) {
      let msg = "Registration failed.";
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code: unknown }).code === "string"
      ) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/email-already-in-use") msg = "Email already in use.";
        else if (errorCode === "auth/invalid-email") msg = "Invalid email address.";
        else if (errorCode === "auth/weak-password") msg = "Password is too weak (min 6 chars).";
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
        <h2 className="neon-header text-3xl mb-6 tracking-widest">REGISTER</h2>
        <p className="text-accent font-mono mb-4 text-lg tracking-widest neon-glow uppercase">
          Create a new account below
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <label htmlFor="email" className="text-accent font-mono text-sm neon-glow uppercase mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            className="w-full rounded-lg p-3 bg-background-alt text-foreground border-2 border-primary neon-glow focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email address"
          />
          <label htmlFor="password" className="text-accent font-mono text-sm neon-glow uppercase mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-3 bg-background-alt text-foreground border-2 border-primary neon-glow focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Password"
          />
          <label htmlFor="confirmPassword" className="text-accent font-mono text-sm neon-glow uppercase mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className={`w-full rounded-lg p-3 bg-background-alt text-foreground border-2 neon-glow focus:outline-none focus:ring-2 ${
              confirmPassword && !passwordsMatch
                ? "border-red-500 focus:ring-red-500"
                : "border-primary focus:ring-primary"
            }`}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Confirm password"
          />
          <NeonButton
            type="submit"
            className="w-full"
            disabled={loading || !passwordsMatch}
          >
            {loading ? "Creating..." : "Create Account"}
          </NeonButton>
          <div aria-live="polite" className="min-h-[1.5em] font-mono neon-glow text-center text-base">
            {status}
          </div>
          {!passwordsMatch && confirmPassword && (
            <div className="text-red-500 font-mono text-sm neon-glow">Passwords do not match.</div>
          )}
        </form>
        <p className="text-foreground text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline hover:text-primary neon-glow">
            Log In
          </Link>
        </p>
      </NeonCard>
    </section>
  );
}
