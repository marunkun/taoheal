import type { ReactNode } from "react";

interface SectionProps {
  children:   ReactNode;
  className?:  string;
  withTexture?: boolean;
}

export function Section({
  children,
  className = "",
  withTexture = false,
}: SectionProps) {
  return (
    <section
      className={`
        max-w-2xl mx-auto px-6
        ${withTexture ? "stone-texture" : ""}
        ${className}
      `}
    >
      {children}
    </section>
  );
}