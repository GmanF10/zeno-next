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

  // Debounced clear status on input change (keep if you add inputs later)
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
      // Robust error narrowing
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
      <section className="min-h-screen flex flex-col justify-center items-center bg-black/70 p-6">
        <div className="bg-[#121212] border border-red-600 rounded-lg p-8 max-w-md w-full text-center text-red-600 font-mono shadow-lg">
          <h1 className="text-3xl mb-4 font-orbitron">Not Logged In</h1>
          <p className="mb-4">You must be logged in to verify your email.</p>
          <p>Redirecting to login page...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black/70 p-6">
      <div className="bg-[#121212] border border-[#65ec4d] rounded-lg p-8 max-w-md w-full text-center text-[#65ec4d] font-mono shadow-lg">
        <h1 className="text-3xl mb-4 font-orbitron">Verify Your Email</h1>
        <p className="mb-6">
          A verification link has been sent to your email address. Please check your inbox and verify your email to continue using ZENØ.
        </p>
        <button
          onClick={resendVerification}
          disabled={loading || noUser}
          className="bg-[#65ec4d] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#39ff14] transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65ec4d] flex items-center justify-center gap-2"
          aria-disabled={loading || noUser}
          onFocus={clearStatus}
          onBlur={clearStatus}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-black"
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
            className={`mt-4 font-mono ${
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
