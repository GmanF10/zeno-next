"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      setNoUser(true);
      const timeout = setTimeout(() => router.push("/login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [router]);

  const clearStatus = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setMessage(""), 600);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Auto-refresh user verification status
  useEffect(() => {
    if (!auth.currentUser) return;
    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        router.push("/dashboard");
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [router]);

  const resendVerification = async () => {
    setMessage("");
    setLoading(true);
    if (!auth.currentUser) {
      setMessage("No user is currently logged in.");
      setLoading(false);
      return;
    }
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("✅ Verification email resent. Please check your inbox.");
    } catch (err: unknown) {
      let msg = "❌ Error resending verification email.";
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        msg += " " + (err as { message: string }).message;
      }
      setMessage(msg);
    }
    setLoading(false);
  };

  if (noUser) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-black p-6">
        <div className="neon-card p-10 max-w-md w-full text-center animate-glowPulse">
          <h1 className="neon-header text-3xl mb-4">Not Logged In</h1>
          <p className="mb-4 neon-glow">You must be logged in to verify your email.</p>
          <p className="neon-glow">Redirecting to login page...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black p-6">
      <div className="neon-card p-10 max-w-md w-full text-center animate-glowPulse">
        <h1 className="neon-header text-3xl mb-4">Verify Your Email</h1>
        <p className="mb-6 neon-glow">
          A verification link has been sent to your email address.<br />
          Please check your inbox and verify your email to continue using ZENØ.
        </p>
        <button
          onClick={resendVerification}
          disabled={loading || noUser}
          className="neon-btn flex items-center justify-center w-full"
          aria-disabled={loading || noUser}
          onFocus={clearStatus}
          onBlur={clearStatus}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-[#0a0c10] mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
          )}
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>
        {message && (
          <p
            aria-live="polite"
            className={`mt-4 font-mono neon-glow text-base ${
              message.startsWith("❌") ? "text-red-500" : "text-[#65ec4d]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
