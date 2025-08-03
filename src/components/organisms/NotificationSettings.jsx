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
      <Card className="p-6 cyber-card glow-box">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-cyber-neon/10 rounded-full p-3 glow-box-small border border-cyber-neon/30">
            <ApperIcon name="Bell" size={24} className="text-cyber-neon animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-mono font-semibold text-cyber-neon glow-text tracking-wide">
              নোটিফিকেশন সেটিংস
            </h2>
            <p className="text-sm text-gray-400 font-mono">
              নিয়মিত লেনদেন ট্র্যাক করার জন্য দৈনিক রিমাইন্ডার সেট করুন
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {notificationTimes.map((notification) => (
            <div key={notification.key} className="border border-gray-600 rounded-xl p-4 cyber-card hover:glow-box-small transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "rounded-full p-2 transition-all duration-300 border",
                    formData[notification.enabledField] 
                      ? "bg-cyber-neon/10 text-cyber-neon border-cyber-neon/30 glow-box-small" 
                      : "bg-gray-800/50 text-gray-500 border-gray-600"
                  )}>
                    <ApperIcon name={notification.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono font-medium text-gray-200 mb-1 group-hover:text-cyber-neon transition-colors duration-300">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 font-mono">
                      {notification.description}
                    </p>
                    
                    {/* Time Picker */}
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-mono font-medium text-gray-300">
                        সময়:
                      </label>
                      <input
                        type="time"
                        value={formData[notification.timeField]}
                        onChange={(e) => handleTimeChange(notification.timeField, e.target.value)}
                        disabled={!formData[notification.enabledField]}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 transition-all duration-300 font-mono",
                          formData[notification.enabledField]
                            ? "border-gray-600 bg-gray-800/50 text-gray-200 focus:border-cyber-neon focus:ring-cyber-neon/20 hover:border-gray-500"
                            : "border-gray-700 bg-gray-900/50 text-gray-500 cursor-not-allowed"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(notification.enabledField)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border",
                    formData[notification.enabledField] 
                      ? "bg-cyber-neon border-cyber-neon shadow-lg shadow-cyber-neon/30 focus:ring-cyber-neon" 
                      : "bg-gray-700 border-gray-600 focus:ring-gray-500"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full transition-transform duration-300 shadow-lg",
                      formData[notification.enabledField] 
                        ? "translate-x-6 bg-black" 
                        : "translate-x-1 bg-gray-400"
                    )}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-600">
          <Button onClick={handleSave} variant="primary" className="w-full">
            সেটিংস সংরক্ষণ করুন
          </Button>
        </div>
      </Card>

      {/* Additional Settings */}
      <Card className="p-6 cyber-card glow-box">
        <h3 className="text-lg font-mono font-semibold text-cyber-neon mb-4 glow-text tracking-wide">
          অতিরিক্ত সেটিংস
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-600 rounded-xl cyber-card hover:glow-box-small transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="bg-cyber-cyan/10 rounded-full p-2 border border-cyber-cyan/30 glow-box-small">
                <ApperIcon name="Download" size={20} className="text-cyber-cyan animate-pulse" />
              </div>
              <div>
                <h4 className="font-mono font-medium text-gray-200 group-hover:text-cyber-cyan transition-colors duration-300">ডেটা এক্সপোর্ট</h4>
                <p className="text-sm text-gray-400 font-mono">আপনার সব লেনদেন CSV ফাইলে ডাউনলোড করুন</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              এক্সপোর্ট
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-600 rounded-xl cyber-card hover:glow-box-small transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <div className="bg-cyber-red/10 rounded-full p-2 border border-cyber-red/30">
                <ApperIcon name="Trash2" size={20} className="text-cyber-red animate-pulse" />
              </div>
              <div>
                <h4 className="font-mono font-medium text-gray-200 group-hover:text-cyber-red transition-colors duration-300">সব ডেটা মুছুন</h4>
                <p className="text-sm text-gray-400 font-mono">সাবধান: এটি সব লেনদেন স্থায়ীভাবে মুছে ফেলবে</p>
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