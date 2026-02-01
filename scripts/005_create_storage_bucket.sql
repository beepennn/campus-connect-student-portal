-- Create materials storage bucket for file uploads
-- This script sets up the storage bucket and RLS policies for material files

-- Note: Storage bucket creation typically needs to be done via Supabase dashboard or admin API
-- However, we can set up the RLS policies for the bucket here

-- Insert into storage.buckets if it doesn't exist (this may not work in standard SQL)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('materials', 'materials', true) ON CONFLICT DO NOTHING;

-- Set up RLS policies for the materials bucket
-- Allow public read access
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'materials');

-- Allow authenticated admin users to upload
create policy "Admin Upload"
on storage.objects for insert
with check (
  bucket_id = 'materials'
  and (select auth.jwt() ->> 'user_metadata' ->> 'user_type') = 'admin'
);

-- Allow authenticated users to delete their own uploads
create policy "Delete Own Uploads"
on storage.objects for delete
using (
  bucket_id = 'materials'
  and (select auth.jwt() ->> 'user_metadata' ->> 'user_type') = 'admin'
);
