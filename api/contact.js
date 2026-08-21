import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // 2. Parse request body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    // 3. Honeypot check for spam bots
    if (body.website) {
      // If honeypot is filled, silently succeed without sending email
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    const { name, email, subject, message } = body;

    // 4. Validate fields
    if (!name || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ error: 'Invalid name provided.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Invalid email provided.' });
    }

    if (!subject || subject.trim().length === 0 || subject.length > 200) {
      return res.status(400).json({ error: 'Invalid subject provided.' });
    }

    if (!message || message.trim().length < 10 || message.length > 5000) {
      return res.status(400).json({ error: 'Invalid message provided.' });
    }

    // 5. Send email via Resend
    const data = await resend.emails.send({
      from: 'Website Contact Form <onboarding@resend.dev>',
      to: 'tiwariraman884@gmail.com',
      replyTo: email,
      subject: `[Portfolio Contact] ${subject.trim()}`,
      text: `Name:\n${name.trim()}\n\nEmail:\n${email.trim()}\n\nSubject:\n${subject.trim()}\n\nMessage:\n${message.trim()}\n\n---\nPortfolio: https://www.ramantiwari.com`,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return res.status(500).json({ error: 'Failed to send email.', details: data.error });
    }

    // 6. Return success response
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });

  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: 'Internal Server Error.', details: error.message });
  }
}
