import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Load dotenv only in development (not in Vercel serverless functions)
// Vercel automatically provides environment variables, so dotenv is not needed in production
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  // Dynamic import for ESM compatibility - fire and forget
  // In development, ensure .env file exists and is loaded before this module is imported
  import('dotenv').then((dotenv) => {
    dotenv.default.config()
  }).catch(() => {
    // Silently fail if dotenv is not available
  })
}

// Get DATABASE_URL from environment (set in Vercel dashboard or .env file)
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Please set it in Vercel dashboard.')
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('neon.tech') || connectionString.includes('vercel') 
    ? { rejectUnauthorized: false }
    : undefined,
})

export const db = drizzle(pool)
