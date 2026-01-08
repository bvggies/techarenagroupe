// Browser-safe JWT verification (doesn't require jsonwebtoken)
// For server-side operations, use the API routes

export interface UserPayload {
  id: number
  email: string
  role: string
}

// Simple JWT decode for client-side (doesn't verify signature - that's done server-side)
export function verifyToken(token: string): UserPayload | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    // Decode payload (base64url) - browser compatible
    const payload = parts[1]
    // Replace URL-safe base64 characters
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    // Decode using browser's atob
    const decoded = JSON.parse(atob(padded))
    
    // Check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null
    }
    
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }
  } catch {
    return null
  }
}

// Server-side only functions (used in API routes)
export async function generateToken(payload: UserPayload): Promise<string> {
  const jwt = await import('jsonwebtoken')
  const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
  return jwt.default.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.default.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.default.compare(password, hash)
}
