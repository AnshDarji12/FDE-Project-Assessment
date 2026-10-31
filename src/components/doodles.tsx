import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

/** Hand-drawn style doodle set used across the site. All original artwork. */

export function Paw({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={className} {...p}>
      <ellipse cx="32" cy="42" rx="14" ry="11" />
      <circle cx="14" cy="26" r="7" />
      <circle cx="27" cy="17" r="7" />
      <circle cx="41" cy="17" r="7" />
      <circle cx="52" cy="27" r="7" />
    </svg>
  );
}

export function Sparkle({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M20 2c1.6 8.8 4.4 13.4 8.4 15.2 3 1.3 6.4 1.9 9.6 2.8-3.2.9-6.6 1.5-9.6 2.8-4 1.8-6.8 6.4-8.4 15.2-1.6-8.8-4.4-13.4-8.4-15.2-3-1.3-6.4-1.9-9.6-2.8 3.2-.9 6.6-1.5 9.6-2.8C15.6 15.4 18.4 10.8 20 2Z" />
    </svg>
  );
}

export function Sun({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-hidden className={className} {...p}>
      <circle cx="40" cy="40" r="15" fill="currentColor" stroke="none" />
      <path d="M40 8v8M40 64v8M8 40h8M64 40h8M17 17l5.6 5.6M57.4 57.4 63 63M63 17l-5.6 5.6M22.6 57.4 17 63" />
    </svg>
  );
}

export function Moon({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M44.8 44.8A25 25 0 0 1 19.2 19.2 25 25 0 1 0 44.8 44.8Z" />
    </svg>
  );
}

export function Star({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M12 3l1.7 5.2H19l-4.3 3.2 1.6 5.1L12 13.4l-4.3 3.1 1.6-5.1L5 8.2h5.3L12 3z" />
    </svg>
  );
}

export function Heart({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M16 28S4 20.6 4 12.4C4 8 7.4 5 11.2 5c2 0 3.8.9 4.8 2.4C17 5.9 18.8 5 20.8 5 24.6 5 28 8 28 12.4 28 20.6 16 28 16 28Z" />
    </svg>
  );
}

export function Bone({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 28" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M12 6a6 6 0 1 0-4 10.5A6 6 0 1 0 12 27l4-3h32l4 3a6 6 0 1 0 4-10.5A6 6 0 1 0 52 6l-4 3H16l-4-3Z" transform="translate(0 -2.5)" />
    </svg>
  );
}

export function Question({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 96" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M32 4C18 4 8 13 8 26c0 3 2.4 5 5 5s5-2 5-5c0-7.4 5.6-12.4 14-12.4S45 19 45 26.4C45 33 41 36.6 33 42c-7.6 5-11 9.6-11 17v4c0 2.8 2.2 5 5 5s5-2.2 5-5v-4c0-3.6 1.6-5.8 7.4-9.6C49 42.4 55 36 55 26.4 55 12.8 45.4 4 32 4Zm0 82a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
    </svg>
  );
}

export function Bang({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 96" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M16 2c6 0 10 4.4 9.4 10.4L22 56c-.4 3.6-2.6 6-6 6s-5.6-2.4-6-6L6.6 12.4C6 6.4 10 2 16 2Zm0 66a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" />
    </svg>
  );
}

export function Wscp({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.1.6 4.1 1.6 5.9L4 29l8.4-1.6c1.1.4 2.4.6 3.6.6 6.6 0 12-5.3 12-11.9S22.6 3 16 3Zm0 21.7c-1.1 0-2.2-.2-3.2-.5l-.7-.3-5 1 1.1-4.8-.4-.7a9.4 9.4 0 0 1-1.5-5.1c0-5.2 4.4-9.4 9.7-9.4s9.7 4.2 9.7 9.4-4.4 9.4-9.7 9.4Zm5.4-7c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5s0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.2Z" />
    </svg>
  );
}

