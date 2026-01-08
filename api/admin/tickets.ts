import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ticketsAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const ticket = await ticketsAPI.getById(Number(req.query.id))
          return res.status(200).json(ticket)
        }
        const tickets = await ticketsAPI.getAll()
        return res.status(200).json(tickets)

      case 'POST':
        const newTicket = await ticketsAPI.create(req.body)
        return res.status(201).json(newTicket)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await ticketsAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await ticketsAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Tickets API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
