import notificationSettingsData from '@/services/mockData/notificationSettings.json';

let currentSettings = { ...notificationSettingsData };

// Bengali money management quotes
const bengaliQuotes = [
  {
    id: 1,
    quote: "টাকা হাতে আসা গুরুত্বপূর্ণ নয়, ধরে রাখা হলো বুদ্ধিমানের কাজ।",
    explanation: "কারণ আয় সবাই করে, কিন্তু সঞ্চয় সবাই পারে না।"
  },
  {
    id: 2,
    quote: "যত আয় নয়, ঠিক তত খরচই জীবন গড়ার মূল মন্ত্র।",
    explanation: "আয় বাড়ানোর আগে খরচ কন্ট্রোলে রাখা শিখো।"
  },
  {
    id: 3,
    quote: "অহেতুক এক টাকা খরচ মানে ভবিষ্যতের এক হাজার টাকার অভাব।",
    explanation: "ছোট খরচই বড় সমস্যার জন্ম দেয়।"
  },
  {
    id: 4,
    quote: "সঞ্চয় করো তখন, যখন টাকাটা প্রয়োজন মনে হচ্ছে না।",
    explanation: "কারণ যখন টাকার দরকার হবে, তখন সেটা পাওয়া যাবে না।"
  },
  {
    id: 5,
    quote: "টাকা জীবনের গতি নয়, কিন্তু খারাপ ব্যবস্থাপনা জীবনের গতি থামিয়ে দিতে পারে।",
    explanation: "টাকার ব্যবহার শেখা জীবনের অংশ।"
  }
];

class NotificationService {
  constructor() {
    this.storageKey = 'bengali_quotes_data';
    this.notificationPermission = 'default';
    this.checkNotificationSupport();
  }

  checkNotificationSupport() {
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
    }
  }

  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      this.notificationPermission = permission;
      return permission === 'granted';
    }
    return this.notificationPermission === 'granted';
  }

  getQuoteData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored quote data:', e);
      }
    }
    
    // Initialize with default data
    const initialData = {
      currentIndex: 0,
      lastShownDate: null,
      notificationsEnabled: false,
      scheduledTime: '08:30'
    };
    
    this.saveQuoteData(initialData);
    return initialData;
  }

  saveQuoteData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getCurrentQuote() {
    const data = this.getQuoteData();
    return bengaliQuotes[data.currentIndex];
  }

  getNextQuoteIndex(currentIndex) {
    return (currentIndex + 1) % bengaliQuotes.length;
  }

  shouldShowQuoteToday() {
    const data = this.getQuoteData();
    const today = new Date().toDateString();
    
    return data.lastShownDate !== today;
  }

  markQuoteAsShown() {
    const data = this.getQuoteData();
    const today = new Date().toDateString();
    
    if (data.lastShownDate !== today) {
      data.currentIndex = this.getNextQuoteIndex(data.currentIndex);
      data.lastShownDate = today;
      this.saveQuoteData(data);
    }
  }

  async showDailyQuote() {
    if (!this.shouldShowQuoteToday()) {
      return false;
    }

    const data = this.getQuoteData();
    if (!data.notificationsEnabled) {
      return false;
    }

    const hasPermission = await this.requestNotificationPermission();
    if (!hasPermission) {
      return false;
    }

    const quote = this.getCurrentQuote();
    const notification = new Notification('আজকের আর্থিক পরামর্শ 💰', {
      body: `${quote.quote}\n\n${quote.explanation}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'daily-quote',
      requireInteraction: true,
      silent: false
    });

    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);

    this.markQuoteAsShown();
    return true;
  }

  enableQuoteNotifications(enabled = true, time = '08:30') {
    const data = this.getQuoteData();
    data.notificationsEnabled = enabled;
    data.scheduledTime = time;
    this.saveQuoteData(data);
  }

  async getSettings() {
    await this.delay(100);
    const quoteData = this.getQuoteData();
    
    return { 
      ...currentSettings,
      bengaliQuotes: {
        enabled: quoteData.notificationsEnabled,
        time: quoteData.scheduledTime,
        currentIndex: quoteData.currentIndex,
        lastShownDate: quoteData.lastShownDate,
        permissionGranted: this.notificationPermission === 'granted'
      }
    };
  }

  async updateSettings(newSettings) {
    await this.delay(300);
    
    if (!newSettings || typeof newSettings !== 'object') {
      throw new Error('Invalid settings data');
    }

    // Handle Bengali quotes settings
    if (newSettings.bengaliQuotes) {
      this.enableQuoteNotifications(
        newSettings.bengaliQuotes.enabled,
        newSettings.bengaliQuotes.time
      );
    }

    currentSettings = { ...currentSettings, ...newSettings };
    return { ...currentSettings };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check if it's time to show daily quote
  checkScheduledTime() {
    const data = this.getQuoteData();
    if (!data.notificationsEnabled || !this.shouldShowQuoteToday()) {
      return false;
    }

    const now = new Date();
    const [hours, minutes] = data.scheduledTime.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // Show if current time is within 1 minute of scheduled time
    const timeDiff = Math.abs(now.getTime() - scheduledTime.getTime());
    return timeDiff <= 60000; // 1 minute tolerance
  }

  // Initialize daily quote checking when service starts
  startQuoteScheduler() {
    // Check immediately on app start
    setTimeout(() => {
      if (this.shouldShowQuoteToday()) {
        this.showDailyQuote();
      }
    }, 2000);

    // Check every minute for scheduled time
    setInterval(() => {
      if (this.checkScheduledTime()) {
        this.showDailyQuote();
      }
    }, 60000);
  }
}

const notificationServiceInstance = new NotificationService();

// Start the quote scheduler
notificationServiceInstance.startQuoteScheduler();

export const notificationService = notificationServiceInstance;