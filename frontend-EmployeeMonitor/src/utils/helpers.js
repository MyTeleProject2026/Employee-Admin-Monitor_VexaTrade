// frontend-EmployeeMonitor/src/utils/helpers.js
export function safeTrim(value) {
  return String(value).trim();
}

export function safeLowerCase(value) {
  return String(value).toLowerCase();
}

export function safeToUpperCase(value) {
  return String(value).toUpperCase();
}

export function safeString(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  return String(value);
}
