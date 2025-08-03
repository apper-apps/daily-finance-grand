import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import CategorySelector from "@/components/molecules/CategorySelector";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TransactionModal = ({ isOpen, onClose, onSubmit, categories }) => {
const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    note: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [keepOpen, setKeepOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      amount: "",
      type: "expense",
      category: "",
      note: "",
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        amount: "",
        type: "expense",
        category: "",
        note: "",
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  }, [isOpen]);
  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "অনুগ্রহ করে একটি বৈধ পরিমাণ লিখুন";
    }

    if (!formData.category) {
      newErrors.category = "অনুগ্রহ করে একটি ক্যাটেগরি নির্বাচন করুন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedDate = new Date(formData.date);
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: selectedDate.toISOString(),
      createdAt: new Date().toISOString()
    };

    onSubmit(transactionData, keepOpen, resetForm);
    
    if (keepOpen) {
      resetForm();
    } else {
      onClose();
    }
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: "" // Reset category when type changes
    }));
  };

  return (
<AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 cyber-glass-effect-dark"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 flex items-end justify-center p-4">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
            >
              <Card className="p-6 cyber-card glow-box border-2 border-cyber-neon/30">
                {/* Header */}
<div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-mono font-semibold text-cyber-neon glow-text tracking-wide">
                    নতুন লেনদেন
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-cyber-neon/10 rounded-full transition-all duration-300 border border-gray-600 hover:border-cyber-neon/50 hover:shadow-lg hover:shadow-cyber-neon/30"
                  >
                    <ApperIcon name="X" size={20} className="text-gray-400 hover:text-cyber-neon transition-colors duration-300" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type Selection */}
<div>
                    <p className="text-sm font-mono font-medium text-gray-300 mb-3 tracking-wide">ধরন</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleTypeChange("income")}
                        className={cn(
                          "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                          formData.type === "income"
                            ? "border-cyber-neon bg-cyber-neon/10 text-cyber-neon glow-box shadow-lg shadow-cyber-neon/30"
                            : "border-gray-600 hover:border-cyber-neon/50 text-gray-300 hover:text-cyber-neon bg-gray-800/50 hover:bg-cyber-neon/5"
                        )}
                      >
                        <ApperIcon name="TrendingUp" size={18} />
                        <span className="font-mono font-medium">আয়</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTypeChange("expense")}
                        className={cn(
                          "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                          formData.type === "expense"
                            ? "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan glow-box shadow-lg shadow-cyber-cyan/30"
                            : "border-gray-600 hover:border-cyber-cyan/50 text-gray-300 hover:text-cyber-cyan bg-gray-800/50 hover:bg-cyber-cyan/5"
                        )}
                      >
                        <ApperIcon name="TrendingDown" size={18} />
                        <span className="font-mono font-medium">খরচ</span>
                      </button>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <Input
                    label="পরিমাণ (৳)"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                    error={errors.amount}
                  />

                  {/* Category Selection */}
                  <div>
                    <p className="text-sm font-mono font-medium text-gray-300 mb-3 tracking-wide">ক্যাটেগরি</p>
                    <CategorySelector
                      categories={categories}
                      selectedCategory={formData.category}
                      onSelect={(category) => setFormData(prev => ({ ...prev, category }))}
                      type={formData.type}
                    />
                    {errors.category && (
                      <p className="mt-2 text-sm text-cyber-red font-mono glow-text-small">{errors.category}</p>
                    )}
                  </div>

                  {/* Note Input */}
                  <div>
                    <label className="block text-sm font-mono font-medium text-gray-300 mb-2 tracking-wide">
                      নোট (ঐচ্ছিক)
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="অতিরিক্ত তথ্য লিখুন..."
                      rows={2}
                      className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2.5 text-base text-gray-200 placeholder:text-gray-500 focus:border-cyber-neon focus:outline-none focus:ring-2 focus:ring-cyber-neon/20 resize-none font-mono transition-all duration-300 hover:border-gray-500"
                    />
                  </div>

                  {/* Date Selector */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      তারিখ
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      max={new Date().toISOString().split('T')[0]}
                      className={cn(
                        "w-full",
                        errors.date && "border-red-500 focus:ring-red-500"
                      )}
                    />
                    {errors.date && (
                      <p className="text-xs text-red-600">{errors.date}</p>
                    )}
                  </div>

{/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      className="flex-1"
                    >
                      বাতিল
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                    >
                      সংরক্ষণ
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;