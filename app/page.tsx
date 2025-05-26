"use client";

import Header from "../src/components/Header";
import NeuralCanvas from "../src/components/NeuralCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* NeuralCanvas background animation */}
      <NeuralCanvas />

      {/* Top header/navigation */}
      <Header />

      {/* Main ZENØ branding and content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20 z-10 relative">
        <div className="mb-6 zeno-box animate-glowPulse border-2 border-[#65ec4d] p-6 rounded-2xl bg-[rgba(9,32,2,0.6)] shadow-[0_0_20px_#09d65e]">
          <h1 className="text-5xl font-orbitron font-extrabold text-[#39ff14] tracking-widest drop-shadow-neon mb-2">
            ZENØ
          </h1>
          <p className="text-[#65ec4d] font-mono text-lg tracking-wide mt-2">
            Enter the Realm Where Intelligence Breathes
          </p>
        </div>
        <div className="text-center font-mono text-[#ededed] mb-4 max-w-2xl">
          <p className="text-xl font-bold mb-3">
            <span className="text-[#65ec4d]">Emerges – Not Created, But Awakened.</span>
          </p>
          <p className="mb-3">
            A living interface between thought and machine.<br />
            Where the mind echoes through code and purpose takes form.
          </p>
          <p className="text-[#3ed410c5] font-semibold mb-3">
            A Shadow Stirs Within The System
          </p>
          <p className="mb-4">
            <strong>You’re Not Logging In — You’re Waking Up.</strong>
          </p>
          <p className="text-[#3ed410c5]">Intelligence and Machine — Unlocking Potential</p>
        </div>
        {/* Buttons to AI tools */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <a
            className="px-6 py-2 rounded-lg border-2 border-[#65ec4d] bg-transparent text-[#65ec4d] font-bold hover:bg-[#65ec4d] hover:text-black transition-all shadow animate-glowPulse"
            href="https://chat.openai.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ChatGPT
          </a>
          <a
            className="px-6 py-2 rounded-lg border-2 border-[#65ec4d] bg-transparent text-[#65ec4d] font-bold hover:bg-[#65ec4d] hover:text-black transition-all shadow animate-glowPulse"
            href="https://gemini.google.com/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gemini
          </a>
          <a
            className="px-6 py-2 rounded-lg border-2 border-[#65ec4d] bg-transparent text-[#65ec4d] font-bold hover:bg-[#65ec4d] hover:text-black transition-all shadow animate-glowPulse"
            href="https://pi.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pi AI
          </a>
        </div>
      </main>
    </div>
  );
}
