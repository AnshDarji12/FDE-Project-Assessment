import PupBuddy from '@/components/pup-buddy';

/**
 * PupSpot — an anchor where the walking puppy (PupJourney) rests as you scroll.
 * Renders a positioned wrapper (sized by the section CSS class) holding the
 * static buddy. When the journey is active (`html[data-pup]`) the static buddy
 * hides and the big walker takes over; without JS the static buddy still shows.
 * `pose` mirrors the reference stop vocabulary: peek / sit / snug / bow.
 */

const STATIC_POSE: Record<string, 'peek' | 'walk' | 'sit' | 'snug'> = {
  sit: 'sit',
  peek: 'peek',
  snug: 'snug',
  bow: 'sit',
  stand: 'sit',
};

interface Props {
  pose?: string;
  facing?: 'right' | 'left';
  act?: string;
  behind?: boolean;
  lane?: boolean;
  className?: string;
  ariaHidden?: boolean;
}

export default function PupSpot({
  pose = 'sit',
  facing = 'right',
  act,
  behind,
  lane,
  className = '',
  ariaHidden,
}: Props) {
  return (
    <div
      className={`pup-stop${className ? ` ${className}` : ''}`}
      data-pup-stop=""
      data-pose={pose}
      data-facing={facing}
      {...(act ? { 'data-act': act } : {})}
      {...(behind ? { 'data-behind': 'true' } : {})}
      {...(lane ? { 'data-lane': 'true' } : {})}
      aria-hidden={ariaHidden}
    >
      <PupBuddy pose={STATIC_POSE[pose] ?? 'sit'} facing={facing} />
    </div>
  );
}
