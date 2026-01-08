import type { VercelRequest, VercelResponse } from '@vercel/node'
import { seoAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.page) {
          const seo = await seoAPI.getByPage(req.query.page as string)
          return res.status(200).json(seo)
        }
        const seoSettings = await seoAPI.getAll()
        return res.status(200).json(seoSettings)

      case 'POST':
        const newSEO = await seoAPI.create(req.body)
        return res.status(201).json(newSEO)

      case 'PUT':
        if (!req.query.page) {
          return res.status(400).json({ error: 'Page is required' })
        }
        const updated = await seoAPI.update(req.query.page as string, req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.page) {
          return res.status(400).json({ error: 'Page is required' })
        }
        await seoAPI.delete(req.query.page as string)
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('SEO API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
