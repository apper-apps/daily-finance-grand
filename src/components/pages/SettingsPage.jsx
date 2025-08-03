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
    <div className="pb-6">
      <NotificationSettings
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default SettingsPage;