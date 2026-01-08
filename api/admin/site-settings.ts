import type { VercelRequest, VercelResponse } from '@vercel/node'
import { siteSettingsAPI } from '../../src/services/api'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.key) {
          const setting = await siteSettingsAPI.getByKey(req.query.key as string)
          return res.status(200).json(setting)
        }
        const settings = await siteSettingsAPI.getAll()
        return res.status(200).json(settings)

      case 'POST':
        const newSetting = await siteSettingsAPI.create(req.body)
        return res.status(201).json(newSetting)

      case 'PUT':
        if (!req.query.key) {
          return res.status(400).json({ error: 'Key is required' })
        }
        const updated = await siteSettingsAPI.update(req.query.key as string, req.body)
        return res.status(200).json(updated)

      case 'DELETE':
        if (!req.query.key) {
          return res.status(400).json({ error: 'Key is required' })
        }
        await siteSettingsAPI.delete(req.query.key as string)
        return res.status(200).json({ success: true })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Site Settings API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
