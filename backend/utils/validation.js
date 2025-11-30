/**
 * Validate and clean mobile number
 * Removes +91 or 0 prefix and validates 10-digit format
 */
exports.validateMobile = (mobile) => {
  let cleaned = mobile.trim();
  
  // Remove +91 prefix
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  }
  // Remove 0 prefix
  else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Validate 10-digit format
  const valid = /^\d{10}$/.test(cleaned);
  
  return { valid, cleaned };
};

/**
 * Validate and clean PAN number
 * Format: ABCDE1234F (5 letters, 4 digits, 1 letter)
 * Converts to uppercase
 */
exports.validatePAN = (pan) => {
  const cleaned = pan.trim().toUpperCase();
  
  // PAN format validation
  const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleaned);
  
  return { valid, cleaned };
};
