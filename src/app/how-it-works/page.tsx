import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import JourneyTabs from '@/components/journey-tabs';
import FlightScene from '@/components/flight-scene';
import PupBuddy from '@/components/pup-buddy';
import {
  ChatDoodle,
  Globe,
  Heart,
  Paw,
  PlaneHeart,
  Skyline,
  Star,
  VetHeart,
  Wscp,
} from '@/components/doodles';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.',
};

const JUMP = [
  { n: '1', href: '#two-ways', label: 'Two ways home' },
  { n: '2', href: '#promise', label: 'Our premium puppy promise' },
  { n: '3', href: '#delivery', label: 'Delivery & collection' },
  { n: '4', href: '#why', label: 'Why choose us' },
];

const LOCAL_STEPS = [
  {
    t: 'Explore our puppies',
    d: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.',
    icon: 'paw',
    tint: '#fbe3b4',
  },
  {
    t: 'Choose your puppy',
    d: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.',
    icon: 'star',
    tint: '#fde6de',
  },
  {
    t: 'Meet before you choose',
    d: 'Spend time bonding before making your decision.',
    icon: 'chat',
    tint: '#e3f0fb',
  },
  {
    t: 'Pick-up or delivery',
    d: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.',
    icon: 'heart',
    tint: '#e6f2df',
  },
];

const IMPORT_STEPS = [
  {
    t: 'Reserve your puppy',
    d: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.',
    icon: 'star',
    tint: '#fbe3b4',
  },
  {
    t: 'Personalized consultation',
    d: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.",
    icon: 'chat',
    tint: '#fde6de',
  },
  {
    t: 'Import and arrival',
    d: 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.',
    icon: 'plane',
    tint: '#e3f0fb',
  },
  {
    t: 'Welcome home',
    d: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.',
    icon: 'heart',
    tint: '#e6f2df',
  },
];

const PROMISE = [
  {
    t: 'Hand-selected breeders',
    d: 'We work only with breeders who uphold the highest ethical and health standards.',
    ink: '#a24a1a',
    tilt: '-8deg',
    shape: 'tp-stamp--round',
    icon: 'paw',
  },
  {
    t: 'Full transparency',
    d: 'Photos, videos, and health certificates are shared before your puppy travels.',
    ink: '#1f6b45',
    tilt: '5deg',
    shape: 'tp-stamp--ticket',
    icon: 'star',
  },
  {
    t: 'Safe, stress-free delivery',
    d: 'We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.',
    ink: '#5a3a28',
    tilt: '-4deg',
    shape: 'tp-stamp--oval',
    icon: 'plane',
  },
];

const DELIVERY = [
  {
    t: 'Take your puppy home the same day',
    d: 'Local puppies are available immediately — visit, fall in love, and go home together.',
  },
  {
    t: 'Delivery within Dubai',
    d: 'Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.',
  },
  {
    t: 'Safe international cargo',
    d: 'We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.',
  },
  {
    t: 'Worldwide delivery',
    d: 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.',
  },
];

const WHY = [
  {
    t: 'International cargo',
    d: 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.',
    icon: 'globe',
  },
  {
    t: 'Support 24/7',
    d: "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away.",
    icon: 'chat',
  },
  {
    t: 'Health guarantee',
    d: 'All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    icon: 'vet',
  },
];

const STEP_ICON: Record<string, React.ReactNode> = {
  paw: <Paw />,
  star: <Star />,
  chat: <ChatDoodle />,
  heart: <Heart />,
  plane: <PlaneHeart />,
  globe: <Globe />,
  vet: <VetHeart />,
};

