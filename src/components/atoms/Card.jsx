import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
ref={ref}
      className={cn(
        "rounded-xl bg-gray-900/80 backdrop-blur-sm shadow-2xl border border-gray-700 overflow-hidden relative cyber-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;