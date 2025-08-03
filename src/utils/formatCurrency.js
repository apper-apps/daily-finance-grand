export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = Math.abs(amount).toLocaleString("bn-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return showSymbol ? `৳${formatted}` : formatted;
};

export const formatNumber = (number) => {
  return number.toLocaleString("bn-BD");
};