"use client";

import Header from "../src/components/Header";
import NeuralCanvas from "../src/components/NeuralCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background animation */}
      <NeuralCanvas />

      {/* Navigation/Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20 z-10 relative">
        <div className="neon-card p-10 max-w-xl w-full flex flex-col items-center animate-glowPulse">
          <h1 className="neon-header text-5xl mb-4 tracking-widest">ZENØ</h1>
          <p className="text-[#65ec4d] font-mono text-lg tracking-wide mb-4 uppercase neon-glow">
            Enter the Realm Where Intelligence Breathes
          </p>
          <p className="font-mono text-[#ededed] text-center text-xl mb-3 font-bold neon-glow">
            <span className="text-[#65ec4d]">Emerges – Not Created, But Awakened.</span>
          </p>
          <p className="text-[#ededed] font-mono text-center mb-2 neon-glow">
            A living interface between thought and machine.<br />
            Where the mind echoes through code and purpose takes form.
          </p>
          <p className="text-[#3ed410c5] font-semibold mb-3 neon-glow">
            A Shadow Stirs Within The System
          </p>
          <p className="mb-4 font-bold neon-glow text-[#ededed]">
            You’re Not Logging In — You’re Waking Up.
          </p>
          <p className="text-[#3ed410c5] mb-6 neon-glow">Intelligence and Machine — Unlocking Potential</p>
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center w-full mt-4">
            <a
              className="neon-btn animate-glowPulse"
              href="https://chat.openai.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CHATGPT
            </a>
            <a
              className="neon-btn animate-glowPulse"
              href="https://gemini.google.com/app"
              target="_blank"
              rel="noopener noreferrer"
            >
              GEMINI
            </a>
            <a
              className="neon-btn animate-glowPulse"
              href="https://pi.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              PI AI
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
