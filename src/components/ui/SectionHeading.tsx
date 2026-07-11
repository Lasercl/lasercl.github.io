import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  kicker?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  children,
  kicker,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-center lg:text-left";
  const kickerAlign = align === "center" ? "justify-center" : "justify-center lg:justify-start";

  return (
    <div className={`${alignClass} ${className}`}>
      {kicker && (
        <p className={`kicker mb-3 flex ${kickerAlign}`}>{kicker}</p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold glow-text-subtle">{children}</h2>
    </div>
  );
}
