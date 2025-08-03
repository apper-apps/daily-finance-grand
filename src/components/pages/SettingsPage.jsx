import React, { useState, useEffect } from "react";
import NotificationSettings from "@/components/organisms/NotificationSettings";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { notificationService } from "@/services/api/notificationService";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      
      const settingsData = await notificationService.getSettings();
      setSettings(settingsData);
    } catch (err) {
      setError("সেটিংস লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error("Error loading settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSettings = async (newSettings) => {
    try {
      const updatedSettings = await notificationService.updateSettings(newSettings);
      setSettings(updatedSettings);
      toast.success("সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!");
    } catch (err) {
      toast.error("সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে");
      console.error("Error saving settings:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadSettings} />;
  }

return (
    <div className="pb-6 space-y-6">
      <NotificationSettings
        settings={settings}
        onSave={handleSaveSettings}
      />
      
      {/* Bengali Quotes Feature Status */}
      {settings?.bengaliQuotes && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            দৈনিক বাংলা উক্তি 📖
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">বর্তমান অবস্থা:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                settings.bengaliQuotes.enabled && settings.bengaliQuotes.permissionGranted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {settings.bengaliQuotes.enabled && settings.bengaliQuotes.permissionGranted
                  ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">সময়:</span>
              <span className="text-gray-800 font-medium">
                {settings.bengaliQuotes.time} (সকাল)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">পরবর্তী উক্তি:</span>
              <span className="text-gray-800">
                উক্তি #{(settings.bengaliQuotes.currentIndex + 1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;