import type { CSSProperties } from 'react';

type Pose = 'peek' | 'walk' | 'sit' | 'snug';

interface PupBuddyProps {
  pose?: Pose;
  facing?: 'right' | 'left';
  className?: string;
  label?: string;
}

export default function PupBuddy({
  pose = 'sit',
  facing = 'right',
  className = '',
  label,
}: PupBuddyProps) {
  const poseClass = pose === 'walk' ? 'pup-walk' : pose === 'peek' ? 'pup-peek' : '';
  const classes = ['pup-buddy', poseClass, className].filter(Boolean).join(' ');
  const flipStyle: CSSProperties | undefined =
    facing === 'left' ? { transform: 'scaleX(-1)' } : undefined;

  return (
    <span
      className={classes}
      data-live=""
      data-facing={facing}
      data-pose={pose}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 120 112" fill="none" style={flipStyle}>
        <ellipse className="pup-buddy__shadow" cx="60" cy="104" rx="39" ry="5" fill="#2a170e" opacity=".14" />
        <g className="pup-breathe">
          <path
            className="pup-tail"
            d="M88 66c15-2 17-17 10-19-6-2-8 7-3 9"
            fill="#a9632e"
            stroke="#74411f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g className="pup-leg--a">
            <path d="M37 78v17c0 5 13 5 14 0l1-17" fill="#c78145" stroke="#74411f" strokeWidth="3" />
            <ellipse cx="44" cy="96" rx="9" ry="5" fill="#e1ae78" />
          </g>
          <g className="pup-leg--b">
            <path d="M68 78v17c0 5 13 5 14 0l1-17" fill="#b9773d" stroke="#74411f" strokeWidth="3" />
            <ellipse cx="76" cy="96" rx="9" ry="5" fill="#e1ae78" />
          </g>
          <g className="pup-body">
            <ellipse cx="60" cy="69" rx="31" ry="24" fill="#bd7a42" stroke="#74411f" strokeWidth="3" />
            <ellipse cx="61" cy="74" rx="17" ry="14" fill="#e6c19a" />
            <path
              className="pup-ear"
              d="M37 35c-13-14-20-5-17 11 2 10 8 15 16 11"
              fill="#a9632e"
              stroke="#74411f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M83 35c13-14 20-5 17 11-2 10-8 15-16 11"
              fill="#a9632e"
              stroke="#74411f"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <ellipse cx="60" cy="47" rx="30" ry="27" fill="#cc8a50" stroke="#74411f" strokeWidth="3" />
            <ellipse cx="60" cy="56" rx="20" ry="15" fill="#f1d8b8" />
            <ellipse className="pup-blink-a" cx="49" cy="44" rx="3" ry="4" fill="#2a170e" />
            <ellipse className="pup-blink-a" cx="71" cy="44" rx="3" ry="4" fill="#2a170e" />
            <path className="pup-blink-b" d="M45 45h8m14 0h8" stroke="#2a170e" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="60" cy="53" rx="4" ry="3" fill="#2a170e" />
            <path d="M60 56v4m0 0c-3 4-7 4-10 1m10-1c3 4 7 4 10 1" stroke="#74411f" strokeWidth="2" strokeLinecap="round" />
            <path d="M43 57c-3 1-5 3-6 5m40-5c3 1 5 3 6 5" stroke="#d98f91" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </span>
  );
}
