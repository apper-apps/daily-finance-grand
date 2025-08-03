import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryIcon = ({ category, size = "md", className }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      // Income categories
      "বেতন": "Banknote",
      "ব্যবসা": "Building2",
      "অন্যান্য আয়": "PlusCircle",
      
      // Expense categories
      "খাবার": "Utensils",
      "যাতায়াত": "Car",
      "কেনাকাটা": "ShoppingBag",
      "বিল": "Receipt",
      "বিনোদন": "Gamepad2",
      "স্বাস্থ্য": "Heart",
      "শিক্ষা": "GraduationCap",
      "অন্যান্য খরচ": "MinusCircle"
    };
    
    return iconMap[categoryName] || "Circle";
  };

  const isExpense = ["খাবার", "যাতায়াত", "কেনাকাটা", "বিল", "বিনোদন", "স্বাস্থ্য", "শিক্ষা", "অন্যান্য খরচ"].includes(category);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        isExpense ? "category-icon-bg-expense" : "category-icon-bg",
        sizes[size],
        className
      )}
    >
<ApperIcon
        name={getCategoryIcon(category)}
        size={iconSizes[size]}
        className={cn(
          isExpense ? "text-cyber-purple" : "text-cyber-neon"
        )}
      />
    </div>
  );
};

export default CategoryIcon;