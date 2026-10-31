import { SITE } from '@/lib/data';
import { Wscp, PhoneIcon } from '@/components/doodles';

/** Floating WhatsApp bubble on desktop + fixed WhatsApp/Call bar on mobile. */
export default function FloatingActions() {
  return (
    <>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="tp-float"
        aria-label={`WhatsApp us at ${SITE.phone}`}
      >
        <Wscp className="h-7 w-7" />
      </a>

      <div className="tp-bar" role="navigation" aria-label="Quick contact">
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          <Wscp className="h-5 w-5 text-leaf" />
          WhatsApp us
        </a>
        <a href={SITE.phoneHref}>
          <PhoneIcon className="h-5 w-5 text-toffee-deep" />
          Call
        </a>
      </div>
    </>
  );
}
