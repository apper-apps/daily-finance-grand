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
    "Jan": "জানু",
    "Feb": "ফেব",
    "Mar": "মার্চ",
    "Apr": "এপ্রিল",
    "May": "মে",
    "Jun": "জুন",
    "Jul": "জুলাই",
    "Aug": "আগস্ট",
    "Sep": "সেপ্টে",
    "Oct": "অক্টো",
    "Nov": "নভে",
    "Dec": "ডিসে"
  };
  
  return `${day} ${bengaliMonths[month]} ${year}`;
};