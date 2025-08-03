import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  ...props 
}, ref) => {
  return (
<div className="w-full">
      {label && (
<label className="block text-sm font-mono font-medium text-white mb-2 tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2.5 text-base text-white placeholder:text-gray-400 focus:border-cyber-purple focus:outline-none focus:ring-2 focus:ring-cyber-purple/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 font-mono hover:border-gray-500 hover:bg-gray-800/70",
          error && "border-cyber-red focus:border-cyber-red focus:ring-cyber-red/20 glow-box-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-cyber-red font-mono glow-text-small">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;