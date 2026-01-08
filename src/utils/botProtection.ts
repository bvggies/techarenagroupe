/**
 * Bot Protection Utilities
 * Detects and prevents bot submissions
 */

interface BotDetectionResult {
  isBot: boolean
  confidence: number
  reasons: string[]
}

class BotProtector {
  private suspiciousPatterns = [
    /^[a-z]+\d+@[a-z]+\.(com|net|org)$/i, // Pattern: name123@domain.com
    /^(test|demo|example|admin|user)\d*@/i, // Common test emails
  ]

  private commonBotUserAgents = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'curl',
    'wget',
    'python',
    'java',
    'go-http',
    'node',
  ]

  detectBot(formData: Record<string, string>, userAgent?: string): BotDetectionResult {
    const reasons: string[] = []
    let confidence = 0

    // Check user agent
    if (userAgent) {
      const ua = userAgent.toLowerCase()
      const isBotUA = this.commonBotUserAgents.some((pattern) => ua.includes(pattern))
      if (isBotUA) {
        reasons.push('Suspicious user agent detected')
        confidence += 30
      }
    }

    // Check email patterns
    if (formData.email) {
      const isSuspiciousEmail = this.suspiciousPatterns.some((pattern) =>
        pattern.test(formData.email)
      )
      if (isSuspiciousEmail) {
        reasons.push('Suspicious email pattern')
        confidence += 20
      }
    }

    // Check for rapid form submission (would need timing data)
    // This is handled by rate limiter

    // Check for common bot fields (honeypot)
    if (formData.website || formData.url || formData.website_url) {
      reasons.push('Honeypot field filled')
      confidence += 50
    }

    // Check for suspiciously fast typing (would need keystroke timing)
    // This would require additional tracking

    // Check for missing or generic content
    if (formData.message && formData.message.length < 10) {
      reasons.push('Message too short')
      confidence += 10
    }

    if (formData.name && formData.name.length < 2) {
      reasons.push('Name too short')
      confidence += 10
    }

    return {
      isBot: confidence >= 50,
      confidence,
      reasons,
    }
  }

  generateHoneypotField(): { name: string; style: React.CSSProperties } {
    return {
      name: 'website_url',
      style: {
        position: 'absolute',
        left: '-9999px',
        opacity: 0,
        pointerEvents: 'none',
        height: 0,
        width: 0,
        overflow: 'hidden',
      },
    }
  }

  validateHoneypot(formData: Record<string, string>): boolean {
    const honeypotFields = ['website', 'url', 'website_url', 'homepage']
    return honeypotFields.some((field) => formData[field] && formData[field].trim() !== '')
  }
}

export const botProtector = new BotProtector()
export default BotProtector
