-- Add UPDATE policy for announcements (only admins)
CREATE POLICY "announcements_update_admin" ON announcements
FOR UPDATE 
USING (
  (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin'
)
WITH CHECK (
  (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin'
);

-- Add DELETE policy for announcements (only admins)
CREATE POLICY "announcements_delete_admin" ON announcements
FOR DELETE
USING (
  (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin'
);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
FROM pg_policies
WHERE tablename = 'announcements'
ORDER BY policyname;
