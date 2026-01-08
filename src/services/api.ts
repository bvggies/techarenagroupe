import { db } from '../db/connection'
import * as schema from '../db/schema'
import { eq, desc, and, or, like, sql } from 'drizzle-orm'
import { generateToken, comparePassword } from '../utils/auth'

// Check if we're in production (Vercel) or development
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
const useAPI = isProduction // Use API endpoints in production, direct DB in development

const API_BASE = '/api'

// Auth API
export const authAPI = {
  async login(email: string, password: string) {
    if (useAPI) {
      // Use API endpoint in production
      const { authAPIClient } = await import('./apiClient')
      return authAPIClient.login(email, password)
    }

    // Direct DB access in development
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  },
}

// Content API
export const contentAPI = {
  async getAll() {
    return db.select().from(schema.content).orderBy(desc(schema.content.createdAt))
  },

  async getById(id: number) {
    const [item] = await db
      .select()
      .from(schema.content)
      .where(eq(schema.content.id, id))
      .limit(1)
    return item
  },

  async create(data: {
    title: string
    slug: string
    content: string
    type: string
    status?: string
    authorId?: number
    metadata?: any
  }) {
    const [newItem] = await db
      .insert(schema.content)
      .values({
        ...data,
        status: data.status || 'draft',
        updatedAt: new Date(),
      })
      .returning()
    return newItem
  },

  async update(id: number, data: Partial<typeof schema.content.$inferInsert>) {
    const [updated] = await db
      .update(schema.content)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.content.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.content).where(eq(schema.content.id, id))
  },
}

// Analytics API
export const analyticsAPI = {
  async getAll(limit = 100) {
    return db
      .select()
      .from(schema.analytics)
      .orderBy(desc(schema.analytics.createdAt))
      .limit(limit)
  },

  async getStats() {
    const totalEvents = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.analytics)

    const eventsByCategory = await db
      .select({
        category: schema.analytics.category,
        count: sql<number>`count(*)`,
      })
      .from(schema.analytics)
      .groupBy(schema.analytics.category)

    return {
      totalEvents: totalEvents[0]?.count || 0,
      eventsByCategory,
    }
  },

  async create(data: {
    event: string
    category?: string
    userId?: number
    sessionId?: string
    metadata?: any
  }) {
    const [newEvent] = await db.insert(schema.analytics).values(data).returning()
    return newEvent
  },
}

// Quotes API
export const quotesAPI = {
  async getAll() {
    return db.select().from(schema.quotes).orderBy(desc(schema.quotes.createdAt))
  },

  async getById(id: number) {
    const [quote] = await db
      .select()
      .from(schema.quotes)
      .where(eq(schema.quotes.id, id))
      .limit(1)
    return quote
  },

  async create(data: typeof schema.quotes.$inferInsert) {
    const [newQuote] = await db.insert(schema.quotes).values(data).returning()
    return newQuote
  },

  async update(id: number, data: Partial<typeof schema.quotes.$inferInsert>) {
    const [updated] = await db
      .update(schema.quotes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.quotes.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.quotes).where(eq(schema.quotes.id, id))
  },
}

// Support Tickets API
export const ticketsAPI = {
  async getAll() {
    return db
      .select()
      .from(schema.supportTickets)
      .orderBy(desc(schema.supportTickets.createdAt))
  },

  async getById(id: number) {
    const [ticket] = await db
      .select()
      .from(schema.supportTickets)
      .where(eq(schema.supportTickets.id, id))
      .limit(1)
    return ticket
  },

  async create(data: typeof schema.supportTickets.$inferInsert) {
    const ticketNumber = `TICK-${Date.now().toString().slice(-6)}`
    const [newTicket] = await db
      .insert(schema.supportTickets)
      .values({ ...data, ticketNumber })
      .returning()
    return newTicket
  },

  async update(id: number, data: Partial<typeof schema.supportTickets.$inferInsert>) {
    const [updated] = await db
      .update(schema.supportTickets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.supportTickets.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.supportTickets).where(eq(schema.supportTickets.id, id))
  },
}

// Statuses API
export const statusesAPI = {
  async getAll(type?: string) {
    if (type) {
      return db
        .select()
        .from(schema.statuses)
        .where(eq(schema.statuses.type, type))
        .orderBy(schema.statuses.order)
    }
    return db.select().from(schema.statuses).orderBy(schema.statuses.order)
  },

  async getById(id: number) {
    const [status] = await db
      .select()
      .from(schema.statuses)
      .where(eq(schema.statuses.id, id))
      .limit(1)
    return status
  },

  async create(data: typeof schema.statuses.$inferInsert) {
    const [newStatus] = await db.insert(schema.statuses).values(data).returning()
    return newStatus
  },

  async update(id: number, data: Partial<typeof schema.statuses.$inferInsert>) {
    const [updated] = await db
      .update(schema.statuses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.statuses.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.statuses).where(eq(schema.statuses.id, id))
  },
}