export function PhoneIcon({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M11.2 4.6c.7-.2 1.5.1 1.9.8l2 3.6c.4.7.2 1.5-.3 2l-1.6 1.5a17.6 17.6 0 0 0 6.3 6.3l1.5-1.6c.5-.5 1.4-.7 2-.3l3.6 2c.7.4 1 1.2.8 1.9l-1 3.2c-.3.9-1.1 1.5-2 1.4C14.8 24.7 7.3 17.2 6.6 7.6c-.1-.9.5-1.7 1.4-2l3.2-1Z" />
    </svg>
  );
}

export function Mail({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className={className} {...p}>
      <rect x="4" y="7" width="24" height="18" rx="3" />
      <path d="m5 9 11 8 11-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pin({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M16 3a10 10 0 0 0-10 10c0 7 10 16 10 16s10-9 10-16A10 10 0 0 0 16 3Zm0 13.4a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Z" />
    </svg>
  );
}

export function Insta({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden className={className} {...p}>
      <rect x="5" y="5" width="22" height="22" rx="6" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="23" cy="9" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTok({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M22 4h-4v16.2a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8 0 1.2.2v-4.2a8.2 8.2 0 0 0-1.2-.1A8 8 0 1 0 22 20.4V12a9.7 9.7 0 0 0 6 2.1V9.8A5.9 5.9 0 0 1 22 4Z" />
    </svg>
  );
}

export function Facebook({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className} {...p}>
      <path d="M18 28v-9h3.2l.6-4H18v-2.6c0-1.2.4-2 2.2-2H22V6.2C21.4 6.1 20.2 6 18.9 6 15.9 6 14 7.8 14 11v4h-3.2v4H14v9h4Z" />
    </svg>
  );
}

/** Hand-drawn ellipse ring that wraps circular puppy photos. */
export function SketchRing({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden className={className} {...p}>
      <path
        d="M100 8C47 8 6 42 6 100s40 92 94 92 94-34 94-92S153 8 100 8Z"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeDasharray="620 26"
        strokeDashoffset="-14"
      />
      <path
        d="M100 16C52 16 16 48 16 100s35 84 84 84 84-32 84-84-36-84-84-84Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
        strokeDasharray="540 30"
        strokeDashoffset="22"
      />
    </svg>
  );
}

/** Big paint-blob wash that sits behind a sketch photo. */
export function WashBlob({ color, className, ...p }: P & { color?: string | null }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} {...p}>
      <path
        d="M100 6c38 0 62 8 78 30 13 18 20 42 16 66-4 26-22 52-46 66-20 12-52 14-76 6C46 165 20 142 10 114 2 90 6 62 22 42 40 19 66 6 100 6Z"
        fill={color || '#f2be6b'}
        opacity="0.9"
      />
    </svg>
  );
}

/** Puppy face doodle (the brand mark style). */
export function PuppyFace({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden className={className} {...p}>
      <path
        d="M48 12c14 0 20 8 22 16 8 2 14 8 14 16 0 12-8 16-10 24-2 10-10 18-26 18S22 78 20 68c-2-8-10-12-10-24 0-8 6-14 14-16 2-8 10-16 24-16Z"
        fill="#fffdf8"
        stroke="#2a170e"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="46" r="4.4" fill="#2a170e" />
      <circle cx="60" cy="46" r="4.4" fill="#2a170e" />
      <ellipse cx="48" cy="60" rx="9" ry="7" fill="#2a170e" />
      <path d="M48 67v5m0 0c-2.6 3-6.4 3.4-9 1.4M48 72c2.6 3 6.4 3.4 9 1.4" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="26" cy="34" rx="8" ry="12" fill="#f9cdbf" stroke="#2a170e" strokeWidth="4" transform="rotate(-14 26 34)" />
      <ellipse cx="70" cy="34" rx="8" ry="12" fill="#f9cdbf" stroke="#2a170e" strokeWidth="4" transform="rotate(14 70 34)" />
    </svg>
  );
}

