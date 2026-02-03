const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: 'feyselmifta982@gmail.com', // Send to yourself
    subject: `New Portfolio Message from ${data.name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #3b82f6;">
        ${data.message}
      </blockquote>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;