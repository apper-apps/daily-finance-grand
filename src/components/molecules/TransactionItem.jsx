import React from "react";
import Card from "@/components/atoms/Card";
import CategoryIcon from "@/components/molecules/CategoryIcon";
import { formatCurrency } from "@/utils/formatCurrency";
import { getRelativeDate, formatTime } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";

const TransactionItem = ({ transaction, onClick }) => {
  const isIncome = transaction.type === "income";
  const date = new Date(transaction.date);

  return (
<Card 
      className={cn(
        "p-4 hover:shadow-float transition-all duration-300 cursor-pointer transform hover:scale-[1.02] cyber-card hover:glow-box group",
        onClick && "active:scale-[0.98]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CategoryIcon category={transaction.category} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono font-medium text-gray-200 truncate group-hover:text-cyber-neon transition-colors duration-300">
              {transaction.category}
            </p>
            {transaction.note && (
              <p className="text-xs text-gray-400 truncate mt-0.5 font-mono">
                {transaction.note}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-0.5 font-mono">
              {getRelativeDate(date)} • {formatTime(date)}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p
            className={cn(
              "text-lg font-mono font-semibold transition-all duration-300",
              isIncome 
                ? "text-cyber-neon glow-text-small group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" 
                : "text-cyber-cyan glow-text-small group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            )}
          >
            {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TransactionItem;