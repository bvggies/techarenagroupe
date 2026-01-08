import { pgTable, text, timestamp, boolean, integer, jsonb, varchar, serial, pgEnum } from 'drizzle-orm/pg-core'

// Users and Authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user').notNull(), // admin, user, editor
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Content Management
export const content = pgTable('content', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // page, post, section
  status: varchar('status', { length: 50 }).default('draft').notNull(), // draft, published, archived
  authorId: integer('author_id').references(() => users.id),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Analytics
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  event: varchar('event', { length: 100 }).notNull(),
  category: varchar('category', { length: 100 }),
  userId: integer('user_id'),
  sessionId: varchar('session_id', { length: 255 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Quotes
export const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  projectType: varchar('project_type', { length: 100 }).notNull(),
  description: text('description').notNull(),
  budget: integer('budget'),
  status: varchar('status', { length: 50 }).default('pending').notNull(), // pending, approved, rejected, completed
  assignedTo: integer('assigned_to').references(() => users.id),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Support Tickets
export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  ticketNumber: varchar('ticket_number', { length: 50 }).notNull().unique(),
  subject: varchar('subject', { length: 255 }).notNull(),
  description: text('description').notNull(),
  priority: varchar('priority', { length: 50 }).default('medium').notNull(), // low, medium, high, urgent
  status: varchar('status', { length: 50 }).default('open').notNull(), // open, in-progress, resolved, closed
  createdBy: integer('created_by').references(() => users.id),
  assignedTo: integer('assigned_to').references(() => users.id),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Status Management
export const statuses = pgTable('statuses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // project, ticket, quote, etc.
  color: varchar('color', { length: 50 }),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Forms
export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  fields: jsonb('fields').notNull(),
  settings: jsonb('settings'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const formSubmissions = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').references(() => forms.id).notNull(),
  data: jsonb('data').notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Indicators
export const indicators = pgTable('indicators', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // project, skill, achievement
  value: integer('value').notNull(),
  maxValue: integer('max_value'),
  color: varchar('color', { length: 50 }),
  metadata: jsonb('metadata'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Pricing Tables
export const pricingPlans = pgTable('pricing_plans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  currency: varchar('currency', { length: 10 }).default('USD').notNull(),
  features: jsonb('features'),
  isPopular: boolean('is_popular').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Social Media
export const socialMediaPosts = pgTable('social_media_posts', {
  id: serial('id').primaryKey(),
  platform: varchar('platform', { length: 50 }).notNull(), // facebook, twitter, instagram, linkedin
  content: text('content').notNull(),
  mediaUrl: varchar('media_url', { length: 500 }),
  scheduledAt: timestamp('scheduled_at'),
  status: varchar('status', { length: 50 }).default('draft').notNull(), // draft, scheduled, published
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Push Notifications
export const pushNotifications = pgTable('push_notifications', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }), // info, success, warning, error
  targetAudience: varchar('target_audience', { length: 50 }), // all, specific
  scheduledAt: timestamp('scheduled_at'),
  status: varchar('status', { length: 50 }).default('draft').notNull(), // draft, scheduled, sent
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// SEO Management
export const seoSettings = pgTable('seo_settings', {
  id: serial('id').primaryKey(),
  page: varchar('page', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  keywords: text('keywords'),
  ogImage: varchar('og_image', { length: 500 }),
  canonicalUrl: varchar('canonical_url', { length: 500 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Playbooks
export const playbooks = pgTable('playbooks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }),
  tags: jsonb('tags'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Site Settings
export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value'),
  type: varchar('type', { length: 50 }), // string, number, boolean, json
  category: varchar('category', { length: 100 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
