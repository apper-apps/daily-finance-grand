import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FloatingActionButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white rounded-full fab-shadow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center z-50",
        className
      )}
    >
      <ApperIcon name="Plus" size={24} />
    </button>
  );
};

export default FloatingActionButton;