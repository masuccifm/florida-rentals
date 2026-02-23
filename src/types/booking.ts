export interface BookingRequest {
  id: string;
  property_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface BlockedDate {
  id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  reason?: string;
  created_at: string;
}

export interface BookingFormData {
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  check_in_date: Date;
  check_out_date: Date;
  num_guests: number;
  message?: string;
}
