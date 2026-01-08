import type { VercelRequest, VercelResponse } from '@vercel/node'
import { analyticsAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.stats === 'true') {
          const stats = await analyticsAPI.getStats()
          return res.status(200).json(stats)
        }
        const limit = req.query.limit ? Number(req.query.limit) : 100
        const analytics = await analyticsAPI.getAll(limit)
        return res.status(200).json(analytics)

      case 'POST':
        const newEvent = await analyticsAPI.create(req.body)
        return res.status(201).json(newEvent)

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Analytics API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
