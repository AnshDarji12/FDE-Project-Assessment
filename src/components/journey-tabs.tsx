'use client';

import { useState, type ReactNode } from 'react';
import PupBuddy from '@/components/pup-buddy';

/**
 * "Two ways home" — the tabbed journeys (In Dubai / Imported), mirroring the
 * reference /how-it-works: a pill switch with a sliding toffee thumb, Teddy
 * cheering next to it, and the step cards that bounce in when the tab opens.
 */

export default function JourneyTabs({
  local,
  imported,
}: {
  local: ReactNode;
  imported: ReactNode;
}) {
  const [tab, setTab] = useState(0);

  return (
    <div className="tp-journeys" data-ready="">
      <div className="tp-journeys__top">
        <div>
          <p className="font-scrawl tp-journeys__kicker" data-reveal>
            choose your way
          </p>
          <h2
            id="two-ways-title"
            className="font-plush mt-1 text-[clamp(2.2rem,5vw,3.6rem)] font-black leading-[1.02] text-cocoa"
            data-reveal
          >
            Two ways home
          </h2>
        </div>
        <div className="tp-journeys__pick" data-reveal>
          <div
            role="tablist"
            aria-label="Ways to bring your puppy home"
            className="tp-switch"
            style={{ ['--at' as string]: tab, ['--n' as string]: 2 }}
          >
            <span className="tp-switch__thumb" aria-hidden="true" />
            <button
              type="button"
              role="tab"
              id="tab-local"
              aria-selected={tab === 0}
              aria-controls="panel-local"
              tabIndex={tab === 0 ? 0 : -1}
              className="tp-switch__tab"
              onClick={() => setTab(0)}
            >
              <span className="font-plush tp-switch__label">In Dubai</span>
              <span className="tp-switch__hint">meet in person</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-imported"
              aria-selected={tab === 1}
              aria-controls="panel-imported"
              tabIndex={tab === 1 ? 0 : -1}
              className="tp-switch__tab"
              onClick={() => setTab(1)}
            >
              <span className="font-plush tp-switch__label">Imported</span>
              <span className="tp-switch__hint">order upon request</span>
            </button>
          </div>
          <PupBuddy pose="sit" className="tp-journeys__teddy" />
        </div>
      </div>

      <div
        role="tabpanel"
        id="panel-local"
        aria-labelledby="tab-local"
        hidden={tab !== 0}
        className="tp-journey"
      >
        {local}
      </div>
      <div
        role="tabpanel"
        id="panel-imported"
        aria-labelledby="tab-imported"
        hidden={tab !== 1}
        className="tp-journey"
      >
        {imported}
      </div>
    </div>
  );
}
