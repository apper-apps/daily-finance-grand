import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/utils/cn";

const BalanceCard = ({ balance, todayIncome, todayExpense, className }) => {
  const isPositive = balance >= 0;

return (
    <Card className={cn("overflow-hidden cyber-card glow-box", className)}>
      <div
        className={cn(
          "p-6 text-white relative",
          isPositive ? "cyber-balance-gradient" : "cyber-balance-gradient-expense"
        )}
      >
        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
<p className="text-white text-sm font-mono font-medium tracking-wide">বর্তমান ব্যালেন্স</p>
            <p className="text-3xl font-mono font-bold mt-1 text-white glow-text-small">
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-3 glow-box-small">
            <ApperIcon name="Wallet" size={24} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3 border border-white/20 hover:border-cyber-neon/50 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-1">
              <ApperIcon name="TrendingUp" size={16} className="text-cyber-neon animate-pulse" />
              <p className="text-white text-xs font-mono">আজকের আয়</p>
            </div>
            <p className="text-lg font-mono font-semibold text-white">
              {formatCurrency(todayIncome)}
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-3 border border-white/20 hover:border-cyber-purple/50 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-1">
              <ApperIcon name="TrendingDown" size={16} className="text-cyber-purple animate-pulse" />
              <p className="text-white text-xs font-mono">আজকের খরচ</p>
            </div>
            <p className="text-lg font-mono font-semibold text-white">
              {formatCurrency(todayExpense)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;