-- Create storage bucket for materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', true)
ON CONFLICT (id) DO NOTHING;

-- Set bucket policies for public read access
CREATE POLICY "Allow public read on materials bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated users to upload materials"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'materials' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow users to update own materials"
ON storage.objects FOR UPDATE
USING (bucket_id = 'materials' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow users to delete own materials"
ON storage.objects FOR DELETE
USING (bucket_id = 'materials' AND auth.role() = 'authenticated');
