import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/utils/cn";

const BalanceCard = ({ balance, todayIncome, todayExpense, className }) => {
  const isPositive = balance >= 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "p-6 text-white",
          isPositive ? "balance-gradient" : "balance-gradient-expense"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">বর্তমান ব্যালেন্স</p>
            <p className="text-3xl font-display font-bold mt-1">
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <ApperIcon name="Wallet" size={24} className="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <ApperIcon name="TrendingUp" size={16} className="text-white/80" />
              <p className="text-white/80 text-xs">আজকের আয়</p>
            </div>
            <p className="text-lg font-display font-semibold">
              {formatCurrency(todayIncome)}
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <ApperIcon name="TrendingDown" size={16} className="text-white/80" />
              <p className="text-white/80 text-xs">আজকের খরচ</p>
            </div>
            <p className="text-lg font-display font-semibold">
              {formatCurrency(todayExpense)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;