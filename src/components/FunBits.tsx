import { useCallback, useRef } from 'react';
import { gsap } from 'gsap';

/* Shared playful bits: sparkle bursts, triple-click easter eggs,
   floating doodles and a tiny joke toast. No new dependencies. */

const BURST_COLORS = ['#2563EB', '#0D9488', '#38BDF8', '#1D4ED8', '#14B8A6'];

/** Little confetti-style sparkle burst at page coordinates (x, y). */
export function sparkleBurst(x: number, y: number) {
  if (typeof document === 'undefined') return;
  const shapes = ['●', '✦', '★', '◆'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('span');
    el.textContent = shapes[i % shapes.length];
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:9999;pointer-events:none;font-size:${10 + Math.random() * 10}px;color:${BURST_COLORS[i % BURST_COLORS.length]};`;
    document.body.appendChild(el);
    const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.6;
    const dist = 50 + Math.random() * 70;
    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      rotation: Math.random() * 260 - 130,
      opacity: 0,
      scale: 0.4,
      duration: 0.9 + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => el.remove(),
    });
  }
}

/** Returns an onClick handler that fires only on the 3rd quick click/tap. */
export function useTripleClick(onTriple: () => void) {
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(() => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clicks.current = 0;
    }, 1200);
    if (clicks.current >= 3) {
      clicks.current = 0;
      if (timer.current) clearTimeout(timer.current);
      onTriple();
    }
  }, [onTriple]);
}

/** Small fixed joke toast, centred at the bottom. Parent owns the timeout. */
export function JokeToast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-5 py-3.5 rounded-2xl shadow-glow-secondary animate-fade-in text-center">
      <span className="text-accent">✦</span>
      <p className="font-medium text-sm sm:text-base">{message}</p>
      <span className="text-accent">✦</span>
    </div>
  );
}

/** Floating hand-drawn style doodles for the home page background. */
export function Doodles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
      <svg viewBox="0 0 40 40" className="absolute top-[16%] left-[4%] w-8 h-8 text-primary/50 animate-float">
        <path d="M20 2 L23 15 L36 16 L26 24 L30 37 L20 29 L10 37 L14 24 L4 16 L17 15 Z" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 60 20" className="absolute top-[64%] left-[7%] w-14 h-6 text-secondary/50 animate-drift">
        <path d="M2 10 Q 10 2 18 10 T 34 10 T 50 10 T 58 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute top-[22%] right-[5%] w-9 h-9 text-accent/60 animate-float" style={{ animationDelay: '1.4s' }}>
        <path d="M22 2 L8 22 H18 L14 38 L32 16 H21 Z" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute bottom-[14%] right-[9%] w-10 h-10 text-primary/40 animate-drift" style={{ animationDelay: '0.8s' }}>
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute top-[46%] right-[42%] w-7 h-7 text-secondary/40 animate-float" style={{ animationDelay: '2.2s' }}>
        <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
