import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Only load dotenv in development (not in Vercel serverless functions)
// Vercel automatically provides environment variables, so dotenv is not needed
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  try {
    // Dynamic import to avoid bundling dotenv in production
    const dotenv = require('dotenv')
    dotenv.config()
  } catch (e) {
    // dotenv not available, use environment variables from Vercel
  }
}

// Get DATABASE_URL from environment (set in Vercel dashboard)
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
