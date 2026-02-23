# Supabase Row Level Security (RLS) Setup

## Issue
The booking form is getting a "violates row-level security policy" error when trying to create bookings.

## Fix

You need to update the RLS policies in your Supabase database to allow anonymous users to insert booking requests.

### Option 1: Via Supabase Dashboard (Easiest)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `nlzwezpaycajmggpingv`
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Paste the following SQL and click "Run":

```sql
-- Allow anyone to create booking requests
CREATE POLICY "Allow public to create booking requests"
ON booking_requests
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anyone to read their own booking requests (optional)
CREATE POLICY "Allow users to read booking requests"
ON booking_requests
FOR SELECT
TO anon
USING (true);
```

### Option 2: Via SQL File

1. Save the above SQL to a file
2. Run it in Supabase SQL Editor

---

## Verify Tables Exist

Make sure you have the following tables in your Supabase database. If not, create them:

### 1. Properties Table (should already exist)
```sql
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Booking Requests Table
```sql
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL REFERENCES properties(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_guests INTEGER NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to create booking requests"
ON booking_requests
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow users to read booking requests"
ON booking_requests
FOR SELECT
TO anon
USING (true);
```

### 3. Check Availability Function
```sql
CREATE OR REPLACE FUNCTION check_availability(
  p_property_id TEXT,
  p_check_in DATE,
  p_check_out DATE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- For now, always return true (available)
  -- In production, you'd check against confirmed bookings
  RETURN true;
END;
$$;
```

---

## After Running SQL

1. Go back to your browser at [http://localhost:3000](http://localhost:3000)
2. Try submitting a booking request
3. It should now work! ✅

---

## Next Steps

1. Set up your email API keys (see SETUP-NOTIFICATIONS.md)
2. Test the complete booking flow
3. Check that emails and SMS are being sent
