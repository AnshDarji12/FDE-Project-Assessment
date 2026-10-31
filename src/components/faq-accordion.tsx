'use client';

import { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

/** Accessible accordion styled like the reference question cards. */
export default function FaqAccordion({ items, defaultOpen = -1 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="grid gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="tp-acc" data-open={isOpen} key={item.q}>
            <button
              type="button"
              className="tp-acc__q"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-btn-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <span className="tp-acc__icon" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className="tp-acc__a"
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
            >
              <div className="tp-acc__a-inner">
                <p className="tp-acc__a-content">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
