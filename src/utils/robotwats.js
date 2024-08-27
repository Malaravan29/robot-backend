import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const robotwats = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+918056824497",
    });
    console.log("WhatsApp message sent successfully:", message.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};
