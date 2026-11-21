import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  Globe,
  Layout,
  Browser,
  Brain,
  ChatCircle,
  Robot,
  MagnifyingGlass,
  ShareNetwork,
  Megaphone,
  Eye,
  Flask,
  ChartLine,
  ListChecks,
  Wrench,
  Package,
  ArrowRight,
} from 'phosphor-react';
import { PageGlow, SectionDivider } from '../components/SiteFX';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
};

type ServiceGroup = {
  id: string;
  label: string;
  title: string;
  intro: string;
  tone: 'blue' | 'teal' | 'navy';
  services: Service[];
};

const GROUPS: ServiceGroup[] = [
  {
    id: 'web',
    label: '01 - Web and Digital',
    title: 'Web & Digital',
    intro: 'Websites and web apps built with the same stack as this portfolio - modern, fast, and responsive on every screen.',
    tone: 'blue',
    services: [
      {
        icon: Globe,
        title: 'Websites',
        description:
          'Modern, fast websites designed and built with React - clean layouts, responsive on every screen, and easy to update.',
        tags: ['React', 'Tailwind CSS', 'Responsive'],
      },
      {
        icon: Layout,
        title: 'Web Apps & Dashboards',
        description:
          'Interactive web apps and dashboards with React front ends and Flask + REST API back ends - like the diabetes prediction app and the Nexavo AI store.',
        tags: ['React', 'Flask', 'REST APIs'],
      },
      {
        icon: Browser,
        title: 'Landing Pages',
        description:
          'Focused landing pages that explain one idea clearly and point visitors to one action - built fast, mobile-first, and measured.',
        tags: ['React', 'Tailwind CSS', 'Mobile-first'],
      },
    ],
  },
  {
    id: 'ai',
    label: '02 - AI and Machine Learning',
    title: 'AI & Machine Learning',
    intro: 'Practical machine learning, from a first prototype to a working tool - built and tested the same careful way as the research.',
    tone: 'teal',
    services: [
      {
        icon: Brain,
        title: 'AI/ML Development',
        description:
          'Custom machine learning: computer vision, classification and deep learning with PyTorch and TensorFlow - from the Smart Bin waste sorter to the FIN glaucoma study.',
        tags: ['PyTorch', 'TensorFlow', 'Computer Vision'],
      },
      {
        icon: ChatCircle,
        title: 'AI Chatbots & Assistants',
        description:
          'Cohere and LLM-powered chatbots that answer from your own content - like the assistant on this site and the Nexavo store chatbot.',
        tags: ['Cohere', 'LLMs', 'React'],
      },
      {
        icon: Robot,
        title: 'AI Tools & Automation',
        description:
          'Small AI tools, automations, prototypes and MVPs - a working version first, then iterate. The Nexavo AI store started the same way.',
        tags: ['Python', 'APIs', 'Automation'],
      },
      {
        icon: MagnifyingGlass,
        title: 'Anomaly Detection & Data Pipelines',
        description:
          'Anomaly detection and data pipelines: cleaning, benchmarking and evaluating models properly - the same care as the reproducibility study across about 30 algorithms.',
        tags: ['Python', 'PyOD', 'Benchmarking'],
      },
    ],
  },
  {
    id: 'marketing',
    label: '03 - Social Media and Marketing',
    title: 'Social Media & Marketing',
    intro: 'Content and campaigns grounded in real teaching experience - Python, marketing and analytics courses for 1000+ students.',
    tone: 'navy',
    services: [
      {
        icon: ShareNetwork,
        title: 'Social Media Management',
        description:
          'Content planning, posting and analytics for social channels, plus content and branding support - planned around your audience, not guesswork.',
        tags: ['Content planning', 'Analytics', 'Branding'],
      },
      {
        icon: Megaphone,
        title: 'Digital Marketing',
        description:
          'Campaign planning and growth tracking with clear analytics - what to post, where to post it, and how to tell if it worked.',
        tags: ['Campaigns', 'Analytics', 'Growth'],
      },
    ],
  },
  {
    id: 'research',
    label: '04 - Research',
    title: 'Research',
    intro: 'Research support from an active research assistant at ITU - medical imaging, ML experimentation, and clear analysis.',
    tone: 'blue',
    services: [
      {
        icon: Eye,
        title: 'Medical Imaging AI',
        description:
          'Retinal OCT analysis and fairness auditing for medical imaging models - the exact work of the FIN glaucoma study (EfficientNet-B1, FIN-race AUC 85.6).',
        tags: ['Retinal OCT', 'EfficientNet-B1', 'Fairness'],
      },
      {
        icon: Flask,
        title: 'Research Collaboration & ML Experimentation',
        description:
          'Collaboration on ML experiments: reproducing results, running benchmarks, reviewing literature and building prototypes - the day-to-day work of a research assistant at ITU.',
        tags: ['PyTorch', 'Benchmarking', 'Literature review'],
      },
      {
        icon: ChartLine,
        title: 'Data Analysis & Visualisation',
        description:
          'Python, OpenCV and MATLAB analysis with clear charts and figures - turning raw data into results people can actually read.',
        tags: ['Python', 'OpenCV', 'MATLAB'],
      },
    ],
  },
];

