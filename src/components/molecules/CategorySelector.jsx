import React from "react";
import CategoryIcon from "@/components/molecules/CategoryIcon";
import { cn } from "@/utils/cn";

const CategorySelector = ({ categories, selectedCategory, onSelect, type = "expense" }) => {
return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
      {categories
        .filter(cat => cat.type === type)
        .map((category) => (
          <button
            key={category.Id}
            onClick={() => onSelect(category.name)}
            className={cn(
              "flex flex-col items-center space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform cyber-card min-h-[80px] sm:min-h-[90px] touch-manipulation",
              selectedCategory === category.name
                ? "border-cyber-neon bg-cyber-neon/10 glow-box shadow-lg shadow-cyber-neon/30"
                : "border-gray-600 hover:border-cyber-cyan bg-gray-800/50 hover:bg-cyber-cyan/10 hover:shadow-md hover:shadow-cyber-cyan/20"
            )}
          >
            <CategoryIcon category={category.name} size="md" />
            <span className={cn(
              "text-[10px] sm:text-xs font-mono font-medium text-center leading-tight transition-colors duration-300 px-1",
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