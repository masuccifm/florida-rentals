-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Booking Requests Table
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id VARCHAR(50) NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_guests INTEGER NOT NULL,
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_dates CHECK (check_out_date > check_in_date),
  CONSTRAINT valid_guests CHECK (num_guests > 0),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Blocked Dates Table (for maintenance/owner use)
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_blocked_dates CHECK (end_date >= start_date)
);

-- Indexes for performance
CREATE INDEX idx_booking_requests_property_id ON booking_requests(property_id);
CREATE INDEX idx_booking_requests_dates ON booking_requests(check_in_date, check_out_date);
CREATE INDEX idx_booking_requests_status ON booking_requests(status);
CREATE INDEX idx_booking_requests_email ON booking_requests(guest_email);
CREATE INDEX idx_booking_requests_created_at ON booking_requests(created_at DESC);

CREATE INDEX idx_blocked_dates_property_id ON blocked_dates(property_id);
CREATE INDEX idx_blocked_dates_dates ON blocked_dates(start_date, end_date);

-- View for confirmed bookings
CREATE VIEW confirmed_bookings AS
SELECT * FROM booking_requests WHERE status = 'approved';

-- Function to check availability
CREATE OR REPLACE FUNCTION check_availability(
  p_property_id VARCHAR,
  p_check_in DATE,
  p_check_out DATE
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check for overlapping approved bookings
  IF EXISTS (
    SELECT 1 FROM booking_requests
    WHERE property_id = p_property_id
      AND status = 'approved'
      AND (
        (check_in_date <= p_check_in AND check_out_date > p_check_in)
        OR (check_in_date < p_check_out AND check_out_date >= p_check_out)
        OR (check_in_date >= p_check_in AND check_out_date <= p_check_out)
      )
  ) THEN
    RETURN FALSE;
  END IF;

  -- Check for blocked dates
  IF EXISTS (
    SELECT 1 FROM blocked_dates
    WHERE property_id = p_property_id
      AND (
        (start_date <= p_check_in AND end_date > p_check_in)
        OR (start_date < p_check_out AND end_date >= p_check_out)
        OR (start_date >= p_check_in AND end_date <= p_check_out)
      )
  ) THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_booking_requests_updated_at
  BEFORE UPDATE ON booking_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can read approved bookings (for availability calendar)
CREATE POLICY "Anyone can view approved bookings"
  ON booking_requests FOR SELECT
  USING (status = 'approved');

-- Anyone can insert booking requests
CREATE POLICY "Anyone can create booking requests"
  ON booking_requests FOR INSERT
  WITH CHECK (true);

-- Anyone can view blocked dates
CREATE POLICY "Anyone can view blocked dates"
  ON blocked_dates FOR SELECT
  USING (true);

-- Note: Admin operations will use service role key which bypasses RLS
