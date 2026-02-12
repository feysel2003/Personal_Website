const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ EMAIL ERROR: Missing Environment Variables");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // AGGRESSIVE TIMEOUT SETTINGS
      connectionTimeout: 60000, // Wait 60 seconds for connection
      greetingTimeout: 30000,   // Wait 30 seconds for hello
      socketTimeout: 60000,     // Wait 60 seconds for data
      debug: true,              // Show debug info in logs
      logger: true              // Log information to console
    });

    // Verify connection before sending
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.error("❌ SMTP Connection Error:", error);
          reject(error);
        } else {
          console.log("✅ SMTP Server is ready to take our messages");
          resolve(success);
        }
      });
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
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

  } catch (error) {
    console.error("❌ Email Sending Failed:", error.message);
  }
};

module.exports = sendEmail;