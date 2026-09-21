import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  BookOpen, 
  Award, 
  ArrowRight,
  Compass,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface WelcomeAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "hi";
  onExploreSection?: (tabId: string) => void;
}

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keyboard shortcut (Escape to exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Subtle constellation particle background
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(width < 768 ? 25 : 45, 50);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ["#F59E0B", "#38BDF8", "#34D399"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle connective lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const PILLARS = [
    {
      step: "01",
      title: "Diagnose",
      subtitle: "Competency Mapping",
      detail: "Benchmarked evaluations across 50+ MoSPI domains",
      icon: Compass,
      color: "text-amber-400",
      border: "border-amber-500/30",
      accent: "from-amber-500/15 to-transparent",
    },
    {
      step: "02",
      title: "Upskill",
      subtitle: "iGOT Karmayogi Sync",
      detail: "Direct pathway to 6,500+ curated civil service modules",
      icon: BookOpen,
      color: "text-sky-400",
      border: "border-sky-500/30",
      accent: "from-sky-500/15 to-transparent",
    },
    {
      step: "03",
      title: "Certify",
      subtitle: "NSSTA Credentials",
      detail: "Official recognition for postings and cadre progression",
      icon: Award,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      accent: "from-emerald-500/15 to-transparent",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="welcome-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020712]/90 backdrop-blur-md px-4 py-6 select-none overflow-y-auto"
        >
          {/* Subtle Canvas Particles */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-30"
          />

          {/* Radial Ambient Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Main Professional Introduction Card */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative max-w-xl w-full mx-auto my-auto bg-gradient-to-b from-[#08172D] via-[#051124] to-[#030A17] border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/40 text-center z-10"
          >
            {/* Top Close Icon Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Emblem & Identity */}
            <div className="flex flex-col items-center mb-6">
              {/* Sleek Golden Chakra Emblem */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-blue-950/80 to-slate-900 border border-amber-400/40 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/10">
                <svg
                  className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <circle cx="50" cy="50" r="4" fill="#040D1B" />
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 38 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 38 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>

              {/* Title & Official Subtitle */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  SkillSetu
                </h1>
                <span className="text-lg font-serif text-amber-300" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                  स्किलसेतु
                </span>
              </div>

              {/* Tricolor Stripe */}
              <div className="h-0.5 w-16 rounded-full flex overflow-hidden my-2">
                <div className="h-full w-1/3 bg-[#FF9933]"></div>
                <div className="h-full w-1/3 bg-white"></div>
                <div className="h-full w-1/3 bg-[#138808]"></div>
              </div>

              <div className="text-[11px] font-semibold tracking-wider text-amber-300/90 uppercase">
                MoSPI • NSSTA • Mission Karmayogi
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                National statistical competency diagnostics & personalized learning architecture.
              </p>
            </div>

            {/* 3 Streamlined Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.step}
                  className={`p-3.5 rounded-2xl border ${pillar.border} bg-gradient-to-b ${pillar.accent} bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {pillar.step}
                      </span>
                      <pillar.icon className={`w-4 h-4 ${pillar.color}`} />
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {pillar.title}
                    </div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${pillar.color}`}>
                      {pillar.subtitle}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug mt-2">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Metrics Chips */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-6 text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 font-medium">
                <strong className="text-amber-400 font-bold">50+</strong> Competency Domains
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 font-medium">
                <strong className="text-sky-400 font-bold">6,500+</strong> iGOT Courses
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 font-medium">
                <strong className="text-emerald-400 font-bold">ISS • SSS</strong> Official Cadres
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-amber-200"
            >
              <span className="flex items-center gap-2 font-bold tracking-wide">
                <span>{language === "hi" ? "साइन इन करें" : "Proceed to Sign In"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
