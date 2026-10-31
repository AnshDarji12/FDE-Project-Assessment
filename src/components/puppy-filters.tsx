'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { BREED_FILTERS } from '@/lib/data';

const WHERE = [
  { value: '', label: 'Everywhere' },
  { value: 'imported', label: 'Imported' },
  { value: 'korean', label: 'Korean Teacup' },
];
const SEX = [
  { value: '', label: 'Boys & girls' },
  { value: 'boy', label: 'Boys' },
  { value: 'girl', label: 'Girls' },
];

/** URL-synced filter chips (where / breed / sex) for the puppies page. */
export default function PuppyFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const where = sp.get('origin') === 'imported' ? 'imported' : sp.get('origin') === 'local' ? 'local' : sp.get('korean') === '1' ? 'korean' : '';
  const breed = sp.get('breed') || '';
  const sex = sp.get('sex') || '';

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      // "where" group is exclusive between origin/korean
      if (key === 'origin' && value) next.delete('korean');
      if (key === 'korean' && value) {
        next.delete('origin');
        next.delete('sex');
      }
      router.push(next.toString() ? `/puppies?${next}` : '/puppies', { scroll: false });
    },
    [router, sp],
  );

  const whereValueFor = (v: string) => {
    if (v === 'imported') return where === 'imported' ? 'imported' : '';
    if (v === 'korean') return where === 'korean' ? 'korean' : '';
    return where === 'local' ? 'local' : '';
  };

  return (
    <div
      className="rounded-[1.4rem] border-2 border-cocoa bg-milk p-5 shadow-[5px_6px_0_0_#2a170e1f] sm:p-6"
      data-reveal
    >
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="tp-field pt-2 font-scrawl text-base text-cocoa-soft">where</span>
        <div className="flex flex-wrap gap-2.5">
          {WHERE.map((o) => (
            <button
              key={o.value || 'all'}
              type="button"
              className="tp-chip"
              aria-pressed={whereValueFor(o.value) === o.value && !!whereValueFor(o.value) === !!o.value}
              onClick={() => setParam(o.value === 'korean' ? 'korean' : 'origin', whereValueFor(o.value) === o.value && o.value ? '' : o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="tp-field pt-2 font-scrawl text-base text-cocoa-soft">breed</span>
        <div className="flex flex-wrap gap-2.5">
          {BREED_FILTERS.map((b) => (
            <button
              key={b}
              type="button"
              className="tp-chip"
              aria-pressed={breed === b}
              onClick={() => setParam('breed', breed === b ? '' : b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="tp-field pt-2 font-scrawl text-base text-cocoa-soft">boy or girl</span>
        <div className="flex flex-wrap gap-2.5">
          {SEX.map((s) => (
            <button
              key={s.value || 'any'}
              type="button"
              className="tp-chip"
              aria-pressed={sex === s.value && !!s.value}
              onClick={() => setParam('sex', sex === s.value ? '' : s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
