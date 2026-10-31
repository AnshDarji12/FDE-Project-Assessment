'use client';

import { useId, useMemo, useState } from 'react';
import PupBuddy from '@/components/pup-buddy';
import { Wscp } from '@/components/doodles';
import { FAQS, SITE } from '@/lib/data';

/**
 * FAQ — the cork notes board, mirroring the reference site: a sticky side
 * panel (search + Teddy + WhatsApp ask) and a board of pinned paper notes
 * that unfold with a paper-flap animation. Search filters the notes live.
 */

const PINS = [
  'var(--color-toffee)',
  'var(--color-sky-deep, #7fb2d9)',
  '#d9a13c',
  '#c45a6a',
];
const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4, -1.6];

export default function FaqNotes() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(FAQS[0]?.q ?? null);

  const notes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="tp-notes" data-open={open ? '' : undefined}>
      <div className="tp-notes__side">
        <label htmlFor={`${uid}-search`} className="font-scrawl tp-notes__label">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <input
            id={`${uid}-search`}
            type="search"
            placeholder="Search the board…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg className="tp-notes__lens" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.6 15.6 4.6 4.6" />
          </svg>
        </div>
        <p className="tp-notes__count" aria-live="polite">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'} on the board
        </p>
        <div className="tp-notes__teddy">
          <div className="tp-notes__bubble font-plush" aria-hidden="true">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </div>
          <PupBuddy pose="sit" />
        </div>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="tp-btn tp-btn--wa tp-notes__ask"
        >
          <Wscp className="h-4 w-4" />
          Ask your own question
        </a>
      </div>

      <div className="tp-notes__board">
        <ul className="tp-notes__list">
          {notes.map((f, i) => {
            const id = `${uid}-n${i}`;
            const isOpen = open === f.q;
            return (
              <li
                key={f.q}
                className="tp-note"
                data-unfolded={isOpen || undefined}
                data-reveal
                style={{
                  ['--tilt' as string]: `${TILTS[i % TILTS.length]}deg`,
                  ['--pin' as string]: PINS[i % PINS.length],
                  ['--i' as string]: i,
                }}
              >
                <span className="tp-note__pin" aria-hidden="true" />
                <div className="tp-note__q">
                  <button
                    type="button"
                    id={`q-${id}`}
                    aria-expanded={isOpen}
                    aria-controls={`a-${id}`}
                    onClick={() => setOpen(isOpen ? null : f.q)}
                  >
                    <span className="font-plush">{f.q}</span>
                    <span className="tp-note__chevron" aria-hidden="true" />
                  </button>
                </div>
                <div
                  id={`a-${id}`}
                  role="region"
                  aria-labelledby={`q-${id}`}
                  className="tp-note__answer"
                >
                  <div className="tp-note__flap">
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
          {notes.length === 0 ? (
            <li className="tp-note tp-note--empty">
              <p className="font-scrawl text-lg">
                No note smells like “{query}” — ask us on WhatsApp and we&apos;ll
                sniff out the answer!
              </p>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
