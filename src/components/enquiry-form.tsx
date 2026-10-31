'use client';

import { useState } from 'react';
import { SITE } from '@/lib/data';
import { Wscp } from '@/components/doodles';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  /** Puppy profile form (4 fields) or contact letter form (inline style). */
  variant: 'puppy' | 'letter';
  puppyName?: string;
  puppyBreed?: string;
  puppySlug?: string;
  defaultMessage?: string;
}

/**
 * Enquiry form — posts to /api/enquiry which stores the lead in SQLite
 * (Prisma) and answers with a friendly confirmation.
 */
export default function EnquiryForm({
  variant,
  puppyName,
  puppyBreed,
  puppySlug,
  defaultMessage,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const rawMessage = String(fd.get('message') || '').trim();
    const extra = String(fd.get('extra') || '').trim();
    const message = [rawMessage, extra].filter(Boolean).join(extra ? ' — ' : '');
    const payload = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      area: String(fd.get('area') || '').trim(),
      message,
      puppySlug: puppySlug || '',
      source: variant === 'puppy' ? 'puppy' : 'contact',
    };
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[1.4rem] border-2 border-cocoa bg-honey-soft p-8 text-center shadow-[4px_5px_0_0_#2a170e22]">
        <p className="text-4xl">🐾💌</p>
        <h3 className="font-plush mt-3 text-2xl font-black text-cocoa">
          {variant === 'puppy' ? 'Enquiry sent!' : 'Your letter is on its way!'}
        </h3>
        <p className="mt-2 text-cocoa-soft">
          Our team will get back to you promptly. For the quickest reply, say
          hello on WhatsApp.
        </p>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="tp-btn tp-btn--wa mt-5"
        >
          <Wscp className="h-4 w-4" />
          WhatsApp us
        </a>
      </div>
    );
  }

  const field =
    'tp-field';

  if (variant === 'puppy') {
    return (
      <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={field}>
            <label htmlFor="ef-name">Your name *</label>
            <input id="ef-name" name="name" required placeholder="e.g. Sarah" autoComplete="name" />
          </div>
          <div className={field}>
            <label htmlFor="ef-phone">Phone or WhatsApp *</label>
            <input
              id="ef-phone"
              name="phone"
              required
              inputMode="tel"
              placeholder="e.g. +971 50 123 4567"
              autoComplete="tel"
            />
            <p className="hint">With country code, e.g. +971 50 123 4567</p>
          </div>
          <div className={field}>
            <label htmlFor="ef-email">Email (optional)</label>
            <input id="ef-email" name="email" type="email" autoComplete="email" />
          </div>
          <div className={field}>
            <label htmlFor="ef-area">Your area (optional)</label>
            <input id="ef-area" name="area" placeholder="e.g. Dubai Marina" />
          </div>
        </div>
        <div className={field}>
          <label htmlFor="ef-msg">Message (optional)</label>
          <textarea
            id="ef-msg"
            name="message"
            rows={4}
            defaultValue={defaultMessage || `Hi! I'd love to know more about ${puppyName} (${puppyBreed}).`}
          />
        </div>
        {status === 'error' && (
          <p role="alert" className="font-semibold text-toffee-ink">
            {error} — you can also reach us directly on WhatsApp.
          </p>
        )}
        <button type="submit" className="tp-btn self-start" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
      </form>
    );
  }

  // letter variant (contact page) — Mad Libs style like the reference
  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div className="space-y-4 font-plush text-xl font-bold leading-relaxed text-cocoa md:text-2xl">
        <p>Dear TeddyPups,</p>
        <p>
          my name is{' '}
          <input
            name="name"
            required
            aria-label="Your name"
            placeholder="Sarah"
            className="mx-1 w-44 rounded-xl border-2 border-cocoa bg-milk px-3 py-1.5 font-sans text-base font-semibold"
          />{' '}
          and you can reach me on{' '}
          <input
            name="phone"
            required
            inputMode="tel"
            aria-label="Phone or WhatsApp"
            placeholder="+971 50 123 4567"
            className="mx-1 w-56 rounded-xl border-2 border-cocoa bg-milk px-3 py-1.5 font-sans text-base font-semibold"
          />{' '}
          or by email at{' '}
          <input
            name="email"
            type="email"
            aria-label="Email (optional)"
            placeholder="you@email.com"
            className="mx-1 w-56 rounded-xl border-2 border-cocoa bg-milk px-3 py-1.5 font-sans text-base font-semibold"
          />
          .
        </p>
        <p>
          I live in{' '}
          <input
            name="area"
            aria-label="Your area"
            placeholder="Dubai Marina"
            className="mx-1 w-44 rounded-xl border-2 border-cocoa bg-milk px-3 py-1.5 font-sans text-base font-semibold"
          />{' '}
          and I&apos;m curious about
        </p>
      </div>

      <div className={field}>
        <label htmlFor="cf-puppy">Puppy you&apos;re interested in (optional)</label>
        <select id="cf-puppy" name="message" defaultValue="">
          <option value="">any puppy (not sure yet)</option>
          <option value="Max (Maltipoo, boy)">Max (Maltipoo, boy)</option>
          <option value="Korean Teacup Maltipoo (girl)">Korean Teacup Maltipoo (girl)</option>
          <option value="Korean Teacup Poodle (girl)">Korean Teacup Poodle (girl)</option>
          <option value="Maltipoo & Cavapoo (boy)">Maltipoo &amp; Cavapoo (boy)</option>
          <option value="Toy Poodle (boy & girl)">Toy Poodle (boy &amp; girl)</option>
          <option value="Maltipoo (girl, 3 months)">Maltipoo (girl, 3 months)</option>
          <option value="Pomeranian (girl)">Pomeranian (girl)</option>
          <option value="Copper (Cavapoo, boy)">Copper (Cavapoo, boy)</option>
          <option value="Shih Tzu (girl)">Shih Tzu (girl)</option>
          <option value="Shih Tzu (boy)">Shih Tzu (boy)</option>
          <option value="Maltipoo (girl, 2.5 months)">Maltipoo (girl, 2.5 months)</option>
          <option value="Maltipoo (girl, 2 months)">Maltipoo (girl, 2 months)</option>
          <option value="Korean Teacup Pomeranian (girl)">Korean Teacup Pomeranian (girl)</option>
          <option value="Korean Teacup Pomeranian (boy)">Korean Teacup Pomeranian (boy)</option>
        </select>
      </div>

      <div className={field}>
        <label htmlFor="cf-msg">Your message (optional)</label>
        <textarea id="cf-msg" name="extra" rows={4} placeholder="Tell us a little about your family & home…" />
      </div>

      {status === 'error' && (
        <p role="alert" className="font-semibold text-toffee-ink">
          {error} — you can also reach us directly on WhatsApp.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="tp-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Post my letter 💌'}
        </button>
        <span className="font-scrawl text-lg text-cocoa-soft">with love, a future puppy parent</span>
      </div>
    </form>
  );
}
