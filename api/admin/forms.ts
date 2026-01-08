import type { VercelRequest, VercelResponse } from '@vercel/node'
import { formsAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          if (req.query.submissions === 'true') {
            const submissions = await formsAPI.getSubmissions(Number(req.query.id))
            return res.status(200).json(submissions)
          }
          const form = await formsAPI.getById(Number(req.query.id))
          return res.status(200).json(form)
        }
        const forms = await formsAPI.getAll()
        return res.status(200).json(forms)

      case 'POST':
        const newForm = await formsAPI.create(req.body)
        return res.status(201).json(newForm)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await formsAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await formsAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Forms API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
