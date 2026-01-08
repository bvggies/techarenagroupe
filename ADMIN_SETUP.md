# Admin Dashboard Setup Guide

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory with your database connection:

```env
DATABASE_URL=postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 2. Database Migration

Run the migration script to create all database tables:

```bash
pnpm run db:migrate
```

Or use the setup script:

```bash
node scripts/setup-db.js
```

### 3. Database Seeding

Seed the database with initial data:

```bash
pnpm run db:seed
```

This will create:
- Admin user (admin@techarena.com / admin123)
- Sample content
- Sample quotes, tickets, reviews
- Pricing plans
- Status definitions
- Forms and settings

### 4. Access Admin Dashboard

1. Start the development server:
   ```bash
   pnpm run dev
   ```

2. Navigate to `/admin/login` in your browser

3. Login with:
   - Email: `admin@techarena.com`
   - Password: `admin123`

## 📊 Database Schema

The admin dashboard uses the following main tables:

- **users** - Admin and user accounts
- **content** - CMS content (pages, posts, sections)
- **analytics** - Event tracking and analytics
- **quotes** - Client quotes and proposals
- **support_tickets** - Customer support tickets
- **statuses** - Status definitions for various entities
- **forms** - Dynamic form definitions
- **form_submissions** - Form submission data
- **indicators** - Progress indicators and metrics
- **pricing_plans** - Pricing table configurations
- **reviews** - Customer reviews
- **social_media_posts** - Social media content
- **push_notifications** - Notification management
- **seo_settings** - SEO configurations per page
- **playbooks** - Documentation and playbooks
- **site_settings** - Global site settings

## 🎯 Admin Dashboard Features

### Content Management
- Create, edit, and manage pages, posts, and sections
- Content versioning and status management
- Rich text editor support

### Analytics
- View website analytics and metrics
- Event tracking and reporting
- User behavior analysis

### Quotes Management
- View and manage client quotes
- Status tracking (pending, approved, rejected)
- Assignment to team members

### Support Tickets
- Ticket management system
- Priority and status tracking
- Assignment and resolution workflow

### Status Management
- Define custom statuses for projects, tickets, quotes
- Color coding and ordering
- Active/inactive status control

### Form Management
- Create dynamic forms
- View form submissions
- Form analytics

### CMS
- Content management system
- Media library
- Content scheduling

### Indicators Management
- Manage progress indicators
- Skill levels and project progress
- Achievement badges

### Pricing Tables
- Create and manage pricing plans
- Feature lists
- Popular plan highlighting

### Reviews Management
- Moderate reviews
- Verify and publish reviews
- Review analytics

### Social Media Management
- Schedule social media posts
- Multi-platform support
- Content calendar

### Push Notifications
- Create and schedule notifications
- Target audience selection
- Notification analytics

### SEO Management
- Page-specific SEO settings
- Meta tags and descriptions
- Open Graph configuration

### Playbooks
- Create and manage documentation
- Category organization
- Search functionality

### Site Settings
- Global site configuration
- Feature toggles
- Maintenance mode

## 🔧 Development

### Running Migrations

```bash
pnpm run db:migrate
```

### Generating Migrations (Drizzle)

```bash
pnpm run db:generate
```

### Pushing Schema Changes

```bash
pnpm run db:push
```

### Seeding Database

```bash
pnpm run db:seed
```

## 🔐 Security

- All admin routes require authentication
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (admin, editor, user)

## 📝 API Integration

The admin dashboard is designed to work with a backend API. Currently, it uses mock data for development. To connect to a real backend:

1. Update API endpoints in admin components
2. Configure CORS on your backend
3. Set up authentication middleware
4. Implement database queries using Drizzle ORM

## 🚨 Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` in `.env`
- Check SSL mode requirements for Neon
- Ensure database is accessible from your IP

### Migration Errors

- Check if tables already exist
- Verify database permissions
- Review migration SQL for syntax errors

### Authentication Issues

- Clear browser localStorage
- Verify JWT_SECRET is set
- Check token expiration

## 📚 Next Steps

1. **Backend API**: Set up Express.js or similar backend
2. **Real-time Updates**: Add WebSocket support
3. **File Uploads**: Implement media management
4. **Advanced Analytics**: Integrate Google Analytics
5. **Email Notifications**: Set up email service
6. **Backup System**: Implement database backups

## 🆘 Support

For issues or questions:
- Check the database connection
- Review migration logs
- Verify environment variables
- Check browser console for errors
