import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { AVAILABLE, GONE_PUPPIES } from '@/lib/data';
import { PuppyCard, PuppyThumb } from '@/components/puppy-card';
import PuppyFilters from '@/components/puppy-filters';
import { Paw, SketchRing, PuppyFace } from '@/components/doodles';

export const metadata: Metadata = {
  title: 'Available puppies',
  description:
    'Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.',
};

function filterPuppies(sp: Record<string, string | string[] | undefined>) {
  const origin = typeof sp.origin === 'string' ? sp.origin : '';
  const korean = sp.korean === '1';
  const breed = typeof sp.breed === 'string' ? sp.breed.toLowerCase().replace(/-/g, ' ') : '';
  const sex = typeof sp.sex === 'string' ? sp.sex : '';

  return AVAILABLE.filter((p) => {
    if (origin === 'imported' && p.origin !== 'imported') return false;
    if (origin === 'local' && p.origin !== 'local') return false;
    if (korean && !p.koreanTeacup) return false;
    if (breed && !p.breed.toLowerCase().includes(breed.toLowerCase())) return false;
    if (sex === 'boy' && !(p.sex.includes('boy'))) return false;
    if (sex === 'girl' && !(p.sex.includes('girl'))) return false;
    return true;
  });
}

export default async function PuppiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const list = filterPuppies(sp);

  return (
    <>
      <section className="paper-dots relative overflow-hidden bg-milk pb-16 pt-14">
        <div className="wrap relative">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-2xl">
              <p className="tp-eyebrow" data-reveal>
                from Teddy&apos;s sketchbook
              </p>
              <h1
                className="font-plush mt-3 text-[clamp(2.8rem,7vw,5rem)] font-black leading-none text-cocoa"
                data-reveal
              >
                Available <span className="underline-sketch">puppies</span>
              </h1>
              <p className="tp-lead" data-reveal>
                Every listing shows real photos of the actual puppy. Open a
                profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>
            <div className="relative hidden sm:block" aria-hidden data-reveal>
              <span className="grid h-32 w-32 place-items-center rounded-full border-2 border-cocoa bg-honey-soft">
                <PuppyFace className="h-20 w-20" />
              </span>
              <span className="mt-2 block text-center font-scrawl text-sm text-cocoa-soft">
                self-portrait
              </span>
            </div>
          </div>

          <div className="mt-10">
            <Suspense fallback={<div className="h-40" />}>
              <PuppyFilters />
            </Suspense>
          </div>

          <p className="mt-8 font-scrawl text-lg text-cocoa-soft" data-reveal>
            {list.length} {list.length === 1 ? 'puppy is' : 'puppies are'} looking for a home
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <PuppyCard key={p.slug} puppy={p} priority={i < 4} />
            ))}
          </div>

          {list.length === 0 && (
            <div className="mt-8 rounded-[1.4rem] border-2 border-dashed border-cocoa/40 bg-milk p-10 text-center">
              <p className="font-plush text-2xl font-black text-cocoa">
                No puppies match those filters (yet!)
              </p>
              <p className="mt-2 text-cocoa-soft">
                New pups arrive all the time — ask us on WhatsApp and we&apos;ll
                help you find your match.
              </p>
              <Link href="/puppies" className="tp-btn mt-5">
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* gone home band */}
      <section className="relative overflow-hidden bg-honey-soft py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <h2 className="tp-h2">Already gone home</h2>
            <p className="tp-lead">These puppies have found their families.</p>
            <Link href="/gone-home" className="tp-btn mt-6">
              See the puppies who&apos;ve gone home
              <Paw className="h-4 w-4" />
            </Link>
          </div>
          <ul className="flex flex-wrap items-end justify-center gap-6" data-reveal>
            {GONE_PUPPIES.slice(0, 6).map((p) => (
              <li key={p.slug} className="w-20 text-center sm:w-24">
                <Link href={`/puppies/${p.slug}`} className="group relative block">
                  <span className="relative block aspect-square">
                    <SketchRing className="absolute inset-[-6%] h-[112%] w-[112%] text-cocoa" />
                    <PuppyThumb puppy={p} />
                  </span>
                  <span className="mt-2 block truncate font-scrawl text-sm text-cocoa-soft">
                    {p.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
