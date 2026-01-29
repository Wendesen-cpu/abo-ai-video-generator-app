-- Drop old table if exists to handle schema changes from UUID to TEXT id
DROP TABLE IF EXISTS users CASCADE;

-- Create users table for Clerk syncing
CREATE TABLE users (
  id TEXT PRIMARY KEY, -- Using Clerk user.id as the primary key
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Delete old policy if exists
DROP POLICY IF EXISTS "Users can view own data" ON users;

-- Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (id = (SELECT auth.uid()::text) OR (SELECT current_setting('role') = 'service_role'));
