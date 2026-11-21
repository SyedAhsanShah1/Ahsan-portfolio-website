import { useEffect, useRef, useState } from 'react';
import {
  Brain,
  Eye,
  Cpu,
  Code,
  Globe,
  Terminal,
  Flask,
  Database,
  FileText,
  Sparkle,
} from 'phosphor-react';

const SKILLS = [
  { icon: Code, name: 'Python', level: 95, group: 'Programming' },
  { icon: Brain, name: 'PyTorch', level: 88, group: 'AI / ML' },
  { icon: Brain, name: 'TensorFlow', level: 85, group: 'AI / ML' },
  { icon: Eye, name: 'OpenCV / Computer Vision', level: 85, group: 'AI / ML' },
  { icon: Cpu, name: 'Ansys Lumerical / FDTD', level: 82, group: 'Research tools' },
  { icon: Terminal, name: 'MATLAB', level: 85, group: 'Research tools' },
  { icon: Database, name: 'SQL', level: 85, group: 'Programming' },
  { icon: FileText, name: 'LaTeX', level: 90, group: 'Research tools' },
  { icon: Flask, name: 'Flask / REST APIs', level: 85, group: 'Programming' },
  { icon: Globe, name: 'React', level: 80, group: 'Programming' },
];

const GROUPS = ['AI / ML', 'Research tools', 'Programming'];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  /* Skill bars fill with a CSS width transition once scrolled into view.
     If the observer never fires, the bars simply show at full width from
     the start (they are never hidden by JS). */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBarsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    const safety = window.setTimeout(() => setBarsVisible(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {GROUPS.map((group) => (
        <div key={group} className="mb-14">
          <h3 data-reveal className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-gradient-primary rounded-full" />
            {group}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SKILLS.filter((s) => s.group === group).map((skill, i) => (
              <div
                key={skill.name}
                data-reveal
                data-delay={(i * 0.08).toFixed(2)}
                className="glass p-6 cursor-pointer rounded-xl hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <skill.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h4 className="text-base font-medium text-foreground">{skill.name}</h4>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-primary h-2 rounded-full transition-[width] duration-1000 ease-out"
                      style={{ width: barsVisible ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                  <span className="text-primary font-medium">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p data-reveal className="text-center text-muted-foreground text-sm mt-4 flex items-center justify-center gap-2">
        <Sparkle size={16} className="text-accent" />
        Also: IEEE Student Branch leadership · Deep Embed Lab intern (Oct 2023 - Nov 2024)
      </p>
    </div>
  );
};

export default SkillsSection;
