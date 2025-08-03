import React, { useState, useEffect } from "react";
import TransactionHistory from "@/components/organisms/TransactionHistory";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import TransactionModal from "@/components/organisms/TransactionModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { transactionService } from "@/services/api/transactionService";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

const HistoryPage = () => {
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

  const handleAddTransaction = async (transactionData) => {
    try {
      const newTransaction = await transactionService.create(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success("লেনদেন সফলভাবে যোগ করা হয়েছে!");
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
        <Loading type="transactions" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="pb-20">
      <TransactionHistory
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />

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

export default HistoryPage;