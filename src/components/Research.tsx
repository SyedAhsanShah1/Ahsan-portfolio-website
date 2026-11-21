import { Eye, Brain, Cpu, Flask } from 'phosphor-react';

const RESEARCH = [
  {
    icon: Eye,
    status: 'Working paper - draft',
    statusStyle: 'bg-accent/15 text-accent border-accent/30',
    title: 'FIN Glaucoma Fairness Study',
    role: 'Sole author',
    description:
      'A decision-audit of fairness in glaucoma detection. Using EfficientNet-B1, the study measures how a model performs across patient groups - FIN-race AUC 85.6 - and asks whether accuracy is shared fairly, not just high on average.',
    points: ['EfficientNet-B1', 'FIN-race AUC 85.6', 'Fairness audit across groups'],
  },
  {
    icon: Brain,
    status: 'In progress - draft',
    statusStyle: 'bg-primary/10 text-primary border-primary/30',
    title: 'Anomaly-Detection Reproducibility Study',
    role: 'Working draft',
    description:
      'A family-level reproducibility study of anomaly detection benchmarks: ~30 algorithms across 6 families, evaluated on 16 ODDS datasets, checking whether published results actually hold up.',
    points: ['~30 algorithms', '6 algorithm families', '16 ODDS datasets'],
  },
  {
    icon: Cpu,
    status: 'Ongoing research - ITU',
    statusStyle: 'bg-secondary/10 text-secondary border-secondary/30',
    title: 'AI-Driven Optical Lens Design',
    role: 'Research Assistant, ITU Lahore',
    description:
      'AI-driven inverse design of optical lenses: training a deep-learning surrogate model on FDTD simulation data so new lens designs can be predicted in seconds instead of simulated for hours.',
    points: ['FDTD simulation data', 'Deep-learning surrogate model', 'Optical lens inverse design'],
  },
];

const Research = () => {
  return (
    <section id="research" className="py-20 px-6 relative overflow-hidden bg-card/60">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3">// 03 - research</p>
          <span data-reveal data-delay="0.05" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4 border border-secondary/20">
            <Flask size={16} />
            Research
          </span>
          <h2 data-reveal data-delay="0.1" className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Research <span className="text-primary">Work</span>
          </h2>
          <div data-reveal data-delay="0.15" className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p data-reveal data-delay="0.2" className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Honest labels, no exaggeration: these are working papers and ongoing research - drafts in progress,
            shared as they are.
          </p>
          <p data-reveal data-delay="0.25" className="text-sm text-muted-foreground/80 italic mt-3">
            Yes, the drafts are real. No, they are not published yet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8" data-reveal>
            {['Medical Imaging', 'Fairness in AI', 'Reproducibility', 'Deep Learning'].map((focus) => (
              <span key={focus} className="px-4 py-1.5 bg-card text-foreground text-sm font-medium rounded-full border border-border shadow-sm">
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESEARCH.map((item, i) => (
            <article
              key={item.title}
              data-tilt
              data-reveal
              data-delay={(i * 0.1).toFixed(2)}
              className="glass rounded-2xl p-8 hover:shadow-glow-primary hover:-translate-y-2 transition-all duration-300 will-change-transform"
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
