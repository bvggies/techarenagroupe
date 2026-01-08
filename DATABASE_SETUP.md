# Database Setup Instructions

## 🗄️ Neon PostgreSQL Database Setup

Your database connection string:
```
postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 📝 Step-by-Step Setup

### 1. Create .env File

Create a `.env` file in the root directory with:

```env
DATABASE_URL=postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 2. Run Database Migration

This will create all the necessary tables:

```bash
pnpm run db:migrate
```

Or manually using psql:

```bash
psql "postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require" -f src/db/migrate.sql
```

### 3. Seed the Database

This will populate initial data including admin user:

```bash
pnpm run db:seed
```

### 4. Verify Setup

Check that tables were created:

```sql
\dt
```

You should see tables like:
- users
- content
- analytics
- quotes
- support_tickets
- statuses
- forms
- form_submissions
- indicators
- pricing_plans
- reviews
- social_media_posts
- push_notifications
- seo_settings
- playbooks
- site_settings

## 🔐 Default Admin Credentials

After seeding:
- **Email**: `admin@techarena.com`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change the password immediately after first login!

## 📊 Database Schema Overview

### Core Tables

1. **users** - User accounts and authentication
2. **content** - CMS content (pages, posts, sections)
3. **analytics** - Event tracking and analytics data
4. **quotes** - Client quotes and proposals
5. **support_tickets** - Customer support system
6. **statuses** - Status definitions for various entities
7. **forms** - Dynamic form definitions
8. **form_submissions** - Form submission data
9. **indicators** - Progress indicators and metrics
10. **pricing_plans** - Pricing table configurations
11. **reviews** - Customer reviews and ratings
12. **social_media_posts** - Social media content scheduling
13. **push_notifications** - Notification management
14. **seo_settings** - SEO configurations per page
15. **playbooks** - Documentation and playbooks
16. **site_settings** - Global site settings

## 🔧 Troubleshooting

### Connection Issues

If you get connection errors:
1. Verify the connection string is correct
2. Check if your IP is allowed (Neon may require IP whitelisting)
3. Ensure SSL mode is set to `require`

### Migration Errors

If migrations fail:
1. Check if tables already exist
2. Verify database permissions
3. Review error messages for specific issues

### Seeding Errors

If seeding fails:
1. Ensure migrations ran successfully first
2. Check for duplicate data
3. Verify foreign key constraints

## 🚀 Quick Start Commands

```bash
# Full setup (migrate + seed)
pnpm run db:migrate && pnpm run db:seed

# Or use the setup script
node scripts/setup-db.js
```

## 📚 Next Steps

After database setup:
1. Start the dev server: `pnpm run dev`
2. Navigate to `/admin/login`
3. Login with admin credentials
4. Begin managing your content!

## 🔄 Database Maintenance

### Backup Database
```bash
pg_dump "postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require" > backup.sql
```

### Restore Database
```bash
psql "postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require" < backup.sql
```

## 📞 Support

For database issues:
- Check Neon dashboard for connection status
- Review migration logs
- Verify environment variables
- Check browser console for API errors
