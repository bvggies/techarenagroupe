import type { VercelRequest, VercelResponse } from '@vercel/node'
import { indicatorsAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const indicator = await indicatorsAPI.getById(Number(req.query.id))
          return res.status(200).json(indicator)
        }
        const indicators = await indicatorsAPI.getAll()
        return res.status(200).json(indicators)

      case 'POST':
        const newIndicator = await indicatorsAPI.create(req.body)
        return res.status(201).json(newIndicator)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await indicatorsAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await indicatorsAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Indicators API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
