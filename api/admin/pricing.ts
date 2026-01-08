import type { VercelRequest, VercelResponse } from '@vercel/node'
import { pricingAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const plan = await pricingAPI.getById(Number(req.query.id))
          return res.status(200).json(plan)
        }
        const plans = await pricingAPI.getAll()
        return res.status(200).json(plans)

      case 'POST':
        const newPlan = await pricingAPI.create(req.body)
        return res.status(201).json(newPlan)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await pricingAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await pricingAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Pricing API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
