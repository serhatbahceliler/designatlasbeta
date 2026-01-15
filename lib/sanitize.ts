/**
 * Input sanitization utilities for security
 */

/**
 * Sanitize string input - remove potentially dangerous characters
 * Allows alphanumeric, spaces, and common punctuation
 */
export function sanitizeString(input: string, maxLength: number = 10000): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Remove null bytes and control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Remove any SQL injection attempts (common patterns)
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/gi,
    /(--|\/\*|\*\/|;)/g, // SQL comments and statement terminators
    /(\bOR\b|\bAND\b)\s*\d+\s*=\s*\d+/gi, // OR 1=1, AND 1=1 patterns
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(sanitized)) {
      throw new Error('Invalid input detected');
    }
  }

  return sanitized;
}

/**
 * Sanitize UUID - ensure it matches UUID format
 */
export function sanitizeUUID(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('UUID must be a string');
  }

  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(input.trim())) {
    throw new Error('Invalid UUID format');
  }

  return input.trim().toLowerCase();
}

/**
 * Sanitize role - ensure it's one of the allowed values
 */
export function sanitizeRole(input: string): 'user' | 'assistant' {
  if (input !== 'user' && input !== 'assistant') {
    throw new Error('Invalid role');
  }
  return input;
}

/**
 * Validate and sanitize title
 */
export function sanitizeTitle(input: string): string {
  const sanitized = sanitizeString(input, 200);

  if (sanitized.length === 0) {
    throw new Error('Title cannot be empty');
  }

  return sanitized;
}

/**
 * Validate and sanitize message content
 */
export function sanitizeMessage(input: string): string {
  const sanitized = sanitizeString(input, 10000);

  if (sanitized.length === 0) {
    throw new Error('Message cannot be empty');
  }

  return sanitized;
}
