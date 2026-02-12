const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  // Debug check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ EMAIL ERROR: Missing Environment Variables");
    return;
  }

  try {
    // FIX: Use explicit Host and Port 465 (SSL)
    // This is more reliable on cloud servers like Render
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Increase timeout to prevent early disconnects
      connectionTimeout: 10000, 
    });

    const mailOptions = {
      from: `Portfolio Notification <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: data.email, // Allows you to reply directly to the sender
      subject: `New Message from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p style="background: #f3f4f6; padding: 15px; border-left: 4px solid #2563eb; font-style: italic;">
            ${data.message}
          </p>
          <hr/>
          <p style="font-size: 12px; color: #666;">Sent from your Portfolio Contact Form</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
  }
};

module.exports = sendEmail;