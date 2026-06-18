'use server';

import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  const { name, email, message } = data;

  // Simple validation
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL;

  // Verify server configuration
  if (!emailUser || !emailPass || !receiverEmail) {
    console.error('Missing email configuration environment variables.');
    return {
      success: false,
      error: 'Email service configuration is missing on the server.',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // Use authorized email user as sender
      replyTo: email, // Enable replying directly to the sender's email
      to: receiverEmail,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin-bottom: 5px;"><strong>Message:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #f3f4f6; white-space: pre-wrap; line-height: 1.5; color: #4b5563;">${message}</div>
          <br>
          <p style="font-size: 11px; color: #9ca3af; border-top: 1px solid #eee; padding-top: 10px; margin-bottom: 0;">Sent automatically from your portfolio website.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending email via Nodemailer:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message. Please try again later.',
    };
  }
}
