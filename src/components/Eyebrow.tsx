import React from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps {
  children?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, text, className }: EyebrowProps) {
  return <p className={cn("eyebrow inline-block", className)}>{children || text}</p>;
}
