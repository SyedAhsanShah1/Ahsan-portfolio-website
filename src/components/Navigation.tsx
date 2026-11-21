import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { List, X } from 'phosphor-react';

const NAV_ITEMS = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Experience', to: '/experience' },
  { name: 'Research', to: '/research' },
  { name: 'Projects', to: '/projects' },
  { name: 'Skills', to: '/skills' },
  { name: 'Hidden Talent', to: '/hidden-talent' },
  { name: 'Contact', to: '/contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.7,
    });

    gsap.from(menuRef.current?.children || [], {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.8,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      gsap.from(mobileMenuRef.current?.querySelectorAll('.menu-item') || [], {
        x: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [isOpen]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-300 font-medium ${
      isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
    }`;

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div ref={logoRef}>
              <Link to="/" className="font-display text-2xl font-semibold text-primary">
                Syed Ahsan
              </Link>
            </div>

            <div ref={menuRef} className="hidden xl:flex items-center space-x-6">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.name}
                </NavLink>
              ))}

              <button
                onClick={() => navigate('/contact')}
                data-magnetic
                className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-full hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
              >
                Hire Me
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-foreground p-2" aria-label="Open menu">
              <List size={24} />
            </button>
          </div>
        </div>
        {/* Scroll progress bar */}
        <div
          className="h-1 bg-gradient-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </nav>

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-full h-full bg-background/95 backdrop-blur-lg z-50 transform translate-x-full xl:hidden overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/60">
          <h2 className="font-display text-2xl font-semibold text-primary">Syed Ahsan</h2>
          <button onClick={() => setIsOpen(false)} className="text-foreground p-2" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-5 p-6 mt-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `menu-item text-left text-xl transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/contact');
            }}
            className="menu-item px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full hover:shadow-glow-primary transition-all duration-300 text-center mt-8"
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
