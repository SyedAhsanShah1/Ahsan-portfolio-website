/**
 * SiteFX: site-wide visual layers, rendered once in App Layout.
 *
 * - GrainOverlay: a fixed ultra-subtle film-grain layer (inline SVG
 *   feTurbulence data URI, ~0.03 opacity, pointer-events none) over the
 *   whole site, below the custom cursor.
 * - AmbientOrbs: two fixed, very soft gradient orbs (blue top-right, teal
 *   bottom-left) that sit behind the page content and give every page a
 *   premium ambient glow. Transform-only slow drift, disabled for
 *   prefers-reduced-motion.
 * - PageGlow: an absolute glow for the top of a section, tinted per page
 *   (blue / teal / navy) so sections feel different from each other.
 * - SectionDivider: a gradient hairline divider between sections.
 */

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
