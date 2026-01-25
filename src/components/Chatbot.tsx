import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  ChatCircle,
  X,
  PaperPlaneTilt,
  Robot,
  Microphone,
  SpeakerSimpleHigh,
  Code,
  Briefcase,
  CurrencyDollar,
  Envelope,
  GraduationCap,
  Wrench,
  IdentificationCard,
  RocketLaunch,
  Info,
  Monitor,
  DeviceMobile,
  Cpu,
  Sparkle,
  GithubLogo,
  LinkedinLogo,
  Phone,
  Terminal,
  Brain,
  CaretDown,
  Lightning,
  ShieldCheck,
  Globe,
  Database
} from "phosphor-react";
import { Layers } from "lucide-react";
import { Hammer } from "lucide-react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Enhanced Knowledge Base ---
type KBEntry = {
  text: string;
  options?: { label: string; value: string }[];
};

const knowledgeBase: Record<string, KBEntry> = {
  hi: {
    text: "Welcome! 🤖 I am Ahsan's AI Assistant.\n\nAhsan is a professional AI & Web Engineer with 2+ years of experience in building AI-powered systems, modern websites, and custom software solutions.\n\n💡 If you are looking to build a project, website, AI system, automation, or need a custom solution — feel free to reach out directly. I can guide you to the right place.",
    options: [
      { label: "🚀 Services", value: "services" },
      { label: "💻 Projects", value: "projects" },
      { label: "🎓 About Ahsan", value: "about" }
    ]
  },
  services: {
    text: "Ahsan provides industrial-grade digital solutions engineered for scale:\n\n" +
      "1️⃣ **AI Automation & Agents**– Chatbots, voice bots, workflow automation using n8n, Zapier & Make.\n\n" +
      "2️⃣ **Full-Stack Development** – React, Vite, Node.js based scalable web apps.\n\n" +
      "3️⃣ **Creative Engineering**: High-fidelity 3D motion experiences utilizing GSAP, Spline, and Framer Motion.\n\n" +
      "4️⃣ **EMachine Learning Solutions** – Computer Vision, NLP, recommendation systems.\n\n" +
      "5️⃣ **Custom Tools** – Business dashboards, smart systems, internal tools.\n\n" +
      "6️⃣ **Consulting & Strategy** – Technical architecture design and project scoping.",
    options: [
      { label: "Tech Stack", value: "tech stack" },
      { label: "Pricing", value: "pricing" },
      { label: "Connect", value: "contact" }
    ]
  },
  projects: {
    text: "Reviewing active project repositories... Found high-impact deliverables:\n\n" +
      "🧠 **AI Chatbot & Voice Bot** – Automated lead calling & chat systems using VAPI, Voiceflow & n8n.\n\n" +
      "🔹 **Medical Prediction Node**: A diagnostic AI infrastructure using Python/Flask to analyze healthcare datasets with 98% accuracy.\n\n" +
      "🔹 **Kinetic Portfolio**: A multi-dimensional 3D web experience built with Spline and GSAP for immersive storytelling.\n\n" +
      "🔹 **Vision-X Waste AI**: Real-time object detection and classification using YOLOv8 for automated recycling systems.\n\n" +
      "🔹 **Cognitive Chatbot**: An NLP-driven commercial assistant capable of multi-intent recognition and order tracking.",
    options: [
      { label: "Explore Stack", value: "tech stack" },
      { label: "Check Services", value: "services" }
    ]
  },
  pricing: {
    text: "Investment tiers for premium development services:\n\n" +
      "💰 **Bespoke Landing Pages**: Starting at $500\n" +
      "💰 **Full-Stack SaaS Architecture**: $2,000 - $5,000+\n" +
      "💰 **AI/ML Integration Systems**: $1,500 - $3,500\n" +
      "💰 **Maintenance & Logic Support**: Retainers starting at $300.\n\n" +
      "*Every project undergo a rigorous scoping phase. Contact Ahsan for a precise technical estimate.*",
    options: [
      { label: "Initiate Project", value: "contact" },
      { label: "View Skills", value: "tech stack" }
    ]
  },
  "tech stack": {
    text: "System Configuration: Technical Inventory Detected:\n\n" +
      "🔄 **Automation** – n8n, Zapier, Make.\n\n" +
      "🛠 **AI / ML frameworks**: PyTorch, TensorFlow, OpenCV, YOLOv8, OpenAI SDK.\n\n" +
      "🛠 **Frontend Tier**: React.js, Next.js, TypeScript, Tailwind CSS, GSAP, Spline 3D.\n\n" +
      "🛠 **Backend Tier**: Node.js (Express), Python (FastAPI/Flask), PostgreSQL, Firebase.\n\n" +
      "🛠 **Cloud**: Docker, GitHub Actions, AWS, Vercel, Linux Server Management.",
    options: [
      { label: "Professional Exp", value: "experience" },
      { label: "Live Projects", value: "projects" }
    ]
  },
  about: {
    text: "Profile: Syed Ahsan\n\nI am a professional AI & Web Engineer with over 2+ years of hands-on experience in building intelligent systems and high-performance web applications.\n\nMy core expertise lies in Artificial Intelligence, modern web technologies, and scalable software architectures. I focus on delivering solutions that combine advanced AI capabilities with clean, user-friendly interfaces.",
    options: [
      { label: "Education", value: "education" },
      { label: "Work History", value: "experience" }
    ]
  },
  education: {
    text: "Academic Background:\n\n🎓 **Bachelor of Science in Artificial Intelligence (BS AI)** — Completed\n\n📍 The Islamia University of Bahawalpur (IUB)\n\nCore Focus Areas:\n• Machine Learning & Deep Learning\n• Computer Vision & NLP\n• Data Science & Intelligent Systems\n• Software Engineering & AI Deployment",
    options: [
      { label: "Past Work", value: "experience" },
      { label: "Contact Info", value: "contact" }
    ]
  },
  experience: {
    text: "Professional Experience:\n\n🚀 **2+ Years of Industry Experience** as an AI & Web Engineer.\n\n✔ Designed and developed AI-powered web applications.\n✔ Built intelligent chatbots, automation systems, and AI agents.\n✔ Implemented computer vision solutions using YOLO and OpenCV.\n✔ Developed scalable full-stack applications using React, Node.js, and Python.\n✔ Integrated AI models into real-world production environments.",
    options: [
      { label: "Check Stack", value: "tech stack" },
      { label: "See Pricing", value: "pricing" }
    ]
  },
  contact: {
    text: "Contact Ahsan:\n\n" +
      "📧 Email: s22barin1m01113@iub.edu.pk\n" +
      "🔗 LinkedIn: linkedin.com/in/syedahsanai-engr\n" +
      "🐙 GitHub: github.com/SyedAhsanShah1\n" +
      "📱 Phone: +92 341 6985286",
  },
  help: {
    text: "I am optimized for the following queries:\n\n• Detailed **Services** & **Tech Stack** break-downs.\n• Portfolio **Projects** & case studies.\n• Service **Pricing** & investment tiers.\n• Direct **Contact** protocols.",
    options: [
      { label: "Show Services", value: "services" },
      { label: "Show Contacts", value: "contact" }
    ]
  },
  fallback: {
    text: "Input not recognized by core logic. I am specifically programmed to discuss Ahsan's engineering services and portfolio.\n\nWould you like to reboot the conversation by viewing his services?",
    options: [
      { label: "View Services", value: "services" },
      { label: "Talk to Human", value: "contact" }
    ]
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      fullText: "Welcome! I'm Ahsan's AI Assistant 🤖. How can I help you navigate his portfolio today?",
      displayed: "Welcome! I'm Ahsan's AI Assistant 🤖. How can I help you navigate his portfolio today?",
      isBot: true
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const sidebarActions = [
    { label: "Services", value: "services", icon: <Briefcase size={16} /> },
    { label: "Projects", value: "projects", icon: <Code size={16} /> },
    { label: "Pricing", value: "pricing", icon: <CurrencyDollar size={16} /> },
    { label: "Contact", value: "contact", icon: <Envelope size={16} /> },
    { label: "Stack", value: "tech stack", icon: <Layers size={16} /> },
    { label: "History", value: "experience", icon: <RocketLaunch size={16} /> },
    { label: "Help", value: "help", icon: <Info size={16} /> },
  ];

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (triggerRef.current) {
      gsap.fromTo(triggerRef.current,
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, []);

  const typeOut = async (msgId: number, text: string) => {
    let current = "";
    const chars = text.split("");
    for (let i = 0; i < chars.length; i++) {
      current += chars[i];
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, displayed: current } : m));
      const speed = text.length > 100 ? 5 : 12;
      await new Promise(r => setTimeout(r, speed));
    }
  };

  const processQuery = async (query: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600));

    const lowered = query.toLowerCase();
    const key = Object.keys(knowledgeBase).find(k => lowered.includes(k));

    if (key) {
      // Local Knowledge Base Match
      const entry = knowledgeBase[key];
      const botId = Date.now();

      setMessages(prev => [...prev, {
        id: botId,
        fullText: entry.text,
        displayed: "",
        isBot: true,
        options: entry.options
      }]);

      await typeOut(botId, entry.text);
    } else {
      // Server Fallback (Gemini)
      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        const data = await response.json();
        const botId = Date.now();

        // Check for Rate Limit Error to show fallback options
        const isRateLimit = response.status === 429 || (data.reply && data.reply.includes("Too many requests"));

        const fallbackOptions = [
          { label: "View Services", value: "services" },
          { label: "About Ahsan", value: "about" },
          { label: "Contact", value: "contact" }
        ];

        setMessages(prev => [...prev, {
          id: botId,
          fullText: data.reply,
          displayed: "",
          isBot: true,
          options: isRateLimit ? fallbackOptions : undefined
        }]);

        await typeOut(botId, data.reply);
      } catch (error) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          fullText: "I'm having trouble connecting to the server. Please check my connection.",
          displayed: "I'm having trouble connecting to the server. Please check my connection.",
          isBot: true,
          options: [
            { label: "View Services", value: "services" },
            { label: "Contact", value: "contact" }
          ]
        }]);
      }
    }

    setIsTyping(false);
  };

  const sendMessage = async (val?: string) => {
    const text = (val || input).trim();
    if (!text) return;

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      fullText: text,
      displayed: text,
      isBot: false
    }]);

    setInput("");
    await processQuery(text);
  };

  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("System Error: Voice Recognition Hardware Not Found.");

    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => sendMessage(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end font-sans selection:bg-blue-500/30">
      {isOpen && (
        <div className="flex flex-col md:flex-row-reverse gap-4 items-end mb-4 w-[92vw] sm:w-[400px] md:w-auto transition-all duration-500">

          {/* Desktop Only Side Menu */}
          <div className="hidden md:flex flex-col gap-2 max-h-[450px] overflow-y-auto no-scrollbar py-2">
            {sidebarActions.map((item, i) => (
              <button
                key={i}
                onClick={() => sendMessage(item.value)}
                className="flex items-center gap-3 bg-black/60 backdrop-blur-3xl border border-white/10 text-white/50 text-[10px] uppercase tracking-[0.2em] py-4 px-6 rounded-2xl hover:bg-blue-600 hover:text-white transition-all w-48 group shadow-2xl hover:border-blue-400/50"
              >
                <span className="text-blue-500 group-hover:text-white transition-colors">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Interface Window */}
          <div
            ref={chatWindowRef}
            className="w-full md:w-[420px] h-[75vh] md:h-[520px] bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative animate-in fade-in zoom-in duration-300"
          >
            {/* Neural Header */}
            <div className="p-5 md:p-6 border-b border-white/5 bg-white/5 backdrop-blur-2xl flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-lg shadow-blue-600/20 ring-1 ring-white/20">
                    <Cpu size={24} weight="duotone" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3.5px] border-[#050505] animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-widest flex items-center gap-2">
                    Ahsan’s AI Assistant. <Lightning size={12} weight="fill" className="text-yellow-400" />
                  </h3>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Project Consultation & Technical Support</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5 text-white/40"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Neural Feed */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-blue-900/10 z-10">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isBot ? "justify-start" : "justify-end"} animate-fade-in`}>
                  <div className="max-w-[90%] space-y-3">
                    <div className={`p-4 md:p-5 rounded-[2rem] text-[13px] md:text-[14px] leading-relaxed shadow-2xl relative group ${m.isBot
                      ? "bg-white/[0.03] text-gray-300 border border-white/10 rounded-tl-none backdrop-blur-xl"
                      : "bg-blue-600 text-white rounded-tr-none shadow-blue-900/40 font-medium"
                      }`}>
                      <div className="whitespace-pre-wrap">{m.isBot ? m.displayed : m.fullText}</div>
                    </div>

                    {/* Quick Response Chips */}
                    {m.isBot && !isTyping && m.options && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {m.options.map((opt: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => sendMessage(opt.value)}
                            className="text-[10px] font-black bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all uppercase tracking-widest text-white/50 hover:text-white active:scale-95"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-4 text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] px-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping [animation-delay:0.2s]"></div>
                  </div>
                  Thinking...
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input System */}
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
              className="p-5 md:p-7 bg-black/60 backdrop-blur-3xl border-t border-white/5 flex items-center gap-4 z-10"
            >
              <button
                type="button"
                onClick={startVoice}
                className={`p-4 rounded-2xl transition-all border border-white/5 flex items-center justify-center ${isListening
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110"
                  : "bg-white/5 text-gray-500 hover:text-blue-500 hover:bg-white/10"
                  }`}
              >
                {isListening ? <SpeakerSimpleHigh size={20} weight="fill" /> : <Microphone size={20} weight="bold" />}
              </button>

              <div className="flex-1 relative group">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Query Database..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/10 placeholder:uppercase placeholder:tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim()}
                className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 disabled:opacity-20 active:scale-90 transition-all hover:bg-blue-500 hover:shadow-blue-500/40"
              >
                <PaperPlaneTilt size={22} weight="fill" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Primary Activation Portal */}
      <div className="relative group">
        {/* Halo Glow */}
        <div className="absolute inset-[-12px] bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-700"></div>

        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all duration-500 relative z-10 border border-white/20 ${isOpen ? "bg-none bg-[#111] rotate-90" : ""
            }`}
        >
          {isOpen ? (
            <X size={28} weight="bold" />
          ) : (
            <div className="relative">
              <ChatCircle size={32} weight="fill" className="md:w-9 md:h-9" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .scrollbar-hide, .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(10px); } 
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
        }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Chatbot;