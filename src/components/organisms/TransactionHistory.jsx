import React, { useState, useEffect } from "react";
import TransactionItem from "@/components/molecules/TransactionItem";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";

const TransactionHistory = ({ transactions, onDeleteTransaction }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    let filtered = transactions;

    // Filter by month
    if (selectedMonth) {
      const monthStart = startOfMonth(new Date(selectedMonth + "-01"));
      const monthEnd = endOfMonth(new Date(selectedMonth + "-01"));
      
      filtered = filtered.filter(transaction => {
        const transactionDate = parseISO(transaction.date);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(transaction =>
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.note && transaction.note.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery, selectedMonth]);

  const handleTransactionClick = (transaction) => {
    if (window.confirm("এই লেনদেনটি মুছে ফেলতে চান?")) {
      onDeleteTransaction(transaction.Id);
    }
  };

  const monthlyIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Month Selection & Search */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-gray-900">
              লেনদেনের ইতিহাস
            </h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            >
              <option value={format(new Date(), "yyyy-MM")}>এই মাস</option>
              <option value={format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM")}>
                গত মাস
              </option>
              <option value={format(new Date(new Date().setMonth(new Date().getMonth() - 2)), "yyyy-MM")}>
                {format(new Date(new Date().setMonth(new Date().getMonth() - 2)), "MMM yyyy")}
              </option>
            </select>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="ক্যাটেগরি বা নোট দিয়ে খুঁজুন..."
          />

          {/* Monthly Summary */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">মাসিক আয়</p>
              <p className="text-lg font-display font-semibold text-primary-600">
                ৳{monthlyIncome.toLocaleString("bn-BD")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">মাসিক খরচ</p>
              <p className="text-lg font-display font-semibold text-secondary-600">
                ৳{monthlyExpense.toLocaleString("bn-BD")}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.Id}
              transaction={transaction}
              onClick={() => handleTransactionClick(transaction)}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <ApperIcon name="Receipt" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোনো লেনদেন পাওয়া যায়নি
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "আপনার খোঁজা শর্ত অনুযায়ী কোনো লেনদেন খুঁজে পাওয়া যায়নি।"
                : "এই মাসে এখনো কোনো লেনদেন যোগ করা হয়নি।"
              }
            </p>
            {searchQuery && (
              <Button
                variant="secondary"
                onClick={() => setSearchQuery("")}
                className="mx-auto"
              >
                সব লেনদেন দেখুন
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;