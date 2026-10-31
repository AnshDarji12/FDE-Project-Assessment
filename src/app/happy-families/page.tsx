import type { Metadata } from 'next';
import { FAMILIES, TESTIMONIALS } from '@/lib/data';
import PolaroidWall from '@/components/polaroid-wall';
import { Heart, PuppyFace, Star } from '@/components/doodles';

export const metadata: Metadata = {
  title: 'Happy families',
  description:
    'Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.',
};

export default function HappyFamiliesPage() {
  return (
    <>
      <section className="paper-dots relative overflow-hidden bg-milk pb-16 pt-14">
        <Star className="absolute right-[12%] top-16 h-4 w-4 text-honey" aria-hidden />
        <div className="wrap relative">
          <p className="tp-eyebrow" data-reveal>
            our wall of happy endings
          </p>
          <h1
            className="font-plush mt-3 max-w-3xl text-[clamp(2.8rem,7vw,5rem)] font-black leading-none text-cocoa"
            data-reveal
          >
            Happy <span className="underline-sketch">families</span>
          </h1>
          <p className="tp-lead" data-reveal>
            Nothing makes us happier than seeing our puppies in loving homes!
            Here are some beautiful moments shared by our amazing clients after
            welcoming their furry friends.
          </p>
          <p className="mt-8 flex items-center gap-4" data-reveal>
            <span className="font-plush text-6xl font-black text-toffee">{FAMILIES.length}</span>
            <span className="font-scrawl max-w-[10rem] text-lg leading-tight text-cocoa-soft">
              moments and counting
            </span>
          </p>
        </div>
      </section>

      <section className="bg-honey-soft py-16">
        <div className="wrap">
          <PolaroidWall items={FAMILIES} />
        </div>
      </section>

      <section className="bg-honey py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <PuppyFace className="doodle-spin mx-auto h-28 w-28 flex-none" aria-hidden />
          <div>
            <blockquote className="font-plush text-2xl font-black leading-snug text-cocoa md:text-3xl">
              &ldquo;{TESTIMONIALS[0].quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-scrawl text-lg text-cocoa-soft">
              {TESTIMONIALS[0].author}, {TESTIMONIALS[0].location}{' '}
              <Heart className="inline h-4 w-4 text-toffee-deep" />
            </figcaption>
          </div>
        </div>
        <p className="wrap mt-12 text-center font-scrawl text-xl text-cocoa-soft">
          every one of them was a Teddy Pup once
        </p>
      </section>
    </>
  );
}
