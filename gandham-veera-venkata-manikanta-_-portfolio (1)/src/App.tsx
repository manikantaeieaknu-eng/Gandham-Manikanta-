import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AboutSection } from "./components/AboutSection";
import { DynamicBackground, BackgroundMode } from "./components/DynamicBackground";
import { PORTFOLIO_DATA } from "./data/portfolioData";
import { generateAndDownloadResumePDF } from "./utils/generateResumePDF";
import { ArrowUpRight, Download, Cpu, Sparkles } from "lucide-react";
import profilePhoto from "./assets/images/manikanta_profile_1791300518935.jpg";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "about">("home");
  const [bgMode, setBgMode] = useState<BackgroundMode>("circuits");

  return (
    <div className="relative min-h-screen w-full bg-transparent flex flex-col justify-between overflow-hidden font-sans text-white select-none">
      {/* Dynamic Background with theme switcher */}
      <DynamicBackground currentMode={bgMode} onModeChange={setBgMode} />

      {/* Top Header */}
      <header className="w-full pt-6 sm:pt-8 px-6 sm:px-12 flex justify-between items-center z-20 pointer-events-auto">
        <motion.div
          className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0">
            <img src={profilePhoto} alt="Manikanta" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-fredoka text-xs sm:text-sm font-bold text-amber-200 tracking-wide leading-tight">
              {PORTFOLIO_DATA.personal.shortName}
            </span>
            <span className="font-fredoka text-[10px] text-amber-400/90 leading-tight uppercase tracking-wider font-semibold">
              Electronics and Instrumentation
            </span>
          </div>
        </motion.div>
      </header>

      {/* Center Hero Page - Clean & Aesthetic Showcase */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 pointer-events-none my-auto py-6">
        <motion.div
          className="max-w-3xl w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Photo Avatar Card */}
          <motion.div
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.5)] overflow-hidden mb-5 pointer-events-auto cursor-pointer"
            onClick={() => setCurrentView("about")}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3 }}
            title="View Manikanta's Portfolio"
          >
            <img
              src={profilePhoto}
              alt="Gandham Veera Venkata Manikanta"
              className="w-full h-full object-cover"
            />
            {/* Ambient golden halo */}
            <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-pulse pointer-events-none" />
          </motion.div>

          {/* Specialization Badge */}
          <motion.div
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/60 backdrop-blur-md mb-4 shadow-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Cpu size={16} className="text-amber-400 animate-spin" />
            <span className="font-fredoka text-xs sm:text-sm text-amber-200 tracking-wider font-extrabold uppercase">
              Specialization: Electronics and Instrumentation
            </span>
          </motion.div>

          {/* Full Name Heading */}
          <motion.h1
            className="font-fredoka font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.25 }}
          >
            {PORTFOLIO_DATA.personal.fullName}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-patrick text-2xl sm:text-3xl md:text-4xl text-amber-200/90 mt-1 font-normal max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.35 }}
          >
            Electronics and Instrumentation
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content containing the signature side-by-side CTAs */}
      <main id="hero-main" className="pb-12 md:pb-16 px-6 md:px-12 z-20 select-none flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pointer-events-auto">
          {/* Get Started Button */}
          <motion.button
            id="cta-get-started"
            onClick={() => setCurrentView("about")}
            className="group px-8 py-4 rounded-full bg-[#D2B48C] text-[#000000] font-medium tracking-wide flex items-center gap-2 border border-[#D2B48C] shadow-lg shadow-black/40 hover:shadow-[#D2B48C]/30 hover:bg-[#dfc49e] transition-all duration-500 cursor-pointer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="uppercase text-xs font-semibold tracking-wider font-fredoka">
              Get Started
            </span>
            <ArrowUpRight size={16} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>

          {/* Download Resume Button */}
          <motion.button
            id="cta-download-resume"
            onClick={generateAndDownloadResumePDF}
            className="group px-8 py-4 rounded-full bg-[#000000]/65 backdrop-blur-md text-[#D2B48C] font-medium tracking-wide flex items-center gap-2 border border-[#D2B48C]/50 hover:border-[#D2B48C] hover:bg-[#D2B48C] hover:text-[#000000] shadow-lg shadow-black/40 transition-all duration-500 cursor-pointer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="uppercase text-xs font-semibold tracking-wider font-fredoka">
              Download Resume PDF
            </span>
            <Download size={15} className="text-[#D2B48C] group-hover:text-[#000000] group-hover:translate-y-0.5 transition-all duration-300" />
          </motion.button>
        </div>
      </main>

      {/* About Section Overlay Rendered via AnimatePresence */}
      <AnimatePresence>
        {currentView === "about" && (
          <AboutSection onBack={() => setCurrentView("home")} />
        )}
      </AnimatePresence>
    </div>
  );
}
