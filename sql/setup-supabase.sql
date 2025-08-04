-- SQL file to set up Supabase tables and policies

-- Create a table for products
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text NOT NULL,
    price numeric NOT NULL CHECK (price >= 0),
    image_url text NOT NULL,
    category text NOT NULL CHECK (char_length(category) > 0),
    features text[] DEFAULT '{}',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
-- Allow public read access (for displaying products to customers)
CREATE POLICY public_read_products ON products
    FOR SELECT USING (true);

-- Allow insert/update/delete for service role (admin operations)
CREATE POLICY admin_write_products ON products
    FOR ALL USING (
        auth.role() = 'service_role'
    );
