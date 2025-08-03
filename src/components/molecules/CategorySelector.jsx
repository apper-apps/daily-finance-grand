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
              "flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105",
              selectedCategory === category.name
                ? "border-accent-500 bg-accent-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <CategoryIcon category={category.name} size="md" />
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
    </div>
  );
};

export default CategorySelector;