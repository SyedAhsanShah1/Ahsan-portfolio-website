export const GrainOverlay = () => (
  <div className="grain-overlay" aria-hidden="true" />
);

export const AmbientOrbs = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="ambient-orb ambient-orb--blue" />
    <div className="ambient-orb ambient-orb--teal" />
  </div>
);

export const PageGlow = ({
  tone = 'blue',
  className = '',
}: {
  tone?: 'blue' | 'teal' | 'navy';
  className?: string;
}) => (
  <div
    aria-hidden="true"
    className={`page-glow page-glow--${tone} pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}
  />
);

export const SectionDivider = () => (
  <div aria-hidden="true" className="section-divider" />
);
