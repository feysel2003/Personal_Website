const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ EMAIL ERROR: Missing Environment Variables");
    return;
  }

  try {
    // FIX: Switched to Port 587 (TLS) instead of 465 (SSL)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Must be false for port 587
      requireTLS: true, // Force TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Helps avoid timeout issues on cloud servers
      tls: {
        ciphers: 'SSLv3'
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000     // 5 seconds
    });

    const mailOptions = {
      from: `Portfolio Notification <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: data.email,
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
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Sent from your Portfolio Contact Form via Render/Node.js
          </p>
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