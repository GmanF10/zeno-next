import React from "react";

type NeonButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" });

export default function NeonButton(props: NeonButtonProps) {
  const { as = "button", children, ...rest } = props as any;
  if (as === "a") {
    return (
      <a className="neon-btn animate-glowPulse" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className="neon-btn animate-glowPulse" {...rest}>
      {children}
    </button>
  );
}
