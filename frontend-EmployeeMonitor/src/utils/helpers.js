// src/utils/helpers.js
export function safeTrim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function safeLowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : '';
}

export function safeToUpperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : '';
}

export function safeString(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}
