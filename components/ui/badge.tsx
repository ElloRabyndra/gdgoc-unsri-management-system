import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary/20 text-secondary-foreground hover:bg-secondary/40",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success/80 text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        red: "border-destructive/30 bg-destructive/10 text-destructive",
        green: "border-success/30 bg-success/10 text-success",
        blue: "border-primary/30 bg-primary/10 text-primary",
        yellow: "border-warning/30 bg-warning/10 text-warning-foreground",
        gray: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
