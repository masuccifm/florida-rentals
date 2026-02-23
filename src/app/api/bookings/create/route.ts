import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendBookingNotificationEmail } from '@/lib/email';
import { sendBookingNotificationSMS } from '@/lib/sms';
import { properties } from '@/config/properties';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      property_id,
      guest_name,
      guest_email,
      guest_phone,
      check_in_date,
      check_out_date,
      num_guests,
      message,
    } = body;

    // Validate required fields
    if (!property_id || !guest_name || !guest_email || !check_in_date || !check_out_date || !num_guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Check availability using the database function
    const { data: isAvailable, error: availabilityError } = await supabase.rpc(
      'check_availability',
      {
        p_property_id: property_id,
        p_check_in: check_in_date,
        p_check_out: check_out_date,
      }
    );

    if (availabilityError) {
      console.error('Availability check error:', availabilityError);
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Property is not available for selected dates' },
        { status: 400 }
      );
    }

    // Insert booking request
    const { data: booking, error: bookingError } = await supabase
      .from('booking_requests')
      .insert([
        {
          property_id,
          guest_name,
          guest_email,
          guest_phone: guest_phone || null,
          check_in_date,
          check_out_date,
          num_guests,
          message: message || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (bookingError) {
      console.error('Booking insert error:', bookingError);
      return NextResponse.json(
        { error: 'Failed to create booking request' },
        { status: 500 }
      );
    }

    // Find property name for notifications
    const property = properties.find(p => p.id === property_id);
    const propertyName = property?.name || 'Unknown Property';

    // Send email notification to property owner
    const emailResult = await sendBookingNotificationEmail({
      propertyName,
      guestName: guest_name,
      guestEmail: guest_email,
      guestPhone: guest_phone || 'Not provided',
      checkIn: check_in_date,
      checkOut: check_out_date,
      numGuests: num_guests,
      message: message || undefined,
    });

    // Send SMS notification to property owner
    const smsResult = await sendBookingNotificationSMS({
      propertyName,
      guestName: guest_name,
      checkIn: check_in_date,
      checkOut: check_out_date,
    });

    // Log notification results but don't fail the booking if notifications fail
    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
    }
    if (!smsResult.success) {
      console.error('Failed to send SMS notification:', smsResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          status: booking.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
