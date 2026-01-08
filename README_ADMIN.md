# Admin Dashboard - Quick Reference

## 🎯 Setup Instructions

### Step 1: Create .env file
Create a `.env` file in the root directory:
```
DATABASE_URL=postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Step 2: Run Database Migration
```bash
pnpm run db:migrate
```

### Step 3: Seed Database
```bash
pnpm run db:seed
```

### Step 4: Start Development Server
```bash
pnpm run dev
```

### Step 5: Access Admin Dashboard
Navigate to: `http://localhost:5173/admin/login`

**Default Credentials:**
- Email: `admin@techarena.com`
- Password: `admin123`

## 📋 Available Features

✅ **Content Management** - Manage pages, posts, and sections  
✅ **Analytics Dashboard** - View website metrics  
✅ **Quotes Management** - Handle client quotes  
✅ **Support Tickets** - Customer support system  
✅ **Status Management** - Custom status definitions  
✅ **Form Management** - Dynamic form builder  
✅ **CMS** - Content management system  
✅ **Indicators Management** - Progress tracking  
✅ **Pricing Tables** - Manage pricing plans  
✅ **Reviews Management** - Moderate reviews  
✅ **Social Media** - Schedule posts  
✅ **Push Notifications** - Notification system  
✅ **SEO Management** - Page SEO settings  
✅ **Playbooks** - Documentation system  
✅ **Site Settings** - Global configuration  

## 🔧 Database Commands

```bash
# Run migrations
pnpm run db:migrate

# Seed database
pnpm run db:seed

# Generate migrations (Drizzle)
pnpm run db:generate

# Push schema changes
pnpm run db:push
```

## 📁 Project Structure

```
src/
├── db/
│   ├── schema.ts          # Database schema definitions
│   ├── connection.ts      # Database connection
│   ├── migrate.ts         # Migration script
│   └── seed.ts            # Seed script
├── pages/admin/
│   ├── AdminLogin.tsx     # Login page
│   └── AdminDashboard.tsx # Main dashboard
├── contexts/
│   └── AuthContext.tsx    # Authentication context
└── utils/
    └── auth.ts            # Auth utilities
```

## 🚀 Next Steps

1. Connect to your backend API
2. Implement full CRUD operations
3. Add file upload functionality
4. Set up real-time updates
5. Configure email notifications
