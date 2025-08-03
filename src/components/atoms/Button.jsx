import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
const variants = {
    primary: "bg-gradient-to-r from-cyber-neon to-cyber-neon/80 hover:from-cyber-neon/90 hover:to-cyber-neon text-black font-bold glow-box hover:glow-box-strong shadow-lg shadow-cyber-neon/30",
    secondary: "bg-gray-800/50 hover:bg-gray-800/70 text-gray-200 border border-gray-600 hover:border-gray-500 font-mono shadow-lg backdrop-blur-sm",
    success: "bg-gradient-to-r from-cyber-neon to-cyber-neon/80 hover:from-cyber-neon/90 hover:to-cyber-neon text-black font-bold glow-box shadow-lg shadow-cyber-neon/30",
    danger: "bg-gradient-to-r from-cyber-red to-cyber-red/80 hover:from-cyber-red/90 hover:to-cyber-red text-white font-bold glow-box shadow-lg shadow-cyber-red/30",
    outline: "border-2 border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 glow-text hover:glow-box-small font-mono backdrop-blur-sm",
    ghost: "text-gray-400 hover:text-cyber-neon hover:bg-cyber-neon/5 font-mono transition-all duration-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-mono transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyber-neon/50 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;