import Image from 'next/image';
import Link from 'next/link';
import type { Puppy } from '@/lib/data';
import { SketchRing, WashBlob, Paw } from '@/components/doodles';

function metaLine(p: Puppy) {
  return [p.breed, p.sex, p.age].filter(Boolean).join(' · ');
}

/** Circular "sketchbook" puppy card with hand-drawn ring, wash blob and stickers. */
export function PuppyCard({ puppy, priority = false }: { puppy: Puppy; priority?: boolean }) {
  const img = puppy.images[0];
  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="tp-sketch group"
      data-reveal
      aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.sex}, ${puppy.age}, ${puppy.status === 'available' ? 'available' : 'gone home'}`}
      style={{ ['--tilt' as string]: puppy.tilt || '0deg' }}
    >
      <span className="tp-sketch__frame">
        <WashBlob color={puppy.wash ?? undefined} className="tp-sketch__wash" />
        <SketchRing className="tp-sketch__ring text-cocoa" />
        <span className="tp-sketch__photo">
          {img ? (
            <Image
              src={img}
              alt={`${puppy.name} — ${puppy.breed} puppy at TeddyPups U.A.E.`}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 20rem"
              className="object-cover"
              priority={priority}
            />
          ) : null}
        </span>
        <span className={`tp-sticker ${puppy.status === 'gone' ? 'tp-sticker--gone' : ''}`}>
          <Paw className="h-3 w-3" />
          {puppy.status === 'available' ? 'Available' : 'Gone home'}
        </span>
        {puppy.video ? <span className="tp-video-pill">▶ video</span> : null}
      </span>
      <span className="tp-sketch__name">{puppy.name}</span>
      <span className="tp-sketch__meta">{metaLine(puppy)}</span>
    </Link>
  );
}

/** Small circular thumb used in "already gone home" band and prev/next cards. */
export function PuppyThumb({
  puppy,
  size = 72,
}: {
  puppy: Pick<Puppy, 'name' | 'breed' | 'images' | 'slug'>;
  size?: number;
}) {
  const img = puppy.images[0];
  return (
    <Image
      src={img}
      alt={`${puppy.name} — ${puppy.breed}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      className="h-full w-full rounded-full border-2 border-cocoa object-cover"
    />
  );
}
