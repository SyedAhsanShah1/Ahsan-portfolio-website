import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, CookingPot } from 'phosphor-react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });

      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: -30,
            x: Math.random() * 40 - 20,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.5,
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Experience', to: '/experience' },
    { name: 'Research', to: '/research' },
    { name: 'Projects', to: '/projects' },
    { name: 'Skills', to: '/skills' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <footer ref={footerRef} className="relative py-16 px-6 overflow-hidden bg-secondary text-secondary-foreground">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full blur-sm" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full blur-sm" />
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-accent rounded-full blur-sm" />
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-primary rounded-full blur-sm" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">Syed Ahsan</h3>
            <p className="text-secondary-foreground/70 leading-relaxed mb-6">
              AI researcher and engineer — building intelligent systems where machine learning meets real physics.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/SyedAhsanShah1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <GithubLogo size={18} className="text-primary-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/syedahsanai-engr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={18} className="text-accent-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-secondary-foreground/70 hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-secondary-foreground/70">
                <span className="text-accent">Email:</span>
                <br />
                <a href="mailto:asmatullahshah0343@gmail.com" className="hover:text-accent transition-colors">
                  asmatullahshah0343@gmail.com
                </a>
                <br />
                <a href="mailto:mscs26017@itu.edu.pk" className="hover:text-accent transition-colors">
                  mscs26017@itu.edu.pk
                </a>
              </p>
              <p className="text-secondary-foreground/70">
                <span className="text-accent">Location:</span>
                <br />
                Lahore, Pakistan
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/70 text-center md:text-left">
            © 2026 Syed Ahsan Shah. All rights reserved.
          </p>

          <Link
            to="/hidden-talent"
            className="inline-flex items-center gap-2 text-secondary-foreground/50 hover:text-accent text-sm transition-colors duration-300"
          >
            <CookingPot size={16} />
            Psst — hidden talent
          </Link>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 gap-2 flex items-center bg-gradient-primary text-primary-foreground rounded-full hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm"
          >
            Back to Top <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
