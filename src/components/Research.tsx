import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Brain, Cpu, Flask } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const RESEARCH = [
  {
    icon: Eye,
    status: 'Working paper — draft',
    statusStyle: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
    title: 'FIN Glaucoma Fairness Study',
    role: 'Sole author',
    description:
      'A decision-audit of fairness in glaucoma detection. Using EfficientNet-B1, the study measures how a model performs across patient groups — FIN-race AUC 85.6 — and asks whether accuracy is shared fairly, not just high on average.',
    points: ['EfficientNet-B1', 'FIN-race AUC 85.6', 'Fairness audit across groups'],
  },
  {
    icon: Brain,
    status: 'In progress — draft',
    statusStyle: 'bg-primary/10 text-primary border-primary/30',
    title: 'Anomaly-Detection Reproducibility Study',
    role: 'Working draft',
    description:
      'A family-level reproducibility study of anomaly detection benchmarks: ~30 algorithms across 6 families, evaluated on 16 ODDS datasets, checking whether published results actually hold up.',
    points: ['~30 algorithms', '6 algorithm families', '16 ODDS datasets'],
  },
  {
    icon: Cpu,
    status: 'Ongoing research — ITU',
    statusStyle: 'bg-secondary/10 text-secondary border-secondary/30',
    title: 'AI-Integrated Meta Optics',
    role: 'Research Assistant, ITU Lahore',
    description:
      'AI-driven inverse design of meta-lenses: training a deep-learning surrogate model on FDTD simulation data so new lens designs can be predicted in seconds instead of simulated for hours.',
    points: ['FDTD simulation data', 'Deep-learning surrogate model', 'Meta-lens inverse design'],
  },
];

const Research = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(cardsRef.current?.children || [], {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="py-20 px-6 relative overflow-hidden bg-card/60">
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4 border border-secondary/20">
            <Flask size={16} />
            Research
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Research <span className="text-primary">Work</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Honest labels, no exaggeration: these are working papers and ongoing research — drafts in progress,
            shared as they are.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESEARCH.map((item) => (
            <article
              key={item.title}
              className="glass rounded-2xl p-8 hover:shadow-glow-primary hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <item.icon size={28} className="text-primary-foreground" />
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${item.statusStyle}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm font-medium text-primary mb-4">{item.role}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <span key={point} className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
