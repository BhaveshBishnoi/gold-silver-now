# Deployment Guide for Gold Silver Now

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Domain configured (goldsilvernow.in)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="https://goldsilvernow.in"
NEXTAUTH_SECRET="your-generated-secret-key"

# Optional
NODE_ENV="production"
```

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

### 3. Create Admin User

You need to create at least one admin user. Run this script:

```bash
node scripts/create-admin.js
```

Or manually insert into database:
```sql
INSERT INTO "User" (id, name, email, password, role, "createdAt")
VALUES (
  'admin-id',
  'Admin',
  'admin@goldsilvernow.in',
  '$2a$10$YourHashedPasswordHere',
  'admin',
  NOW()
);
```

To hash a password, use:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-password', 10);
console.log(hash);
```

### 4. Build Application
```bash
npm run build
```

### 5. Start Production Server
```bash
npm start
```

## Vercel Deployment

### 1. Connect Repository
- Import your GitHub repository to Vercel
- Select the project

### 2. Configure Environment Variables
Add these in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_URL` (https://goldsilvernow.in)
- `NEXTAUTH_SECRET`

### 3. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test admin login at `/admin/login`
- [ ] Check sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test API endpoints (`/api/prices`, `/api/blogs/latest`)
- [ ] Check SSL certificate
- [ ] Test all pages load correctly

## Troubleshooting

### Auth Error on Login
1. Verify `NEXTAUTH_URL` matches your domain exactly
2. Ensure `NEXTAUTH_SECRET` is set (not empty)
3. Check database connection
4. Verify user exists with correct password hash

### Database Connection Issues
1. Check `DATABASE_URL` format
2. Verify database is accessible from deployment server
3. Check firewall rules
4. Ensure SSL mode if required

### Build Errors
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Regenerate Prisma: `npx prisma generate`

## Monitoring

- Check Vercel logs for errors
- Monitor database connections
- Set up error tracking (Sentry, etc.)
- Monitor API response times

## Security

- Never commit `.env` file
- Use strong `NEXTAUTH_SECRET`
- Regularly update dependencies
- Enable HTTPS only
- Set up rate limiting for API routes
- Regular database backups

## Support

For issues, check:
1. Vercel deployment logs
2. Browser console errors
3. Network tab for API failures
4. Database logs
