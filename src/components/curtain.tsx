'use client';

import { useEffect, useState } from 'react';
import { Paw } from '@/components/doodles';
import PupBuddy from '@/components/pup-buddy';

export default function Curtain() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.sessionStorage.getItem('teddypups-intro-seen')) return;

    window.sessionStorage.setItem('teddypups-intro-seen', 'true');
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const hideTimer = window.setTimeout(() => setVisible(false), 1150);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="tp-curtain" data-state="intro" aria-hidden="true">
      <div className="tp-curtain__blanket">
        <svg className="tp-curtain__edge tp-curtain__edge--top" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 40Q30 0 60 40T120 40T180 40T240 40T300 40T360 40T420 40T480 40T540 40T600 40T660 40T720 40T780 40T840 40T900 40T960 40T1020 40T1080 40T1140 40T1200 40V0H0Z" fill="#f8e6c6" />
        </svg>
        <div className="tp-curtain__stage">
          <div className="tp-curtain__prints">
            {Array.from({ length: 5 }, (_, index) => (
              <Paw
                key={index}
                className="tp-curtain__print"
                style={{ left: `${8 + index * 17}%`, animationDelay: `${index * 0.12}s` }}
              />
            ))}
          </div>
          <div className="tp-curtain__runner" style={{ position: 'absolute', bottom: '2rem', left: 0, width: '7rem' }}>
            <PupBuddy pose="walk" className="w-full" />
          </div>
          <p className="tp-curtain__note font-scrawl">A little puppy magic is on its way…</p>
        </div>
        <svg className="tp-curtain__edge tp-curtain__edge--bottom" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 40Q30 0 60 40T120 40T180 40T240 40T300 40T360 40T420 40T480 40T540 40T600 40T660 40T720 40T780 40T840 40T900 40T960 40T1020 40T1080 40T1140 40T1200 40V0H0Z" fill="#f8e6c6" />
        </svg>
      </div>
    </div>
  );
}
