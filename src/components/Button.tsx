import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'solid' | 'primary' | 'outline' | 'gold' | 'ghostLight';

export interface ButtonProps {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  solid: "bg-espresso text-pearl hover:bg-espresso/85",
  primary: "bg-espresso text-pearl hover:bg-gold hover:text-espresso shadow-soft",
  outline: "border border-espresso/25 text-espresso hover:border-gold hover:text-gold",
  gold: "bg-gold text-espresso font-bold hover:bg-gold-soft",
  ghostLight: "border border-pearl/40 text-pearl hover:bg-pearl hover:text-espresso",
};

const baseStyles = "inline-flex items-center justify-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-all duration-300 rounded-full cursor-pointer";

export function Button({
  to,
  href,
  variant = 'solid',
  size = 'md',
  className,
  children,
  onClick,
  target,
  rel,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const sizeStyles = size === 'sm' ? 'px-4 py-2 text-[0.65rem]' : 'px-6 py-2.5';
  const combinedClasses = cn(
    baseStyles,
    sizeStyles,
    variants[variant],
    disabled && "opacity-60 cursor-not-allowed pointer-events-none",
    className
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
