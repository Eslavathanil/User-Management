export const validateMobile = (mobile: string): { valid: boolean; cleaned: string } => {
  // Remove +91 or 0 prefix if present
  let cleaned = mobile.trim();
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }
  
  // Check if it's exactly 10 digits
  const valid = /^\d{10}$/.test(cleaned);
  return { valid, cleaned };
};

export const validatePAN = (pan: string): { valid: boolean; cleaned: string } => {
  // Convert to uppercase
  const cleaned = pan.trim().toUpperCase();
  
  // PAN format: 5 letters, 4 digits, 1 letter
  const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleaned);
  return { valid, cleaned };
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
