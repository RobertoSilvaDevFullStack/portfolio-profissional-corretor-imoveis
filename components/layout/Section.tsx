import { cn } from "@/lib/utils";
import React from "react";

type SectionVariant = "default" | "alternate" | "dark";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  container?: boolean;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-background",
  alternate: "bg-slate-50",
  dark: "bg-primary text-white",
};

export function Section({
  children,
  className,
  variant = "default",
  container = true,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", variantClasses[variant], className)}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
