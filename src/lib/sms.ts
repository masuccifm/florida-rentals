interface SMSData {
  propertyName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}

export async function sendBookingNotificationSMS(data: SMSData) {
  const { propertyName, guestName, checkIn, checkOut } = data;

  // Format dates nicely
  const checkInDate = new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const checkOutDate = new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const message = `🏖️ New Booking Request!\n\nProperty: ${propertyName}\nGuest: ${guestName}\n${checkInDate} - ${checkOutDate}\n\nCheck your email for details.`;

  try {
    // Twilio integration
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const recipientPhone = process.env.NOTIFICATION_PHONE_NUMBER || '+17047249478';

    if (!accountSid || !authToken || !twilioPhone) {
      console.warn('Twilio credentials not configured, skipping SMS');
      return { success: false, error: 'Twilio not configured' };
    }

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: new URLSearchParams({
          To: recipientPhone,
          From: twilioPhone,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Twilio SMS error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { success: false, error };
  }
}
