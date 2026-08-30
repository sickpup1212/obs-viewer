import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-2xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-muted shadow-hairline",
        live: "bg-live/15 text-live",
        ready: "bg-ready/15 text-ready",
        warn: "bg-warn/15 text-warn",
        accent: "bg-accent/15 text-accent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
