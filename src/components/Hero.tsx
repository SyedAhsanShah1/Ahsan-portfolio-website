import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, DownloadSimple, Handshake } from 'phosphor-react';
import { Button } from './ui/button';

const ROLES = ['AI Researcher', 'Medical Imaging', 'Computer Vision', 'Web Engineer'];

const TICKER_ITEMS = [
  'Machine Learning',
  'Medical Imaging',
  'Computer Vision',
  'PyTorch',
  'FDTD Simulation',
  'Deep Learning',
  'React',
  'OpenCV',
  'Flask',
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);
  const blobRef3 = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState('');

  // Typewriter: type the role, pause, delete, move to the next role
  useEffect(() => {
    const current = ROLES[roleIndex];
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        char += 1;
        setTyped(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        char -= 1;
        setTyped(current.slice(0, char));
        if (char === 0) {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
        timer = setTimeout(tick, 35);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out',
    })
      .from(photoRef.current, {
        x: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.1,
        ease: 'power3.out',
      }, '-=0.7')
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.3');

    const float = (el: HTMLDivElement | null, y: number, x: number, dur: number, delay: number) => {
      if (!el) return;
      gsap.to(el, {
        y, x,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay,
      });
    };
    float(blobRef1.current, -24, 12, 5, 0);
    float(blobRef2.current, -32, -16, 6, 1);
    float(blobRef3.current, -26, 20, 7, 2);

    return () => {
      tl.kill();
    };
  }, []);

  const navigate = useNavigate();

  const scrollToProjects = () => {
    navigate('/projects');
  };

  const hireMe = () => {
    navigate('/contact');
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.usercontent.google.com/u/0/uc?id=18ayBqJRQqpHNLUeO-D94enteOAQ1CjCO&export=download';
    link.download = 'Ahsan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" ref={heroRef} data-mouse-zone className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0">
      {/* Floating soft blobs in the new palette */}
      <div ref={blobRef1} data-mouse-x="14" data-parallax data-speed="6" className="absolute top-1/4 left-[8%] w-64 h-64 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
      <div ref={blobRef2} data-mouse-x="20" data-parallax data-speed="9" className="absolute top-1/3 right-[6%] w-72 h-72 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
      <div ref={blobRef3} data-mouse-x="16" data-parallax data-speed="7" className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle paper grain / dot texture */}
      {/* Subtle paper grain / dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: 'radial-gradient(hsl(30 6% 10% / 0.07) 1px, transparent 1px)', backgroundSize: '26px 26px' }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            MS Computer Science - ITU Lahore
          </p>

          <h1 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 leading-[1.05]">
            Hi, I&apos;m{' '}
            <span className="text-primary">Syed Ahsan</span>
          </h1>

          <div className="font-display text-2xl md:text-3xl lg:text-4xl text-secondary mb-6 min-h-[2.5rem]">
            {typed}
            <span className="typewriter-caret" />
          </div>

          <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            AI researcher at ITU Lahore, working on medical imaging and AI - AI-driven design of optical
            lenses. I build intelligent systems where machine learning meets real medicine.
          </p>

          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-8 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Open to research collaborations and AI projects
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button onClick={hireMe} data-magnetic className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105" size="lg">
              <Handshake size={20} />
              Hire Me
            </Button>

            <Button onClick={downloadCV} data-magnetic variant="outline" className="group inline-flex items-center gap-3 px-8 py-4 border-primary/40 text-primary hover:bg-primary/10 rounded-full font-medium transition-all duration-300 hover:scale-105" size="lg">
              <DownloadSimple size={20} />
              Download CV
            </Button>

            <Button onClick={scrollToProjects} variant="ghost" className="group inline-flex items-center gap-3 px-8 py-4 text-foreground hover:bg-primary/10 rounded-full font-medium transition-all duration-300 hover:scale-105" size="lg">
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Profile photo */}
        <div ref={photoRef} data-mouse="10" data-parallax data-speed="5" className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 will-change-transform">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-xl" />
          <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-primary/30 rotate-3" />
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-glass bg-card">
            <img
              src="/Images/ahsan-profile.jpg"
              alt="Syed Ahsan Shah"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-5 glass rounded-2xl px-4 py-3 shadow-glass animate-float">
            <p className="text-sm font-semibold text-foreground">Research Assistant</p>
            <p className="text-xs text-muted-foreground">ITU Lahore - since Mar 2026</p>
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div className="relative z-10 mt-16 md:mt-20 bg-secondary text-secondary-foreground py-3 overflow-hidden -rotate-1 scale-[1.02]">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-6 text-sm font-semibold tracking-widest uppercase flex items-center gap-6">
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex justify-center py-8">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
