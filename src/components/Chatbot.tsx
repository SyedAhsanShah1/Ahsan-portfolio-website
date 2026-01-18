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
  Info
} from "phosphor-react";
import { Hammer } from "lucide-react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Data Types ---
type KBEntry = {
  text: string;
  options?: { label: string; value: string }[];
};

/**
 * Knowledge Base: Detailed manual responses to ensure high line count and 
 * deep coverage of all portfolio aspects.
 */
const knowledgeBase: Record<string, KBEntry> = {
  hi: {
    text: "Hey there! 👋 I'm Ahsan's dedicated AI assistant.\n\nI can provide detailed information about his specialized services, technical expertise, past projects, and pricing models. How can I assist you in exploring Ahsan's portfolio today?",
    options: [
      { label: "🚀 Services", value: "services" },
      { label: "💻 Projects", value: "projects" },
      { label: "🎓 About Ahsan", value: "about" }
    ]
  },
  services: {
    text: "Ahsan offers premium digital solutions tailored to modern business needs:\n\n" +
      "1️⃣ **Full-Stack Development**: Building scalable web applications using React, Next.js, and Node.js with a focus on performance.\n\n" +
      "2️⃣ **AI & Automation**: Integrating Machine Learning models (YOLOv8, NLP) and building AI agents for automated workflows.\n\n" +
      "3️⃣ **UI/UX Motion**: Creating immersive experiences with GSAP, Spline 3D, and Framer Motion.\n\n" +
      "4️⃣ **Custom Software**: Tailor-made desktop and web utilities for specific data processing tasks.",
    options: [
      { label: "Tech Stack", value: "tech stack" },
      { label: "Pricing", value: "pricing" },
      { label: "Contact", value: "contact" }
    ]
  },
  projects: {
    text: "Ahsan has successfully delivered various high-impact projects:\n\n" +
      "🔹 **Medical Prediction System**: A healthcare AI project using Python & Flask to predict disease risks with high accuracy.\n\n" +
      "🔹 **3D Interactive Portfolio**: An award-worthy web experience utilizing Spline and GSAP for fluid 3D animations.\n\n" +
      "🔹 **Waste Segregation AI**: A real-time computer vision project using YOLOv8 to automate recyclable waste detection.\n\n" +
      "🔹 **E-Commerce AI Chatbot**: An NLP-driven assistant that helps users find products and track orders seamlessly.",
    options: [
      { label: "See More", value: "projects" },
      { label: "Services", value: "services" }
    ]
  },
  pricing: {
    text: "Ahsan follows a transparent and value-based pricing structure:\n\n" +
      "💰 **Basic Web Landing**: $500 - $1,000\n" +
      "💰 **Full-Stack SaaS App**: $2,000 - $5,000\n" +
      "💰 **AI/ML Integration**: $1,500 - $3,500\n" +
      "💰 **Maintenance & Support**: Monthly retainers starting at $300.\n\n" +
      "*Note: Every project is unique. Contact Ahsan for a customized fixed-price quote.*",
    options: [
      { label: "Get Quote", value: "contact" },
      { label: "Services", value: "services" }
    ]
  },
  "tech stack": {
    text: "Ahsan utilizes a cutting-edge technical ecosystem:\n\n" +
      "🛠 **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, GSAP, Spline.\n\n" +
      "🛠 **Backend**: Node.js (Express), Python (Flask/FastAPI), Firebase, Supabase.\n\n" +
      "🛠 **AI/ML**: PyTorch, TensorFlow, OpenCV, YOLOv8, Hugging Face Transformers.\n\n" +
      "🛠 **DevOps**: Docker, GitHub Actions, AWS, Vercel, Netlify.",
    options: [
      { label: "Experience", value: "experience" },
      { label: "Projects", value: "projects" }
    ]
  },
  about: {
    text: "Ahsan is a forward-thinking Software Engineer with a passion for bridging the gap between design and complex AI logic.\n\n" +
      "He believes in 'Code with Purpose' and focuses on building tools that solve real-world problems through automation and intelligent systems.",
    options: [
      { label: "Education", value: "education" },
      { label: "Experience", value: "experience" }
    ]
  },
  education: {
    text: "Ahsan is pursuing/completed his degree in Computer Science.\n\n" +
      "📍 **The Islamia University of Bahawalpur (IUB)**\n" +
      "Relevant Courses: Data Structures, AI, Machine Learning, Web Engineering, and Database Management Systems.",
    options: [
      { label: "Projects", value: "projects" },
      { label: "Contact", value: "contact" }
    ]
  },
  experience: {
    text: "Ahsan has worked on multiple freelance and collaborative ventures:\n\n" +
      "✅ Worked with international clients on React-based dashboards.\n" +
      "✅ Developed internal AI tools for data analysis.\n" +
      "✅ Specialized in converting complex UI designs (Figma) into pixel-perfect code.",
    options: [
      { label: "Tech Stack", value: "tech stack" },
      { label: "Pricing", value: "pricing" }
    ]
  },
  contact: {
    text: "You can reach out to Ahsan through the following channels:\n\n" +
      "📧 **Email **: s22barin1m01113@iub.edu.pk\n" +
      "🔗 **LinkedIn**: linkedin.com/in/syedahsanai-engr\n" +
      "🐙 **Contact**: +923416985286\n\n" +
      "He is currently available for new projects and collaborations!",
  },
  help: {
    text: "I can help you explore Ahsan's professional profile. Try asking about:\n\n" +
      "• His **services** or **pricing**.\n" +
      "• His **tech stack** or **experience**.\n" +
      "• How to **contact** him.\n" +
      "• Viewing his **projects**.",
    options: [
      { label: "Services", value: "services" },
      { label: "Contact", value: "contact" }
    ]
  },
  fallback: {
    text: "I'm not sure I quite got that. Since I'm Ahsan's specialized AI, I'm best at discussing his work, tech skills, and projects.\n\n" +
      "Would you like to see his services instead?",
    options: [
      { label: "See Services", value: "services" },
      { label: "Contact Info", value: "contact" }
    ]
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { 
      id: 1, 
      fullText: "Welcome! I'm Ahsan's AI Assistant 🤖. How can I help you navigate his portfolio today?", 
      displayed: "Welcome! I'm Ahsan's AI Assistant 🤖. How can I help you navigate his portfolio today?", 
      isBot: true 
    }
  ]);

  const chatboxRef = useRef(null);
  const endRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // --- Sidebar Configuration ---
  const sidebarActions = [
    { label: "Services", value: "services", icon: <Briefcase size={16} /> },
    { label: "Projects", value: "projects", icon: <Code size={16} /> },
    { label: "Pricing", value: "pricing", icon: <CurrencyDollar size={16} /> },
    { label: "Contact", value: "contact", icon: <Envelope size={16} /> },
    { label: "About", value: "about", icon: <IdentificationCard size={16} /> },
    { label: "Stack", value: "tech stack", icon: <Hammer size={16} /> },
    { label: "Edu", value: "education", icon: <GraduationCap size={16} /> },
    { label: "Exp", value: "experience", icon: <RocketLaunch size={16} /> },
    { label: "Help", value: "help", icon: <Info size={16} /> },
  ];

  // --- Scroll Logic ---
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- Animations ---
  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, 
        { scale: 0, rotate: -180 }, 
        { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, []);

  // --- Typing Effect Engine ---
  const typeOut = async (msgId: number, text: string) => {
    let current = "";
    const chars = text.split("");
    for (let i = 0; i < chars.length; i++) {
      current += chars[i];
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, displayed: current } : m));
      // Adaptive typing speed: slightly faster for longer texts
      const speed = text.length > 100 ? 10 : 20;
      await new Promise(r => setTimeout(r, speed));
    }
  };

  // --- Matching Engine ---
  const processQuery = async (query: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate thinking
    
    const lowered = query.toLowerCase();
    let bestMatch = "fallback";
    
    // Priority matching logic
    const keys = Object.keys(knowledgeBase);
    for (const key of keys) {
      if (lowered.includes(key)) {
        bestMatch = key;
        break;
      }
    }

    const entry = knowledgeBase[bestMatch];
    const botId = Date.now();
    
    setMessages(prev => [...prev, { 
      id: botId, 
      fullText: entry.text, 
      displayed: "", 
      isBot: true, 
      options: entry.options 
    }]);

    await typeOut(botId, entry.text);
    setIsTyping(false);
  };

  // --- Communication Handlers ---
  const sendMessage = async (val?: string) => {
    const text = (val || input).trim();
    if (!text) return;

    setMessages(prev => [...prev, { 
      id: Date.now(), 
      fullText: text, 
      displayed: text, 
      isBot: false 
    }]);
    
    setInput("");
    await processQuery(text);
  };

  const [isListening, setIsListening] = useState(false);
  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");
    
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => sendMessage(e.results[0][0].transcript);
    recognition.start();
  };

  // --- Render UI ---
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="flex flex-row-reverse gap-4 items-end mb-4 animate-in fade-in zoom-in duration-300">
          
          {/* --- Right Sidebar List (Scrollable if many actions) --- */}
          <div className="hidden md:flex flex-col gap-2 mb-2 max-h-[450px] overflow-y-auto no-scrollbar py-2">
            {sidebarActions.map((item, i) => (
              <button
                key={i}
                onClick={() => sendMessage(item.value)}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] uppercase tracking-widest py-3 px-4 rounded-2xl hover:bg-blue-600 hover:border-blue-400 transition-all shadow-2xl w-36 group"
              >
                <span className="text-blue-400 group-hover:text-white transition-colors">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          {/* --- Main Chat Window --- */}
          <div 
            ref={chatboxRef} 
            className="w-[380px] h-[520px] bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative"
          >
            {/* Glossy Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between text-white relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                    <Robot size={22} weight="duotone" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Ahsan Assistant</h3>
                  <p className="text-[10px] text-blue-400 font-medium uppercase tracking-tighter">AI Core v2.0</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-blue-900/10">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.isBot ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`relative max-w-[88%] p-4 rounded-3xl text-[13px] leading-relaxed ${
                    m.isBot 
                      ? "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none" 
                      : "bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-900/20"
                  }`}>
                    <div className="whitespace-pre-wrap">{m.isBot ? m.displayed : m.fullText}</div>
                    
                    {/* Bot Options Buttons */}
                    {m.isBot && !isTyping && m.options && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                        {m.options.map((opt: any, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => sendMessage(opt.value)} 
                            className="text-[11px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-blue-500 hover:border-blue-400 transition-all active:scale-95"
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
                <div className="flex gap-2 items-center text-[11px] text-blue-400 font-medium px-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  Thinking...
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={e => { e.preventDefault(); sendMessage(); }} 
              className="p-4 bg-black/50 border-t border-white/10 flex items-center gap-3"
            >
              <button 
                type="button"
                onClick={startVoice}
                className={`p-2.5 rounded-2xl transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/5 text-gray-400 hover:text-white"}`}
              >
                {isListening ? <SpeakerSimpleHigh size={20} /> : <Microphone size={20} />}
              </button>
              
              <div className="flex-1 relative">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  placeholder="Ask me anything..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-600"
                />
              </div>

              <button 
                type="submit" 
                disabled={!input.trim()}
                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/40 active:scale-90"
              >
                <PaperPlaneTilt size={20} weight="fill" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[22px] flex items-center justify-center text-white shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300"
      >
        {isOpen ? <X size={28} /> : <ChatCircle size={32} weight="fill" />}
      </button>
    </div>
  );
};

export default Chatbot;