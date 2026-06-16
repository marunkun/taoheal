import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?:   "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 " +
    "font-semibold rounded-xl transition-all duration-300 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: [
      "bg-primary text-white",
      "hover:bg-primary-600 hover:shadow-floating",
      "focus:ring-primary-300",
    ].join(" "),
    accent: [
      "bg-accent text-white",
      "hover:bg-accent-600 hover:shadow-lg",
      "focus:ring-accent-300",
    ].join(" "),
    outline: [
      "border-2 border-primary text-primary bg-transparent",
      "hover:bg-primary-50 hover:border-primary-600",
      "focus:ring-primary-300",
    ].join(" "),
    ghost: [
      "text-primary bg-transparent",
      "hover:bg-primary-50",
      "focus:ring-primary-300",
    ].join(" "),
  };

  const sizes = {
    sm:  "px-4 py-2 text-sm",
    md:  "px-8 py-3 text-base",
    lg:  "px-10 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}