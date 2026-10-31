import Link from 'next/link';
import { Paw, PuppyFace } from '@/components/doodles';

export default function NotFound() {
  return (
    <section className="paper-dots bg-milk py-24">
      <div className="wrap text-center">
        <PuppyFace className="bob mx-auto h-28 w-28" aria-hidden />
        <p className="font-scrawl mt-6 text-xl text-toffee-deep">woof… this page wandered off</p>
        <h1 className="font-plush mt-2 text-5xl font-black text-cocoa">404 — not found</h1>
        <p className="mx-auto mt-4 max-w-md text-cocoa-soft">
          The page you&apos;re looking for doesn&apos;t exist (maybe a puppy
          buried it). Let&apos;s get you back to the pack.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="tp-btn">
            Back home
            <Paw className="h-4 w-4" />
          </Link>
          <Link href="/puppies" className="tp-btn tp-btn--ghost">
            See available puppies
          </Link>
        </div>
      </div>
    </section>
  );
}
