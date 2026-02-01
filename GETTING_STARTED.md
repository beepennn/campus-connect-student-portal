# CampusConnect - Getting Started Guide

## Quick Start

### 1. View the Live Application
The app is running in preview mode. You can immediately start testing!

### 2. Create Your Accounts

#### Student Account:
1. Click **Sign Up**
2. Enter email: `student@example.com` (or any email)
3. Enter password: `StudentPassword123!`
4. Select **Student** as user type
5. Click **Sign Up**
6. Verify your email (check inbox/spam)
7. Log in

#### Admin Account:
1. Click **Sign Up**
2. Enter email: `admin@example.com` (or any email)
3. Enter password: `AdminPassword123!`
4. Select **Admin** as user type
5. Click **Sign Up**
6. Verify your email (check inbox/spam)
7. Log in

### 3. Test Admin Features

**As Admin, you can:**

1. **Create Notices** (go to Admin Panel → Manage Notices)
   - Add title and description
   - Click "Publish Notice"
   - See it appear in the list

2. **Upload Materials** (go to Admin Panel → Manage Materials)
   - Add title, subject, and description
   - Click "Publish Material"
   - Organize by subject

3. **Schedule Events** (go to Admin Panel → Manage Events)
   - Add title, date, time, and location
   - Click "Create Event"
   - Events show sorted by date

4. **Post Announcements** (go to Admin Panel → Manage Announcements)
   - Add quick announcement text
   - Click "Post Announcement"

### 4. View as Student

1. **Log out** from admin account
2. **Log in** with student account
3. Go to **Dashboard**
4. See all content created by admin:
   - Notices in "Latest Notices" section
   - Materials in "Course Materials" section
   - Events in "Upcoming Events" section
   - Announcements in "Quick Announcements" section

---

## Key Features

✅ **Complete Admin Dashboard** - Manage all campus content
✅ **Notices System** - Publish important announcements
✅ **Materials Management** - Organize course materials by subject
✅ **Event Scheduling** - Schedule campus events with dates/times
✅ **Announcements** - Post quick updates
✅ **Role-Based Access** - Admin and Student roles
✅ **Real Database** - Supabase PostgreSQL with RLS
✅ **Responsive Design** - Works on all devices
✅ **Modern UI** - Professional, clean interface

---

## What You'll See

### Admin Dashboard
- Statistics showing counts of notices, materials, events, announcements
- Quick links to manage each content type
- Clean, organized interface

### Manage Pages
- Form to create new content at the top
- List of published content below
- Edit and Delete buttons for each item
- Real-time updates

### Student Dashboard
- Welcome banner with personalized greeting
- Latest notices board
- Course materials by subject
- Upcoming events with dates
- Quick announcements sidebar

---

## Tech Stack

- **Frontend**: Next.js 16 + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

---

## Database Structure

### Tables:
- `profiles` - User information (name, role, type)
- `notices` - Campus announcements
- `materials` - Course materials with subject classification
- `events` - Scheduled campus events
- `announcements` - Quick announcements

All data is protected with Row Level Security (RLS) policies.

---

## Common Actions

### Create a Notice
Admin Panel → Manage Notices → Fill form → Publish Notice

### View Student Dashboard
Log in as Student → Click "Dashboard" → See all admin content

### Edit Content
Go to Admin Panel → Choose content type → Click "Edit" → Make changes → Save

### Delete Content
Go to Admin Panel → Choose content type → Click "Delete" → Confirm

---

## Need Help?

- See **ADMIN_GUIDE.md** for detailed admin feature instructions
- All forms have placeholder text explaining what to enter
- Error messages will appear if something goes wrong
- Try refreshing the page if content doesn't appear

---

## What's Next?

After testing:
1. Show to your teacher
2. Deploy to production (click "Publish" button)
3. Share the link with users
4. Start creating campus content!

Enjoy using CampusConnect! 🎓
