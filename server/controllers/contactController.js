import Message from '../models/Message.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const sendNotification = async ({ name, email, message }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.EMAIL_USER],
      reply_to: email,
      subject: `New portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `From: ${name} (${email})\n\n${message}`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
};

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

    try {
      await sendNotification({ name, email, message });
      console.log('[Contact] Email sent');
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