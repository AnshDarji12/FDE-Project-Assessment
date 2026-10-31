import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GONE_PUPPIES } from '@/lib/data';
import { Heart, Paw } from '@/components/doodles';

export const metadata: Metadata = {
  title: 'Gone home',
  description:
    'Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we will help you find your match.',
};

export default function GoneHomePage() {
  return (
    <>
      <section className="paper-dots relative overflow-hidden bg-milk pb-16 pt-14">
        <div className="wrap relative">
          <p className="tp-eyebrow" data-reveal>
            tickets home
          </p>
          <h1
            className="font-plush mt-3 text-[clamp(2.8rem,7vw,5rem)] font-black leading-none text-cocoa"
            data-reveal
          >
            Gone <span className="underline-sketch">home</span>
          </h1>
          <p className="tp-lead" data-reveal>
            Every puppy here has already joined a loving family. Looking for one
            just like them? Tell us — we&apos;ll help you find your match.
          </p>
          <Link href="/puppies" className="tp-btn mt-7" data-reveal>
            See available puppies
            <Paw className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-honey-soft py-16">
        <div className="wrap">
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {GONE_PUPPIES.map((p, i) => (
              <li key={p.slug} data-reveal style={{ ['--d' as string]: `${(i % 4) * 60}ms` }}>
                <Link
                  href={`/puppies/${p.slug}`}
                  className="tp-ticket block"
                  style={{ ['--tilt' as string]: p.tilt || `${((i % 3) - 1) * 1.2}deg` }}
                  aria-label={`${p.name}, ${p.breed}, ${p.sex} — gone home`}
                >
                  <span className="tp-ticket__photo">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={`${p.name} — ${p.breed}, already home`}
                        fill
                        sizes="(max-width: 640px) 45vw, 16rem"
                        className="object-cover"
                      />
                    ) : null}
                  </span>
                  <span className="mt-3 block font-plush text-xl font-black text-cocoa">{p.name}</span>
                  <span className="block text-sm font-semibold text-cocoa-soft">
                    {[p.breed, p.sex].filter(Boolean).join(', ')}
                  </span>
                  <span className="tp-ticket__stub">
                    <span>one ticket home</span>
                    <span className="flex items-center gap-1 font-bold text-toffee-deep">
                      home <Heart className="h-3.5 w-3.5" />
                    </span>
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
