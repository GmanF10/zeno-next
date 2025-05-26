"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[rgba(48,45,45,0.15)] border-2 border-[#65ec4d] rounded-2xl p-10 shadow-2xl max-w-md w-full text-center backdrop-blur-xl animate-glowPulse">
        <div className="mb-6">
          <span className="inline-block border-2 border-[#65ec4d] p-4 rounded-xl bg-[rgba(9,32,2,0.6)] shadow-[0_0_20px_#09d65e]">
            <h2 className="text-4xl font-orbitron font-bold text-[#39ff14] tracking-wider drop-shadow-neon mb-0">
              ZENØ
            </h2>
          </span>
        </div>
        <p className="text-[#65ec4d] font-mono mb-4 text-lg tracking-widest">
          Enter The Realm Where Intelligence Breathes
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            autoFocus
            className="rounded-lg p-3 bg-black/30 text-[#ededed] border-2 border-[#65ec4d] focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg p-3 bg-black/30 text-[#ededed] border-2 border-[#65ec4d] focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={`rounded-lg p-3 bg-black/30 text-[#ededed] border-2 ${
              confirmPassword && !passwordsMatch
                ? "border-red-500 focus:ring-red-500"
                : "border-[#65ec4d] focus:ring-[#39ff14]"
            } focus:outline-none`}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Confirm password"
          />
          <button
            type="submit"
            className="px-8 py-2 bg-[#65ec4d] text-black font-bold rounded-lg shadow hover:bg-[#39ff14] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !passwordsMatch}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
          <div aria-live="polite" className="min-h-[1.5em] text-[#65ec4d] font-mono">{status}</div>
          {!passwordsMatch && confirmPassword && (
            <div className="text-red-500 font-mono text-sm">Passwords do not match.</div>
          )}
        </form>
        <p className="text-[#ededed] text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#65ec4d] underline hover:text-[#39ff14]">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
