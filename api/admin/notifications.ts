import type { VercelRequest, VercelResponse } from '@vercel/node'
import { notificationsAPI } from '../../lib/services/api.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const notification = await notificationsAPI.getById(Number(req.query.id))
          return res.status(200).json(notification)
        }
        const notifications = await notificationsAPI.getAll()
        return res.status(200).json(notifications)

      case 'POST':
        const newNotification = await notificationsAPI.create(req.body)
        return res.status(201).json(newNotification)

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updated = await notificationsAPI.update(Number(req.query.id), req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await notificationsAPI.delete(Number(req.query.id))
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Notifications API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
