import type { VercelRequest, VercelResponse } from '@vercel/node'
import { quotesAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const quote = await quotesAPI.getById(Number(req.query.id))
          return res.status(200).json(quote)
        }
        const quotes = await quotesAPI.getAll()
        return res.status(200).json(quotes)

      case 'POST':
        const newQuote = await quotesAPI.create(req.body)
        return res.status(201).json(newQuote)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await quotesAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await quotesAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Quotes API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
