interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  checkLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const record = this.store[identifier]

    if (!record || now > record.resetTime) {
      // Create new record or reset expired one
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      }
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs,
      }
    }

    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      }
    }

    record.count++
    return {
      allowed: true,
      remaining: this.maxRequests - record.count,
      resetTime: record.resetTime,
    }
  }

  reset(identifier: string): void {
    delete this.store[identifier]
  }

  clear(): void {
    this.store = {}
  }
}

// Create rate limiters for different use cases
export const formRateLimiter = new RateLimiter(60000, 5) // 5 requests per minute
export const apiRateLimiter = new RateLimiter(60000, 100) // 100 requests per minute
export const generalRateLimiter = new RateLimiter(60000, 30) // 30 requests per minute

export default RateLimiter
