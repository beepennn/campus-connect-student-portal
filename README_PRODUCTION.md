# CampusConnect - Production Deployment Guide

## Overview
CampusConnect is a fully-featured campus communication platform built with Next.js 16, React, TypeScript, Tailwind CSS, and Supabase. This document covers production deployment, setup, and operations.

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling with design tokens
- **shadcn/ui** - Component library

### Backend
- **Next.js Server Actions** - Backend logic
- **API Routes** - RESTful endpoints
- **Supabase** - PostgreSQL database

### Database
- **PostgreSQL** (via Supabase)
- **Row Level Security (RLS)** - Data protection
- **Supabase Storage** - File uploads

## Features

### For Students
✓ View campus notices
✓ Browse course materials (organized by subject)
✓ Discover campus events
✓ Read quick announcements
✓ View personal profile
✓ Manage account settings

### For Admins/Faculty
✓ Create and publish notices
✓ Upload course materials with files
✓ Schedule campus events
✓ Post announcements
✓ Manage all content
✓ Full CRUD operations on all content types

## Deployment Steps

### 1. Prerequisites
- Node.js 18+ installed
- Supabase project set up
- GitHub repository (for CI/CD)

### 2. Environment Setup

Create `.env.local` in the root directory:

```env
# Supabase URLs and Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret
```

### 3. Database Setup

Run migrations in order:

```bash
# 1. Create tables and RLS policies
supabase sql /scripts/001_create_schema.sql

# 2. Create profile trigger
supabase sql /scripts/002_profile_trigger.sql

# 3. Fix RLS policies for notices and announcements
supabase sql /scripts/004_fix_rls_policies.sql
```

### 4. Storage Bucket Setup

In Supabase Dashboard:

1. Go to **Storage** → **New Bucket**
2. Create bucket named `materials`
3. Set to **Public** (check "Public bucket")
4. Upload policies are handled by database RLS

### 5. Installation & Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel (recommended)
vercel deploy --prod
```

## API Endpoints

### Notices
- `GET /api/notices` - List all notices
- `POST /api/notices` - Create notice (admin only)
- `PUT /api/notices/[id]` - Update notice (admin only)
- `DELETE /api/notices/[id]` - Delete notice (admin only)

### Announcements
- `GET /api/announcements` - List announcements
- `POST /api/announcements` - Create announcement (admin only)
- `PUT /api/announcements/[id]` - Update announcement (admin only)
- `DELETE /api/announcements/[id]` - Delete announcement (admin only)

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/[id]` - Update event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### Materials
- `GET /api/materials` - List materials

## Database Schema

### Users
- Stored in `auth.users` (Supabase Auth)
- Metadata: `user_type` (student/admin), `full_name`

### Tables
1. **profiles** - User profile data with RLS
2. **notices** - Campus notices (created_by, content, title)
3. **materials** - Course materials (file_url, subject, uploaded_by)
4. **events** - Campus events (start_date, location, created_by)
5. **announcements** - Quick announcements (title, description)

All tables have RLS enabled:
- Students: can view all content
- Admins: can create, update, delete their content

## File Upload

Materials support file uploads (max 50MB):
- PDF, DOC, DOCX
- XLS, XLSX, PPT, PPTX
- TXT, JPG, JPEG, PNG

Files stored in Supabase Storage at:
`https://your-project.supabase.co/storage/v1/object/public/materials/{file_path}`

## Security

### Authentication
- Supabase Auth with email/password
- JWT tokens in HTTP-only cookies
- Session management via proxy middleware

### Row Level Security
- Users can only access their own profile
- RLS policies enforce role-based access
- All database queries filtered by auth.uid()

### Authorization
- Admin role checked in API routes
- User metadata: `user_type` = 'admin' or 'student'
- Middleware protects `/protected/*` routes

## Monitoring & Logs

### Enable Debug Logging
- Debug logs use `console.log("[v0] ...")` format
- Check browser console for client errors
- Check server logs in Vercel dashboard

### Common Issues

**Notices/Announcements not saving:**
- Check RLS policies are applied
- Verify user is marked as admin
- Check API response in browser DevTools

**File uploads failing:**
- Verify storage bucket exists and is public
- Check file size < 50MB
- Ensure proper MIME types

**Permission denied errors:**
- Verify email is confirmed after signup
- Check user_type metadata is set
- Ensure RLS policies are correct

## Scaling Considerations

### For Large Deployments
1. Enable database connection pooling (Supabase PgBouncer)
2. Use CDN for static assets (Vercel Edge Network)
3. Implement caching with Redis (optional)
4. Monitor database query performance

### Rate Limiting
- Implement API rate limiting for file uploads
- Add request validation for large payloads
- Monitor bandwidth usage

## Backup & Recovery

### Database Backups
- Supabase automatic daily backups (included)
- Manual backups via Supabase dashboard
- Point-in-time recovery available

### File Backups
- Storage bucket objects backed up by Supabase
- Download files regularly for offsite storage

## Support & Troubleshooting

### Getting Help
1. Check browser console for errors
2. Review server logs in Vercel dashboard
3. Check Supabase project status
4. Verify environment variables are set

### Common Fixes
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Reset database
# (go to Supabase dashboard → SQL editor → run migration scripts)

# Check Supabase connection
supabase projects list
```

## Performance Tips

1. Use browser caching headers
2. Optimize images before upload
3. Implement pagination for large lists
4. Use database indexes on frequently queried fields
5. Monitor Core Web Vitals in Vercel Analytics

## Version Control & CI/CD

Push to GitHub for automatic Vercel deployment:
```bash
git push origin main  # Triggers production build
```

## Contact & Maintenance

For issues or questions, contact your development team or refer to the CampusConnect documentation.
