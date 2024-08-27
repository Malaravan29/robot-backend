import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendTestSMS = async () => {
  try {
    const message = await client.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to 
    });
    console.log('Test SMS sent successfully:', message.sid);
  } catch (error) {
    console.error('Error sending test SMS:', error);
  }
};