import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/formatCurrency";

const QuickStats = ({ monthlyIncome, monthlyExpense, transactionCount }) => {
  const savings = monthlyIncome - monthlyExpense;

  const stats = [
    {
      title: "মাসিক আয়",
      value: formatCurrency(monthlyIncome),
      icon: "TrendingUp",
      color: "text-primary-600",
      bgColor: "bg-primary-50"
    },
    {
      title: "মাসিক খরচ",
      value: formatCurrency(monthlyExpense),
      icon: "TrendingDown",
      color: "text-secondary-600",
      bgColor: "bg-secondary-50"
    },
    {
      title: "সঞ্চয়",
      value: formatCurrency(savings),
      icon: savings >= 0 ? "PiggyBank" : "AlertTriangle",
      color: savings >= 0 ? "text-primary-600" : "text-red-600",
      bgColor: savings >= 0 ? "bg-primary-50" : "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 text-center">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${stat.bgColor} mb-2`}>
            <ApperIcon name={stat.icon} size={20} className={stat.color} />
          </div>
          <p className="text-xs text-gray-600 mb-1">{stat.title}</p>
          <p className={`text-sm font-display font-semibold ${stat.color}`}>
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;