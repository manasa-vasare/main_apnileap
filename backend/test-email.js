const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log("Setting up Nodemailer transporter...");
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const to = process.env.SMTP_REDIRECT_TO;
  console.log(`Sending test email to: ${to}`);

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'ApniLeap Hub'}" <${process.env.SMTP_USER}>`,
      to: to,
      subject: "Test Email from ApniLeap Setup",
      text: "Hello! This is a test email confirming that SMTP rerouting to multiple addresses is working.",
      html: "<p>Hello! This is a test email confirming that SMTP rerouting to multiple addresses is working.</p>"
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Envelope:", info.envelope);
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
}

testEmail();
