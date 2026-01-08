import { db } from './connection'
import * as schema from './schema'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

async function seed() {
  try {
    console.log('🌱 Starting database seeding...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const [admin] = await db
      .insert(schema.users)
      .values({
        email: 'admin@techarena.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      })
      .returning()

    console.log('✅ Admin user created:', admin.email)

    // Create statuses
    const statuses = [
      { name: 'Draft', type: 'project', color: '#6B7280', order: 1 },
      { name: 'In Progress', type: 'project', color: '#3B82F6', order: 2 },
      { name: 'Testing', type: 'project', color: '#8B5CF6', order: 3 },
      { name: 'Completed', type: 'project', color: '#10B981', order: 4 },
      { name: 'Open', type: 'ticket', color: '#3B82F6', order: 1 },
      { name: 'In Progress', type: 'ticket', color: '#F59E0B', order: 2 },
      { name: 'Resolved', type: 'ticket', color: '#10B981', order: 3 },
      { name: 'Closed', type: 'ticket', color: '#6B7280', order: 4 },
      { name: 'Pending', type: 'quote', color: '#F59E0B', order: 1 },
      { name: 'Approved', type: 'quote', color: '#10B981', order: 2 },
      { name: 'Rejected', type: 'quote', color: '#EF4444', order: 3 },
    ]

    await db.insert(schema.statuses).values(statuses)
    console.log('✅ Statuses created')

    // Create sample content
    const contentItems = [
      {
        title: 'Welcome to TechArena',
        slug: 'welcome',
        content: 'Welcome to our website!',
        type: 'page',
        status: 'published',
        authorId: admin.id,
      },
      {
        title: 'About Us',
        slug: 'about',
        content: 'Learn more about TechArena Groupe.',
        type: 'page',
        status: 'published',
        authorId: admin.id,
      },
    ]

    await db.insert(schema.content).values(contentItems)
    console.log('✅ Sample content created')

    // Create pricing plans
    const pricingPlans = [
      {
        name: 'Starter',
        description: 'Perfect for small projects',
        price: 999,
        currency: 'USD',
        features: ['5 Pages', 'Basic Support', '1 Month Updates'],
        isPopular: false,
        order: 1,
      },
      {
        name: 'Professional',
        description: 'Ideal for growing businesses',
        price: 2999,
        currency: 'USD',
        features: ['20 Pages', 'Priority Support', '6 Months Updates', 'SEO Optimization'],
        isPopular: true,
        order: 2,
      },
      {
        name: 'Enterprise',
        description: 'For large organizations',
        price: 9999,
        currency: 'USD',
        features: [
          'Unlimited Pages',
          '24/7 Support',
          '1 Year Updates',
          'Advanced SEO',
          'Custom Features',
        ],
        isPopular: false,
        order: 3,
      },
    ]

    await db.insert(schema.pricingPlans).values(pricingPlans)
    console.log('✅ Pricing plans created')

    // Create sample reviews
    const reviews = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        rating: 5,
        comment: 'Excellent service! Highly recommended.',
        isVerified: true,
        isPublished: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        rating: 5,
        comment: 'Professional team with great attention to detail.',
        isVerified: true,
        isPublished: true,
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        rating: 4,
        comment: 'Good quality work and responsive communication.',
        isVerified: true,
        isPublished: true,
      },
    ]

    await db.insert(schema.reviews).values(reviews)
    console.log('✅ Sample reviews created')

    // Create sample quotes
    const quotes = [
      {
        clientName: 'Acme Corp',
        clientEmail: 'contact@acme.com',
        projectType: 'E-Commerce Website',
        description: 'Need a full e-commerce solution with payment integration.',
        budget: 50000,
        status: 'pending',
      },
      {
        clientName: 'Tech Startup',
        clientEmail: 'hello@techstartup.com',
        projectType: 'Mobile App',
        description: 'iOS and Android app development.',
        budget: 75000,
        status: 'approved',
      },
    ]

    await db.insert(schema.quotes).values(quotes)
    console.log('✅ Sample quotes created')

    // Create sample support tickets
    const tickets = [
      {
        ticketNumber: 'TICK-001',
        subject: 'Website not loading',
        description: 'The website is showing an error page.',
        priority: 'high',
        status: 'open',
        createdBy: admin.id,
      },
      {
        ticketNumber: 'TICK-002',
        subject: 'Feature request',
        description: 'Would like to add a new feature to the dashboard.',
        priority: 'medium',
        status: 'in-progress',
        createdBy: admin.id,
      },
    ]

    await db.insert(schema.supportTickets).values(tickets)
    console.log('✅ Sample tickets created')

    // Create sample indicators
    const indicators = [
      {
        name: 'React Expertise',
        type: 'skill',
        value: 95,
        maxValue: 100,
        color: '#61DAFB',
      },
      {
        name: 'TypeScript Proficiency',
        type: 'skill',
        value: 88,
        maxValue: 100,
        color: '#3178C6',
      },
      {
        name: 'E-Commerce Project',
        type: 'project',
        value: 75,
        maxValue: 100,
        color: '#10B981',
      },
    ]

    await db.insert(schema.indicators).values(indicators)
    console.log('✅ Sample indicators created')

    // Create sample forms
    const forms = [
      {
        name: 'Contact Form',
        slug: 'contact',
        fields: [
          { name: 'name', type: 'text', required: true, label: 'Name' },
          { name: 'email', type: 'email', required: true, label: 'Email' },
          { name: 'message', type: 'textarea', required: true, label: 'Message' },
        ],
        settings: { emailNotifications: true },
      },
      {
        name: 'Newsletter Signup',
        slug: 'newsletter',
        fields: [
          { name: 'email', type: 'email', required: true, label: 'Email Address' },
        ],
        settings: { doubleOptIn: true },
      },
    ]

    await db.insert(schema.forms).values(forms)
    console.log('✅ Sample forms created')

    // Create SEO settings
    const seoSettings = [
      {
        page: 'home',
        title: 'TechArena Groupe - Leading Tech Solutions',
        description: 'We provide cutting-edge technology solutions for your business.',
        keywords: 'tech, solutions, development, consulting',
      },
      {
        page: 'about',
        title: 'About Us - TechArena Groupe',
        description: 'Learn about our team and mission.',
        keywords: 'about, team, company',
      },
    ]

    await db.insert(schema.seoSettings).values(seoSettings)
    console.log('✅ SEO settings created')

    // Create site settings
    const siteSettings = [
      { key: 'site_name', value: 'TechArena Groupe', type: 'string', category: 'general' },
      { key: 'site_email', value: 'info@techarena.com', type: 'string', category: 'general' },
      { key: 'maintenance_mode', value: 'false', type: 'boolean', category: 'general' },
      { key: 'analytics_enabled', value: 'true', type: 'boolean', category: 'analytics' },
    ]

    await db.insert(schema.siteSettings).values(siteSettings)
    console.log('✅ Site settings created')

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

seed()
  .then(() => {
    console.log('✅ Seeding process finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error)
    process.exit(1)
  })
