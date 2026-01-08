import type { VercelRequest, VercelResponse } from '@vercel/node'
import { dashboardAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const stats = await dashboardAPI.getStats()
    return res.status(200).json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
