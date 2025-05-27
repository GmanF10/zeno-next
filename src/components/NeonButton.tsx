import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};

type NeonButtonProps = ButtonProps | AnchorProps;

export default function NeonButton(props: NeonButtonProps) {
  if (props.as === "a") {
    // Anchor (link) button
    const { as, children, ...anchorProps } = props;
    return (
      <a className="neon-btn animate-glowPulse" {...anchorProps}>
        {children}
      </a>
    );
  }
  // Default: regular button
  const { as, children, ...buttonProps } = props;
  return (
    <button className="neon-btn animate-glowPulse" {...buttonProps}>
      {children}
    </button>
  );
}