// Forms API
export const formsAPI = {
  async getAll() {
    return db.select().from(schema.forms).orderBy(desc(schema.forms.createdAt))
  },

  async getById(id: number) {
    const [form] = await db
      .select()
      .from(schema.forms)
      .where(eq(schema.forms.id, id))
      .limit(1)
    return form
  },

  async getSubmissions(formId: number) {
    return db
      .select()
      .from(schema.formSubmissions)
      .where(eq(schema.formSubmissions.formId, formId))
      .orderBy(desc(schema.formSubmissions.createdAt))
  },

  async create(data: typeof schema.forms.$inferInsert) {
    const [newForm] = await db.insert(schema.forms).values(data).returning()
    return newForm
  },

  async update(id: number, data: Partial<typeof schema.forms.$inferInsert>) {
    const [updated] = await db
      .update(schema.forms)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.forms.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.forms).where(eq(schema.forms.id, id))
  },
}

// Indicators API
export const indicatorsAPI = {
  async getAll() {
    return db.select().from(schema.indicators).orderBy(desc(schema.indicators.createdAt))
  },

  async getById(id: number) {
    const [indicator] = await db
      .select()
      .from(schema.indicators)
      .where(eq(schema.indicators.id, id))
      .limit(1)
    return indicator
  },

  async create(data: typeof schema.indicators.$inferInsert) {
    const [newIndicator] = await db.insert(schema.indicators).values(data).returning()
    return newIndicator
  },

  async update(id: number, data: Partial<typeof schema.indicators.$inferInsert>) {
    const [updated] = await db
      .update(schema.indicators)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.indicators.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.indicators).where(eq(schema.indicators.id, id))
  },
}

// Pricing Plans API
export const pricingAPI = {
  async getAll() {
    return db.select().from(schema.pricingPlans).orderBy(schema.pricingPlans.order)
  },

  async getById(id: number) {
    const [plan] = await db
      .select()
      .from(schema.pricingPlans)
      .where(eq(schema.pricingPlans.id, id))
      .limit(1)
    return plan
  },

  async create(data: typeof schema.pricingPlans.$inferInsert) {
    const [newPlan] = await db.insert(schema.pricingPlans).values(data).returning()
    return newPlan
  },

  async update(id: number, data: Partial<typeof schema.pricingPlans.$inferInsert>) {
    const [updated] = await db
      .update(schema.pricingPlans)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.pricingPlans.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.pricingPlans).where(eq(schema.pricingPlans.id, id))
  },
}

// Reviews API
export const reviewsAPI = {
  async getAll() {
    return db.select().from(schema.reviews).orderBy(desc(schema.reviews.createdAt))
  },

  async getById(id: number) {
    const [review] = await db
      .select()
      .from(schema.reviews)
      .where(eq(schema.reviews.id, id))
      .limit(1)
    return review
  },

  async getPublished() {
    return db
      .select()
      .from(schema.reviews)
      .where(eq(schema.reviews.isPublished, true))
      .orderBy(desc(schema.reviews.createdAt))
  },

  async create(data: typeof schema.reviews.$inferInsert) {
    const [newReview] = await db.insert(schema.reviews).values(data).returning()
    return newReview
  },

  async update(id: number, data: Partial<typeof schema.reviews.$inferInsert>) {
    const [updated] = await db
      .update(schema.reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.reviews.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.reviews).where(eq(schema.reviews.id, id))
  },
}

// Social Media API
export const socialMediaAPI = {
  async getAll() {
    return db
      .select()
      .from(schema.socialMediaPosts)
      .orderBy(desc(schema.socialMediaPosts.createdAt))
  },

  async getById(id: number) {
    const [post] = await db
      .select()
      .from(schema.socialMediaPosts)
      .where(eq(schema.socialMediaPosts.id, id))
      .limit(1)
    return post
  },

  async create(data: typeof schema.socialMediaPosts.$inferInsert) {
    const [newPost] = await db.insert(schema.socialMediaPosts).values(data).returning()
    return newPost
  },

  async update(id: number, data: Partial<typeof schema.socialMediaPosts.$inferInsert>) {
    const [updated] = await db
      .update(schema.socialMediaPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.socialMediaPosts.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.socialMediaPosts).where(eq(schema.socialMediaPosts.id, id))
  },
}

