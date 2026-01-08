import { db } from './connection'
import * as schema from './schema'
import { sql } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function migrate() {
  try {
    console.log('🔄 Starting database migration...')

    // Create tables in order (respecting foreign key dependencies)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS content (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'draft' NOT NULL,
        author_id INTEGER REFERENCES users(id),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        event VARCHAR(100) NOT NULL,
        category VARCHAR(100),
        user_id INTEGER,
        session_id VARCHAR(255),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        project_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        budget INTEGER,
        status VARCHAR(50) DEFAULT 'pending' NOT NULL,
        assigned_to INTEGER REFERENCES users(id),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id SERIAL PRIMARY KEY,
        ticket_number VARCHAR(50) NOT NULL UNIQUE,
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        priority VARCHAR(50) DEFAULT 'medium' NOT NULL,
        status VARCHAR(50) DEFAULT 'open' NOT NULL,
        created_by INTEGER REFERENCES users(id),
        assigned_to INTEGER REFERENCES users(id),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS statuses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        color VARCHAR(50),
        "order" INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS forms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        fields JSONB NOT NULL,
        settings JSONB,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id SERIAL PRIMARY KEY,
        form_id INTEGER REFERENCES forms(id) NOT NULL,
        data JSONB NOT NULL,
        ip_address VARCHAR(50),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS indicators (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        value INTEGER NOT NULL,
        max_value INTEGER,
        color VARCHAR(50),
        metadata JSONB,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pricing_plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price INTEGER NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD' NOT NULL,
        features JSONB,
        is_popular BOOLEAN DEFAULT false NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        is_verified BOOLEAN DEFAULT false NOT NULL,
        is_published BOOLEAN DEFAULT false NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS social_media_posts (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        media_url VARCHAR(500),
        scheduled_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'draft' NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS push_notifications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50),
        target_audience VARCHAR(50),
        scheduled_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'draft' NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS seo_settings (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255),
        description TEXT,
        keywords TEXT,
        og_image VARCHAR(500),
        canonical_url VARCHAR(500),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS playbooks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100),
        tags JSONB,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) NOT NULL UNIQUE,
        value TEXT,
        type VARCHAR(50),
        category VARCHAR(100),
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    console.log('✅ Database migration completed successfully!')
  } catch (error) {
    console.error('❌ Error migrating database:', error)
    throw error
  }
}

migrate()
  .then(() => {
    console.log('✅ Migration process finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Migration process failed:', error)
    process.exit(1)
  })
