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
bgColor: "bg-cyber-neon/10"
    },
    {
      title: "মাসিক খরচ",
      value: formatCurrency(monthlyExpense),
      icon: "TrendingDown",
      color: "text-cyber-purple",
      bgColor: "bg-cyber-purple/10"
    },
    {
      title: "সঞ্চয়",
      value: formatCurrency(savings),
      icon: savings >= 0 ? "PiggyBank" : "AlertTriangle",
      color: savings >= 0 ? "text-cyber-neon" : "text-red-600",
      bgColor: savings >= 0 ? "bg-cyber-neon/10" : "bg-red-500/10"
    }
  ];

  return (
<div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 text-center cyber-card hover:glow-box transition-all duration-300 group">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${stat.bgColor} mb-2 glow-box-small group-hover:scale-110 transition-transform duration-300`}>
            <ApperIcon name={stat.icon} size={20} className={`${stat.color} drop-shadow-[0_0_6px_currentColor]`} />
          </div>
          <p className="text-xs text-white mb-1 font-mono tracking-wide">{stat.title}</p>
          <p className={`text-sm font-mono font-semibold text-white`}>
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;