const STEPS = [
  {
    icon: ChatCircle,
    title: 'Share your idea',
    text: 'Tell me what you want to build, research or improve - a short message is enough to start.',
  },
  {
    icon: ListChecks,
    title: 'Scope & plan',
    text: 'We agree on what gets built, what it takes, and what success looks like - before any work starts.',
  },
  {
    icon: Wrench,
    title: 'Build & test',
    text: 'I build it in small steps, test as I go, and share progress early so there are no surprises.',
  },
  {
    icon: Package,
    title: 'Deliver & support',
    text: 'You get the finished work, the code, and help getting it running.',
  },
];

const STATS = [
  { value: 1000, suffix: '+', decimals: 0, label: 'students taught' },
  { value: 6, suffix: '+', decimals: 0, label: 'projects built' },
  { value: 2, suffix: '', decimals: 0, label: 'research drafts in progress' },
];

function StatCount({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 92%',
        once: true,
      },
      onUpdate: () => setValue(obj.v),
    });
    return () => {
      tween.kill();
    };
  }, [target]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const TINTS = {
  blue: 'tint-blue',
  teal: 'tint-teal',
  navy: 'tint-navy',
} as const;

const ServicesPage = () => {
  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="aurora-blob aurora-blob--a -top-20 left-[8%]" />
          <div className="aurora-blob aurora-blob--b top-10 right-[5%]" />
          <div className="aurora-blob aurora-blob--c bottom-0 left-1/3 hidden md:block" />
        </div>
        <PageGlow tone="blue" />
        <div className="container mx-auto max-w-6xl relative text-center">
          <div aria-hidden="true" className="absolute top-[16%] left-[2%] hidden lg:flex glass rounded-full px-4 py-2 text-sm font-medium text-primary shadow-glass animate-float">
            12 services
          </div>
          <div aria-hidden="true" className="absolute top-[34%] right-[1%] hidden lg:flex glass rounded-full px-4 py-2 text-sm font-medium text-primary shadow-glass animate-float" style={{ animationDelay: '1.2s' }}>
            4 focus areas
          </div>
          <div aria-hidden="true" className="absolute bottom-[8%] left-[8%] hidden lg:flex glass rounded-full px-4 py-2 text-sm font-medium text-primary shadow-glass animate-drift">
            AI · Web · Research
          </div>
          <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3">
            <span aria-hidden="true" className="mr-2 inline-block h-px w-8 shrink-0 bg-gradient-primary align-middle" />07 - Services
          </p>
          <h1 data-reveal data-delay="0.05" className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 leading-[1.05]">
            What I Can <span className="bg-gradient-primary bg-clip-text text-transparent">Do For You</span>
          </h1>
          <div data-reveal data-delay="0.1" className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p data-reveal data-delay="0.15" className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI, web and research work - offered plainly, with the real skills and real projects behind each
            one. No inflated claims, no invented results.
          </p>
          <div data-reveal data-delay="0.2" className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['AI & ML', 'Web Development', 'Medical Imaging', 'Research'].map((focus) => (
              <span key={focus} className="px-4 py-1.5 bg-card text-foreground text-sm font-medium rounded-full border border-border shadow-sm">
                {focus}
              </span>
            ))}
          </div>
        </div>
      </section>

      {GROUPS.map((group, gi) => (
        <div key={group.id}>
          {gi > 0 && <SectionDivider />}
          <section className={`relative py-20 px-6 overflow-hidden ${TINTS[group.tone]}`}>
            <PageGlow tone={group.tone} />
            <div className="container mx-auto max-w-7xl relative">
              <div className="mb-12">
                <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3">
                  <span aria-hidden="true" className="mr-2 inline-block h-px w-8 shrink-0 bg-gradient-primary align-middle" />{group.label}
                </p>
                <h2 data-reveal data-delay="0.05" className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-3">
                  {group.title}
                </h2>
                <div data-reveal data-delay="0.1" className="w-20 h-1 bg-gradient-primary rounded-full mb-4" />
                <p data-reveal data-delay="0.15" className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {group.intro}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service, i) => {
                  const featured = i === 0;
                  const tall = group.services.length >= 3;
                  const wide = group.services.length === 4 && i === 3;
                  return (
                    <article
                      key={service.title}
                      data-tilt
                      data-reveal
                      data-delay={((i % 3) * 0.08).toFixed(2)}
                      className={
                        featured
                          ? 'spotlight-card visual-card glass rounded-2xl p-8 md:col-span-2 hover:shadow-glow-primary hover:-translate-y-1.5 transition-all duration-300 will-change-transform flex flex-col relative overflow-hidden' + (tall ? ' lg:row-span-2' : '')
                          : wide
                            ? 'glass visual-card rounded-2xl p-7 hover:shadow-glow-primary hover:-translate-y-1.5 transition-all duration-300 will-change-transform flex flex-col md:col-span-2 lg:col-span-3'
                            : 'glass visual-card rounded-2xl p-7 hover:shadow-glow-primary hover:-translate-y-1.5 transition-all duration-300 will-change-transform flex flex-col'
                      }
                    >
                      {featured && (
                        <service.icon
                          size={190}
                          aria-hidden="true"
                          className="absolute -bottom-10 -right-8 text-primary/[0.07] pointer-events-none"
                        />
                      )}
                      {wide ? (
                        <div className="flex flex-col sm:flex-row sm:items-start gap-6 w-full">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                            <service.icon size={24} className="text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline shrink-0 sm:mt-2"
                          >
                            Discuss your project
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      ) : (
                        <div className={featured ? 'relative' : ''}>
                          <div className={`${featured ? 'w-16 h-16 rounded-2xl' : 'w-12 h-12 rounded-xl'} bg-gradient-primary flex items-center justify-center mb-5`}>
                            <service.icon size={featured ? 32 : 24} className="text-primary-foreground" />
                          </div>
                          <h3 className={`font-display font-semibold text-foreground mb-2 ${featured ? 'text-3xl' : 'text-2xl'}`}>
                            {service.title}
                          </h3>
                          <p className={`text-muted-foreground leading-relaxed mb-5 ${featured ? 'text-lg' : ''} flex-1`}>
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {service.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                          >
                            Discuss your project
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      ))}

      <SectionDivider />

      <section className="relative py-20 px-6 overflow-hidden tint-teal">
        <PageGlow tone="teal" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-14">
            <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3">
              <span aria-hidden="true" className="mr-2 inline-block h-px w-8 shrink-0 bg-gradient-primary align-middle" />How It Works
            </p>
            <h2 data-reveal data-delay="0.05" className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <div data-reveal data-delay="0.1" className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
            <p data-reveal data-delay="0.15" className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps, from first message to finished work.
            </p>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="process-line hidden lg:block" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  data-reveal
                  data-delay={(i * 0.08).toFixed(2)}
                  className="glass rounded-2xl p-6 hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300 relative"
                >
                  <span className="absolute top-5 right-6 font-display text-4xl font-semibold text-primary/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 relative">
                    <step.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-16 px-6 overflow-hidden tint-blue">
        <PageGlow tone="blue" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                data-delay={(i * 0.08).toFixed(2)}
                className="glass rounded-2xl px-4 py-6 text-center hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-display text-3xl md:text-4xl font-semibold text-primary">
                  <StatCount target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
            <div
              data-reveal
              data-delay="0.24"
              className="glass rounded-2xl px-4 py-6 text-center hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300"
            >
              <p className="font-display text-3xl md:text-4xl font-semibold text-primary">MS CS</p>
              <p className="text-sm text-muted-foreground mt-1">ITU Lahore - in progress</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl bg-gradient-secondary text-secondary-foreground p-8 md:p-12 text-center"
          >
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div className="aurora-blob aurora-blob--a -top-24 -left-16 opacity-70" />
              <div className="aurora-blob aurora-blob--b -bottom-28 -right-10 opacity-70" />
            </div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                Have a project in mind?
              </h2>
              <p className="text-secondary-foreground/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Tell me about it - a short message is enough to start. I reply personally, usually within a day.
              </p>
              <Link
                to="/contact"
                data-magnetic
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-primary text-primary-foreground rounded-full font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
