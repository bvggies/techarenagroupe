# Vercel Production Deployment Guide

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables and add:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_gfaF2zYctK3l@ep-wild-water-ad7wqz0l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=your-production-secret-key-change-this
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## ⚙️ Build Configuration

The project is configured for Vercel with:

- **Framework**: Vite (auto-detected)
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

## 🔐 Environment Variables

### Required Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `production` |

### Setting Environment Variables

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for:
   - **Production**
   - **Preview** (optional)
   - **Development** (optional)

## 📝 Important Notes

### ⚠️ Database Connection in Production

**Current Setup**: The admin dashboard uses direct database connections from the client-side code. This works in development but **will not work in production** on Vercel because:

1. Vercel serves static files only
2. Database credentials should not be exposed to the client
3. Direct database connections from browser are blocked

### 🔧 Solution: API Routes

You need to create API routes (serverless functions) for database operations:

1. **Create API Routes** in `api/` directory:
   - `api/admin/login.ts` - Authentication
   - `api/admin/content.ts` - Content CRUD
   - `api/admin/quotes.ts` - Quotes management
   - etc.

2. **Update API Services** to call these endpoints instead of direct DB access

3. **Example API Route Structure**:
   ```
   api/
   ├── admin/
   │   ├── login.ts
   │   ├── content.ts
   │   ├── quotes.ts
   │   └── ...
   ```

### Alternative: Use Vercel Postgres

If you want to use Vercel's managed database:

1. Add Vercel Postgres in your project dashboard
2. Update `DATABASE_URL` to use Vercel's connection string
3. Database operations will work through serverless functions

## 🏗️ Build Process

Vercel will automatically:

1. Install dependencies: `pnpm install`
2. Run build: `pnpm run build`
3. Serve static files from `dist/` directory
4. Handle routing via `vercel.json` rewrites

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Build command configured (`pnpm run build`)
- [ ] Output directory set (`dist`)
- [ ] Security headers configured (already in `vercel.json`)
- [ ] Database migrations run (if needed)
- [ ] Admin credentials changed from default
- [ ] Analytics enabled (Vercel Analytics already integrated)

## 🔍 Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Verify Node.js version** (Vercel uses Node 18+ by default)
3. **Check for TypeScript errors**: `pnpm run build` locally
4. **Verify dependencies**: Ensure all packages are in `dependencies` not `devDependencies`

### Database Connection Issues

1. **Check environment variables** are set correctly
2. **Verify DATABASE_URL** format
3. **Check Neon database** is accessible
4. **Review IP whitelist** in Neon dashboard

### Routing Issues

- Vercel handles SPA routing via `vercel.json` rewrites
- All routes redirect to `/index.html` for client-side routing

### Performance

- Assets are automatically cached via headers in `vercel.json`
- Code splitting is configured in `vite.config.ts`
- Images should be optimized before deployment

## 🚀 Post-Deployment

After successful deployment:

1. **Test the live site**
2. **Access admin dashboard**: `https://your-domain.vercel.app/admin/login`
3. **Verify database connection** works
4. **Check analytics** in Vercel dashboard
5. **Monitor performance** using Vercel Analytics

## 📈 Monitoring

- **Vercel Analytics**: Already integrated via `@vercel/analytics`
- **Build Logs**: Available in Vercel dashboard
- **Function Logs**: Check serverless function logs if using API routes
- **Error Tracking**: Consider adding Sentry or similar

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On every pull request
- **Development**: On push to other branches (optional)

## 🎯 Next Steps

1. **Set up API routes** for database operations (required for production)
2. **Configure custom domain** (optional)
3. **Set up monitoring** and error tracking
4. **Enable preview deployments** for testing
5. **Configure branch protection** in GitHub

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Neon Database Docs](https://neon.tech/docs)
