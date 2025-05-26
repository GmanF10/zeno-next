"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

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

  // Trim email on change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
    clearStatus();
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearStatus();
  };

  // Password toggle: accessible and keyboard-friendly
  const handleTogglePassword = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      (e as React.KeyboardEvent).type === "keydown" &&
      !["Enter", " "].includes((e as React.KeyboardEvent).key)
    ) {
      return;
    }
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("⏳ Logging in...");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setStatus("✅ Login successful!");
      setTimeout(() => {
        setStatus("");
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      let msg = "Login failed.";
      if (err.code === "auth/user-not-found") msg = "No account found with that email.";
      else if (err.code === "auth/wrong-password") msg = "Incorrect password.";
      else if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (err.message) msg = err.message;
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
          aria-describedby="login-status"
        >
          <div className="text-left">
            <label htmlFor="email" className="text-[#65ec4d] font-mono text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoFocus
              className="w-full rounded-lg p-3 bg-black/30 text-[#ededed] border-2 border-[#65ec4d] focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="username"
              aria-label="Email address"
            />
          </div>
          <div className="text-left relative">
            <label htmlFor="password" className="text-[#65ec4d] font-mono text-sm">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg p-3 bg-black/30 text-[#ededed] border-2 border-[#65ec4d] focus:outline-none focus:ring-2 focus:ring-[#39ff14] pr-12"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <button
              type="button"
              role="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#65ec4d] hover:text-[#39ff14] focus:outline-none"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleTogglePassword}
              onKeyDown={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-[#65ec4d] text-black font-bold rounded-lg shadow hover:bg-[#39ff14] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div
            id="login-status"
            aria-live="polite"
            className={`min-h-[1.5em] font-mono ${
              status.startsWith("❌")
                ? "text-red-500"
                : status.startsWith("✅")
                ? "text-[#65ec4d]"
                : status
                ? "text-[#65ec4d]"
                : ""
            }`}
          >
            {status}
          </div>
        </form>
        <div className="flex flex-col gap-2">
          <p className="text-[#ededed] text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#65ec4d] underline hover:text-[#39ff14]">
              Create one here
            </Link>
          </p>
          <Link href="/reset" className="text-[#65ec4d] underline hover:text-[#39ff14] text-xs">
            Forgot password?
          </Link>
        </div>
      </div>
    </section>
  );
}
