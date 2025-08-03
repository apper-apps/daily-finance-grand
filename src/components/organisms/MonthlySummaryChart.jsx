import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";

const MonthlySummaryChart = ({ monthlyIncome, monthlyExpense }) => {
  const maxAmount = Math.max(monthlyIncome, monthlyExpense);
  const incomePercentage = maxAmount > 0 ? (monthlyIncome / maxAmount) * 100 : 0;
  const expensePercentage = maxAmount > 0 ? (monthlyExpense / maxAmount) * 100 : 0;
  const savings = monthlyIncome - monthlyExpense;

  return (
<Card className="p-6 cyber-card glow-box">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-mono font-semibold text-cyber-neon glow-text tracking-wide">
          মাসিক সারাংশ
        </h3>
        <ApperIcon name="BarChart3" size={20} className="text-cyber-cyan animate-pulse" />
      </div>

      <div className="space-y-6">
        {/* Income Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-neon rounded-full animate-pulse shadow-lg shadow-cyber-neon/50"></div>
              <span className="text-sm font-mono font-medium text-gray-300">আয়</span>
            </div>
            <span className="text-sm font-mono font-semibold text-cyber-neon glow-text-small">
              {formatCurrency(monthlyIncome)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 border border-gray-600">
            <div
              className="bg-gradient-to-r from-cyber-neon to-cyber-neon/80 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-cyber-neon/30 relative overflow-hidden"
              style={{ width: `${incomePercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Expense Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-cyan rounded-full animate-pulse shadow-lg shadow-cyber-cyan/50"></div>
              <span className="text-sm font-mono font-medium text-gray-300">খরচ</span>
            </div>
            <span className="text-sm font-mono font-semibold text-cyber-cyan glow-text-small">
              {formatCurrency(monthlyExpense)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 border border-gray-600">
            <div
              className="bg-gradient-to-r from-cyber-cyan to-cyber-cyan/80 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-cyber-cyan/30 relative overflow-hidden"
              style={{ width: `${expensePercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Savings Summary */}
        <div className="pt-4 border-t border-gray-600">
          <div className={`text-center p-4 rounded-xl border-2 ${
            savings >= 0 
              ? 'bg-cyber-neon/10 border-cyber-neon/30 glow-box-small' 
              : 'bg-cyber-red/10 border-cyber-red/30'
          }`}>
            <div className="flex items-center justify-center space-x-2 mb-1">
              <ApperIcon 
                name={savings >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={20} 
                className={`${savings >= 0 ? "text-cyber-neon animate-pulse" : "text-cyber-red animate-pulse"} drop-shadow-[0_0_8px_currentColor]`}
              />
              <span className="text-sm font-mono font-medium text-gray-300">
                {savings >= 0 ? "সঞ্চয়" : "ঘাটতি"}
              </span>
            </div>
            <p className={`text-xl font-mono font-bold ${
              savings >= 0 ? 'text-cyber-neon glow-text' : 'text-cyber-red glow-text'
            }`}>
              {formatCurrency(Math.abs(savings))}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlySummaryChart;