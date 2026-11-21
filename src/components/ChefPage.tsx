import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, CookingPot, Star, ShoppingBag, X } from 'phosphor-react';
import ToonChef from './ToonChef';
import { BiryaniPot, ChaiCup, MaggiPlate, Chilli, RollingPin, BurgerArt, BowlArt, FriesArt } from './FoodArt';

type Dish = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: string;
  reviews: string[];
  art: React.ReactNode;
};

const DISHES: Dish[] = [
  {
    id: 1,
    name: 'Biryani.exe',
    tagline: 'The flagship build',
    description: 'Compiles perfectly every time. Except when it doesn\u2019t.',
    price: 'Rs. 0 — priceless, apparently',
    reviews: ['Mum: 10/10 — biased reviewer', 'Friends: ate it, survived.'],
    art: <BiryaniPot className="w-24 h-24" />,
  },
  {
    id: 2,
    name: 'Chai.js',
    tagline: 'Async, never blocks',
    description: 'Brewed while the code compiles. Best served with a 3-hour debugging session.',
    price: '1 cup = 1 bug fixed*',
    reviews: ['Roommate: \u201cIt fixed my bug. The bug was me.\u201d'],
    art: <ChaiCup className="w-24 h-24" />,
  },
  {
    id: 3,
    name: 'Maggi',
    tagline: 'The classic',
    description: 'Ready in 2 minutes* (*7 minutes. The asterisk is doing a lot of work.)',
    price: 'Rs. 60 + 5 minutes of your life',
    reviews: ['Hostel warden: \u201cSmells great. Still 7 minutes.\u201d'],
    art: <MaggiPlate className="w-24 h-24" />,
  },
  {
    id: 4,
    name: 'Anda Burger',
    tagline: 'The hello world of street food',
    description: 'Egg, bun, chutney, confidence. No dependencies required.',
    price: 'Rs. 150 — no framework needed',
    reviews: ['Street vendor: \u201cBeta, ye to main bhi bana leta.\u201d'],
    art: <BurgerArt className="w-24 h-24" />,
  },
  {
    id: 5,
    name: 'Daal Chawal',
    tagline: 'The production build',
    description: 'Boring, reliable, undefeated. Ships every single time.',
    price: 'Free — it\u2019s already at home',
    reviews: ['Dad: \u201cFinally, something that compiles first try.\u201d'],
    art: <BowlArt className="w-24 h-24" />,
  },
  {
    id: 6,
    name: 'Fries.exe',
    tagline: 'Crispy on the outside',
    description: 'Crispy on the outside, undefined on the inside.',
    price: 'Rs. 200 — salt sold separately',
    reviews: ['Neighbours: \u201cWe can smell it. Again.\u201d'],
    art: <FriesArt className="w-24 h-24" />,
  },
];

const FLOATERS = [
  { art: <BiryaniPot className="w-20 h-20 md:w-24 md:h-24" />, className: 'top-[10%] left-[2%]', depth: 26, delay: '0s' },
  { art: <ChaiCup className="w-16 h-16 md:w-20 md:h-20" />, className: 'top-[24%] right-[3%]', depth: -20, delay: '1.2s' },
  { art: <Chilli className="w-16 h-10 md:w-24 md:h-14" />, className: 'top-[52%] left-[1%]', depth: 34, delay: '0.6s' },
  { art: <MaggiPlate className="w-20 h-14 md:w-28 md:h-20" />, className: 'bottom-[24%] right-[2%]', depth: -28, delay: '1.8s' },
  { art: <RollingPin className="w-20 h-8 md:w-28 md:h-10" />, className: 'bottom-[8%] left-[6%]', depth: 18, delay: '2.4s' },
];

const ChefPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openDish, setOpenDish] = useState<number | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chef-hero', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.from('.toon-chef', {
        x: 60,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'back.out(1.5)',
        delay: 0.25,
      });
      gsap.from('.dish-card', {
        y: 60,
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.6)',
        delay: 0.3,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Soft mouse parallax on the floating food
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    pageRef.current?.querySelectorAll<HTMLElement>('.parallax-food').forEach((el) => {
      const depth = Number(el.dataset.depth || 20);
      gsap.to(el, { x: nx * depth, y: ny * depth, duration: 0.9, ease: 'power2.out' });
    });
  };

  const toggleDish = (id: number) => {
    const willOpen = openDish !== id;
    setOpenDish(willOpen ? id : null);
    if (willOpen) {
      const card = document.getElementById(`dish-${id}`);
      if (card) {
        gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }
    }
  };

  const orderNow = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 3500);
  };

  return (
    <div ref={pageRef} onMouseMove={handleMouseMove} className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating illustrated food (with mouse parallax) */}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          data-depth={f.depth}
          className={`parallax-food absolute ${f.className} animate-drift pointer-events-none opacity-80 hidden sm:block`}
          style={{ animationDelay: f.delay }}
        >
          {f.art}
        </div>
      ))}

      <div className="container mx-auto max-w-5xl px-6 py-10 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={18} />
          Back to the serious portfolio
        </Link>

        {/* Hero: photo + toon chef side by side */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          {/* Photo with chef hat */}
          <div className="chef-hero text-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto mb-6">
              <div className="absolute -top-2 left-1/3 flex gap-2 z-20">
                <span className="steam-wisp block w-1.5 h-8 bg-muted-foreground/40 rounded-full blur-[2px]" />
                <span className="steam-wisp block w-1.5 h-10 bg-muted-foreground/40 rounded-full blur-[2px]" style={{ animationDelay: '0.9s' }} />
                <span className="steam-wisp block w-1.5 h-8 bg-muted-foreground/40 rounded-full blur-[2px]" style={{ animationDelay: '1.7s' }} />
              </div>
              <svg
                viewBox="0 0 200 110"
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-52 z-20 drop-shadow-lg"
                aria-label="Chef hat"
              >
                <path
                  d="M100 8c-14 0-24 9-26 21-12 1-22 10-22 23 0 7 3 13 8 17-4 4-7 10-7 16 0 8 5 14 12 17h70c7-3 12-9 12-17 0-6-3-12-7-16 5-4 8-10 8-17 0-13-10-22-22-23-2-12-12-21-26-21z"
                  fill="#FFFDF8"
                  stroke="#E5DDCB"
                  strokeWidth="2"
                />
                <rect x="62" y="86" width="76" height="18" rx="6" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="2" />
              </svg>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent shadow-glass bg-card">
                <img src="/Images/ahsan-profile.jpg" alt="Chef Ahsan" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-glow-primary animate-wobble">
                <CookingPot size={28} className="text-primary-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">The real chef. Allegedly.</p>
          </div>

          {/* Animated toon chef */}
          <div className="toon-chef text-center">
            <div className="relative mx-auto max-w-[320px]">
              <ToonChef className="w-full h-auto drop-shadow-xl" />
            </div>
            <p className="text-sm text-muted-foreground italic mt-2">
              Toon Chef Ahsan — waving, blinking, and stirring the pot since forever.
            </p>
          </div>
        </div>

        <div className="text-center mb-14">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground mb-3">
            Chef <span className="text-primary">Ahsan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            By day, an AI researcher. By night, a chef whose greatest achievement is a biryani that compiled on
            the first try — once.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium">
              Michelin stars:{' '}
              <span className="inline-flex items-center gap-1 text-accent font-bold">
                0 <Star size={14} weight="fill" />
              </span>
            </span>
            <span className="glass px-4 py-2 rounded-full text-sm text-muted-foreground">
              (but the neighbours can smell it)
            </span>
            <span className="glass px-4 py-2 rounded-full text-sm text-muted-foreground">
              Reservations: just show up, bring your own plate
            </span>
          </div>
        </div>

        {/* Menu */}
        <h2 className="font-display text-3xl font-semibold text-center text-foreground mb-2">
          The <span className="text-primary">Menu</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Tap a dish to reveal its totally unbiased reviews.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {DISHES.map((dish) => {
            const open = openDish === dish.id;
            return (
              <button
                key={dish.id}
                id={`dish-${dish.id}`}
                onClick={() => toggleDish(dish.id)}
                className={`dish-card animate-wobble text-left glass rounded-2xl p-6 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1.5 active:scale-95 ${
                  open ? 'ring-2 ring-primary/50' : ''
                }`}
                style={{ animationDelay: `${dish.id * 0.35}s` }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="group-hover:scale-110 transition-transform duration-300">{dish.art}</div>
                  <CookingPot size={22} className="text-accent shrink-0 mt-1" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground">{dish.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{dish.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-3">{dish.description}</p>
                <p className="text-sm font-medium text-secondary mb-4">{dish.price}</p>

                {open ? (
                  <div className="border-t border-border pt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Verified* reviews
                    </p>
                    {dish.reviews.map((review) => (
                      <p key={review} className="text-sm text-foreground italic">
                        &ldquo;{review}&rdquo;
                      </p>
                    ))}
                    <p className="text-[11px] text-muted-foreground/70">*not verified by anyone, ever.</p>
                  </div>
                ) : (
                  <p className="text-sm text-primary font-medium">Tap for reviews →</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Order CTA */}
        <div className="text-center mb-16">
          <button
            onClick={orderNow}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-primary text-primary-foreground rounded-full font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
          >
            <ShoppingBag size={22} />
            Order now
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Disclaimer: this is a joke page. No restaurant exists. The chef is a researcher. The kitchen is a
            laptop.
          </p>
        </div>
      </div>

      {/* Joke toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-secondary text-secondary-foreground px-6 py-4 rounded-2xl shadow-glow-secondary animate-fade-in">
          <CookingPot size={22} className="text-accent shrink-0" />
          <p className="font-medium">Kitchen closed — the chef is debugging.</p>
          <button onClick={() => setToast(false)} className="text-secondary-foreground/60 hover:text-secondary-foreground" aria-label="Dismiss">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChefPage;
