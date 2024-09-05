// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "srinivasanbalakrishan04@gmail.com", // Use environment variable for email user
//     pass: "ebfp voxq wggn bpsv", // Use environment variable for email password
//   },
// });
// export const robotemail = async (
//   recipient,
//   robotId,
//   emailId,
//   message,
//   camera_images,
//   map_image
// ) => {
//   try {
//     // Convert base64 strings to buffers for camera images
//     const imageBuffers = camera_images.map((image, index) => ({
//       filename: `camera_image_${index + 1}.jpg`,
//       content: Buffer.from(image, "base64"),
//       encoding: "base64",
//     }));

//     // Add map image to the attachments
//     imageBuffers.push({
//       filename: "map_image.jpg",
//       content: Buffer.from(map_image, "base64"),
//       encoding: "base64",
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: recipient,
//       subject: "New Robot Message Created",
//       html: `
//           <h1>New Robot Message Details</h1>
//           <p><strong>Robot ID:</strong> ${robotId}</p>
//           <p><strong>Email ID:</strong> ${emailId}</p>
//           <p><strong>Message:</strong> ${message}</p>
//           <p>Thank you,<br/>By Robot</p>
//         `,
//       attachments: imageBuffers,
//     });

//     console.log("Robot message email sent successfully");
//   } catch (error) {
//     console.error("Error sending robot message email:", error);
//     throw error;
//   }
// };

// export default transporter;


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinivasanbalakrishan04@gmail.com", 
    pass: "ebfp voxq wggn bpsv", 
  },
});

export const robotemail = async (recipient, robotId, emailId, message ,camera_image1) => {
  try {
    // Convert base64 strings to buffers
    const imageBuffers = [
      { filename: 'camera_image1.jpg', content: Buffer.from(camera_image1, 'base64') },
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
