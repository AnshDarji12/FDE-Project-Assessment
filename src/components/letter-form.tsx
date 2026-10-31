'use client';

import { useId, useState } from 'react';
import PupBuddy from '@/components/pup-buddy';
import { AVAILABLE, SITE } from '@/lib/data';

/**
 * The letter form, mirroring the reference /contact page: the fields are
 * written as blanks inside a hand-written letter ("Dear TeddyPups, my name
 * is ___ …"). Posting folds the letter away and replaces it with a sent
 * note. Enquiries POST to /api/enquiry (Zod-validated, saved to SQLite).
 */

type Phase = 'writing' | 'sealing' | 'posting' | 'sent';

const BLANK = 'tp-blank';

export default function LetterForm() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [phase, setPhase] = useState<Phase>('writing');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [puppySlug, setPuppySlug] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const issues: string[] = [];
    if (name.trim().length < 2) issues.push('Please tell us your name');
    if (phone.trim().length < 6) issues.push('Please add a phone or WhatsApp number with country code');
    setErrors(issues);
    if (issues.length || busy) return;

    setBusy(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          puppySlug,
          source: 'contact',
        }),
      });
      if (!res.ok && res.status !== 201) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrors([data?.error || 'Something went wrong — please message us on WhatsApp instead.']);
        setBusy(false);
        return;
      }
      setPhase('sealing');
      window.setTimeout(() => setPhase('posting'), 680);
      window.setTimeout(() => setPhase('sent'), 1450);
    } catch {
      setErrors(['Network hiccup — please message us on WhatsApp instead.']);
      setBusy(false);
    }
  };

  if (phase === 'sent') {
    return (
      <div className="tp-post__sent" role="status">
        <div className="mx-auto w-36 md:w-40">
          <PupBuddy pose="sit" label="Teddy celebrating your letter" />
        </div>
        <h3 className="font-plush mt-4 text-2xl font-black">Your letter is on its way!</h3>
        <p className="mx-auto mt-2 max-w-[36ch] text-cocoa-soft">
          Woof — thank you, {name.trim().split(' ')[0] || 'friend'}! Our team will
          get back to you promptly. Want a faster reply? We&apos;re on WhatsApp
          24/7.
        </p>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="tp-btn tp-btn--wa mt-5"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="tp-post" data-phase={phase}>
      <span className="tp-letter__stamp font-scrawl" aria-hidden="true">
        woof
      </span>
      <form noValidate className="tp-letterform" onSubmit={submit}>
        <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>
        <p className="tp-letterform__line">
          my name is{' '}
          <span className={BLANK} style={{ ['--size' as string]: '16ch' }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.length && name.trim().length < 2 ? 'true' : undefined}
              autoComplete="name"
              placeholder="Sarah"
              aria-label="Your name"
            />
          </span>
          , and you can reach me on{' '}
          <span className={BLANK} style={{ ['--size' as string]: '15ch' }}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={errors.length && phone.trim().length < 6 ? 'true' : undefined}
              autoComplete="tel"
              placeholder="+971 50 123 4567"
              inputMode="tel"
              aria-label="Your phone or WhatsApp number"
            />
          </span>{' '}
          or by email at{' '}
          <span className={BLANK} style={{ ['--size' as string]: '20ch' }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="sarah@email.com"
              inputMode="email"
              aria-label="Your email (optional)"
            />
          </span>
          .
        </p>
        <p className="tp-letterform__line">
          I live in{' '}
          <span className={BLANK} style={{ ['--size' as string]: '13ch' }}>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Dubai Marina"
              aria-label="Where you live (optional)"
            />
          </span>
          , and I&apos;m curious about{' '}
          <span className={`${BLANK} tp-blank--select`}>
            <select
              value={puppySlug}
              onChange={(e) => setPuppySlug(e.target.value)}
              aria-label="Puppy you're interested in (optional)"
            >
              <option value="">any puppy (not sure yet)</option>
              {AVAILABLE.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.breed}, {p.sex})
                </option>
              ))}
            </select>
          </span>
          .
        </p>
        <label className="sr-only" htmlFor={`${uid}-msg`}>
          Your message (optional)
        </label>
        <textarea
          id={`${uid}-msg`}
          className="tp-letterform__note"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a little about your family, your home, or the puppy you have in mind…"
        />
        {errors.length ? (
          <div className="tp-letterform__alert" role="alert">
            <ul>
              {errors.map((er) => (
                <li key={er}>{er}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="tp-letterform__sign">
          <p className="font-scrawl">with love, a future puppy parent</p>
          <button type="submit" className="tp-btn disabled:opacity-70" disabled={busy}>
            {busy ? 'Sealing your letter…' : 'Post my letter'}
          </button>
        </div>
      </form>
    </div>
  );
}
