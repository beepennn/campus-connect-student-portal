-- Create admin_users table for proper admin authorization
-- Only users in this table are true admins
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- Enable RLS on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read admin_users (for verification)
CREATE POLICY "admin_users_select_public" ON admin_users
FOR SELECT USING (true);

-- Policy: Only super admins can insert
CREATE POLICY "admin_users_insert_admin" ON admin_users
FOR INSERT 
WITH CHECK (
  (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin'
);

-- Policy: Only super admins can delete
CREATE POLICY "admin_users_delete_admin" ON admin_users
FOR DELETE
USING (
  (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin'
);

-- Insert the original admin user (replace with actual admin ID from Supabase)
-- First, let's just create the table. Admin creation should be done separately.

SELECT 'Admin users table created successfully' as status;
