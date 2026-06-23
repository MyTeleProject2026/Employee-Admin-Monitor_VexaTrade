// src/utils/helpers.js
export function safeTrim(value) {
  // ✅ SUPER SAFE – converts any value to string first, then trims
  // This will never throw, even if value is an event object, null, undefined, or a number
  return String(value).trim();
}

export function safeLowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : String(value).toLowerCase();
}

export function safeToUpperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : String(value).toUpperCase();
}

export function safeString(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  return typeof value === 'string' ? value : String(value);
}