/** Puppy in a basket — footer illustration. */
export function PuppyBasket({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 200 170" aria-hidden className={className} {...p}>
      <path
        d="M100 18c22 0 32 12 35 24 12 3 21 12 21 24 0 8-4 14-9 18h-94c-5-4-9-10-9-18 0-12 9-21 21-24 3-12 13-24 35-24Z"
        fill="#f2be6b"
        stroke="#2a170e"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="84" cy="52" r="5" fill="#2a170e" />
      <circle cx="116" cy="52" r="5" fill="#2a170e" />
      <ellipse cx="100" cy="70" rx="12" ry="9" fill="#2a170e" />
      <path d="M78 30c-6-8-4-16 2-18M122 30c6-8 4-16-2-18" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M22 96h156l-10 52a12 12 0 0 1-12 10H44a12 12 0 0 1-12-10L22 96Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
      <path d="M38 96l8 62M162 96l-8 62M60 96l4 62M140 96l-4 62M100 96v62" stroke="#2a170e" strokeWidth="3" opacity="0.5" />
      <path d="M14 96c10-8 26-10 34-4M186 96c-10-8-26-10-34-4" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Front door with plants — closing CTA illustration. */
export function DoorScene({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 260 240" aria-hidden className={className} {...p}>
      <rect x="70" y="40" width="120" height="180" rx="10" fill="#c2622b" stroke="#2a170e" strokeWidth="5" />
      <rect x="82" y="52" width="96" height="168" rx="6" fill="#a24a1a" stroke="#2a170e" strokeWidth="4" />
      <circle cx="166" cy="140" r="5" fill="#fbe3b4" stroke="#2a170e" strokeWidth="3" />
      <path d="M82 106h96M82 160h96" stroke="#2a170e" strokeWidth="3" opacity="0.55" />
      <path d="M130 40V16" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="130" cy="12" r="5" fill="#2a170e" />
      <rect x="30" y="168" width="34" height="34" rx="5" fill="#e8b06b" stroke="#2a170e" strokeWidth="4" />
      <rect x="196" y="168" width="34" height="34" rx="5" fill="#e8b06b" stroke="#2a170e" strokeWidth="4" />
      <path d="M47 168c-2-18 4-30 14-36-2 14 0 24 2 36M213 168c2-18-4-30-14-36 2 14 0 24-2 36M40 168c4-10 2-22-4-28 10 2 16 12 16 28M220 168c-4-10-2-22 4-28-10 2-16 12-16 28" fill="#1fa257" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 220h224" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Signpost — two ways section. */
export function Signpost({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 220 300" aria-hidden className={className} {...p}>
      <path d="M110 40v250" stroke="#2a170e" strokeWidth="9" strokeLinecap="round" />
      <g>
        <rect x="18" y="60" width="150" height="44" rx="10" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" />
        <path d="M18 82 2 74l16-8" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
        <text x="93" y="88" textAnchor="middle" fontFamily="Shantell Sans, cursive" fontWeight="700" fontSize="19" fill="#2a170e">
          in Dubai
        </text>
      </g>
      <g transform="rotate(4 110 140)">
        <rect x="52" y="120" width="150" height="44" rx="10" fill="#f2be6b" stroke="#2a170e" strokeWidth="5" />
        <path d="M202 142l16 8-16 8" fill="#f2be6b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
        <text x="127" y="148" textAnchor="middle" fontFamily="Shantell Sans, cursive" fontWeight="700" fontSize="19" fill="#2a170e">
          imported
        </text>
      </g>
      <circle cx="110" cy="34" r="10" fill="#c2622b" stroke="#2a170e" strokeWidth="5" />
    </svg>
  );
}

/** Open passport book — trust section. */
export function OpenBook({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 420 240" aria-hidden className={className} {...p}>
      <path d="M210 42C170 20 110 16 40 26c-8 1-12 6-12 14v152c0 9 5 13 13 12 64-8 122-4 161 18V42Z" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
      <path d="M210 42c40-22 100-26 170-16 8 1 12 6 12 14v152c0 9-5 13-13 12-64-8-122-4-161 18V42Z" fill="#fdf7ec" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
      <path d="M210 42v180" stroke="#2a170e" strokeWidth="5" />
      <path d="M56 70c30-4 60-4 88 2M56 104c30-4 60-4 88 2M56 138c30-4 60-4 88 2M276 70c30-4 60-4 88 2M276 104c30-4 60-4 88 2M276 138c30-4 60-4 88 2" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

/** Cloud postcard stamp — imported card. */
export function PlanePath({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 220 120" fill="none" aria-hidden className={className} {...p}>
      <path d="M10 96C60 96 70 30 118 30c38 0 44 44 92 44" stroke="#8e3f15" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="2 10" />
      <path d="M196 62c10-10 16-12 20-10-2 5-6 10-12 14l-8-4Zm-14 12 8 4c-6 4-13 5-19 4l11-8Z" fill="#8e3f15" />
      <path d="m186 72 6-22 8 6-8 18-6-2Zm0 0-22-2 6-8 20 4" fill="#c2622b" stroke="#8e3f15" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatDoodle({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className} {...p}>
      <path d="M10 13h44v31H31L17 55v-11h-7V13Z" fill="#fffdf8" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M21 27h22M21 35h15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="m47 5 2.2 5.8L55 13l-5.8 2.2L47 21l-2.2-5.8L39 13l5.8-2.2L47 5Z" fill="#f2be6b" />
    </svg>
  );
}

export function Globe({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className} {...p}>
      <circle cx="32" cy="32" r="25" fill="#d9eef0" stroke="currentColor" strokeWidth="4" />
      <path d="M10 28c6-3 10-2 13 1l4 5-3 5-8 1-4 8M35 8l-1 9 5 5-2 6 8 3 8-4M32 57l3-10 8-5-1-8" stroke="#388b6a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32h48M32 7c7 7 11 16 11 25s-4 18-11 25c-7-7-11-16-11-25S25 14 32 7Z" stroke="currentColor" strokeWidth="2.5" opacity=".55" />
    </svg>
  );
}

export function PlaneDoodle({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 100 72" fill="none" aria-hidden className={className} {...p}>
      <path d="m8 34 79-23-23 51-15-20-17 12 4-22L8 34Z" fill="#fffdf8" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="m36 32 28 10M36 32l-4 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 55c7-5 13-5 20 0m-16 9c5-3 10-3 15 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function PlaneHeart({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} {...p}>
      <path fill="currentColor" d="M32 56S8 42 8 25C8 16 15 10 23 10c4 0 7 2 9 5 2-3 5-5 9-5 8 0 15 6 15 15 0 17-24 31-24 31Zm-4-29-12-5 1-4 17 4 9-9 4 2-6 11 4 15-4 1-7-12-12 3-2-3 8-3Z" />
    </svg>
  );
}

export function Skyline({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 220 100" fill="none" aria-hidden className={className} {...p}>
      <path d="M7 91V62h20v29M32 91V45h26v46M64 91V57h20v34M88 91V28l12-18 12 18v63M118 91V52h22v39M145 91V37h27v54M177 91V60h16v31M198 91V48h15v43" fill="#f2be6b" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M7 91h206M92 29h16M96 45h8M96 60h8M96 75h8M43 58v7m0 8v7m115-31v7m14-7v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 160 16" fill="none" aria-hidden className={className} {...p}>
      <path d="M2 9c12-12 20 12 32 0s20 12 32 0 20 12 32 0 20 12 32 0 20 12 28 1" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function VetHeart({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} {...p}>
      <path d="M32 56S8 42 8 25C8 16 15 10 23 10c4 0 7 2 9 5 2-3 5-5 9-5 8 0 15 6 15 15 0 17-24 31-24 31Z" fill="currentColor" />
      <path d="M30 20h5v9h9v5h-9v9h-5v-9h-9v-5h9v-9Z" fill="#fffdf8" />
    </svg>
  );
}
