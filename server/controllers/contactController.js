import Message from '../models/Message.js';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContact = async (req, res) => {
  try {
    const name = String(req.body?.name ?? '').trim();
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const message = String(req.body?.message ?? '').trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Name must be 2 to 100 characters' });
    }
    if (!emailRegex.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({ error: 'Message must be 10 to 2000 characters' });
    }

    const savedMessage = await Message.create({ name, email, message });

    // Email failure should not make the visitor think the message was lost
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `From: ${name} (${email})\n\n${message}`,
      });
    } catch (mailError) {
      console.error('[Contact] Email failed (message was saved):', mailError.message);
    }

    return res.status(201).json({ success: true, data: savedMessage });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: Object.values(error.errors)[0].message });
    }
    console.error('[Contact] Error:', error.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};