import { Link } from 'react-router-dom';
import { ArrowRight, User, Briefcase, Flask, FolderOpen, Brain, Envelope } from 'phosphor-react';
import Hero from '../components/Hero';
import { PageGlow, SectionDivider } from '../components/SiteFX';

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
  { value: 'BS AI', label: 'IUB 2026' },
  { value: '1000+', label: 'students taught as society president' },
];

const Index = () => {
  return (
    <div>
      <Hero />


      <section className="py-16 px-6 tint-blue">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 data-reveal className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Researcher first, <span className="text-primary">engineer always</span>
          </h2>
          <p data-reveal data-delay="0.1" className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            I&apos;m Syed Ahsan - an MS Computer Science student and Research Assistant at ITU Lahore. My work lives
            where AI meets medicine: teaching machines to design optical lenses, auditing fairness in medical AI, and
            building web apps that put models in people&apos;s hands.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.label}
                data-reveal
                data-delay={(0.2 + i * 0.08).toFixed(2)}
                className="glass rounded-2xl px-4 py-5 hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-display text-2xl md:text-3xl font-semibold text-primary">{h.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />


      <section className="relative pb-24 pt-16 px-6 overflow-hidden tint-teal">
        <PageGlow tone="blue" />
        <div className="container mx-auto max-w-6xl relative">
          <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary text-center mb-3">
            <span aria-hidden="true" className="mr-2 inline-block h-px w-8 shrink-0 bg-gradient-primary align-middle" />Explore
          </p>
          <h2 data-reveal data-delay="0.05" className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
            Explore the <span className="text-primary">portfolio</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPLORE.map((card, i) => (
              <Link
                key={card.to}
                to={card.to}
                data-tilt
                data-reveal
                data-delay={(i * 0.08).toFixed(2)}
                className="group glass visual-card rounded-2xl p-7 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1.5 will-change-transform"
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

      <SectionDivider />

      <section className="relative pb-24 pt-16 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div
            data-reveal
            className="relative overflow-hidden glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Need AI or web work done?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                From AI prototypes to full websites - see what I offer, all based on real skills and real projects.
              </p>
            </div>
            <Link
              to="/services"
              data-magnetic
              className="relative shrink-0 inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-primary-foreground rounded-full font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
            >
              See Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
