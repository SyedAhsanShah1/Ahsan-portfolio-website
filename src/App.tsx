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
  /* Wipe panels are STATE-GATED: they only exist in the DOM while a wipe is
     running, and timeouts unmount them no matter what. Their motion is pure
     CSS (is-covering / is-clearing classes), never GSAP - a previous version
     mixed the CSS translateX(-101%) default with GSAP xPercent, so the
     "clear" position (xPercent 101) actually landed at 0% and the panels
     stayed stuck covering the whole screen. That cannot happen now: if
     anything fails, the panels simply unmount and the page is visible. */
  const [wipeMounted, setWipeMounted] = useState(false);
  const wipeActiveRef = useRef(false);
  const wipeTimersRef = useRef<number[]>([]);

  const wipePanels = () =>
    [wipeNavyRef.current, wipeBlueRef.current].filter((p): p is HTMLDivElement => !!p);
  const clearWipeClasses = () =>
    wipePanels().forEach((p) => p.classList.remove('is-covering', 'is-clearing'));
  const unmountWipe = () => {
    wipeActiveRef.current = false;
    clearWipeClasses();
    setWipeMounted(false);
  };
  const wipeLater = (fn: () => void, ms: number) => {
    wipeTimersRef.current.push(window.setTimeout(fn, ms));
  };
  const clearWipeTimers = () => {
    wipeTimersRef.current.forEach((t) => window.clearTimeout(t));
    wipeTimersRef.current = [];
  };

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

  /* Wipe-in on internal link press: mount the panels (off-screen left by
     default), then cover on the next frame so the slide-in transition
     animates. Navigation is never prevented. A hard 1200ms timeout unmounts
     the panels even if no route change follows. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('//') || href.includes('#')) return;
      if (wipeActiveRef.current) return;
      clearWipeTimers();
      wipeActiveRef.current = true;
      setWipeMounted(true);
      wipeLater(() => {
        wipePanels().forEach((p) => p.classList.add('is-covering'));
      }, 30);
      wipeLater(unmountWipe, 1200);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  /* Route change: content fades/slides in (fromTo, never gsap.from). If a
     wipe is running, slide the panels away to the right, then unmount them.
     No wipe runs on first load - the page just fades in. */
  useLayoutEffect(() => {
    if (isLoading) return;
    const page = document.getElementById('page-content');
    if (page) {
      gsap.fromTo(
        page,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      );
    }
    if (!wipeActiveRef.current) return;
    window.scrollTo(0, 0);
    wipeLater(() => {
      wipePanels().forEach((p) => {
        p.classList.remove('is-covering');
        p.classList.add('is-clearing');
      });
    }, 150);
    wipeLater(unmountWipe, 950);
    wipeLater(unmountWipe, 1200);
  }, [location.pathname, isLoading]);

  /* Clear any pending wipe timers when the layout unmounts. */
  useEffect(
    () => () => {
      wipeTimersRef.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  return (
    <div className="relative">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Site-wide visual layers */}
      <AmbientOrbs />
      <GrainOverlay />

      {/* Page transition wipe: two panels, navy then blue. Rendered only
          while a wipe is running - otherwise they are not in the DOM at all. */}
      <div aria-hidden="true" className="page-wipe">
        {wipeMounted && (
          <>
            <div ref={wipeNavyRef} className="page-wipe-panel page-wipe-panel--navy" />
            <div ref={wipeBlueRef} className="page-wipe-panel page-wipe-panel--blue" />
          </>
        )}
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
