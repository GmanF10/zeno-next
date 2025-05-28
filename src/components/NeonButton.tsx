'use client';

import * as React from 'react';

type ButtonProps = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NeonButtonProps = ButtonProps | AnchorProps;

const NeonButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NeonButtonProps
>((props, ref) => {
  const { as = 'button', className = '', children, ...rest } = props;

  const sharedClass = `neon-btn animate-glowPulse ${className}`;

  if (as === 'a') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={sharedClass}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={sharedClass}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

NeonButton.displayName = 'NeonButton';

export default React.memo(NeonButton);