// Notifications API
export const notificationsAPI = {
  async getAll() {
    return db
      .select()
      .from(schema.pushNotifications)
      .orderBy(desc(schema.pushNotifications.createdAt))
  },

  async getById(id: number) {
    const [notification] = await db
      .select()
      .from(schema.pushNotifications)
      .where(eq(schema.pushNotifications.id, id))
      .limit(1)
    return notification
  },

  async create(data: typeof schema.pushNotifications.$inferInsert) {
    const [newNotification] = await db
      .insert(schema.pushNotifications)
      .values(data)
      .returning()
    return newNotification
  },

  async update(id: number, data: Partial<typeof schema.pushNotifications.$inferInsert>) {
    const [updated] = await db
      .update(schema.pushNotifications)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.pushNotifications.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.pushNotifications).where(eq(schema.pushNotifications.id, id))
  },
}

// SEO API
export const seoAPI = {
  async getAll() {
    return db.select().from(schema.seoSettings).orderBy(schema.seoSettings.page)
  },

  async getByPage(page: string) {
    const [seo] = await db
      .select()
      .from(schema.seoSettings)
      .where(eq(schema.seoSettings.page, page))
      .limit(1)
    return seo
  },

  async create(data: typeof schema.seoSettings.$inferInsert) {
    const [newSEO] = await db.insert(schema.seoSettings).values(data).returning()
    return newSEO
  },

  async update(page: string, data: Partial<typeof schema.seoSettings.$inferInsert>) {
    const [updated] = await db
      .update(schema.seoSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.seoSettings.page, page))
      .returning()
    return updated
  },

  async delete(page: string) {
    await db.delete(schema.seoSettings).where(eq(schema.seoSettings.page, page))
  },
}

// Playbooks API
export const playbooksAPI = {
  async getAll() {
    return db.select().from(schema.playbooks).orderBy(desc(schema.playbooks.createdAt))
  },

  async getById(id: number) {
    const [playbook] = await db
      .select()
      .from(schema.playbooks)
      .where(eq(schema.playbooks.id, id))
      .limit(1)
    return playbook
  },

  async create(data: typeof schema.playbooks.$inferInsert) {
    const [newPlaybook] = await db.insert(schema.playbooks).values(data).returning()
    return newPlaybook
  },

  async update(id: number, data: Partial<typeof schema.playbooks.$inferInsert>) {
    const [updated] = await db
      .update(schema.playbooks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.playbooks.id, id))
      .returning()
    return updated
  },

  async delete(id: number) {
    await db.delete(schema.playbooks).where(eq(schema.playbooks.id, id))
  },
}

// Site Settings API
export const siteSettingsAPI = {
  async getAll() {
    return db.select().from(schema.siteSettings).orderBy(schema.siteSettings.key)
  },

  async getByKey(key: string) {
    const [setting] = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.key, key))
      .limit(1)
    return setting
  },

  async create(data: typeof schema.siteSettings.$inferInsert) {
    const [newSetting] = await db.insert(schema.siteSettings).values(data).returning()
    return newSetting
  },

  async update(key: string, data: Partial<typeof schema.siteSettings.$inferInsert>) {
    const [updated] = await db
      .update(schema.siteSettings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.siteSettings.key, key))
      .returning()
    return updated
  },

  async delete(key: string) {
    await db.delete(schema.siteSettings).where(eq(schema.siteSettings.key, key))
  },
}

// Dashboard Stats API
export const dashboardAPI = {
  async getStats() {
    if (useAPI) {
      const { dashboardAPIClient } = await import('./apiClient')
      return dashboardAPIClient.getStats()
    }

    // Direct DB access in development
    const [usersCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.users)

    const [contentCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.content)

    const [quotesCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.quotes)
      .where(eq(schema.quotes.status, 'pending'))

    const [ticketsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.supportTickets)
      .where(eq(schema.supportTickets.status, 'open'))

    const [projectsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.indicators)
      .where(eq(schema.indicators.type, 'project'))

    const [reviewsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.reviews)

    return {
      users: usersCount?.count || 0,
      content: contentCount?.count || 0,
      quotes: quotesCount?.count || 0,
      tickets: ticketsCount?.count || 0,
      projects: projectsCount?.count || 0,
      reviews: reviewsCount?.count || 0,
    }
  },
}
