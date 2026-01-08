import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '../../src/db/connection'
import * as schema from '../../src/db/schema'
import { eq } from 'drizzle-orm'
import { generateToken, comparePassword } from '../../src/utils/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // Check if database connection is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return res.status(500).json({ error: 'Database configuration error' })
    }

    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    // Return more detailed error in development
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    })
  }
}
