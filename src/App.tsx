import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ResearchPage from './pages/ResearchPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import ChefPage from './components/ChefPage';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CustomCursor from './components/CustomCursor';
import { ScrollFX } from './components/Motion';
import { GrainOverlay, AmbientOrbs } from './components/SiteFX';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const wipeNavyRef = useRef<HTMLDivElement>(null);
  const wipeBlueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  /* Wipe-in on internal link press: the panels cover the screen before the
     new route paints, so the swap happens underneath the wipe. Non-blocking:
     navigation is never prevented, and a 1200ms safety timeout clears the
     panels even if no route change follows (same-page link, failed nav). */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('//') || href.includes('#')) return;
      const panels = [wipeNavyRef.current, wipeBlueRef.current].filter(
        (p): p is HTMLDivElement => !!p
      );
      if (!panels.length) return;
      gsap.set(panels, { xPercent: -101 });
      gsap.to(panels, {
        xPercent: 0,
        duration: 0.35,
        stagger: 0.07,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
      window.setTimeout(() => {
        gsap.set(panels, { xPercent: 101 });
      }, 1200);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  /* Page transition on every route change: layered overlay wipe.
     useLayoutEffect runs before paint, so the new page's first paint is
     already covered by the panels - the route swaps underneath, then the
     navy panel and the blue panel slide away in sequence and the new page
     fades/slides in. Content entrance uses fromTo (never gsap.from), and a
     hard 1200ms timeout force-clears the overlay and the page opacity even
     if any animation fails, so the transition can never blank the page. */
  useLayoutEffect(() => {
    if (isLoading) return;
    const page = document.getElementById('page-content');
    const panels = [wipeNavyRef.current, wipeBlueRef.current].filter(
      (p): p is HTMLDivElement => !!p
    );
    const clearWipe = () => {
      if (panels.length) gsap.set(panels, { xPercent: 101 });
      if (page) gsap.set(page, { clearProps: 'opacity,transform' });
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearWipe();
      return;
    }
    gsap.set(panels, { xPercent: 0 });
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.to(panels, {
      xPercent: 101,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.inOut',
      delay: 0.08,
    }).fromTo(
      page,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.25
    );
    const hard = window.setTimeout(clearWipe, 1200);
    return () => {
      window.clearTimeout(hard);
      tl.kill();
    };
  }, [location.pathname, isLoading]);

  return (
    <div className="relative">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Site-wide visual layers */}
      <AmbientOrbs />
      <GrainOverlay />

      {/* Page transition wipe: two panels, navy then blue */}
      <div aria-hidden="true" className="page-wipe">
        <div ref={wipeNavyRef} className="page-wipe-panel page-wipe-panel--navy" />
        <div ref={wipeBlueRef} className="page-wipe-panel page-wipe-panel--blue" />
      </div>

      <div className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <ScrollFX />
        <main id="page-content">
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Hidden talent page - in the main nav now, so it lives inside the layout */}
            <Route path="/hidden-talent" element={<ChefPage />} />
            <Route path="/chef" element={<ChefPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
