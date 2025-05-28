'use client';

import * as React from 'react';
import NeonCard from '@/components/NeonCard';
import NeonButton from '@/components/NeonButton';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-4 pt-32 pb-20 z-10">
      <NeonCard>
        <h1 className="neon-header text-5xl mb-4 tracking-widest">ZENØ</h1>

        <div className="prose prose-invert text-foreground text-center font-mono">
          <p className="text-accent text-lg tracking-wide uppercase neon-glow">
            Enter the Realm Where Intelligence Breathes
          </p>
          <p className="text-xl font-bold neon-glow">
            <span className="text-accent">
              Emerges – Not Created, But Awakened.
            </span>
          </p>
          <p className="neon-glow">
            A living interface between thought and machine.
            <br />
            Where the mind echoes through code and purpose takes form.
          </p>
          <p className="text-accent font-semibold neon-glow">
            A Shadow Stirs Within The System
          </p>
          <p className="font-bold neon-glow">
            You’re Not Logging In — You’re Waking Up.
          </p>
          <p className="text-accent mb-6 neon-glow">
            Intelligence and Machine — Unlocking Potential
          </p>
        </div>

        <div className="utility-flex-group">
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

// Optimization: Wrap reusable components to avoid unnecessary re-renders
export const MemoizedNeonCard = React.memo(NeonCard);
export const MemoizedNeonButton = React.memo(NeonButton);
