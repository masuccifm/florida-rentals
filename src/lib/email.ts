import { Resend } from 'resend';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY environment variable is not set');
    return null;
  }
  return new Resend(apiKey);
}

interface BookingEmailData {
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  message?: string;
}

export async function sendBookingNotificationEmail(data: BookingEmailData) {
  const {
    propertyName,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    numGuests,
    message,
  } = data;

  try {
    const resend = getResendClient();
    
    if (!resend) {
      console.error('Resend client not initialized - API key missing');
      return { success: false, error: 'Email service not configured' };
    }

    await resend.emails.send({
      from: 'Florida Rentals <onboarding@resend.dev>',
      to: ['leslie.masucci@gmail.com', 'masuccifm@gmail.com', 'jeffmas64@gmail.com'],
      subject: `New Booking Request - ${propertyName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Booking Request</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🏖️ New Booking Request</h1>
            </div>

            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e40af; margin-top: 0;">Property: ${propertyName}</h2>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-top: 0; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Guest Information</h3>
                <p style="margin: 10px 0;"><strong>Name:</strong> ${guestName}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${guestEmail}" style="color: #3b82f6;">${guestEmail}</a></p>
                <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${guestPhone}" style="color: #3b82f6;">${guestPhone}</a></p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-top: 0; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Booking Details</h3>
                <p style="margin: 10px 0;"><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style="margin: 10px 0;"><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style="margin: 10px 0;"><strong>Number of Guests:</strong> ${numGuests}</p>
              </div>

              ${message ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-top: 0; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Special Requests</h3>
                <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}

              <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e;"><strong>⚠️ Action Required:</strong> Please respond to this booking request within 24 hours.</p>
              </div>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #64748b; font-size: 14px;">
              <p>Florida Rentals - Your Sunshine State Gateway</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}
