import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowLeft, CookingPot, Star, ShoppingBag, X, Quotes, Fire, Timer } from 'phosphor-react';
import ToonChef from './ToonChef';
import { BiryaniPot, ChaiCup, MaggiPlate, Chilli, RollingPin, BurgerArt, BowlArt, FriesArt } from './FoodArt';
import { sparkleBurst, useTripleClick } from './FunBits';

gsap.registerPlugin(ScrollTrigger);

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
    price: 'Rs. 0 - priceless, apparently',
    reviews: ['Mum: 10/10 - biased reviewer', 'Friends: ate it, survived.'],
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
    price: 'Rs. 150 - no framework needed',
    reviews: ['Street vendor: \u201cBeta, ye to main bhi bana leta.\u201d'],
    art: <BurgerArt className="w-24 h-24" />,
  },
  {
    id: 5,
    name: 'Daal Chawal',
    tagline: 'The production build',
    description: 'Boring, reliable, undefeated. Ships every single time.',
    price: 'Free - it\u2019s already at home',
    reviews: ['Dad: \u201cFinally, something that compiles first try.\u201d'],
    art: <BowlArt className="w-24 h-24" />,
  },
  {
    id: 6,
    name: 'Fries.exe',
    tagline: 'Crispy on the outside',
    description: 'Crispy on the outside, undefined on the inside.',
    price: 'Rs. 200 - salt sold separately',
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

/* Joke stats, totally unverified, exactly as the chef claims them. */
const CHEF_STATS = [
  { icon: CookingPot, value: 47, label: 'Biryani attempts' },
  { icon: Star, value: 12, label: 'Edible biryanis' },
  { icon: Fire, value: 9, label: 'Smoke alarms triggered' },
  { icon: Timer, value: 1204, label: 'Cups of chai brewed' },
  { icon: CookingPot, value: 86, label: 'Maggi packs sacrificed' },
  { icon: Star, value: 0, label: 'Michelin stars' },
];

const KITCHEN_RULES = [
  'The chef is always right, especially when the smoke alarm disagrees.',
  'If it compiles, it is dinner.',
  'Tasting is mandatory. Sharing is optional.',
  'No crying over spilt chai.',
  'The recipe is a suggestion, not a contract.',
  'Whoever cooks does not wash up. The chef wrote this rule.',
];

const CHEF_REVIEWS = [
  {
    quote: 'Beta, ye to main bhi bana leti.',
    name: 'Ammi',
    note: '10/10, would eat again. She had no choice.',
  },
  {
    quote: 'I came for the Wi-Fi. I stayed for the biryani.',
    name: 'Roommate',
    note: '5 stars, 1 complaint: there was never enough.',
  },
  {
    quote: 'We can smell it. Again. Every Sunday.',
    name: 'The neighbour',
    note: 'No stars given, but the whole street showed up.',
  },
  {
    quote: 'I have seen things no alarm should see.',
    name: 'The smoke alarm',
    note: 'Retired early.',
  },
];

function ChefCount({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 92%',
        once: true,
      },
      onUpdate: () => setValue(Math.round(obj.v)),
    });
    return () => {
      tween.kill();
    };
  }, [target]);

  return (
    <span ref={ref}>{value.toLocaleString()}</span>
  );
}

const ChefPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openDish, setOpenDish] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  /* Entrance uses the shared CSS + IntersectionObserver reveal
     (data-reveal) - the old gsap.from opacity tweens got stuck at
     opacity 0 on the live site and hid the whole menu. */

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
        /* Transform-only pulse from its current (visible) state. */
        gsap.to(card, { scale: 1.02, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
      }
    }
  };

  const orderNow = () => {
    showToast('Kitchen closed - the chef is debugging.');
  };

  /* Easter egg: click the chef hat. */
  const onHatClick = (e: React.MouseEvent) => {
    sparkleBurst(e.clientX, e.clientY);
    showToast('The hat approves. The smoke alarm does not.');
  };

  /* Easter egg: click the toon chef 3 times. */
  const toonRef = useRef<HTMLDivElement>(null);
  const onToonTripleClick = useTripleClick(() => {
    const el = toonRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      sparkleBurst(r.left + r.width / 2, r.top + r.height / 2);
    }
    showToast('The toon has feelings too. Mostly hunger.');
  });

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
          <div data-reveal className="text-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto mb-6">
              <div className="absolute -top-2 left-1/3 flex gap-2 z-20">
                <span className="steam-wisp block w-1.5 h-8 bg-muted-foreground/40 rounded-full blur-[2px]" />
                <span className="steam-wisp block w-1.5 h-10 bg-muted-foreground/40 rounded-full blur-[2px]" style={{ animationDelay: '0.9s' }} />
                <span className="steam-wisp block w-1.5 h-8 bg-muted-foreground/40 rounded-full blur-[2px]" style={{ animationDelay: '1.7s' }} />
              </div>
              <svg
                viewBox="0 0 200 110"
                onClick={onHatClick}
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-52 z-20 drop-shadow-lg cursor-pointer hover-wiggle"
                aria-label="Chef hat - click me"
                role="button"
                title="Click the hat. You know you want to."
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
              <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-glow-primary">
                <CookingPot size={28} className="text-primary-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">The real chef. Allegedly.</p>
          </div>

          {/* Animated toon chef - tap 3 times for a surprise */}
          <div ref={toonRef} onClick={onToonTripleClick} title="Tap 3 times for a surprise" data-reveal data-delay="0.15" className="text-center cursor-pointer">
            <div className="relative mx-auto max-w-[320px]">
              <ToonChef className="w-full h-auto drop-shadow-xl" />
            </div>
            <p className="text-sm text-muted-foreground italic mt-2">
              Toon Chef Ahsan - waving, blinking, and stirring the pot since forever.
            </p>
          </div>
        </div>

        <div data-reveal className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3">// hidden_talent</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground mb-3">
            Chef <span className="text-primary">Ahsan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            By day, an AI researcher. By night, a chef whose greatest achievement is a biryani that compiled on
            the first try - once.
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

        {/* Chef's story */}
        <div className="max-w-3xl mx-auto mb-14">
          <h2 className="font-display text-3xl font-semibold text-center text-foreground mb-2">
            The <span className="text-primary">Chef&apos;s Story</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-8" />
          <div className="glass rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed" data-reveal>
            <p>
              Every great chef has an origin story. Mine starts in a hostel kitchen at 2am, with one packet of
              Maggi, no clean pan, and far too much confidence. That Maggi took 7 minutes. The packet said 2.
              I have been in a dispute with the packet ever since.
            </p>
            <p>
              From there it was a short, smoky road to biryani. Forty-seven attempts later, twelve of them
              edible, I earned the title Chef Ahsan. Self-awarded, obviously. No culinary school has claimed
              me yet.
            </p>
            <p>
              My philosophy is simple: cooking is just debugging with extra steps. If the code compiles, it
              is dinner. If it does not, it is still dinner, we just call it experimental cuisine.
            </p>
          </div>
        </div>

        {/* Chef's stats (joke numbers, unverified, as claimed by the chef) */}
        <div className="mb-14">
          <h2 className="font-display text-3xl font-semibold text-center text-foreground mb-2">
            Chef&apos;s <span className="text-primary">Stats</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Totally unverified kitchen statistics, as reported by the chef himself.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-reveal>
            {CHEF_STATS.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-6 text-center hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 mx-auto mb-3 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <stat.icon size={22} className="text-primary-foreground" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-primary">
                  <ChefCount target={stat.value} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground/80 italic mt-4">
            The other 35 biryanis were not failures. They were learning experiences. Mostly for the smoke alarm.
          </p>
        </div>

        {/* Menu */}
        <h2 data-reveal className="font-display text-3xl font-semibold text-center text-foreground mb-2">
          The <span className="text-primary">Menu</span>
        </h2>
        <p data-reveal data-delay="0.05" className="text-center text-muted-foreground mb-10">
          Tap a dish to reveal its totally unbiased reviews.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {DISHES.map((dish, i) => {
            const open = openDish === dish.id;
            return (
              <button
                key={dish.id}
                id={`dish-${dish.id}`}
                onClick={() => toggleDish(dish.id)}
                data-tilt
                data-reveal
                data-delay={((i % 3) * 0.08).toFixed(2)}
                className={`text-left glass rounded-2xl p-6 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1.5 active:scale-95 will-change-transform ${
                  open ? 'ring-2 ring-primary/50' : ''
                }`}
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

        {/* Kitchen rules */}
        <div className="mb-14">
          <h2 className="font-display text-3xl font-semibold text-center text-foreground mb-2">
            Kitchen <span className="text-primary">Rules</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Posted on the fridge. Enforced by no one. Broken by everyone.
          </p>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4" data-reveal>
            {KITCHEN_RULES.map((rule, i) => (
              <div key={rule} className="glass rounded-2xl p-5 flex gap-4 items-start hover:shadow-glow-primary transition-all duration-300">
                <span className="shrink-0 w-9 h-9 bg-gradient-primary rounded-full flex items-center justify-center font-display font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-foreground leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-14">
          <h2 className="font-display text-3xl font-semibold text-center text-foreground mb-2">
            What People <span className="text-primary">Say</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Real quotes. Real people. Questionable sample size.
          </p>
          <div className="grid md:grid-cols-2 gap-6" data-reveal>
            {CHEF_REVIEWS.map((review) => (
              <figure key={review.name} className="glass rounded-2xl p-6 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
                <Quotes size={28} weight="fill" className="text-primary mb-3" />
                <blockquote className="font-display text-xl text-foreground leading-relaxed mb-4">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-semibold text-primary">{review.name}</p>
                  <p className="text-sm text-muted-foreground italic">{review.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Order CTA */}
        <div data-reveal className="text-center mb-16">
          <button
            onClick={orderNow}
            data-magnetic
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md flex items-center justify-center gap-3 bg-secondary text-secondary-foreground px-6 py-4 rounded-2xl shadow-glow-secondary animate-fade-in">
          <CookingPot size={22} className="text-accent shrink-0" />
          <p className="font-medium text-center">{toast}</p>
          <button onClick={() => setToast(null)} className="text-secondary-foreground/60 hover:text-secondary-foreground shrink-0" aria-label="Dismiss">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChefPage;
