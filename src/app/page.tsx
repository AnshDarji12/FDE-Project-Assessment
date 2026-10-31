import Image from 'next/image';
import Link from 'next/link';
import { AVAILABLE, FAMILIES, FAQS, SITE, TESTIMONIALS } from '@/lib/data';
import FaqAccordion from '@/components/faq-accordion';
import PupBuddy from '@/components/pup-buddy';
import PupSpot from '@/components/pup-spot';
import PupJourney from '@/components/pup-journey';
import { HeroLineup, KennelRow } from '@/components/story-lineup';
import {
  JourneyChat,
  DuskHorizon,
  NightHouse,
  StampBook,
} from '@/components/story-scenes';
import {
  Sparkle,
  Squiggle,
  Star,
  Question,
  VetHeart,
  ChatDoodle,
  Globe,
  PlaneHeart,
  PlaneDoodle,
  Paw,
  Heart,
  Wscp,
} from '@/components/doodles';

const HERO_NAMES = AVAILABLE.slice(0, 6);
const KENNEL_NAMES = AVAILABLE.slice(0, 9);

export default function HomePage() {
  return (
    <>
      {/* ============ 1. HERO — morning ============ */}
      <section
        className="tp-scene tp-hero"
        data-tone="light"
        style={{ ['--sky-top' as string]: '#fffdf8', ['--sky-bottom' as string]: '#fff1d8', ['--quilt' as string]: '#fff1d8' }}
        aria-labelledby="hero-title"
      >
        <span className="tp-hero__sun" aria-hidden />

        <div className="tp-hero__copy gutter-x">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-toffee" />
          </p>
          <h1 id="hero-title" className="tp-hero__title font-plush font-black">
            <span className="tp-hero__line" style={{ ['--l' as string]: 0 }}>
              <span>Premium teacup</span>
            </span>
            <span className="tp-hero__line" style={{ ['--l' as string]: 1 }}>
              <span>puppies in Dubai</span>
            </span>
          </h1>
          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare
            miniature breed from trusted breeders worldwide.
          </p>
          <div className="tp-hero__actions">
            <Link href="/puppies" className="tp-btn">
              View available puppies
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-btn tp-btn--ghost"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* stage: pups peeking over the quilt, teddy in the middle */}
        <div className="tp-hero__stage">
          <HeroLineup pups={HERO_NAMES} />

          <div className="tp-hero__teddy" aria-hidden>
            <PupBuddy pose="peek" />
          </div>

          {/* quilt with scalloped edge + diamond stitching */}
          <div className="tp-quilt" aria-hidden>
            <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
              <defs>
                <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }} />
                  <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="1.6"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                    opacity=".42"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop)" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============ 2. MEET THE PUPS — pinned kennel treadmill ============ */}
      <section
        className="tp-scene"
        data-tone="light"
        style={{ ['--sky-top' as string]: '#fff1d8', ['--sky-bottom' as string]: '#fbe3b4' }}
        aria-labelledby="meet-title"
      >
        <KennelRow pups={KENNEL_NAMES} />
      </section>

      {/* ============ 3. TWO WAYS — signpost crossroads ============ */}
      <section
        className="tp-scene"
        data-tone="light"
        style={{ ['--sky-top' as string]: '#fbe3b4', ['--sky-bottom' as string]: '#f7d18d' }}
      >
        <div className="wrap py-[clamp(4rem,9vh,6.5rem)]">
          <div className="text-center" data-reveal>
            <h2 className="font-plush text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[1.02]">
              Two ways to
              <br />
              meet your puppy
            </h2>
          </div>

          {/* signpost */}
          <div className="relative mx-auto mt-10 flex max-w-3xl justify-center" data-reveal>
            <span className="absolute bottom-[-1.2rem] left-1/2 h-[calc(100%+1rem)] w-4 -translate-x-1/2 rounded-md border-[3px] border-cocoa bg-[linear-gradient(#e4a85b,#d38f45)]" aria-hidden />
            <span className="tp-sign tp-sign--left font-plush font-black">Puppies in Dubai</span>
            <span className="tp-sign tp-sign--right font-plush font-black">Imported for you</span>
          </div>

          <div className="tp-ways mt-14">
            <article className="tp-way-card relative" data-reveal>
              <span className="tp-tape tp-tape--left" aria-hidden />
              <span className="tp-shopfront mb-4 block">
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src="/media/4vu6_PGfL64H/537c367d85/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif"
                    alt="A puppy held up in the Dubai showroom"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30rem"
                    className="object-cover"
                  />
                </span>
              </span>
              <h3 className="font-plush text-2xl font-black">Puppies in Dubai</h3>
              <p className="font-scrawl mt-0.5 text-toffee-ink">In our showroom</p>
              <p className="mt-3 leading-relaxed text-cocoa-soft">
                See them, love them, take them home. Come meet our locally
                available puppies before you decide.
              </p>
              <Link href="/puppies?origin=local" className="tp-btn mt-5">
                Meet local puppies
              </Link>
            </article>

            {/* teddy between the two paths (desktop) */}
            <PupSpot className="tp-ways__teddy" pose="sit" />

            <article className="tp-way-card relative" data-reveal style={{ ['--d' as string]: '90ms' }}>
              <span className="tp-tape tp-tape--right" aria-hidden />
              <span className="relative mb-4 block overflow-hidden rounded-[1.2rem] border-[3px] border-cocoa">
                <span className="relative block aspect-[4/3]">
                  <Image
                    src="/media/QgFG5s09n-ss/81af626d2d/27b888_5f9a7189bb21477d832047aae2040921-mv2.avif"
                    alt="Korean teacup puppy ready to fly to Dubai"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30rem"
                    className="object-cover"
                  />
                </span>
              </span>
              <h3 className="font-plush text-2xl font-black">Imported for you</h3>
              <p className="font-scrawl mt-0.5 text-toffee-ink">Korea → Dubai</p>
              <p className="mt-3 leading-relaxed text-cocoa-soft">
                Exclusive Korean teacup puppies, delivered. Order from the
                world&apos;s most reputable breeders and let us handle the import.
              </p>
              <Link href="/puppies?origin=imported" className="tp-btn mt-5">
                See imported puppies
              </Link>
            </article>
          </div>

          {/* dotted flight route Korea → Dubai */}
          <div className="relative mx-auto mt-16 max-w-3xl" data-reveal aria-hidden>
            <svg viewBox="0 0 640 120" fill="none" className="w-full">
              <path
                d="M20 96C110 96 120 34 210 34s96 62 190 62 96-62 190-62 60 62 60 62"
                stroke="#8e3f15"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeDasharray="2 11"
              />
            </svg>
            <PlaneDoodle className="absolute right-[16%] top-[-1.6rem] h-16 w-auto" />
            <span className="font-scrawl absolute -bottom-1 left-2 text-lg text-toffee-ink">Korea</span>
            <span className="font-scrawl absolute -bottom-1 right-2 text-lg text-toffee-ink">Dubai</span>
            <span className="absolute bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-toffee-deep" />
            <span className="absolute bottom-1 right-2 h-2.5 w-2.5 rounded-full bg-toffee-deep" />
          </div>
        </div>
      </section>

      {/* ============ 4. JOURNEY — scroll-driven WhatsApp chat ============ */}
      <section
        className="tp-scene"
        data-tone="light"
        style={{ ['--sky-top' as string]: '#f7d18d', ['--sky-bottom' as string]: '#f0b866' }}
        aria-labelledby="journey-title"
      >
        <div className="py-[clamp(4.5rem,10vh,7rem)]">
          <JourneyChat />
        </div>
      </section>

      {/* ============ 5. PASSPORT — sunset begins ============ */}
      <section
        className="tp-scene tp-passport"
        data-tone="light"
        style={{ ['--sky-top' as string]: '#f0b866', ['--sky-bottom' as string]: '#a65a30' }}
      >
        <div className="wrap">
          <StampBook className="tp-book">
            <div className="tp-book__page tp-book__page--left">
              <p className="tp-book__kicker font-scrawl">puppy passport</p>
              <h2 className="tp-book__title font-plush font-black">
                Why families trust TeddyPups
              </h2>
              <p className="tp-book__body">
                Health papers, safe travel and round-the-clock care — stamped and
                verified for every single pup.
              </p>
              <PupSpot className="tp-book__teddy" pose="snug" />
            </div>

            <div className="tp-book__page tp-book__page--right">
              <div className="tp-stamp tp-stamp--round" style={{ ['--tilt' as string]: '-8deg', ['--i' as string]: 0 }}>
                <VetHeart className="tp-stamp__icon" />
                <p className="tp-stamp__title font-plush font-black">Vet-checked &amp; healthy</p>
              </div>
              <div className="tp-stamp tp-stamp--ticket" style={{ ['--tilt' as string]: '5deg', ['--i' as string]: 1, ['--stamp' as string]: '#1f7a4d' }}>
                <PlaneHeart className="tp-stamp__icon" />
                <p className="tp-stamp__title font-plush font-black">Korea to Dubai, safely</p>
              </div>
              <div className="tp-stamp tp-stamp--oval" style={{ ['--tilt' as string]: '4deg', ['--i' as string]: 2, ['--stamp' as string]: '#5a3a28' }}>
                <ChatDoodle className="tp-stamp__icon" />
                <p className="tp-stamp__title font-plush font-black">Support 24/7</p>
              </div>
              <div className="tp-stamp tp-stamp--scallop" style={{ ['--tilt' as string]: '-5deg', ['--i' as string]: 3 }}>
                <Globe className="tp-stamp__icon" />
                <p className="tp-stamp__title font-plush font-black">Trusted by families worldwide</p>
              </div>
            </div>
          </StampBook>

          <p className="pb-6 text-center font-scrawl text-[#fffdf8cc]" data-reveal>
            stamps verified on every journey
          </p>
        </div>
      </section>

      {/* ============ 6. DUSK → HAPPY FAMILIES — wooden wall ============ */}
      <section
        className="tp-scene tp-dusk"
        data-tone="dark"
        style={{ ['--sky-top' as string]: '#a65a30', ['--sky-bottom' as string]: '#4d2b19' }}
        aria-labelledby="families-title"
      >
        <div className="tp-dusk__sky pt-[clamp(3rem,7vh,5rem)]">
          <div data-reveal>
            <h2 id="families-title" className="font-plush text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-none">
              Happy families &amp; puppies
            </h2>
            <p className="tp-lead !text-[var(--ink-soft)] mt-4 max-w-[52ch]">
              We are truly honored to see our puppies become cherished members of
              loving families. These heartwarming moments have been shared by our
              valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </div>

          <figure className="tp-dusk__note" data-reveal>
            <blockquote>{TESTIMONIALS[0].quote}</blockquote>
            <figcaption className="font-scrawl">
              {TESTIMONIALS[0].author}, {TESTIMONIALS[0].location}
            </figcaption>
          </figure>
          <PupSpot className="tp-dusk__teddy" pose="sit" />
        </div>

        {/* sun sets behind the city as you arrive */}
        <DuskHorizon />

        {/* wooden wall of polaroids */}
        <div className="tp-room relative mt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(6rem,12vh,9rem)] pt-[clamp(2.5rem,6vh,4rem)]">
          <span className="tp-lamp" aria-hidden>
            <span className="tp-lamp__light" />
          </span>
          <span
            className="absolute bottom-0 left-1/2 h-[4.6rem] w-[4.7rem] -translate-x-1/2 overflow-hidden border-[3px] border-cocoa border-b-0 rounded-t-full bg-[linear-gradient(90deg,transparent_calc(50%_-_1.5px),#2a170e59_calc(50%_-_1.5px)_calc(50%_+_1.5px),transparent_calc(50%_+_1.5px)),#b26a33]"
            aria-hidden
          />
          <div className="gutter-x">
            <ul className="tp-wall mx-auto max-w-[110rem]">
              {FAMILIES.slice(0, 8).map((f, i) => (
                <li key={f.img + String(i)} className="tp-wall__item">
                  <span className="tp-wall__print block" style={{ ['--tilt' as string]: `${((i * 5) % 7) - 3}deg` }}>
                    <span className="tp-polaroid">
                      <span
                        className="tp-tape"
                        style={
                          i % 3 === 0
                            ? { left: '-1rem', top: '0.05rem', rotate: '-40deg', width: 'clamp(3.2rem,26%,4.6rem)' }
                            : i % 3 === 1
                              ? { left: '50%', top: '-0.7rem', translate: '-50%', rotate: '-3deg' }
                              : { right: '-1rem', top: '0.05rem', rotate: '40deg', width: 'clamp(3.2rem,26%,4.6rem)' }
                        }
                        aria-hidden
                      />
                      <span className="tp-polaroid__photo aspect-[4/4.6]">
                        <Image
                          src={f.poster || f.img}
                          alt={f.caption || 'A happy TeddyPups family'}
                          fill
                          sizes="(max-width: 768px) 45vw, 22rem"
                          className="object-cover"
                        />
                      </span>
                      <span className="tp-polaroid__caption font-scrawl">
                        {f.caption || 'so much love'}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-center" data-reveal>
              <Link href="/happy-families" className="tp-btn">
                See every happy family
                <Heart className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <Sparkle className="tp-star left-[14%] top-8 h-4 w-4" style={{ ['--d' as string]: '0.4s' }} />
          <Sparkle className="tp-star right-[10%] top-24 h-5 w-5" style={{ ['--d' as string]: '1.3s' }} />
          <Star className="tp-star right-[24%] bottom-16 h-4 w-4" style={{ ['--d' as string]: '2.1s' }} />
        </div>
      </section>

      {/* ============ 7. NIGHT — FAQ room + CTA ============ */}
      <section
        className="tp-scene tp-faqroom"
        data-tone="dark"
        style={{ ['--sky-top' as string]: '#4d2b19', ['--sky-bottom' as string]: '#2f1a10' }}
      >
        <div className="wrap grid items-start gap-12 pb-[clamp(4rem,9vh,6rem)] pt-[clamp(4.5rem,10vh,7rem)] lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal>
            <h2 className="font-plush text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-none text-honey">
              Questions,
              <br />
              answered
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#fffdf8cc]">
              Everything families usually ask before bringing a Teddy Pup home.
              Something else on your mind? Ask us directly.
            </p>
            <Link href="/faq" className="tp-btn tp-btn--ghost mt-8">
              Read all questions
            </Link>
            <Question className="tp-ques absolute left-[8%] top-[26%] h-12 w-auto rotate-[-8deg]" style={{ ['--d' as string]: '0.2s' }} />
            <Question className="tp-ques absolute left-[38%] top-[14%] h-9 w-auto rotate-[10deg] opacity-70" style={{ ['--d' as string]: '1.1s' }} />
          </div>
          <FaqAccordion items={FAQS.slice(0, 3)} defaultOpen={0} />
        </div>

        <Sparkle className="tp-star left-[6%] top-[12%] h-4 w-4" style={{ ['--d' as string]: '0s' }} />
        <Sparkle className="tp-star left-[30%] top-[38%] h-3 w-3" style={{ ['--d' as string]: '0.9s' }} />
        <Sparkle className="tp-star right-[8%] top-[24%] h-4 w-4" style={{ ['--d' as string]: '1.6s' }} />

        {/* ============ CTA — front door at night ============ */}
        <div className="wrap relative pb-[clamp(4.5rem,10vh,7rem)] text-center">
          <NightHouse />
          <h2 className="font-plush mx-auto mt-8 max-w-[16ch] text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[1.02] text-milk" data-reveal>
            Ready to meet your new best friend?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#fffdf8cc]" data-reveal>
            Bring home a healthy, happy teacup or designer puppy with expert
            guidance every step of the way. We help you find the right match and
            ensure a smooth, safe delivery across the UAE.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4" data-reveal>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa">
              <Wscp className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
            <Link href="/contact" className="tp-btn tp-btn--ghost">
              Visit &amp; contact
            </Link>
          </div>
        </div>
      </section>

      {/* Teddy walks the whole page as you scroll */}
      <PupJourney />
    </>
  );
}
