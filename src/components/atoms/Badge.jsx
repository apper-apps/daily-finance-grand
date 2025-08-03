import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
const variants = {
    default: "bg-gray-800 text-gray-300 border border-gray-600",
    success: "bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 glow-text-small",
    danger: "bg-cyber-red/10 text-cyber-red border border-cyber-red/30 glow-text-small",
    warning: "bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/30 glow-text-small",
    info: "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 glow-text-small"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-all duration-300 hover:scale-105",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;