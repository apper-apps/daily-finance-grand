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
    note: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        amount: "",
        type: "expense",
        category: "",
        note: ""
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

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    onSubmit(transactionData);
    onClose();
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
            className="fixed inset-0 glass-effect-dark"
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
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-semibold text-gray-900">
                    নতুন লেনদেন
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ApperIcon name="X" size={20} className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type Selection */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">ধরন</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleTypeChange("income")}
                        className={cn(
                          "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 transition-all duration-200",
                          formData.type === "income"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        )}
                      >
                        <ApperIcon name="TrendingUp" size={18} />
                        <span className="font-medium">আয়</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTypeChange("expense")}
                        className={cn(
                          "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 transition-all duration-200",
                          formData.type === "expense"
                            ? "border-secondary-500 bg-secondary-50 text-secondary-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        )}
                      >
                        <ApperIcon name="TrendingDown" size={18} />
                        <span className="font-medium">খরচ</span>
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
                    <p className="text-sm font-medium text-gray-700 mb-3">ক্যাটেগরি</p>
                    <CategorySelector
                      categories={categories}
                      selectedCategory={formData.category}
                      onSelect={(category) => setFormData(prev => ({ ...prev, category }))}
                      type={formData.type}
                    />
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>

                  {/* Note Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      নোট (ঐচ্ছিক)
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                      placeholder="অতিরিক্ত তথ্য লিখুন..."
                      rows={2}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                    />
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