import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AVAILABLE, puppyBySlug, puppyNeighbors } from '@/lib/data';
import PuppyCarousel from '@/components/puppy-carousel';
import EnquiryForm from '@/components/enquiry-form';
import { PuppyThumb } from '@/components/puppy-card';
import { Paw, Sparkle, Wscp } from '@/components/doodles';
import { SITE } from '@/lib/data';

export function generateStaticParams() {
  return AVAILABLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const puppy = puppyBySlug(slug);
  if (!puppy) return {};
  const title = `${puppy.name}, ${puppy.breed} puppy`;
  return {
    title,
    description: puppy.metaDesc,
    openGraph: {
      title,
      description: puppy.metaDesc,
      images: [{ url: puppy.images[0] }],
    },
  };
}

export default async function PuppyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const puppy = puppyBySlug(slug);
  if (!puppy) notFound();

  const { prev, next } = puppyNeighbors(slug);
  const isGone = puppy.status === 'gone';

  const slides = [
    ...puppy.images.map((src, idx) => ({
      type: 'image' as const,
      src,
      alt: `${puppy.name} — ${puppy.breed} ${idx === 0 ? 'portrait' : `photo ${idx + 1}`} at TeddyPups U.A.E.`,
    })),
    ...(puppy.video
      ? [
          {
            type: 'video' as const,
            src: puppy.video,
            poster: puppy.images[1] || puppy.images[0],
            alt: `${puppy.name} the ${puppy.breed} on video`,
          },
        ]
      : []),
  ];

  const waText = encodeURIComponent(
    `Hi TeddyPups! I'd love to know more about ${puppy.name} (${puppy.breed}).`,
  );
  const waLink = `https://wa.me/971541676733?text=${waText}`;

  const specs = [
    { k: 'Breed', v: puppy.breed },
    { k: 'Boy or girl', v: puppy.sex },
    { k: 'Age', v: puppy.age },
    { k: 'Where', v: puppy.where },
  ];

  return (
    <>
      {/* breadcrumb */}
      <div className="bg-milk">
        <div className="wrap flex items-center gap-3 pb-4 pt-5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf font-plush text-sm font-black text-milk" aria-hidden>
            1
          </span>
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-cocoa-soft">
            <Link href="/puppies" className="underline-offset-4 hover:underline">
              Available puppies
            </Link>
            <span className="mx-2 text-cocoa/50">/</span>
            <span className="text-cocoa">{puppy.name}</span>
          </nav>
          <span className="font-scrawl hidden text-base text-toffee-deep sm:block">hello, it&apos;s me</span>
        </div>
      </div>

      <section className="paper-dots bg-milk pb-20 pt-6">
        <div className="wrap grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* gallery */}
          <div data-reveal>
            <PuppyCarousel slides={slides} />
          </div>

          {/* spec card */}
          <div className="grid gap-8 lg:sticky lg:top-24" data-reveal>
            <article className="relative rounded-[1.6rem] border-[3px] border-cocoa bg-milk p-6 shadow-[8px_10px_0_0_#2a170e26] sm:p-8">
              <Sparkle className="absolute -right-4 -top-4 h-7 w-7 text-honey" aria-hidden />
              <span
                className={`tp-sticker relative !static inline-flex ${isGone ? 'tp-sticker--gone' : ''}`}
              >
                <Paw className="h-3.5 w-3.5" />
                {isGone ? 'Gone home' : 'Available'}
              </span>
              <h1 className="font-plush mt-4 text-[clamp(2.4rem,5vw,3.6rem)] font-black leading-none text-cocoa">
                {puppy.name}
              </h1>
              <p className="mt-2 text-lg font-bold text-cocoa-soft">{puppy.breed}</p>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt className="font-scrawl text-sm text-cocoa-soft">{s.k}</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-bold text-cocoa">{s.v}</dd>
                  </div>
                ))}
              </dl>

              {isGone ? (
                <p className="mt-7 rounded-2xl border-2 border-dashed border-cocoa/40 bg-honey-soft p-4 text-center font-scrawl text-lg text-cocoa-soft">
                  this pup already found a family — want one just like them?
                  <Link href="/puppies" className="mt-2 block font-sans text-sm font-bold text-toffee-deep underline underline-offset-4">
                    See available puppies
                  </Link>
                </p>
              ) : (
                <>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa mt-7 w-full">
                    <Wscp className="h-4 w-4" />
                    Ask about {puppy.name} on WhatsApp
                  </a>
                  <a href="#enquire" className="tp-btn tp-btn--ghost mt-3 w-full">
                    Send an enquiry
                  </a>
                </>
              )}
            </article>

            {/* what comes with */}
            <article className="rounded-[1.6rem] border-[3px] border-cocoa bg-honey-soft p-6 sm:p-8">
              <p className="font-scrawl text-lg text-toffee-ink">
                <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full border-2 border-cocoa bg-honey font-plush text-sm font-black text-cocoa">
                  2
                </span>
                what comes with {puppy.name}
              </p>
              <h2 className="font-plush mt-3 text-2xl font-black text-cocoa">
                Every Teddy Pup comes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Vaccinated',
                  'Dewormed',
                  'Verified health certificate from licensed vets',
                  'Thoroughly checked before joining your family',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-semibold text-cocoa">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-leaf text-xs font-black text-milk" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* the way home */}
      <section className="bg-milk pb-20 pt-4">
        <div className="wrap">
          <p className="font-scrawl text-lg text-toffee-deep" data-reveal>
            <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full border-2 border-cocoa bg-honey font-plush text-sm font-black text-cocoa">
              3
            </span>
            the way home
          </p>
          <h2 className="tp-h2 mt-3" data-reveal>
            Coming home from abroad
          </h2>

          <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span className="paw-line absolute left-0 right-0 top-5 hidden h-3 lg:block" aria-hidden />
            {[
              {
                t: 'Reserve your puppy',
                d: 'Tell us which puppy has captured your heart.',
              },
              {
                t: 'Personalized consultation',
                d: "We finalize details with you and share updates on your puppy's journey.",
              },
              {
                t: 'Import and arrival',
                d: 'We manage health checks, travel arrangements, and documentation.',
              },
              {
                t: 'Welcome home',
                d: 'We help your new puppy settle in and ensure a smooth transition into your home.',
              },
            ].map((s, i) => (
              <li key={s.t} className="relative" data-reveal>
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-cocoa bg-milk font-plush text-lg font-black text-cocoa shadow-[0_3px_0_0_#2a170e]">
                  {i + 1}
                </span>
                <h3 className="font-plush mt-4 text-lg font-black text-cocoa">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cocoa-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* enquiry */}
      {!isGone && (
        <section id="enquire" className="scroll-mt-24 bg-milk pb-20">
          <div className="wrap">
            <div
              className="relative rounded-[1.8rem] border-[3px] border-cocoa bg-milk p-6 shadow-[8px_10px_0_0_#2a170e26] sm:p-10"
              data-reveal
            >
              <p className="font-scrawl text-lg text-toffee-deep">
                <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full border-2 border-cocoa bg-honey font-plush text-sm font-black text-cocoa">
                  4
                </span>
                dear TeddyPups…
              </p>
              <div className="mt-3 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <h2 className="font-plush text-[clamp(2rem,4vw,3rem)] font-black leading-tight text-cocoa">
                    Ask about {puppy.name}
                  </h2>
                  <p className="mt-3 leading-relaxed text-cocoa-soft">
                    Leave your details and our team will get back to you promptly
                    — or message us on WhatsApp for the quickest reply.
                  </p>
                  <div className="relative mt-8 hidden h-40 w-40 lg:block" aria-hidden>
                    <Image
                      src={puppy.images[0]}
                      alt=""
                      fill
                      sizes="10rem"
                      className="rounded-full border-2 border-cocoa object-cover"
                    />
                  </div>
                </div>
                <EnquiryForm
                  variant="puppy"
                  puppyName={puppy.name}
                  puppyBreed={puppy.breed}
                  puppySlug={puppy.slug}
                  defaultMessage={puppy.enquiry || `Hi! I'd love to know more about ${puppy.name} (${puppy.breed}).`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* prev / next */}
      <nav aria-label="More puppies" className="bg-milk pb-24">
        <div className="wrap grid gap-5 sm:grid-cols-2">
          <Link
            href={`/puppies/${prev.slug}`}
            className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1"
            rel="prev"
          >
            <span className="relative block h-16 w-16 flex-none overflow-hidden rounded-full border-2 border-cocoa">
              <PuppyThumb puppy={prev} size={64} />
            </span>
            <span>
              <span className="font-scrawl block text-sm text-cocoa-soft">Previous pup</span>
              <span className="font-plush block text-xl font-black text-cocoa">{prev.name}</span>
            </span>
          </Link>
          <Link
            href={`/puppies/${next.slug}`}
            className="group flex items-center justify-end gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 text-right transition-transform duration-500 hover:rotate-1"
            rel="next"
          >
            <span>
              <span className="font-scrawl block text-sm text-cocoa-soft">Next pup</span>
              <span className="font-plush block text-xl font-black text-cocoa">{next.name}</span>
            </span>
            <span className="relative block h-16 w-16 flex-none overflow-hidden rounded-full border-2 border-cocoa">
              <PuppyThumb puppy={next} size={64} />
            </span>
          </Link>
        </div>
      </nav>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${puppy.name} — ${puppy.breed}`,
            description: puppy.metaDesc,
            image: puppy.images.slice(0, 3),
            brand: { '@type': 'Brand', name: SITE.name },
            offerStatus: isGone ? 'SoldOut' : 'InStock',
          }),
        }}
      />
    </>
  );
}
