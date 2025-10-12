import { z } from 'zod';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // важнo: нужен Node runtime для nodemailer

const payloadSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName:  z.string().trim().min(1),
  company:   z.string().trim().min(1),
  email:     z.string().trim().email(),
  message:   z.string().trim().min(1),
  // honeypot для ботов — скрытое поле "website"
  website:   z.string().optional().default(''),
});

function toHtml(p: z.infer<typeof payloadSchema>) {
  return `
    <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 8px">New demo request</h2>
      <p style="margin:0 0 12px;color:#475467">A new request was submitted from the website.</p>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr><td style="padding:6px 0;width:140px;color:#475467">First name:</td><td style="padding:6px 0">${p.firstName}</td></tr>
          <tr><td style="padding:6px 0;color:#475467">Last name:</td><td style="padding:6px 0">${p.lastName}</td></tr>
          <tr><td style="padding:6px 0;color:#475467">Company:</td><td style="padding:6px 0">${p.company}</td></tr>
          <tr><td style="padding:6px 0;color:#475467">Email:</td><td style="padding:6px 0">${p.email}</td></tr>
          <tr><td style="padding:6px 0;color:#475467;vertical-align:top">Message:</td><td style="padding:6px 0;white-space:pre-wrap">${p.message}</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function toText(p: z.infer<typeof payloadSchema>) {
  return [
    'New demo request:',
    `First name: ${p.firstName}`,
    `Last name:  ${p.lastName}`,
    `Company:    ${p.company}`,
    `Email:      ${p.email}`,
    'Message:',
    p.message,
  ].join('\n');
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', issues: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    const data = parsed.data;

    // honeypot: если заполнено скрытое поле — тихо "ок", но ничего не делаем
    if (data.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Транспорт для SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465, // true для 465 (SSL)
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    const subject = `New demo request: ${data.firstName} ${data.lastName} @ ${data.company}`;

    await transporter.sendMail({
      from: process.env.BOOKDEMO_FROM ?? process.env.SMTP_USER!,
      to: process.env.BOOKDEMO_TO ?? process.env.SMTP_USER!,
      replyTo: data.email,
      subject,
      text: toText(data),
      html: toHtml(data),
    });

    // (необязательно) Slack уведомление — если есть вебхук
    if (process.env.SLACK_WEBHOOK_URL) {
      const text = `New demo request from *${data.firstName} ${data.lastName}* (${data.company})\nEmail: ${data.email}\n\n${data.message}`;
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('Book-demo API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}