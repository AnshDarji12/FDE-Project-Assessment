import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const EnquirySchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name').max(120),
  phone: z
    .string()
    .trim()
    .min(6, 'Please add a phone or WhatsApp number with country code')
    .max(40),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  area: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  puppySlug: z.string().trim().max(120).optional().or(z.literal('')),
  source: z.enum(['puppy', 'contact']).default('puppy'),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message || 'Please check the form fields' },
      { status: 422 },
    );
  }

  const data = parsed.data;

  try {
    const enquiry = await db.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        area: data.area || null,
        message: data.message || null,
        puppySlug: data.puppySlug || null,
        source: data.source,
      },
    });
    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error('[enquiry] DB write failed:', err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'We could not save your enquiry right now. Please message us on WhatsApp instead — we reply quickly there.',
      },
      { status: 503 },
    );
  }
}
