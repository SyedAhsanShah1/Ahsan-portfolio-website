import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Briefcase, Flask, FolderOpen, Brain, Envelope } from 'phosphor-react';
import Hero from '../components/Hero';

gsap.registerPlugin(ScrollTrigger);

const EXPLORE = [
  {
    to: '/about',
    icon: User,
    title: 'About',
    text: 'MS CS at ITU Lahore, BS AI from IUB, and the journey from Bahawalpur to the medical imaging lab.',
  },
  {
    to: '/experience',
    icon: Briefcase,
    title: 'Experience',
    text: 'Research Assistant in medical imaging, Teaching Assistant for Numerical Analysis, and leading 1000+ students.',
  },
  {
    to: '/research',
    icon: Flask,
    title: 'Research',
    text: 'Optical lens inverse design, a glaucoma fairness study, and an anomaly-detection reproducibility study.',
  },
  {
    to: '/projects',
    icon: FolderOpen,
    title: 'Projects',
    text: 'Smart Bin, a diabetes prediction system, Nexavo AI, and more - built systems, honestly labelled.',
  },
  {
    to: '/skills',
    icon: Brain,
    title: 'Skills',
    text: 'PyTorch, FDTD, MATLAB, Flask, React - the AI, research and programming toolkit.',
  },
  {
    to: '/contact',
    icon: Envelope,
    title: 'Contact',
    text: 'Have a project, a research idea, or a collaboration in mind? Let\u2019s talk.',
  },
];

const HIGHLIGHTS = [
  { value: 'MS CS', label: 'ITU Lahore · Aug 2026 - present' },
  { value: 'RA', label: 'medical imaging and AI · since Mar 2026' },
  { value: '3.30', label: 'BS AI CGPA / 4.00 · IUB 2026' },
  { value: '1000+', label: 'students taught as society president' },
];

const Index = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(introRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: introRef.current, start: 'top 85%' },
      });

      gsap.from(cardsRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <Hero />

      {/* Short intro + highlights */}
      <section className="py-16 px-6">
        <div ref={introRef} className="container mx-auto max-w-6xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Researcher first, <span className="text-primary">engineer always</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            I&apos;m Syed Ahsan - an MS Computer Science student and Research Assistant at ITU Lahore. My work lives
            where AI meets medicine: teaching machines to design optical lenses, auditing fairness in medical AI, and
            building web apps that put models in people&apos;s hands.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="glass rounded-2xl px-4 py-5">
                <p className="font-display text-2xl md:text-3xl font-semibold text-primary">{h.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the site */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12" data-reveal>
            Explore the <span className="text-primary">portfolio</span>
          </h2>
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPLORE.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                data-tilt
                className="group glass rounded-2xl p-7 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1.5 will-change-transform"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 transition-transform duration-300">
                  <card.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2 flex items-center gap-2">
                  {card.title}
                  <ArrowRight
                    size={18}
                    className="text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">{card.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
