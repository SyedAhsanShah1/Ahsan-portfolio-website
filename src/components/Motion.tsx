import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFX: one place for scroll-based and mouse-based motion.
 *
 * CONTENT VISIBILITY lives on a bulletproof CSS + IntersectionObserver
 * system ([data-reveal] in index.css). Nothing is ever hidden by GSAP:
 * the observer adds .is-visible when an element scrolls into view, and a
 * repeating safety check reveals anything currently in the viewport that
 * the observer missed. The safety check only touches in-viewport elements,
 * so below-fold content keeps its scroll-in animation. GSAP is only used
 * for transform-only effects (parallax, tilt, magnetic, mouse parallax)
 * that can never hide content.
 *
 *  [data-reveal] [data-delay="0.1"]  - fade/slide/blur-in reveal on scroll
 *  [data-parallax] [data-speed="8"]  - background drifts with scroll (scrub)
 *  [data-mouse-zone] + [data-mouse="14"] - children shift with the cursor
 *  [data-mouse-x="14"]                - children shift on x only (for floating blobs)
 *  [data-tilt]                     - 3D tilt following the mouse
 *  [data-magnetic] [data-strength] - button gently pulls toward the cursor
 *
 * Icons are never animated: only cards, photos, buttons and sections move.
 */
export const ScrollFX = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    const timers: number[] = [];
    const intervals: number[] = [];

    /* ---- Bulletproof content reveal (CSS + IntersectionObserver) ---- */
    /* Safety net: reveal anything currently in the viewport that the
       observer missed. Only in-viewport elements, so below-fold content
       keeps its scroll-in animation instead of being revealed early. */
    const revealInView = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-visible');
          timers.push(window.setTimeout(() => { el.style.transitionDelay = ''; }, 1000));
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          el.classList.add('is-visible');
          observer.unobserve(el);
          /* Clear the stagger delay once the reveal finished, so later
             hover transitions on the same element are not delayed. */
          timers.push(window.setTimeout(() => { el.style.transitionDelay = ''; }, delay * 1000 + 900));
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => {
        const delay = Number(el.dataset.delay || 0);
        if (delay) el.style.transitionDelay = `${delay * 1000}ms`;
        observer.observe(el);
      });
    };

    observeReveals();
    /* Safety net: check every second, in-viewport elements only. */
    revealInView();
    intervals.push(window.setInterval(revealInView, 1000));
    /* Images changing the layout must not strand anything. */
    const onLoad = () => observeReveals();
    window.addEventListener('load', onLoad);

    const ctx = gsap.context(() => {
      /* Scroll parallax on background blobs and photos (transform only). */
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.speed || 8);
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    if (finePointer) {
      /* Mouse parallax inside zones. [data-mouse] moves x+y, [data-mouse-x]
         moves x only (for elements that already float on y). */
      document.querySelectorAll<HTMLElement>('[data-mouse-zone]').forEach((zone) => {
        const items = Array.from(zone.querySelectorAll<HTMLElement>('[data-mouse]'));
        const xItems = Array.from(zone.querySelectorAll<HTMLElement>('[data-mouse-x]'));
        if (!items.length && !xItems.length) return;
        const onMove = (e: MouseEvent) => {
          const rect = zone.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          items.forEach((el) => {
            const depth = Number(el.dataset.mouse || 12);
            gsap.to(el, { x: nx * depth, y: ny * depth, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
          });
          xItems.forEach((el) => {
            const depth = Number(el.dataset.mouseX || 12);
            gsap.to(el, { x: nx * depth, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
          });
        };
        const onLeave = () => {
          items.forEach((el) => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' }));
          xItems.forEach((el) => gsap.to(el, { x: 0, duration: 0.8, ease: 'power2.out' }));
        };
        zone.addEventListener('mousemove', onMove);
        zone.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          zone.removeEventListener('mousemove', onMove);
          zone.removeEventListener('mouseleave', onLeave);
        });
      });

      /* 3D tilt on cards. */
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, {
            y: -8,
            rotateY: px * 8,
            rotateX: -py * 8,
            transformPerspective: 900,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        const onLeave = () =>
          gsap.to(el, { y: 0, rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });

      /* Magnetic buttons. */
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const strength = Number(el.dataset.strength || 0.35);
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      observer.disconnect();
      window.removeEventListener('load', onLoad);
      timers.forEach((t) => window.clearTimeout(t));
      intervals.forEach((i) => window.clearInterval(i));
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
};
