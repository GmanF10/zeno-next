"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

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
    setEmail(e.target.value.trim());
    clearStatus();
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearStatus();
  };

  const handleTogglePassword = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      (e as React.KeyboardEvent<HTMLButtonElement>).type === "keydown" &&
      !["Enter", " "].includes((e as React.KeyboardEvent<HTMLButtonElement>).key)
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
    } catch (err: unknown) {
      let msg = "Login failed.";
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code: unknown }).code === "string"
      ) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/user-not-found") msg = "No account found with that email.";
        else if (errorCode === "auth/wrong-password") msg = "Incorrect password.";
        else if (errorCode === "auth/invalid-email") msg = "Invalid email address.";
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
        <h2 className="neon-header text-3xl mb-6 tracking-widest">LOGIN</h2>
        <p className="text-accent font-mono mb-4 text-lg tracking-widest neon-glow uppercase">
          Enter the Realm Where Intelligence Breathes
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full"
          aria-describedby="login-status"
        >
          <div className="w-full">
            <label htmlFor="email" className="text-accent font-mono text-sm mb-2 block neon-glow uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoFocus
              className="w-full rounded-lg p-3 bg-background-alt border-2 border-primary text-foreground neon-glow focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="username"
              aria-label="Email address"
            />
          </div>
          <div className="w-full relative">
            <label htmlFor="password" className="text-accent font-mono text-sm mb-2 block neon-glow uppercase">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg p-3 bg-background-alt border-2 border-primary text-foreground neon-glow focus:outline-none focus:ring-2 focus:ring-primary pr-12"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <NeonButton
              type="button"
              role="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-accent hover:text-primary focus:outline-none"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleTogglePassword}
              onKeyDown={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </NeonButton>
          </div>
          <NeonButton
            type="submit"
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </NeonButton>
          <div
            id="login-status"
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
        <div className="flex flex-col gap-2 mt-6 w-full items-center">
          <p className="text-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-accent underline hover:text-primary neon-glow">
              Create one here
            </Link>
          </p>
          <Link href="/reset" className="text-accent underline hover:text-primary neon-glow text-xs">
            Forgot password?
          </Link>
        </div>
      </NeonCard>
    </section>
  );
}
