"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

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

  // Clean up debounce timer on unmount
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-4"
          aria-describedby="reset-status"
          autoComplete="email"
        >
          <label htmlFor="email" className="text-[#65ec4d] font-mono text-sm text-left">
            Enter your email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            className="rounded-lg p-3 bg-black/30 text-[#ededed] border-2 border-[#65ec4d] focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="px-8 py-2 bg-[#65ec4d] text-black font-bold rounded-lg shadow hover:bg-[#39ff14] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !email.trim()}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
          <div
            id="reset-status"
            aria-live="polite"
            className={`min-h-[1.5em] font-mono ${
              status.startsWith("❌")
                ? "text-red-500"
                : status.startsWith("✅")
                ? "text-[#65ec4d]"
                : ""
            }`}
          >
            {status}
          </div>
        </form>
        <p className="text-[#ededed] text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-[#65ec4d] underline hover:text-[#39ff14]">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
