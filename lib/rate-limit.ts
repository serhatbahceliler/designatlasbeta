// Simple in-memory rate limiter for MVP
// Note: For production, use Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_MESSAGES_PER_MINUTE = 10;
const MAX_MESSAGES_PER_DAY = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export function checkRateLimit(userId: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const minuteKey = `${userId}:minute:${Math.floor(now / WINDOW_MS)}`;
  const dayKey = `${userId}:day:${Math.floor(now / DAY_MS)}`;

  // Check minute limit
  const minuteEntry = rateLimitStore.get(minuteKey);
  const minuteCount = minuteEntry?.count || 0;
  
  if (minuteCount >= MAX_MESSAGES_PER_MINUTE) {
    const resetAt = (Math.floor(now / WINDOW_MS) + 1) * WINDOW_MS;
    return { allowed: false, remaining: 0, resetAt };
  }

  // Check daily limit
  const dayEntry = rateLimitStore.get(dayKey);
  const dayCount = dayEntry?.count || 0;
  
  if (dayCount >= MAX_MESSAGES_PER_DAY) {
    const resetAt = (Math.floor(now / DAY_MS) + 1) * DAY_MS;
    return { allowed: false, remaining: 0, resetAt };
  }

  // Increment counters
  rateLimitStore.set(minuteKey, { count: minuteCount + 1, windowStart: now });
  rateLimitStore.set(dayKey, { count: dayCount + 1, windowStart: now });

  // Clean up old entries (simple cleanup)
  if (rateLimitStore.size > 1000) {
    const cutoff = now - DAY_MS;
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.windowStart < cutoff) {
        rateLimitStore.delete(key);
      }
    }
  }

  const remaining = Math.min(
    MAX_MESSAGES_PER_MINUTE - minuteCount - 1,
    MAX_MESSAGES_PER_DAY - dayCount - 1
  );

  return { allowed: true, remaining, resetAt: (Math.floor(now / WINDOW_MS) + 1) * WINDOW_MS };
}
