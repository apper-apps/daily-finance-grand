import React from "react";
import CategoryIcon from "@/components/molecules/CategoryIcon";
import { cn } from "@/utils/cn";

const CategorySelector = ({ categories, selectedCategory, onSelect, type = "expense" }) => {
  return (
<div className="grid grid-cols-4 gap-3">
      {categories
        .filter(cat => cat.type === type)
        .map((category) => (
          <button
            key={category.Id}
            onClick={() => onSelect(category.name)}
            className={cn(
              "flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform cyber-card",
              selectedCategory === category.name
                ? "border-cyber-neon bg-cyber-neon/10 glow-box shadow-lg shadow-cyber-neon/30"
                : "border-gray-600 hover:border-cyber-cyan bg-gray-800/50 hover:bg-cyber-cyan/10 hover:shadow-md hover:shadow-cyber-cyan/20"
            )}
          >
            <CategoryIcon category={category.name} size="md" />
            <span className={cn(
              "text-xs font-mono font-medium text-center leading-tight transition-colors duration-300",
              selectedCategory === category.name
                ? "text-cyber-neon glow-text-small"
                : "text-gray-300 group-hover:text-cyber-cyan"
            )}>
              {category.name}
            </span>
          </button>
        ))}
    </div>
  );
};

export default CategorySelector;