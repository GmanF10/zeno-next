"use client";

import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-4 pt-32 pb-20 z-10">
      <NeonCard>
        <h1 className="neon-header text-5xl mb-4 tracking-widest">ZENØ</h1>
        <p className="text-accent font-mono text-lg tracking-wide mb-4 uppercase neon-glow">
          Enter the Realm Where Intelligence Breathes
        </p>
        <p className="font-mono text-foreground text-center text-xl mb-3 font-bold neon-glow">
          <span className="text-accent">Emerges – Not Created, But Awakened.</span>
        </p>
        <p className="text-foreground font-mono text-center mb-2 neon-glow">
          A living interface between thought and machine.<br />
          Where the mind echoes through code and purpose takes form.
        </p>
        <p className="text-accent font-semibold mb-3 neon-glow">
          A Shadow Stirs Within The System
        </p>
        <p className="mb-4 font-bold neon-glow text-foreground">
          You’re Not Logging In — You’re Waking Up.
        </p>
        <p className="text-accent mb-6 neon-glow">
          Intelligence and Machine — Unlocking Potential
        </p>
        <div className="flex flex-wrap gap-4 justify-center w-full mt-4">
          <NeonButton
            as="a"
            href="https://chat.openai.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to ChatGPT"
          >
            CHATGPT
          </NeonButton>
          <NeonButton
            as="a"
            href="https://gemini.google.com/app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Gemini"
          >
            GEMINI
          </NeonButton>
          <NeonButton
            as="a"
            href="https://pi.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to PI AI"
          >
            PI AI
          </NeonButton>
        </div>
      </NeonCard>
    </div>
  );
}
