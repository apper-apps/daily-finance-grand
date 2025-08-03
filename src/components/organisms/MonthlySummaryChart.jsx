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
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          মাসিক সারাংশ
        </h3>
        <ApperIcon name="BarChart3" size={20} className="text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* Income Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">আয়</span>
            </div>
            <span className="text-sm font-display font-semibold text-primary-600">
              {formatCurrency(monthlyIncome)}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${incomePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Expense Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">খরচ</span>
            </div>
            <span className="text-sm font-display font-semibold text-secondary-600">
              {formatCurrency(monthlyExpense)}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${expensePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Savings Summary */}
        <div className="pt-4 border-t border-gray-100">
          <div className={`text-center p-4 rounded-xl ${savings >= 0 ? 'bg-primary-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-center space-x-2 mb-1">
              <ApperIcon 
                name={savings >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={20} 
                className={savings >= 0 ? "text-primary-600" : "text-red-600"}
              />
              <span className="text-sm font-medium text-gray-700">
                {savings >= 0 ? "সঞ্চয়" : "ঘাটতি"}
              </span>
            </div>
            <p className={`text-xl font-display font-bold ${savings >= 0 ? 'text-primary-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(savings))}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlySummaryChart;