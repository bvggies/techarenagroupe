import type { VercelRequest, VercelResponse } from '@vercel/node'
import { statusesAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const status = await statusesAPI.getById(Number(req.query.id))
          return res.status(200).json(status)
        }
        const type = req.query.type as string | undefined
        const statuses = await statusesAPI.getAll(type)
        return res.status(200).json(statuses)

      case 'POST':
        const newStatus = await statusesAPI.create(req.body)
        return res.status(201).json(newStatus)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await statusesAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await statusesAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Statuses API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
