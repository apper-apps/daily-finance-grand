import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NotificationSettings = ({ settings, onSave }) => {
  const [formData, setFormData] = useState({
    morningEnabled: true,
    morningTime: "09:00",
    afternoonEnabled: true,
    afternoonTime: "14:00",
    eveningEnabled: true,
    eveningTime: "20:00"
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleToggle = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const notificationTimes = [
    {
      key: "morning",
      title: "সকালের নোটিফিকেশন",
      description: "দিনের শুরুতে লেনদেন যোগ করার জন্য মনে করিয়ে দেবে",
      icon: "Sunrise",
      enabledField: "morningEnabled",
      timeField: "morningTime"
    },
    {
      key: "afternoon",
      title: "দুপুরের নোটিফিকেশন", 
      description: "দুপুরের খরচ ট্র্যাক করার জন্য মনে করিয়ে দেবে",
      icon: "Sun",
      enabledField: "afternoonEnabled",
      timeField: "afternoonTime"
    },
    {
      key: "evening",
      title: "সন্ধ্যার নোটিফিকেশন",
      description: "দিনের লেনদেন সম্পূর্ণ করার জন্য মনে করিয়ে দেবে",
      icon: "Moon",
      enabledField: "eveningEnabled",
      timeField: "eveningTime"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-accent-50 rounded-full p-3">
            <ApperIcon name="Bell" size={24} className="text-accent-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900">
              নোটিফিকেশন সেটিংস
            </h2>
            <p className="text-sm text-gray-600">
              নিয়মিত লেনদেন ট্র্যাক করার জন্য দৈনিক রিমাইন্ডার সেট করুন
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {notificationTimes.map((notification) => (
            <div key={notification.key} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "rounded-full p-2 transition-colors",
                    formData[notification.enabledField] 
                      ? "bg-accent-50 text-accent-600" 
                      : "bg-gray-50 text-gray-400"
                  )}>
                    <ApperIcon name={notification.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {notification.description}
                    </p>
                    
                    {/* Time Picker */}
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-700">
                        সময়:
                      </label>
                      <input
                        type="time"
                        value={formData[notification.timeField]}
                        onChange={(e) => handleTimeChange(notification.timeField, e.target.value)}
                        disabled={!formData[notification.enabledField]}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-colors",
                          formData[notification.enabledField]
                            ? "border-gray-200 bg-white focus:border-accent-500"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(notification.enabledField)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
                    formData[notification.enabledField] 
                      ? "bg-accent-500" 
                      : "bg-gray-200"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      formData[notification.enabledField] 
                        ? "translate-x-6" 
                        : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <Button onClick={handleSave} variant="primary" className="w-full">
            সেটিংস সংরক্ষণ করুন
          </Button>
        </div>
      </Card>

      {/* Additional Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          অতিরিক্ত সেটিংস
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-info/10 rounded-full p-2">
                <ApperIcon name="Download" size={20} className="text-info" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">ডেটা এক্সপোর্ট</h4>
                <p className="text-sm text-gray-600">আপনার সব লেনদেন CSV ফাইলে ডাউনলোড করুন</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              এক্সপোর্ট
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-warning/10 rounded-full p-2">
                <ApperIcon name="Trash2" size={20} className="text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">সব ডেটা মুছুন</h4>
                <p className="text-sm text-gray-600">সাবধান: এটি সব লেনদেন স্থায়ীভাবে মুছে ফেলবে</p>
              </div>
            </div>
            <Button variant="danger" size="sm">
              মুছুন
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationSettings;