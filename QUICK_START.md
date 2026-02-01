# CampusConnect - Quick Start Guide

## What You Have

A **production-ready campus communication platform** with:
- ✅ Student dashboard
- ✅ Admin control panel
- ✅ Notices, Materials, Events, Announcements
- ✅ File uploads
- ✅ User authentication
- ✅ Responsive design

---

## To Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

---

## To Deploy to Production

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready"
git push

# 2. Go to Vercel
# → Import your GitHub repo
# → Add environment variables (see README_PRODUCTION.md)
# → Deploy

# 3. Done! Your app is live
```

---

## Test Accounts

### Create Test Accounts
1. Go to http://localhost:3000 (or your deployed URL)
2. Click "Sign Up"
3. Create accounts with:
   - **Admin Account** - Select "Faculty/Admin"
   - **Student Account** - Select "Student"

---

## Features to Test

### As Student:
1. **Dashboard** - See all campus content
2. **Notices** - Read important announcements
3. **Materials** - Browse by subject, download files
4. **Events** - See upcoming campus events
5. **Profile** - View your information

### As Admin:
1. **Admin Panel** → Click dropdown menu
2. **Manage Notices**
   - Create notice (click "Publish Notice")
   - Edit/Delete existing notices
3. **Manage Materials**
   - Upload file with description
   - Add subject (Math, Physics, etc)
   - Download files
4. **Manage Events**
   - Create event with date/time
   - Add location
   - Edit/Delete events
5. **Manage Announcements**
   - Post quick announcements
   - Edit/Delete

---

## File Upload (Materials)

**Supported Files:**
- PDF, DOC, DOCX
- XLS, XLSX, PPT, PPTX
- TXT, JPG, JPEG, PNG

**How it works:**
1. Admin → Manage Materials
2. Fill title, subject, description
3. Click file upload area and select file
4. Click "Publish Material"
5. Students can download the file

---

## Troubleshooting

### Issue: Can't log in
- ✓ Check you used correct email
- ✓ Try "Reset Password" link on login page
- ✓ Make sure to verify email after signup

### Issue: Can't access admin panel
- ✓ Make sure you're logged in as "Faculty/Admin"
- ✓ Click dropdown menu → Admin Panel

### Issue: Content not saving
- ✓ Fill ALL required fields (marked with *)
- ✓ Check error message in popup
- ✓ Try again or refresh page

### Issue: File upload fails
- ✓ Check file size (max 50MB)
- ✓ Check file type is supported
- ✓ Verify storage bucket exists

---

## Environment Setup (If needed)

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from your Supabase project settings.

---

## What's Already Done ✅

- ✅ Database schema created
- ✅ Authentication set up
- ✅ All pages built
- ✅ All components created
- ✅ API routes working
- ✅ File uploads ready
- ✅ RLS policies configured
- ✅ Error handling added
- ✅ Responsive design
- ✅ Production ready

---

## Next: Show Your Teacher! 👨‍🏫

Your app is complete and production-ready.

1. Deploy to Vercel
2. Share the URL
3. Let them test as admin and student
4. Show them how to create content
5. Demonstrate file uploads

**That's it! You're done!** 🎉

---

## Documentation

- **Full Guide:** `README_PRODUCTION.md`
- **Admin Tips:** `ADMIN_GUIDE.md`
- **Implementation:** `IMPLEMENTATION_COMPLETE.md`
- **What Was Fixed:** `FIXES_APPLIED.md`

---

Questions? Check the documentation files or review the code comments marked with `[v0]`.
