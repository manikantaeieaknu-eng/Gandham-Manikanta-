import React, { useEffect, useRef, useState } from "react";
import engineeringBg from "../assets/images/engineering_bg_1791300546586.jpg";
import { Sparkles, Cpu, Waves, Grid } from "lucide-react";

export type BackgroundMode = "circuits" | "artwork" | "waves" | "grid";

interface DynamicBackgroundProps {
  currentMode: BackgroundMode;
  onModeChange: (mode: BackgroundMode) => void;
}

export function DynamicBackground({ currentMode, onModeChange }: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas animation loop for interactive modes
  useEffect(() => {
    if (currentMode === "artwork") return;

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

    // Nodes and traces for circuits/particles
    const nodeCount = Math.floor(Math.min(width, 1400) / 24);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Logic pulses moving along lines
    const pulses: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      if (currentMode === "circuits") {
        // Deep warm tech dark slate background
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          100,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        grad.addColorStop(0, "#1c1815");
        grad.addColorStop(0.6, "#12100e");
        grad.addColorStop(1, "#0a0908");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle PCB grid dots
        ctx.fillStyle = "rgba(210, 180, 140, 0.08)";
        const gridSpacing = 40;
        for (let x = 0; x < width; x += gridSpacing) {
          for (let y = 0; y < height; y += gridSpacing) {
            ctx.fillRect(x, y, 1.5, 1.5);
          }
        }

        // Oscilloscope sine/EMG signal trace at bottom/mid
        ctx.beginPath();
        ctx.strokeStyle = "rgba(224, 159, 62, 0.28)";
        ctx.lineWidth = 1.8;
        const waveY = height * 0.78;
        for (let x = 0; x < width; x += 4) {
          // Combination of carrier sine, simulated EMG spikes and low freq damping
          const rawSpike = Math.sin(x * 0.04 + step * 4) * Math.cos(x * 0.02);
          const emgBurst = Math.sin(x * 0.09 - step * 6) > 0.7 ? Math.sin(x * 0.3) * 18 : 0;
          const y = waveY + Math.sin(x * 0.01 + step) * 25 + rawSpike * 8 + emgBurst;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Update & draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Mouse attraction
          const dx = mouseRef.current.x - n.x;
          const dy = mouseRef.current.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            n.x += (dx / dist) * 0.8;
            n.y += (dy / dist) * 0.8;
          }

          // Connect nearby nodes with circuit trace lines (90deg or angled)
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const d = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (d < 130) {
              const alpha = (1 - d / 130) * 0.25;
              ctx.strokeStyle = `rgba(217, 164, 89, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Spawn pulses occasionally
              if (Math.random() < 0.0015 && pulses.length < 15) {
                pulses.push({
                  fromIdx: i,
                  toIdx: j,
                  progress: 0,
                  speed: 0.015 + Math.random() * 0.02,
                  color: "#f59e0b",
                });
              }
            }
          }

          // Node glow
          const glow = Math.sin(step * 2 + n.pulse) * 0.3 + 0.7;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${glow * 0.7})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#d97706";
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Render traveling logic pulses
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulses.splice(p, 1);
            continue;
          }
          const p1 = nodes[pulse.fromIdx];
          const p2 = nodes[pulse.toIdx];
          if (!p1 || !p2) {
            pulses.splice(p, 1);
            continue;
          }
          const px = p1.x + (p2.x - p1.x) * pulse.progress;
          const py = p1.y + (p2.y - p1.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#f59e0b";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else if (currentMode === "waves") {
        // Multi-frequency Harmonic Signal Waves (Biological & Process Signal analysis)
        ctx.fillStyle = "#0c1017";
        ctx.fillRect(0, 0, width, height);

        const colors = [
          "rgba(212, 175, 55, 0.4)",
          "rgba(59, 130, 246, 0.35)",
          "rgba(16, 185, 129, 0.3)",
        ];

        colors.forEach((color, idx) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2.2;
          const base = height * (0.45 + idx * 0.12);
          const freq = 0.005 * (idx + 1);
          const amp = 40 + idx * 15;

          for (let x = 0; x < width; x += 3) {
            const y = base + Math.sin(x * freq + step * (1 + idx * 0.4)) * amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
      } else if (currentMode === "grid") {
        // Warm technical drafting paper grid
        ctx.fillStyle = "#171412";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(210, 180, 140, 0.09)";
        ctx.lineWidth = 1;
        const cell = 50;
        for (let x = 0; x < width; x += cell) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += cell) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentMode]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Artwork mode display */}
      {currentMode === "artwork" ? (
        <div className="relative w-full h-full">
          <img
            src={engineeringBg}
            alt="Engineering Background"
            className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full block" />
      )}

      {/* Floating BG switcher badge at top-right for quick user control */}
      <div className="pointer-events-auto absolute top-5 right-5 z-30">
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-amber-300/90 hover:text-amber-200 border border-amber-500/30 backdrop-blur-md shadow-lg text-xs font-fredoka transition-all cursor-pointer"
            title="Switch Background Theme"
          >
            <Sparkles size={14} className="animate-spin text-amber-400" />
            <span className="tracking-wide">Theme: {currentMode.toUpperCase()}</span>
          </button>

          {showPicker && (
            <div className="absolute right-0 mt-2 p-2 w-48 rounded-2xl bg-neutral-900/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex flex-col gap-1 z-40 text-left font-fredoka">
              <span className="text-[11px] font-semibold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                Select Background
              </span>
              <button
                onClick={() => {
                  onModeChange("circuits");
                  setShowPicker(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                  currentMode === "circuits"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-200 hover:bg-white/10"
                }`}
              >
                <Cpu size={14} />
                <span>Circuits & Signals (Default)</span>
              </button>

              <button
                onClick={() => {
                  onModeChange("artwork");
                  setShowPicker(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                  currentMode === "artwork"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-200 hover:bg-white/10"
                }`}
              >
                <Sparkles size={14} />
                <span>Cinematic Gold Studio</span>
              </button>

              <button
                onClick={() => {
                  onModeChange("waves");
                  setShowPicker(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                  currentMode === "waves"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-200 hover:bg-white/10"
                }`}
              >
                <Waves size={14} />
                <span>Bio-Signal Waveforms</span>
              </button>

              <button
                onClick={() => {
                  onModeChange("grid");
                  setShowPicker(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                  currentMode === "grid"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-200 hover:bg-white/10"
                }`}
              >
                <Grid size={14} />
                <span>Technical Drafting Grid</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
