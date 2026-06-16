import type { ReactNode } from "react";

interface BadgeProps {
  children:  ReactNode;
  variant?:  "trust" | "gold" | "accent";
}

export function Badge({ children, variant = "trust" }: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium";

  const variants = {
    trust:  "bg-primary-50 text-primary-700 border border-primary-200",
    gold:   "bg-gold-100 text-gold-800 border border-gold-200",
    accent: "bg-accent-50 text-accent-700 border border-accent-200",
  };

  return (
    <span className={`${base} ${variants[variant]}`}>
      {children}
    </span>
  );
}
