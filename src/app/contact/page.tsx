import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE } from '@/lib/data';
import LetterForm from '@/components/letter-form';

export const metadata: Metadata = {
  title: 'Visit & contact',
  description:
    'Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly.',
};

export default function ContactPage() {
  return (
    <>
      <section
        className="tp-scene overflow-hidden"
        data-tone="light"
        style={{
          ['--sky-top' as string]: '#fff9ee',
          ['--sky-bottom' as string]: '#f9dca4',
        }}
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1
              id="contact-title"
              className="font-plush max-w-[12ch] text-[clamp(2.8rem,7vw,5.4rem)] font-black leading-[1.02] text-cocoa lg:col-span-7"
              data-reveal
            >
              Get in touch{' '}
              <span className="underline-sketch">with us</span>
            </h1>
            <p
              className="tp-lead lg:col-span-5 lg:pb-3"
              data-reveal
              style={{ ['--d' as string]: '90ms' }}
            >
              Have questions about our puppies or adoption process? Fill out the
              form, and our team will get back to you promptly. Whether ready to
              adopt or just seeking info, we&apos;d love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* the letter — right column on desktop, mirroring the reference */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <LetterForm />
            </div>

            {/* contact details — left column */}
            <div className="grid content-start gap-6 lg:col-span-5 lg:row-start-1">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn tp-btn--wa w-full sm:w-auto"
                data-reveal
              >
                WhatsApp {SITE.phone}
              </a>
              <div data-reveal style={{ ['--d' as string]: '70ms' }}>
                <p className="font-scrawl text-cocoa-soft">call us</p>
                <a href={SITE.phoneHref} className="link-ink font-plush text-2xl font-black">
                  {SITE.phone}
                </a>
              </div>
              <div data-reveal style={{ ['--d' as string]: '140ms' }}>
                <p className="font-scrawl text-cocoa-soft">email</p>
                <a href={`mailto:${SITE.email}`} className="link-ink break-all font-plush text-2xl font-black">
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          {/* the showroom */}
          <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
            <div className="tp-visit relative p-7 pt-6">
              <div data-reveal>
                <h2 id="visit-title" className="font-plush text-[2rem] font-black leading-tight text-cocoa">
                  Visit us in Downtown Dubai
                </h2>
                <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                  Step into our Downtown Dubai showroom and experience the joy
                  of choosing your puppy face-to-face.
                </p>
                <p className="mt-4 flex items-center gap-2 font-semibold text-cocoa">
                  {SITE.address}
                </p>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tp-btn tp-btn--ghost mt-6 !bg-milk"
                >
                  Open in Google Maps
                </a>
              </div>
              <figure className="tp-visit__photo" data-reveal>
                <Image
                  src="/media/4vu6_PGfL64H/537c367d85/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif"
                  alt="A puppy held up in the TeddyPups Downtown Dubai showroom"
                  fill
                  sizes="(min-width: 640px) 11rem, 60vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
