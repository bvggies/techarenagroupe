import type { VercelRequest, VercelResponse } from '@vercel/node'
import { playbooksAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const playbook = await playbooksAPI.getById(Number(req.query.id))
          return res.status(200).json(playbook)
        }
        const playbooks = await playbooksAPI.getAll()
        return res.status(200).json(playbooks)

      case 'POST':
        const newPlaybook = await playbooksAPI.create(req.body)
        return res.status(201).json(newPlaybook)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await playbooksAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await playbooksAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Playbooks API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
