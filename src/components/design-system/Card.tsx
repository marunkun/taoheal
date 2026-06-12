import type { ReactNode } from "react";

interface CardProps {
  children:   ReactNode;
  className?:  string;
  hoverable?:  boolean;
  withLeaf?:  boolean;
}

export function Card({
  children,
  className = "",
  hoverable = false,
  withLeaf = false,
}: CardProps) {
  const base = [
    "bg-bg-card rounded-2xl p-8",
    "border border-border",
    "transition-all duration-300",
  ].join(" ");

  const hover = hoverable
    ? "hover:shadow-floating hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${base} ${hover} ${className} relative`}
    >
      {withLeaf && (
        <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-full bg-primary-300" />
      )}
      {children}
    </div>
  );
}