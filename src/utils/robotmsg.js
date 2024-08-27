
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinivasanbalakrishan04@gmail.com", // Use environment variable for email user
    pass: "ebfp voxq wggn bpsv" // Use environment variable for email password
  },
});

export const sendRobotmsgEmail = async (recipient, robotId, emailId, message,  camera_image1,camera_image2,camera_image3,camera_image4,map_image) => {
  try {
    // Convert base64 strings to buffers
    const imageBuffers = [
      { filename: 'camera_image1.jpg', content: Buffer.from(camera_image1, 'base64') },
      { filename: 'camera_image2.jpg', content: Buffer.from(camera_image2, 'base64') },
      { filename: 'camera_image3.jpg', content: Buffer.from(camera_image3, 'base64') },
      { filename: 'camera_image4.jpg', content: Buffer.from(camera_image4, 'base64') },
      { filename: 'map_image.jpg', content: Buffer.from(map_image, 'base64') },
    ];

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "New Robot Message Created",
      html: `
        <h1>New Robot Message Details</h1>
        <p><strong>Robot ID:</strong> ${robotId}</p>
        <p><strong>Email ID:</strong> ${emailId}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Thank you,<br/>By Robot</p>
      `,
      attachments: imageBuffers.map((image) => ({
        filename: image.filename,
        content: image.content,
        encoding: 'base64',
      })),
    });

    console.log("Robot message email sent successfully");
  } catch (error) {
    console.error("Error sending robot message email:", error);
    throw error;
  }
};

export default transporter;