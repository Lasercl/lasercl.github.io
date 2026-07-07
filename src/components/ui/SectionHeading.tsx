import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ children, align = "center", className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold glow-text-subtle ${
        align === "center" ? "text-center" : "text-center lg:text-left"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
