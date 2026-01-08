import type { VercelRequest, VercelResponse } from '@vercel/node'
import { reviewsAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const review = await reviewsAPI.getById(Number(req.query.id))
          return res.status(200).json(review)
        }
        if (req.query.published === 'true') {
          const published = await reviewsAPI.getPublished()
          return res.status(200).json(published)
        }
        const reviews = await reviewsAPI.getAll()
        return res.status(200).json(reviews)

      case 'POST':
        const newReview = await reviewsAPI.create(req.body)
        return res.status(201).json(newReview)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await reviewsAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await reviewsAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Reviews API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
