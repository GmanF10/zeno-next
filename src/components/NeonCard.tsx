import * as React from 'react';

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const NeonCard = React.memo(
  React.forwardRef<HTMLDivElement, NeonCardProps>(
    ({ children, className = '', ...rest }, ref) => (
      <div
        ref={ref}
        className={`neon-card p-10 max-w-xl w-full flex flex-col items-center animate-glowPulse ${className}`}
        {...rest}
      >
        {children}
      </div>
    )
  )
);

export default NeonCard;
