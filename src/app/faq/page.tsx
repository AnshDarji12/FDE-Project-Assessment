import type { Metadata } from 'next';
import FaqNotes from '@/components/faq-notes';
import { FAQS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to the questions families ask most — health checks, meetups, imports, delivery, breeds and after-care support.',
};

export default function FaqPage() {
  return (
    <>
      <section
        className="tp-scene tp-faqroom overflow-hidden"
        data-tone="dark"
        style={{
          ['--sky-top' as string]: '#a95e32',
          ['--sky-bottom' as string]: '#331c11',
        }}
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1
              id="faq-title"
              className="font-plush text-[clamp(2.8rem,7vw,5.4rem)] font-black leading-[1.02] text-milk"
              data-reveal
            >
              Questions &amp; answers
            </h1>
            <p
              className="tp-lead mt-6 max-w-[52ch] !text-milk/85"
              data-reveal
              style={{ ['--d' as string]: '90ms' }}
            >
              Can&apos;t find what you&apos;re looking for? Message us on
              WhatsApp — our team is available 24/7.
            </p>
          </header>
          <div className="mt-12 md:mt-16">
            <FaqNotes />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
