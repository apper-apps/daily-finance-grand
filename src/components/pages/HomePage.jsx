import React, { useState, useEffect } from "react";
import BalanceCard from "@/components/molecules/BalanceCard";
import QuickStats from "@/components/molecules/QuickStats";
import TransactionItem from "@/components/molecules/TransactionItem";
import MonthlySummaryChart from "@/components/organisms/MonthlySummaryChart";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import TransactionModal from "@/components/organisms/TransactionModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { transactionService } from "@/services/api/transactionService";
import { categoryService } from "@/services/api/categoryService";
import { getDayRange, getMonthRange } from "@/utils/dateUtils";
import { toast } from "react-toastify";

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [transactionsData, categoriesData] = await Promise.all([
        transactionService.getAll(),
        categoryService.getAll()
      ]);
      
      setTransactions(transactionsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

const handleAddTransaction = async (transactionData, keepOpen = false, resetForm = null) => {
    try {
      const newTransaction = await transactionService.create(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      
      if (keepOpen) {
        toast.success("লেনদেন যোগ করা হয়েছে! আরেকটি যোগ করুন।");
      } else {
        toast.success("লেনদেন সফলভাবে যোগ করা হয়েছে!");
      }
    } catch (err) {
      toast.error("লেনদেন যোগ করতে সমস্যা হয়েছে");
      console.error("Error adding transaction:", err);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await transactionService.delete(transactionId);
      setTransactions(prev => prev.filter(t => t.Id !== transactionId));
      toast.success("লেনদেন মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error("লেনদেন মুছতে সমস্যা হয়েছে");
      console.error("Error deleting transaction:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Loading type="balance" />
        <Loading type="stats" />
        <Loading type="chart" />
        <Loading type="transactions" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  // Calculate statistics
  const now = new Date();
  const todayRange = getDayRange(now);
  const monthRange = getMonthRange(now);

  const todayTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= todayRange.start && transactionDate <= todayRange.end;
  });

  const monthlyTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= monthRange.start && transactionDate <= monthRange.end;
  });

  const todayIncome = todayTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const todayExpense = todayTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

const totalBalance = 0;

  const recentTransactions = [];

return (
    <div className="space-y-6 pb-20 relative">
      {/* Balance Card */}
      <BalanceCard
        balance={totalBalance}
        todayIncome={todayIncome}
        todayExpense={todayExpense}
      />

      {/* Quick Stats */}
      <QuickStats
        monthlyIncome={monthlyIncome}
        monthlyExpense={monthlyExpense}
        transactionCount={monthlyTransactions.length}
      />

      {/* Monthly Summary Chart */}
      <MonthlySummaryChart
        monthlyIncome={monthlyIncome}
        monthlyExpense={monthlyExpense}
      />

      {/* Recent Transactions */}
      <div>
<div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-mono font-semibold text-white glow-text-small tracking-wide">
            সাম্প্রতিক লেনদেন
          </h2>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm font-mono font-medium hover:bg-cyber-purple/10 hover:text-white border-cyber-purple/50 hover:border-cyber-purple hover:shadow-lg hover:shadow-cyber-purple/30 transition-all duration-300"
            >
              <ApperIcon name="Plus" size={16} />
              নতুন লেনদেন
            </Button>
            <ApperIcon name="Clock" size={20} className="text-cyber-purple animate-pulse" />
          </div>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.Id}
                transaction={transaction}
                onClick={() => handleDeleteTransaction(transaction.Id)}
              />
            ))}
          </div>
        ) : (
<Empty
            title="কোনো লেনদেন নেই"
            description="আপনার প্রথম আয় বা খরচ যোগ করে শুরু করুন।"
            action={() => setIsModalOpen(true)}
            actionText="লেনদেন যোগ করুন"
            icon="Receipt"
          />
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
        categories={categories}
      />
    </div>
  );
};

export default HomePage;