import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFX: one place for the scroll-based and mouse-based motion.
 * Declarative attributes, transform/opacity only, mouse effects only
 * on devices with a fine pointer (touch devices simply do nothing).
 *
 *  [data-parallax] [data-speed="8"]  - background drifts with scroll (scrub)
 *  [data-reveal] [data-delay="0.1"]  - blur-in reveal when scrolled into view
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

    const ctx = gsap.context(() => {
      /* Scroll parallax on background blobs and photos. */
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

      /* Blur-in reveals. */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        const delay = Number(el.dataset.delay || 0);
        gsap.from(el, {
          opacity: 0,
          y: 36,
          filter: 'blur(6px)',
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
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
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
};
