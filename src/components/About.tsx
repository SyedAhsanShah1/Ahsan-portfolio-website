import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Flask,
  GraduationCap,
  Briefcase,
  Sparkle,
} from 'phosphor-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: '2026',
    title: 'BS Artificial Intelligence — IUB',
    text: 'Completed my BS in AI at The Islamia University of Bahawalpur, CGPA 3.30/4.00.',
  },
  {
    year: 'Mar 2026',
    title: 'Research Assistant — ITU Lahore',
    text: 'Joined ITU as an RA, working on AI-integrated meta optics: AI-driven inverse design of meta-lenses using FDTD simulation data and a deep-learning surrogate model.',
  },
  {
    year: 'Aug 2026',
    title: 'MS Computer Science + Teaching Assistant — ITU',
    text: 'Started my MS in Computer Science at ITU Lahore, and began teaching as a Teaching Assistant for Numerical Analysis.',
  },
];

function Counter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
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
        start: 'top 90%',
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

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(timelineRef.current?.children || [], {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full glass rounded-full p-2 hover:shadow-glow-primary transition-all duration-500 group">
                <div className="w-full h-full cursor-pointer rounded-full overflow-hidden bg-card">
                  <img
                    src="/Images/ahsan-profile.jpg"
                    alt="Syed Ahsan Shah"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/40 rounded-full animate-float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed break-words">
              I&apos;m Muhammad Ahsan Shah — Syed Ahsan — an MS Computer Science student and Research Assistant at
              ITU Lahore. My research is in AI-integrated meta optics: using deep learning to inversely design
              meta-lenses from FDTD simulation data.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I completed my BS in Artificial Intelligence at The Islamia University of Bahawalpur (CGPA 3.30/4.00),
              interned at the Deep Embed Lab, and led the IUB Skills &amp; Career Development Society as president —
              running Python, marketing and analytics courses for 1000+ students. Alongside research, I&apos;m a
              Teaching Assistant for Numerical Analysis at ITU and I build AI-powered web applications.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="glass px-4 py-3 rounded-xl">
                <span className="text-primary font-display text-2xl font-semibold">
                  <Counter target={1000} suffix="+" />
                </span>
                <span className="text-muted-foreground ml-2 text-sm">students taught</span>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <span className="text-secondary font-display text-2xl font-semibold">
                  <Counter target={6} suffix="+" />
                </span>
                <span className="text-muted-foreground ml-2 text-sm">projects built</span>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <span className="text-accent font-display text-2xl font-semibold">
                  <Counter target={3.3} decimals={2} />
                </span>
                <span className="text-muted-foreground ml-2 text-sm">BS CGPA / 4.00</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/80 italic pt-2">
              Fun fact: there&apos;s a side of me the CV doesn&apos;t show.{' '}
              <Link to="/hidden-talent" className="text-primary font-medium not-italic hover:underline">
                Psst — hidden talent →
              </Link>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <h3 className="font-display text-3xl font-semibold text-center text-foreground mb-12">
            My <span className="text-primary">Journey</span>
          </h3>
          <div ref={timelineRef} className="relative max-w-3xl mx-auto space-y-8 before:absolute before:left-[7px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-primary/30 md:before:-translate-x-1/2">
            {TIMELINE.map((step, i) => (
              <div key={step.title} className={`relative pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'}`}>
                <span className="absolute left-0 md:left-auto top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-glow-primary md:right-[-8px] md:left-auto" style={i % 2 === 1 ? { left: '-8px', right: 'auto' } : undefined} />
                <div className="glass rounded-2xl p-5 hover:shadow-glow-primary transition-shadow duration-300">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-primary">
                    {i === 0 ? <GraduationCap size={14} /> : i === 1 ? <Flask size={14} /> : <Briefcase size={14} />}
                    {step.year}
                  </span>
                  <h4 className="font-display text-lg font-semibold text-foreground mt-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10 flex items-center justify-center gap-2">
            <Sparkle size={16} className="text-accent" />
            Also: IEEE Student Branch leadership · Deep Embed Lab intern (Oct 2023 – Nov 2024)
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 hidden md:block" />
    </section>
  );
};

export default About;
