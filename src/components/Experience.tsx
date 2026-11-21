import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flask, ChalkboardTeacher, Code, Users } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    icon: Flask,
    period: 'Mar 2026 - Present',
    title: 'Research Assistant - AI-Driven Optical Lens Design',
    org: 'Information Technology University (ITU), Lahore',
    points: [
      'AI-driven inverse design of optical lenses using FDTD simulation data.',
      'Building a deep-learning surrogate model so new lens designs can be predicted in seconds instead of simulated for hours.',
      'Working with Ansys Lumerical, FDTD simulations and PyTorch.',
    ],
    accent: 'bg-gradient-primary',
  },
  {
    icon: ChalkboardTeacher,
    period: 'Aug 2026 - Present',
    title: 'Teaching Assistant - Numerical Analysis',
    org: 'Information Technology University (ITU), Lahore',
    points: [
      'Teaching Assistant for the Numerical Analysis course alongside my MS in Computer Science.',
      'Supporting students with coursework, problem sessions and grading.',
    ],
    accent: 'bg-gradient-secondary',
  },
  {
    icon: Code,
    period: 'Oct 2023 - Nov 2024',
    title: 'Intern - Deep Embed Lab',
    org: 'The Islamia University of Bahawalpur (IUB)',
    points: [
      'Worked in the Deep Embed Lab during my BS in Artificial Intelligence.',
      'Hands-on research and engineering experience in embedded AI systems.',
    ],
    accent: 'bg-gradient-primary',
  },
  {
    icon: Users,
    period: 'BS AI years',
    title: 'President - Skills & Career Development Society',
    org: 'The Islamia University of Bahawalpur (IUB)',
    points: [
      'Led the society as president, running Python, marketing and analytics courses for 1000+ students.',
      'Also held IEEE Student Branch leadership roles.',
    ],
    accent: 'bg-gradient-secondary',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
          start: 'top 85%',
        },
      });

      gsap.from(listRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            My <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Research, teaching, and community leadership - from the lab bench to the lecture hall.
          </p>
          <p className="text-sm text-muted-foreground/80 italic mt-3">
            (The lecture hall has better Wi-Fi than the lab. Allegedly.)
          </p>
        </div>

        {/* Currently strip */}
        <div data-reveal className="glass rounded-2xl p-6 md:p-7 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l-4 border-l-primary">
          <span className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            CURRENTLY
          </span>
          <p className="text-foreground leading-relaxed">
            Research Assistant at ITU Lahore (since Mar 2026) - AI-driven optical lens design and medical
            imaging research, alongside an MS in Computer Science.
          </p>
        </div>

        <div ref={listRef} className="relative space-y-8 before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-primary/30">
          {ROLES.map((role) => (
            <article key={role.title} data-tilt className="relative pl-20 will-change-transform">
              <div className={`absolute left-0 top-0 w-14 h-14 ${role.accent} rounded-2xl flex items-center justify-center shadow-glass z-10`}>
                <role.icon size={26} className="text-primary-foreground" />
              </div>
              <div className="glass rounded-2xl p-6 md:p-8 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20 mb-3">
                  {role.period}
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm font-medium text-secondary mb-4">{role.org}</p>
                <ul className="space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 hidden md:block" data-parallax data-speed="8" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 hidden md:block" data-parallax data-speed="10" />
    </section>
  );
};

export default Experience;
