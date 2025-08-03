import notificationSettingsData from "@/services/mockData/notificationSettings.json";

class NotificationService {
  constructor() {
    this.settings = { ...notificationSettingsData };
  }

  async getSettings() {
    await this.delay(200);
    return { ...this.settings };
  }

  async updateSettings(newSettings) {
    await this.delay(300);
    
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    
    return { ...this.settings };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const notificationService = new NotificationService();