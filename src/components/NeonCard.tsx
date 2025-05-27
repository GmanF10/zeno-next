import React from "react";

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

const NeonCard: React.FC<NeonCardProps> = ({ children, className = "" }) => (
  <div className={`neon-card p-10 max-w-xl w-full flex flex-col items-center animate-glowPulse ${className}`}>
    {children}
  </div>
);

export default NeonCard;