function Steps({ steps }: { steps: typeof LOCAL_STEPS }) {
  return (
    <ol className="tp-steps">
      {steps.map((s, i) => (
        <li
          key={s.t}
          className="tp-step"
          style={{ ['--i' as string]: i, ['--tint' as string]: s.tint }}
        >
          <span className="tp-step__icon" aria-hidden="true">
            {STEP_ICON[s.icon]}
          </span>
          <span className="tp-step__num font-plush">Step {i + 1}</span>
          <h3 className="font-plush tp-step__title">{s.t}</h3>
          <p className="tp-step__text">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* ============ HEADER ============ */}
      <section
        className="tp-scene overflow-hidden"
        data-tone="light"
        style={{
          ['--sky-top' as string]: '#fffbf3',
          ['--sky-bottom' as string]: '#f6cc85',
        }}
        aria-labelledby="how-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1
              id="how-title"
              className="font-plush text-[clamp(2.8rem,7vw,5.4rem)] font-black leading-none text-cocoa md:col-span-7"
              data-reveal
            >
              How it{' '}
              <span className="underline-sketch">works</span>
            </h1>
            <p
              className="tp-lead md:col-span-5 md:pb-4"
              data-reveal
              style={{ ['--d' as string]: '90ms' }}
            >
              Whether you choose to visit us locally or order a premium breed
              from overseas, TeddyPups is here to make the experience
              unforgettable.
            </p>
          </header>
          <ol className="mt-10 flex flex-wrap gap-3" data-reveal>
            {JUMP.map((j) => (
              <li key={j.n}>
                <a
                  href={j.href}
                  className="tp-chip !h-11 !rounded-full !border-2 !border-cocoa !bg-milk !px-4 hover:!bg-honey-soft"
                >
                  <span className="font-plush text-toffee-deep">{j.n}</span>
                  {j.label}
                </a>
              </li>
            ))}
          </ol>

          {/* ============ 1 — TWO WAYS HOME (tabbed journeys) ============ */}
          <div id="two-ways" className="scroll-mt-28">
            <JourneyTabs
              local={
                <>
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">
                        Meet your puppy in person
                      </h3>
                      <p className="tp-lead mt-4">
                        Step into our Downtown Dubai showroom and experience the
                        joy of choosing your puppy face-to-face. We source
                        healthy, well-socialized puppies from trusted local
                        breeders, ensuring they&apos;re raised with care, proper
                        nutrition, and veterinary checks.
                      </p>
                    </div>
                    <div className="tp-postcard" aria-hidden="true">
                      <span className="tp-postcard__sun" />
                      <span className="tp-postcard__to tp-postcard__to--left font-scrawl">
                        Downtown Dubai
                      </span>
                      <Skyline className="tp-postcard__city" />
                    </div>
                  </div>
                  <Steps steps={LOCAL_STEPS} />
                </>
              }
              imported={
                <>
                  <div className="tp-journey__head">
                    <div>
                      <h3 className="font-plush tp-journey__title">
                        Order upon request
                      </h3>
                      <p className="tp-lead mt-4">
                        Looking for a truly exceptional companion? Our Order
                        Upon Request service gives you access to some of the
                        world&apos;s most sought-after teacup breeds — ethically
                        sourced from the most reputable, certified breeders
                        across Europe, Korea, and beyond.
                      </p>
                      <p className="font-scrawl mt-4 text-lg text-toffee-ink">
                        From Korean teacup poodles to rare Maltese, Pom, and
                        Yorkie lines, we bring the world&apos;s finest puppies
                        to Dubai, just for you.
                      </p>
                    </div>
                    <div className="tp-postcard tp-postcard--sky" aria-hidden="true">
                      <svg className="tp-postcard__route" viewBox="0 0 400 200" aria-hidden="true">
                        <path d="M18 168 C 90 60, 240 26, 382 96" />
                      </svg>
                      <span className="tp-postcard__plane" aria-hidden="true">
                        <PlaneHeart className="h-full w-full" />
                      </span>
                      <span className="tp-postcard__from font-scrawl">Europe · Korea</span>
                      <span className="tp-postcard__to font-scrawl">Dubai</span>
                    </div>
                  </div>
                  <Steps steps={IMPORT_STEPS} />
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ============ 2 — PUPPY PASSPORT / PROMISE ============ */}
      <section
        id="promise"
        aria-labelledby="promise-title"
        className="tp-paper mt-24 -rotate-[0.6deg]"
        style={{ ['--d' as string]: '0ms' }}
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <p aria-hidden="true" className="font-scrawl text-lg text-toffee-ink" data-reveal>
            puppy passport
          </p>
          <h2
            id="promise-title"
            className="font-plush mt-1 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.02] text-cocoa"
            data-reveal
          >
            Our premium puppy promise
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {PROMISE.map((p, i) => (
              <li
                key={p.t}
                className="tp-entry"
                data-reveal
                style={{
                  ['--stamp' as string]: p.ink,
                  ['--tilt' as string]: p.tilt,
                  ['--i' as string]: i,
                }}
              >
                <div className={`tp-stamp ${p.shape}`}>
                  <span className="tp-stamp__icon" aria-hidden="true">
                    {STEP_ICON[p.icon]}
                  </span>
                  <span className="tp-stamp__title font-plush">{p.t}</span>
                </div>
                <p className="tp-entry__text">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 3 — DELIVERY & COLLECTION ============ */}
      <section id="delivery" aria-labelledby="delivery-title" className="mt-24">
        <div className="gutter mx-auto grid w-full max-w-[110rem] items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2
              id="delivery-title"
              className="font-plush text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.02] text-cocoa"
              data-reveal
            >
              Delivery &amp; collection
            </h2>
            <p className="tp-lead mt-5" data-reveal>
              From a same-day visit in Downtown Dubai to a flight from Korea,
              every puppy travels comfortably and arrives safely.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {DELIVERY.map((d, i) => (
                <li key={d.t} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
                  <h3 className="font-plush text-[1.3rem] font-black leading-snug text-cocoa">
                    {d.t}
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">{d.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="relative h-[clamp(14rem,30vw,22rem)] lg:col-span-6"
            data-reveal
          >
            <FlightScene />
          </div>
        </div>
      </section>

      {/* ============ 4 — WHY CHOOSE US ============ */}
      <section id="why" aria-labelledby="why-title" className="mt-24">
        <div className="gutter mx-auto grid w-full max-w-[110rem] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2
              id="why-title"
              className="font-plush text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.02] text-cocoa"
              data-reveal
            >
              Why choose us
            </h2>
            <p className="tp-lead mt-6" data-reveal>
              We&apos;re here to help you find a new family member. From the
              moment you visit our site to the joyful day your puppy arrives at
              your door, we&apos;re with you every step of the way. Our mission
              is to make the entire adoption process smooth, transparent, and
              full of love.
            </p>
          </div>
          <ul className="space-y-8 lg:col-span-6 lg:col-start-7">
            {WHY.map((w, i) => (
              <li key={w.t} className="flex gap-5" data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
                <span className="tp-step__icon !h-14 !w-14 flex-none" aria-hidden="true">
                  {STEP_ICON[w.icon]}
                </span>
                <div>
                  <h3 className="font-plush text-[1.7rem] font-black text-cocoa">{w.t}</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">{w.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 5 — CTA BOARD ============ */}
      <section aria-labelledby="care-title" className="mt-24 pb-24">
        <div className="gutter mx-auto max-w-[110rem]">
          <div className="tp-board grid items-center gap-8 md:grid-cols-[1fr_auto] md:!p-12">
            <div>
              <h2
                id="care-title"
                className="font-plush text-[clamp(2rem,4.5vw,3.4rem)] font-black leading-[1.05] text-cocoa"
                data-reveal
              >
                Unique and high quality puppies
              </h2>
              <p className="tp-lead mt-5 max-w-[52ch]" data-reveal>
                When you choose TeddyPups, you can trust that you&apos;re
                getting a puppy of the highest quality. We also provide guidance
                and support to new pet owners, offering advice on training,
                nutrition, and general care to ensure a smooth transition for
                you and your new furry friend.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-btn tp-btn--wa"
                >
                  <Wscp className="h-4 w-4" />
                  Ask us on WhatsApp
                </a>
                <Link href="/puppies" className="tp-btn tp-btn--ghost">
                  See available puppies
                </Link>
              </div>
            </div>
            <div className="mx-auto w-48 md:w-56" data-reveal>
              <PupBuddy pose="sit" label="Teddy, the TeddyPups puppy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
