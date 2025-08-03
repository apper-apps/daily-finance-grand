import { format, startOfMonth, endOfMonth, startOfDay, endOfDay, isToday, subDays } from "date-fns";

export const formatDate = (date, formatString = "dd MMM yyyy") => {
  return format(date, formatString);
};

export const formatTime = (date) => {
  return format(date, "hh:mm a");
};

export const getMonthRange = (date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

export const getDayRange = (date = new Date()) => {
  return {
    start: startOfDay(date),
    end: endOfDay(date)
  };
};

export const isDateToday = (date) => {
  return isToday(date);
};

export const getRelativeDate = (date) => {
  if (isToday(date)) return "আজ";
  
  const yesterday = subDays(new Date(), 1);
  if (format(date, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")) {
    return "গতকাল";
  }
  
  return formatDate(date, "dd MMM");
};

export const formatDateBengali = (date) => {
  const day = format(date, "dd");
  const month = format(date, "MMM");
  const year = format(date, "yyyy");
  
  const bengaliMonths = {
    "Jan": "জানুয়ারি",
    "Feb": "ফেব্রুয়ারি",
    "Mar": "মার্চ",
    "Apr": "এপ্রিল",
    "May": "মে",
    "Jun": "জুন",
    "Jul": "জুলাই",
    "Aug": "আগস্ট",
    "Sep": "সেপ্টেম্বর",
    "Oct": "অক্টোবর",
    "Nov": "নভেম্বর",
    "Dec": "ডিসেম্বর"
  };
  
  return `${day} ${bengaliMonths[month]} ${year}`;
};

export const formatMonthBengali = (dateString) => {
  const date = new Date(dateString + "-01");
  const month = format(date, "MMM");
  const year = format(date, "yyyy");
  
  const bengaliMonths = {
    "Jan": "জানুয়ারি",
    "Feb": "ফেব্রুয়ারি", 
    "Mar": "মার্চ",
    "Apr": "এপ্রিল",
    "May": "মে",
    "Jun": "জুন",
    "Jul": "জুলাই",
    "Aug": "আগস্ট",
    "Sep": "সেপ্টেম্বর",
    "Oct": "অক্টোবর",
    "Nov": "নভেম্বর",
    "Dec": "ডিসেম্বর"
  };
return `${bengaliMonths[month]} ${year}`;
};

export const parseTimeString = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

export const formatTimeString = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getScheduledDateTime = (timeString, targetDate = new Date()) => {
  const { hours, minutes } = parseTimeString(timeString);
  const scheduledDate = new Date(targetDate);
  scheduledDate.setHours(hours, minutes, 0, 0);
  return scheduledDate;
};