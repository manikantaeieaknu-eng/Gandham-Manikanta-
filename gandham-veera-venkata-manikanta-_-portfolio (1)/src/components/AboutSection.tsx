import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Award,
  Mail,
  MapPin,
  Send,
  Download,
  CheckCircle2,
  Cpu,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Briefcase,
  FileText,
  UserCheck,
  Linkedin,
  Maximize2,
  X
} from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { generateAndDownloadResumePDF } from "../utils/generateResumePDF";
import { FinalYearProjectSection } from "./FinalYearProjectSection";
import profilePhoto from "../assets/images/manikanta_profile_1791300518935.jpg";

interface AboutSectionProps {
  onBack: () => void;
}

export function AboutSection({ onBack }: AboutSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in all required fields!");
      return;
    }

    setFormError("");
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#D2B48C", "#B8860B", "#111111", "#FFD700"],
      });
    }, 800);
  };

  return (
    <motion.div
      id="about-section-container"
      className="absolute inset-0 w-full min-h-screen bg-[#F4F2ED] text-[#111111] font-patrick flex flex-col justify-between overflow-y-auto z-40 select-text p-4 sm:p-6 md:p-12"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle fine paper texture feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* Top Header Bar */}
      <div className="w-full flex justify-between items-center z-10 relative">
        <motion.button
          id="btn-about-back"
          onClick={onBack}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 bg-[#FAF9F6] text-neutral-700 hover:text-[#111111] hover:border-neutral-900 transition-all duration-300 shadow-sm cursor-pointer"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          <span className="font-fredoka text-xs tracking-wider uppercase font-semibold">Back to Home</span>
        </motion.button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* LinkedIn Button */}
          <motion.a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0077b5] text-white font-fredoka text-xs font-bold shadow-[2px_2px_0px_0px_#111111] hover:bg-[#005f93] transition-all cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            title="LinkedIn Profile"
          >
            <Linkedin size={14} />
            <span className="hidden sm:inline">LinkedIn</span>
          </motion.a>

          {/* Quick action: Download Resume */}
          <motion.button
            onClick={generateAndDownloadResumePDF}
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#D2B48C] hover:bg-[#c4a47a] text-neutral-900 border border-neutral-900 font-fredoka text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#111111] hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={14} />
            <span>Download Resume</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center py-8 sm:py-12 px-2 sm:px-4 relative max-w-5xl mx-auto w-full z-10">
        {/* Title Block Wrapper with Curly Arrow and Paper Airplane */}
        <div className="relative w-full mb-8 sm:mb-10 flex justify-center items-center">
          {/* Curly Arrow Doodle */}
          <motion.div
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 text-[#111111] select-none pointer-events-none hidden xs:block"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 20 25 C 45 5, 75 10, 55 45 C 45 60, 25 50, 40 75" />
              <path d="M 28 68 L 40 75 L 42 62" />
            </svg>
          </motion.div>

          {/* Heading - "About me" */}
          <motion.h1
            id="about-me-heading"
            className="font-fredoka font-bold text-5xl sm:text-6xl md:text-8xl text-center text-[#111111] py-2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            About me
          </motion.h1>

          {/* Paper Airplane Doodle */}
          <motion.div
            className="absolute -right-4 md:-right-20 -top-8 w-24 h-16 md:w-32 md:h-20 text-[#111111] select-none pointer-events-none hidden xs:block"
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible">
              <path d="M 10 50 C 30 50, 50 35, 70 38 C 85 40, 90 28, 100 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              <g transform="translate(94, 8) rotate(-5)">
                <path d="M 0 10 L 25 0 L 17 22 L 12 16 L 8 19 L 9 13 Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 17 22 L 12 16" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <path d="M 25 0 L 12 16" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Bio, Profile Photo & Education Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative select-text mt-2">
          {/* Bio Text Column (col: 7 on md+) */}
          <div className="md:col-span-7 flex flex-col gap-5 text-left relative">
            {/* Animated name greeting */}
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl text-neutral-800 leading-normal font-normal tracking-wide"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              Hey! this is{" "}
              <span className="inline-block relative">
                {PORTFOLIO_DATA.personal.calloutName.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block font-fredoka font-black text-amber-700 hover:text-neutral-950 transition-colors duration-300"
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 1.0,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.08,
                      ease: "easeInOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {/* Hand-drawn squiggle underline */}
                <span className="absolute left-0 -bottom-1 w-full h-1 text-amber-500 opacity-80 select-none pointer-events-none">
                  <svg viewBox="0 0 100 10" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M 2 5 Q 25 2, 50 5 T 98 5" />
                  </svg>
                </span>
              </span>
              ,
            </motion.p>

            {/* Full Name & Title Tag - Process Control as MAIN */}
            <div className="flex flex-col gap-1">
              <span className="font-fredoka font-extrabold text-2xl sm:text-3xl text-neutral-900">
                {PORTFOLIO_DATA.personal.fullName}
              </span>
              <span className="font-fredoka text-base sm:text-lg font-bold text-amber-800 flex items-center gap-2">
                <Cpu size={18} className="text-amber-600 flex-shrink-0" />
                <span>Specialization: Electronics and Instrumentation</span>
              </span>
              <span className="font-patrick text-neutral-600 font-bold text-base">
                Reg No: {PORTFOLIO_DATA.personal.regNo} • {PORTFOLIO_DATA.personal.university}
              </span>
            </div>

            {/* Quick meta badges */}
            <div className="flex flex-wrap gap-2.5 my-1">
              <span className="px-3 py-1 bg-white border-2 border-neutral-900 rounded-full font-fredoka text-xs font-semibold shadow-[2px_2px_0px_0px_#111111] flex items-center gap-1.5">
                <MapPin size={13} className="text-red-500" />
                {PORTFOLIO_DATA.personal.place}, AP
              </span>
              <span className="px-3 py-1 bg-[#FCF8EC] border-2 border-neutral-900 rounded-full font-fredoka text-xs font-semibold shadow-[2px_2px_0px_0px_#111111] flex items-center gap-1.5">
                <Award size={13} className="text-amber-600" />
                CGPA 9.05 (Distinction)
              </span>
              <span className="px-3 py-1 bg-white border-2 border-neutral-900 rounded-full font-fredoka text-xs font-semibold shadow-[2px_2px_0px_0px_#111111] flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                IIPE Vizag SIP '25 (Merit)
              </span>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-50 hover:bg-blue-100 border-2 border-neutral-900 rounded-full font-fredoka text-xs font-bold text-blue-800 shadow-[2px_2px_0px_0px_#111111] flex items-center gap-1.5 cursor-pointer"
              >
                <Linkedin size={13} />
                <span>LinkedIn Connected</span>
              </a>
            </div>

            {/* Main bio description details */}
            <motion.p
              className="text-lg md:text-xl text-neutral-700 leading-relaxed font-normal tracking-wide text-justify"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
            >
              {PORTFOLIO_DATA.personal.bioDescription}
            </motion.p>
          </div>

          {/* Profile Photo & Education Column (col: 5 on md+) */}
          <div className="md:col-span-5 flex flex-col gap-6 items-center">
            {/* Neo-brutalist / Polaroid Photo Card with Click-to-Zoom */}
            <motion.div
              onClick={() => setShowPhotoModal(true)}
              className="w-full max-w-sm p-4 bg-white border-2 border-slate-900 rounded-[24px] shadow-[6px_6px_0px_0px_#111111] rotate-[1deg] hover:rotate-0 transition-all duration-300 relative group overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Tape sticker decorator */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/60 border-x-2 border-dashed border-amber-900/30 transform -rotate-2 pointer-events-none z-20" />

              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-neutral-900 bg-neutral-100 relative">
                <img
                  src={profilePhoto}
                  alt={PORTFOLIO_DATA.personal.fullName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={16} />
                </div>
                <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/75 backdrop-blur-sm border border-white/20 rounded-lg text-white font-fredoka text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>AKNU '26</span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <h4 className="font-fredoka font-bold text-lg text-neutral-900">
                  {PORTFOLIO_DATA.personal.fullName}
                </h4>
                <p className="font-patrick text-amber-800 text-sm font-bold">
                  Electronics and Instrumentation • Reg: {PORTFOLIO_DATA.personal.regNo}
                </p>
                <span className="text-[11px] font-fredoka text-neutral-400 mt-1 inline-block">
                  Click to view full photo
                </span>
              </div>
            </motion.div>

            {/* Lined spiral binder notebook page card for Education */}
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <div className="p-6 md:p-8 border-2 border-slate-900 rounded-[24px] bg-[#FCF8EC] text-slate-900 shadow-[6px_6px_0px_0px_#111111] rotate-[-1deg] hover:rotate-0 transition-all duration-300 font-patrick relative overflow-hidden flex flex-col gap-4 text-left w-full max-w-sm">
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 opacity-60 pointer-events-none select-none" />
                <div className="absolute top-2 left-10 right-10 flex justify-between px-4 opacity-75 select-none pointer-events-none">
                  {[1, 2, 3, 4, 5].map((spiral) => (
                    <div key={spiral} className="w-4 h-6 border-2 border-slate-900 rounded-full bg-slate-50 relative -mt-5">
                      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-900" />
                    </div>
                  ))}
                </div>

                <div className="pl-6 pt-2">
                  <h3 className="font-fredoka font-black text-2xl text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <GraduationCap size={22} className="text-amber-600" />
                    <span>Education</span>
                  </h3>
                  <div className="w-full h-[2px] border-b-2 border-dashed border-slate-900/15 my-2" />

                  <div className="flex flex-col gap-4 mt-3">
                    {/* B.Tech */}
                    <div className="flex flex-col">
                      <span className="font-fredoka text-xl font-black text-amber-700 leading-none">
                        B.Tech (EIE)
                      </span>
                      <span className="font-patrick text-base font-bold text-slate-700 mt-1 leading-tight">
                        AKNU College of Engineering
                      </span>
                      <span className="font-patrick text-sm text-slate-500">Rajamahendravaram • 2022 - 2026</span>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="px-2.5 py-0.5 bg-amber-200 border-2 border-slate-900 rounded-md font-fredoka font-black text-xs text-slate-900 shadow-[1px_1px_0px_0px_#111111]">
                          CGPA 9.05
                        </div>
                        <span className="text-xs text-amber-800 font-bold font-fredoka">Distinction (90%)</span>
                      </div>
                    </div>

                    {/* Intermediate */}
                    <div className="flex flex-col border-t border-dashed border-slate-900/15 pt-2.5">
                      <span className="font-fredoka text-sm font-black text-slate-800 uppercase leading-none">
                        Intermediate
                      </span>
                      <span className="font-patrick text-base font-bold text-slate-700 mt-0.5">
                        Ideal Junior College, Kakinada
                      </span>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-fredoka mt-0.5">
                        <span>2020 - 2022</span>
                        <span className="font-bold text-slate-800">Marks: 750</span>
                      </div>
                    </div>

                    {/* S.S.C */}
                    <div className="flex flex-col border-t border-dashed border-slate-900/15 pt-2.5">
                      <span className="font-fredoka text-sm font-black text-slate-800 uppercase leading-none">
                        S.S.C
                      </span>
                      <span className="font-patrick text-base font-bold text-slate-700 mt-0.5">
                        Z.P. High School, Kandarada
                      </span>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-fredoka mt-0.5">
                        <span>2020</span>
                        <span className="font-bold text-slate-800">Marks: 562</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hand-Drawn Divider */}
      <div className="w-full max-w-2xl mx-auto my-8 md:my-12 flex justify-center py-2 opacity-50 z-10 relative">
        <svg viewBox="0 0 400 20" className="w-full h-8 text-[#111111]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 10 10 Q 30 5, 50 10 T 90 10 T 130 10 T 170 10 T 210 10 T 250 10 T 290 10 T 330 10 T 370 10 T 390 10" />
        </svg>
      </div>

      {/* CORE HIGHLIGHT: FINAL YEAR PROJECT WITH INTERACTIVE RESULT BUTTONS & CONFERENCES */}
      <div id="final-year-project" className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pb-12 px-2 sm:px-4 relative z-10">
        <div className="text-center mb-6">
          <span className="font-fredoka text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-neutral-900 shadow-[1px_1px_0px_0px_#111111]">
            Flagship Engineering Capstone
          </span>
          <h2 className="font-fredoka font-bold text-4xl sm:text-5xl md:text-6xl text-neutral-900 mt-2">
            Final Year Project & Experimental Results
          </h2>
          <p className="font-patrick text-neutral-600 text-xl max-w-2xl mx-auto mt-1">
            "Modelling and Control of a Single Tank Level System" — Real-time performance evaluation of advanced and conventional control algorithms.
          </p>
        </div>

        {/* Embedded Interactive Final Year Project Component */}
        <FinalYearProjectSection />
      </div>

      {/* Hand-Drawn Divider */}
      <div className="w-full max-w-2xl mx-auto my-8 md:my-12 flex justify-center py-2 opacity-50 z-10 relative">
        <svg viewBox="0 0 400 20" className="w-full h-8 text-[#111111]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 10 10 Q 30 5, 50 10 T 90 10 T 130 10 T 170 10 T 210 10 T 250 10 T 290 10 T 330 10 T 370 10 T 390 10" />
        </svg>
      </div>

      {/* Internship Experience Section */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pb-12 px-2 sm:px-4 relative z-10">
        <div className="relative w-full mb-8 flex flex-col items-center justify-center">
          <h2 className="font-fredoka font-bold text-4xl sm:text-5xl text-center text-[#111111] py-2 relative flex items-center gap-3">
            <Briefcase className="text-amber-700" size={36} />
            <span>Internship Experience</span>
          </h2>
          <p className="font-patrick text-neutral-600 text-center text-xl sm:text-2xl mt-1 max-w-2xl">
            Process control and biomedical research at premier national institutes.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.internships.map((intern, idx) => (
            <motion.div
              key={idx}
              className="p-6 sm:p-8 border-2 border-neutral-900 rounded-[22px] bg-white text-neutral-900 shadow-[6px_6px_0px_0px_#111111] flex flex-col justify-between hover:translate-y-[-2px] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 bg-amber-100 border border-neutral-900 rounded-full font-fredoka text-xs font-bold text-amber-900 shadow-[1px_1px_0px_0px_#111111]">
                    {intern.meritBadge || "Internship"}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-600 font-fredoka text-xs font-semibold">
                    <Calendar size={14} />
                    <span>{intern.period}</span>
                  </div>
                </div>

                <h3 className="font-fredoka font-bold text-2xl text-neutral-900 leading-tight mb-2">
                  {intern.title}
                </h3>
                <h4 className="font-fredoka text-md font-semibold text-amber-800 mb-4">
                  {intern.organization}
                </h4>

                <ul className="list-disc pl-5 flex flex-col gap-2 text-neutral-700 text-base sm:text-lg leading-relaxed text-left">
                  {intern.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-neutral-200 flex flex-wrap gap-2">
                {intern.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-0.5 border border-neutral-900 rounded-md bg-[#FAF9F6] font-fredoka text-xs font-semibold text-neutral-800 shadow-[1px_1px_0px_0px_#111111]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hand-Drawn Divider */}
      <div className="w-full max-w-2xl mx-auto my-8 md:my-12 flex justify-center py-2 opacity-50 z-10 relative">
        <svg viewBox="0 0 400 20" className="w-full h-8 text-[#111111]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 10 10 Q 30 5, 50 10 T 90 10 T 130 10 T 170 10 T 210 10 T 250 10 T 290 10 T 330 10 T 370 10 T 390 10" />
        </svg>
      </div>

      {/* Additional Projects Showcase (Relay Feedback, Spherical Tank, EMG) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pb-12 px-2 sm:px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-fredoka font-bold text-4xl sm:text-5xl text-neutral-900 flex items-center justify-center gap-3">
            <Layers className="text-amber-700" size={36} />
            <span>Other Instrumentation Projects</span>
          </h2>
          <p className="font-patrick text-neutral-600 text-xl max-w-2xl mx-auto mt-1">
            Non-linear process control, adaptive relay tuning, and biological signal processing.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.projects.filter(p => p.id !== "single-tank").map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="p-6 bg-white border-2 border-neutral-900 rounded-[22px] shadow-[5px_5px_0px_0px_#111111] flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div>
                <span className="font-fredoka text-[11px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                  {proj.domain}
                </span>
                <h4 className="font-fredoka font-bold text-xl text-neutral-900 mb-2 leading-snug">
                  {proj.title}
                </h4>
                <p className="font-patrick text-neutral-700 text-base leading-relaxed mb-4">
                  {proj.summary}
                </p>
              </div>

              <div>
                <div className="text-xs font-fredoka text-neutral-500 mb-2 flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{proj.period}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#FAF9F6] border border-neutral-900 rounded font-fredoka text-[11px] font-semibold text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Skills & Certifications */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pb-12 px-2 sm:px-4 relative z-10">
        <h2 className="font-fredoka font-bold text-4xl sm:text-5xl text-neutral-900 mb-8 flex items-center gap-3">
          <Cpu className="text-amber-700" size={36} />
          <span>Core Competencies & Tools</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Process Control Tools */}
          <div className="p-6 border-2 border-neutral-900 rounded-[20px] bg-white shadow-[5px_5px_0px_0px_#111111]">
            <div className="border-b-2 border-dashed border-neutral-300 pb-3 mb-4">
              <span className="font-fredoka font-bold text-lg uppercase tracking-wide text-neutral-800">
                Process Control Methods
              </span>
            </div>
            <div className="flex flex-col gap-3.5">
              {PORTFOLIO_DATA.technicalSkills.processControl.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm font-fredoka font-semibold">
                    <span>{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 bg-neutral-50 text-neutral-600">
                      {item.badge}
                    </span>
                  </div>
                  <div className="w-full h-2 border border-neutral-900 rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: item.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software & Simulation */}
          <div className="p-6 border-2 border-neutral-900 rounded-[20px] bg-white shadow-[5px_5px_0px_0px_#111111]">
            <div className="border-b-2 border-dashed border-neutral-300 pb-3 mb-4">
              <span className="font-fredoka font-bold text-lg uppercase tracking-wide text-neutral-800">
                Software & Simulation
              </span>
            </div>
            <div className="flex flex-col gap-3.5">
              {PORTFOLIO_DATA.technicalSkills.softwareAndTools.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm font-fredoka font-semibold">
                    <span>{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 bg-neutral-50 text-neutral-600">
                      {item.badge}
                    </span>
                  </div>
                  <div className="w-full h-2 border border-neutral-900 rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-[#D2B48C] rounded-full border border-neutral-900" style={{ width: item.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Plant & Hardware */}
          <div className="p-6 border-2 border-neutral-900 rounded-[20px] bg-white shadow-[5px_5px_0px_0px_#111111]">
            <div className="border-b-2 border-dashed border-neutral-300 pb-3 mb-4">
              <span className="font-fredoka font-bold text-lg uppercase tracking-wide text-neutral-800">
                Hardware & Transmitters
              </span>
            </div>
            <div className="flex flex-col gap-3.5">
              {PORTFOLIO_DATA.technicalSkills.hardwareAndInstrumentation.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm font-fredoka font-semibold">
                    <span>{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 bg-neutral-50 text-neutral-600">
                      {item.badge}
                    </span>
                  </div>
                  <div className="w-full h-2 border border-neutral-900 rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-neutral-800 rounded-full" style={{ width: item.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Achievements & Declaration Section */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 px-2 sm:px-4 relative z-10">
        <div className="p-6 sm:p-8 bg-white border-2 border-neutral-900 rounded-[22px] shadow-[5px_5px_0px_0px_#111111] flex flex-col justify-between">
          <div>
            <h3 className="font-fredoka font-bold text-2xl text-neutral-900 mb-4 flex items-center gap-2">
              <Award className="text-amber-600" size={24} />
              <span>Academic Achievements</span>
            </h3>
            <ul className="flex flex-col gap-4">
              {PORTFOLIO_DATA.achievements.map((ach, aIdx) => (
                <li key={aIdx} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-fredoka font-semibold text-lg text-neutral-900">{ach.title}</h4>
                    <p className="font-patrick text-neutral-600 text-base leading-relaxed">{ach.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Declaration Card */}
        <div className="p-6 sm:p-8 bg-[#FCF8EC] border-2 border-neutral-900 rounded-[22px] shadow-[5px_5px_0px_0px_#111111] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none">
            <UserCheck size={120} />
          </div>

          <div>
            <h3 className="font-fredoka font-bold text-2xl text-neutral-900 mb-3 flex items-center gap-2">
              <FileText className="text-amber-700" size={24} />
              <span>Declaration</span>
            </h3>
            <div className="w-full h-[2px] border-b-2 border-dashed border-neutral-300 mb-4" />
            <p className="font-patrick text-neutral-800 text-lg sm:text-xl italic leading-relaxed">
              "{PORTFOLIO_DATA.personal.declaration}"
            </p>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-neutral-300 flex flex-col gap-1.5 font-patrick">
            <div className="flex justify-between items-center text-base sm:text-lg text-neutral-700">
              <span><strong>Place:</strong> {PORTFOLIO_DATA.personal.place}</span>
              <span><strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}</span>
            </div>
            <div className="text-right font-fredoka font-bold text-lg text-neutral-900 mt-2">
              (G.V.V.MANIKANTA)
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact-section" className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pb-16 px-2 sm:px-4 relative z-10">
        <div className="p-6 sm:p-10 bg-white border-2 border-neutral-900 rounded-[26px] shadow-[6px_6px_0px_0px_#111111] w-full">
          <div className="text-center mb-8">
            <h3 className="font-fredoka font-bold text-3xl sm:text-4xl text-neutral-900 mb-2">
              Get In Touch
            </h3>
            <p className="font-patrick text-neutral-600 text-xl">
              Interested in Process Control, Instrumentation, or Research Collaboration?
            </p>
            <div className="mt-3 flex flex-wrap justify-center items-center gap-4 text-neutral-700 font-fredoka text-sm">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-1.5 underline hover:text-amber-800 font-semibold"
              >
                <Mail size={16} className="text-amber-700" />
                {PORTFOLIO_DATA.personal.email}
              </a>
              <span className="text-neutral-400">•</span>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-700 font-semibold hover:underline"
              >
                <Linkedin size={16} />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {formStatus === "success" ? (
            <motion.div
              className="p-8 bg-[#FAF9F6] border-2 border-emerald-600 rounded-2xl text-center flex flex-col items-center gap-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle2 size={48} className="text-emerald-600" />
              <h4 className="font-fredoka font-bold text-2xl text-neutral-900">
                Message Dispatched!
              </h4>
              <p className="font-patrick text-neutral-600 text-lg">
                Thank you for reaching out. Manikanta will respond promptly.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="mt-2 px-6 py-2 bg-[#D2B48C] text-neutral-900 font-fredoka text-xs font-bold uppercase rounded-full border border-neutral-900 shadow-[2px_2px_0px_0px_#111111] cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-fredoka font-semibold text-xs uppercase tracking-wide text-neutral-600 ml-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. / Prof. / Engineer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-900 rounded-xl bg-neutral-50 focus:bg-white text-neutral-950 font-patrick text-lg focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-fredoka font-semibold text-xs uppercase tracking-wide text-neutral-600 ml-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. colleague@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-900 rounded-xl bg-neutral-50 focus:bg-white text-neutral-950 font-patrick text-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-fredoka font-semibold text-xs uppercase tracking-wide text-neutral-600 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Process Control Opportunity / Research Query"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-neutral-900 rounded-xl bg-neutral-50 focus:bg-white text-neutral-950 font-patrick text-lg focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-fredoka font-semibold text-xs uppercase tracking-wide text-neutral-600 ml-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your note or collaboration idea here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-neutral-900 rounded-xl bg-neutral-50 focus:bg-white text-neutral-950 font-patrick text-lg focus:outline-none resize-none"
                />
              </div>

              {formError && (
                <p className="text-red-600 font-fredoka text-sm font-bold">
                  ⚠️ {formError}
                </p>
              )}

              <div className="flex justify-start mt-2">
                <motion.button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="font-fredoka font-bold uppercase text-xs sm:text-sm tracking-widest px-8 py-3.5 rounded-full border-2 border-neutral-900 text-neutral-900 bg-[#D2B48C] shadow-[4px_4px_0px_0px_#111111] hover:shadow-[2px_2px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === "submitting" ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center border-t-2 border-dashed border-neutral-300 pt-10 pb-8 mt-12 z-10 relative">
        <h3 className="font-fredoka font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight mb-1 text-center">
          {PORTFOLIO_DATA.personal.fullName}
        </h3>
        <p className="font-patrick text-amber-800 text-lg sm:text-xl font-bold mb-4 text-center">
          {PORTFOLIO_DATA.personal.title} • AKNU '26
        </p>

        {/* Social Links */}
        <div className="flex gap-4 sm:gap-6 justify-center items-center mb-8">
          <motion.a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            title="Email Manikanta"
            className="w-11 h-11 border-2 border-neutral-900 bg-white rounded-full flex items-center justify-center text-neutral-800 hover:bg-[#EEDFCD] shadow-[3px_3px_0px_0px_#111111] hover:translate-y-[-2px] transition-all cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
          </motion.a>

          <motion.a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-11 h-11 border-2 border-neutral-900 bg-[#0077b5] text-white rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#111111] hover:translate-y-[-2px] transition-all cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={18} />
          </motion.a>

          <motion.button
            onClick={generateAndDownloadResumePDF}
            title="Download PDF Resume"
            className="h-11 px-4 border-2 border-neutral-900 bg-[#FCF8EC] rounded-full flex items-center gap-2 text-neutral-800 font-fredoka font-bold text-xs hover:bg-[#EEDFCD] shadow-[3px_3px_0px_0px_#111111] hover:translate-y-[-2px] transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={15} />
            <span>Resume PDF</span>
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-1 opacity-60 font-fredoka text-xs tracking-wider text-neutral-600 text-center">
          <span className="uppercase font-semibold">
            Process Control & Instrumentation • AKNU College of Engineering
          </span>
          <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.personal.fullName}. All rights reserved.</span>
        </div>
      </footer>

      {/* High-Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhotoModal(false)}
          >
            <motion.div
              className="relative max-w-md w-full bg-white p-4 rounded-3xl border-4 border-neutral-900 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-2 right-2 p-2 bg-neutral-900 text-white rounded-full cursor-pointer hover:bg-neutral-800 z-10"
              >
                <X size={18} />
              </button>
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-neutral-900 bg-neutral-100">
                <img
                  src={profilePhoto}
                  alt={PORTFOLIO_DATA.personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-fredoka font-black text-xl text-neutral-900">
                  {PORTFOLIO_DATA.personal.fullName}
                </h4>
                <p className="font-patrick text-neutral-600 text-base font-bold">
                  B.Tech (EIE) • Electronics and Instrumentation
                </p>
                <p className="font-fredoka text-xs text-amber-800 font-bold mt-1">
                  AKNU College of Engineering (2022-2026)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
