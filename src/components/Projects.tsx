import { ArrowUpRight, GithubLogo, Globe, Eye, Brain, Cpu, Storefront } from 'phosphor-react';

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  tileIcon?: React.ReactNode;
  tileGradient?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Smart Bin - AI Waste Segregation',
      description:
        'AI-based waste segregation system (final-year project) using Arduino and computer vision to sort waste automatically. Submitted to ICECT 2027 as Paper ID 96.',
      image: '/Images/project-3.png',
      tech: ['Python', 'Computer Vision', 'YOLO', 'OpenCV', 'Arduino', 'Deep Learning'],
      liveUrl: '',
      githubUrl: 'https://github.com/mscsAhsan/smart-bin',
      badge: 'ICECT 2027 · Paper ID 96',
    },
    {
      id: 2,
      title: 'FIN Glaucoma Fairness Study',
      description:
        'Sole-author working paper studying fairness in glaucoma detection with EfficientNet-B1. FIN-race AUC 85.6 - measuring how well the model performs across patient groups.',
      tileIcon: <Eye size={64} weight="duotone" className="text-white/90" />,
      tileGradient: 'bg-gradient-to-br from-[#0B1B33] to-[#0D9488]',
      tech: ['Python', 'PyTorch', 'EfficientNet-B1', 'Fairness', 'Medical Imaging'],
      liveUrl: '',
      githubUrl: '',
      badge: 'Working paper - draft',
    },
    {
      id: 3,
      title: 'Anomaly-Detection Reproducibility Study',
      description:
        'A family-level reproducibility study of anomaly detection benchmarks - comparing ~30 algorithms across 6 families on 16 ODDS datasets.',
      tileIcon: <Brain size={64} weight="duotone" className="text-white/90" />,
      tileGradient: 'bg-gradient-to-br from-primary to-[#38BDF8]',
      tech: ['Python', 'PyOD', 'Benchmarking', 'Reproducibility'],
      liveUrl: '',
      githubUrl: '',
      badge: 'In progress - draft',
    },
    {
      id: 4,
      title: 'AI-Driven Optical Lens Design',
      description:
        'Research Assistant work at ITU Lahore: AI-driven inverse design of optical lenses, learning a deep-learning surrogate model from FDTD simulation data.',
      tileIcon: <Cpu size={64} weight="duotone" className="text-white/90" />,
      tileGradient: 'bg-gradient-to-br from-[#1E3A5F] to-secondary',
      tech: ['PyTorch', 'Ansys Lumerical', 'FDTD', 'Inverse Design'],
      liveUrl: '',
      githubUrl: '',
      badge: 'ITU Research',
    },
    {
      id: 5,
      title: 'AI-Powered Diabetes Prediction System',
      description:
        'Machine learning-based web application that predicts the likelihood of diabetes using patient health parameters, with a trained classification model integrated into a Flask backend.',
      image: '/Images/project-1.jpg',
      tech: ['Python', 'Machine Learning', 'Flask', 'Scikit-learn', 'HTML', 'Tailwind CSS'],
      liveUrl:
        'https://www.linkedin.com/posts/syedahsanai-engr_webdevelopment-flask-python-activity-7412924969057259520-_onc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEiLlaUBRTcDMrWkU_60oS7dOO4mxIuLUYc',
      githubUrl: '',
    },
    {
      id: 6,
      title: 'Nexavo AI - AI Tools Store',
      description:
        'Founder of Nexavo AI, a Pakistan-only store selling AI tools with Safepay checkout in PKR - cards, JazzCash, Easypaisa and Raast.',
      tileIcon: <Storefront size={64} weight="duotone" className="text-white/90" />,
      tileGradient: 'bg-gradient-to-br from-[#0D9488] to-primary',
      tech: ['Next.js', 'Safepay', 'React', 'Tailwind CSS'],
      liveUrl: '',
      githubUrl: '',
      badge: 'Founder',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p data-reveal className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3"><span aria-hidden="true" className="mr-2 inline-block h-px w-8 shrink-0 bg-gradient-primary align-middle" />04 - Projects</p>
          <h2 data-reveal data-delay="0.05" className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            AI &amp; Web <span className="text-primary">Projects</span>
          </h2>
          <div data-reveal data-delay="0.1" className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p data-reveal data-delay="0.15" className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of AI and web engineering projects - research, intelligent systems, and
            production web applications.
          </p>
          <p data-reveal data-delay="0.2" className="text-sm text-muted-foreground/80 italic mt-3">
            Built, broken, fixed, and shipped. Mostly in that order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-tilt
              data-reveal
              data-delay={((i % 3) * 0.1).toFixed(2)}
              className="glass cursor-pointer rounded-xl overflow-hidden hover:shadow-glow-primary transition-shadow duration-500 group will-change-transform"
            >
              <div className="relative overflow-hidden h-48">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full ${project.tileGradient} flex items-center justify-center relative`}>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                    />
                    <span className="relative">
                      {project.tileIcon}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {project.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full border border-primary/30">
                    {project.badge}
                  </span>
                )}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    >
                      <Globe size={18} className="text-primary-foreground" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-secondary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-colors duration-200"
                    >
                      <GithubLogo size={18} className="text-secondary-foreground" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors duration-300 group/link"
                  >
                    View on GitHub
                    <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                ) : project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors duration-300 group/link"
                  >
                    View Project
                    <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="text-center mt-12 space-y-4">
          <a
            href="https://github.com/mscsAhsan"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-secondary text-secondary-foreground rounded-full hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
          >
            <GithubLogo size={20} />
            View All Projects on GitHub
          </a>
          <p className="text-sm text-muted-foreground">
            More experiments, scripts and side projects live on GitHub.
          </p>
        </div>
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2" data-parallax data-speed="8" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2" data-parallax data-speed="10" />
    </section>
  );
};

export default Projects;
