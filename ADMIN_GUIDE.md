# CampusConnect - Admin Management Guide

## Overview
CampusConnect provides admins with a complete content management system to publish notices, materials, events, and announcements for the campus community.

## Getting Started

### 1. **Sign Up as Admin**
- Go to the Sign Up page
- Enter your email and password
- Select **Admin** as your user type
- Click "Sign Up"
- Confirm your email (check inbox/spam folder)
- Log in to access the admin dashboard

### 2. **Access Admin Panel**
After logging in, click the **Admin Panel** link in the top navigation dropdown menu, or navigate directly to `/protected/admin/dashboard`

---

## Admin Features

### 📢 **Manage Notices**
Publish important campus announcements and official notices.

**How to Create a Notice:**
1. Go to Admin Dashboard → Click **Manage Notices**
2. Fill in the form:
   - **Title**: Main heading (e.g., "Campus Library Maintenance")
   - **Description**: Detailed content of the notice
3. Click **Publish Notice**
4. Your notice appears in the "Published Notices" section below

**How to Edit a Notice:**
1. Find the notice in the "Published Notices" section
2. Click **Edit**
3. Update the title or description
4. Click **Update Notice**

**How to Delete a Notice:**
1. Find the notice in the "Published Notices" section
2. Click **Delete**
3. Confirm deletion in the popup

---

### 📚 **Manage Materials**
Upload course materials and learning resources organized by subject.

**How to Upload Material:**
1. Go to Admin Dashboard → Click **Manage Materials**
2. Fill in the form:
   - **Title**: Name of the material (e.g., "Chapter 5 Lecture Notes")
   - **Subject**: Subject/Course name (e.g., "Mathematics", "Physics")
   - **Description**: Details about the material and learning objectives
3. Click **Publish Material**
4. Material appears in "Published Materials" section

**How to Edit Material:**
1. Find the material in the "Published Materials" section
2. Click **Edit**
3. Update any fields
4. Click **Update Material**

**How to Delete Material:**
1. Find the material in the "Published Materials" section
2. Click **Delete**
3. Confirm deletion

**Note:** Materials are organized by subject, making it easy for students to find resources by course.

---

### 🎉 **Manage Events**
Schedule and promote campus events, seminars, workshops, and activities.

**How to Create an Event:**
1. Go to Admin Dashboard → Click **Manage Events**
2. Fill in the form:
   - **Title**: Event name (e.g., "Spring Career Fair 2024")
   - **Description**: Event details and information
   - **Date & Time**: When the event occurs
   - **Location**: Where the event is held (e.g., "Auditorium A")
3. Click **Create Event**
4. Event appears in "All Events" section, sorted by date

**How to Edit an Event:**
1. Find the event in the "All Events" section
2. Click **Edit**
3. Update event details
4. Click **Update Event**

**How to Delete an Event:**
1. Find the event in the "All Events" section
2. Click **Delete**
3. Confirm deletion

**Note:** Events are automatically sorted by date, with upcoming events showing first.

---

### 📝 **Manage Announcements**
Post quick, timely updates and announcements.

**How to Post an Announcement:**
1. Go to Admin Dashboard → Click **Manage Announcements**
2. Fill in the form:
   - **Title**: Quick announcement text (e.g., "Scholarship Applications Now Open!")
3. Click **Post Announcement**
4. Announcement appears in the list

**How to Edit an Announcement:**
1. Find the announcement in the list
2. Click **Edit**
3. Update the announcement text
4. Click **Update Announcement**

**How to Delete an Announcement:**
1. Find the announcement in the list
2. Click **Delete**
3. Confirm deletion

---

## Student View

### What Students See:

**On the Student Dashboard:**
- **Latest Notices**: Recent campus announcements
- **Course Materials**: Materials organized by subject
- **Upcoming Events**: Calendar of scheduled events
- **Quick Announcements**: Fast updates from administration

All content you create as an admin is automatically visible to all students on their dashboards.

---

## Best Practices

1. **Keep Notices Clear**: Write titles that clearly state the purpose
2. **Organize Materials**: Use consistent subject names so students can find resources easily
3. **Schedule Events Early**: Post events in advance so students can plan
4. **Use Announcements for Urgent Updates**: Keep announcements brief and time-sensitive
5. **Update Regularly**: Keep content fresh and remove outdated notices

---

## Tips & Tricks

- **Quick Edit**: After publishing, you can immediately edit any item by scrolling down
- **Smooth Scrolling**: When you click Edit, the page smoothly scrolls to the form
- **Date Format**: Events show with full date and time on the student dashboard
- **Delete Confirmation**: Always confirm before deleting to prevent accidental removal
- **RLS Security**: Only authenticated users can create and manage content

---

## Troubleshooting

**Q: Can't see the Admin Panel?**
- Make sure you signed up with Admin role
- Log out and log back in
- Check the dropdown menu in the top right corner

**Q: Content not appearing for students?**
- Make sure you clicked "Publish" or "Create"
- Check that the form had all required fields filled
- Refresh the page to see updates

**Q: Can't edit content?**
- Only admins can edit content
- Make sure you're logged in as an admin
- If it's still not working, log out and log back in

---

## System Information

- **Database**: Supabase PostgreSQL
- **Authentication**: Email & Password
- **Roles**: Student & Admin
- **Security**: Row Level Security (RLS) enabled

For technical support or issues, contact your system administrator.
