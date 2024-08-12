import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinivasanbalakrishan04@gmail.com",
    pass: "ebfp voxq wggn bpsv"
  },
});

export const sendRobotmsgEmail = async (recipient, robotId, emailId, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "New Robot Message Created",
      html: `
        <h1>New Robot Message Details</h1>
        <p><strong>Robot ID:</strong> ${robotId}</p>
        <p><strong>Email ID:</strong> ${emailId}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Best regards,<br/>Your team</p>
      `,
    });
    console.log("Robot message email sent successfully");
  } catch (error) {
    console.error("Error sending robot message email:", error);
    throw error;
  }
};

export default transporter;