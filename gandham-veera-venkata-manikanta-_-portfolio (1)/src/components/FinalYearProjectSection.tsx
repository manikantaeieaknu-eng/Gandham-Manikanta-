import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";
import { PORTFOLIO_DATA, ControllerResult } from "../data/portfolioData";
import profilePhoto from "../assets/images/manikanta_profile_1791300518935.jpg";

export function FinalYearProjectSection() {
  const project = PORTFOLIO_DATA.finalYearProject;
  const [selectedControllerId, setSelectedControllerId] = useState<string>("mpc");
  const [activeTab, setActiveTab] = useState<"results" | "comparison" | "conferences" | "plant">("results");

  const selectedController: ControllerResult =
    project.results.find((c) => c.id === selectedControllerId) || project.results[0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Official Project Title Banner modeled directly after Page 1 of the submitted Report */}
      <motion.div
        className="p-6 sm:p-8 bg-white border-2 border-slate-900 rounded-[24px] shadow-[6px_6px_0px_0px_#111111] relative overflow-hidden"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Subtle decorative floral border watermark reminding of official report front page */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
          <BookOpen size={160} />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 text-left max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 border-2 border-slate-900 rounded-full font-fredoka text-xs font-black uppercase text-amber-900 shadow-[1px_1px_0px_0px_#111111]">
                Final Year Major Project • A.Y 2022-2026
              </span>
              <span className="px-3 py-1 bg-[#FCF8EC] border border-slate-900 rounded-full font-fredoka text-xs font-bold text-slate-800">
                Reg. No: {project.registrationNo}
              </span>
            </div>

            <h3 className="font-fredoka font-black text-2xl sm:text-3xl md:text-4xl text-neutral-900 mt-2 leading-tight uppercase">
              {project.title}
            </h3>

            <p className="font-patrick text-neutral-600 text-lg sm:text-xl font-bold mt-1">
              Submitted in partial fulfilment of the requirement for the award of Bachelor of Technology in{" "}
              <span className="text-amber-800 font-extrabold">Electronics & Instrumentation Engineering</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t-2 border-dashed border-neutral-200 font-patrick text-base text-neutral-700">
              <div>
                <strong className="font-fredoka text-xs uppercase text-slate-500 block">Institution & Department:</strong>
                <span>{project.institution}</span>
              </div>
              <div>
                <strong className="font-fredoka text-xs uppercase text-slate-500 block">Esteemed Guidance:</strong>
                <span>{project.guide}</span>
              </div>
            </div>

            {/* Special Research Acknowledgement */}
            <div className="mt-2 p-3 bg-[#FAF8F5] border border-amber-300 rounded-xl text-xs sm:text-sm font-patrick text-neutral-700">
              <strong className="font-fredoka text-xs uppercase text-amber-800">Special Acknowledgement: </strong>
              <span>{project.specialAcknowledgement}</span>
            </div>
          </div>

          {/* Candidate Profile Photo & Badge */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-neutral-900 p-1 bg-[#FCF8EC] shadow-[4px_4px_0px_0px_#111111] rotate-1 hover:rotate-0 transition-transform overflow-hidden relative">
              <img
                src={profilePhoto}
                alt={PORTFOLIO_DATA.personal.fullName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="font-fredoka font-bold text-sm text-neutral-900 mt-2">
              {PORTFOLIO_DATA.personal.shortName}
            </span>
            <span className="font-patrick text-xs text-neutral-500 font-bold">
              Project Author • Reg: {project.registrationNo}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Identified Transfer Function Quick Banner */}
      <div className="p-4 sm:p-5 bg-[#FAF9F6] border-2 border-neutral-900 rounded-2xl shadow-[4px_4px_0px_0px_#111111] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-200 border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
            <Activity size={24} className="text-neutral-900" />
          </div>
          <div>
            <span className="font-fredoka text-xs uppercase tracking-wider text-amber-800 font-black block">
              System Identification (Blackbox MATLAB Toolbox)
            </span>
            <span className="font-fredoka font-extrabold text-xl text-neutral-900">
              {project.transferFunction.formula}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-fredoka text-xs">
          <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-[1px_1px_0px_0px_#111111] font-bold text-emerald-800">
            Fit: {project.transferFunction.fitPercentage}
          </span>
          <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-[1px_1px_0px_0px_#111111] font-semibold text-neutral-700">
            τ = {project.transferFunction.timeConstant}
          </span>
          <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-[1px_1px_0px_0px_#111111] font-semibold text-neutral-700">
            Kp = {project.transferFunction.gain}
          </span>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b-2 border-dashed border-neutral-300 pb-4">
        <button
          onClick={() => setActiveTab("results")}
          className={`px-5 py-2.5 rounded-full font-fredoka text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "results"
              ? "bg-[#D2B48C] text-neutral-900 border-2 border-neutral-900 shadow-[3px_3px_0px_0px_#111111]"
              : "bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-900"
          }`}
        >
          <BarChart3 size={16} />
          <span>Controller Results (Interactive Buttons)</span>
        </button>

        <button
          onClick={() => setActiveTab("comparison")}
          className={`px-5 py-2.5 rounded-full font-fredoka text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "comparison"
              ? "bg-[#D2B48C] text-neutral-900 border-2 border-neutral-900 shadow-[3px_3px_0px_0px_#111111]"
              : "bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-900"
          }`}
        >
          <TrendingUp size={16} />
          <span>Full Performance Tables (Ch. 8)</span>
        </button>

        <button
          onClick={() => setActiveTab("conferences")}
          className={`px-5 py-2.5 rounded-full font-fredoka text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "conferences"
              ? "bg-[#D2B48C] text-neutral-900 border-2 border-neutral-900 shadow-[3px_3px_0px_0px_#111111]"
              : "bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-900"
          }`}
        >
          <BookOpen size={16} />
          <span>Conferences & Literature Review</span>
        </button>

        <button
          onClick={() => setActiveTab("plant")}
          className={`px-5 py-2.5 rounded-full font-fredoka text-xs sm:text-sm font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "plant"
              ? "bg-[#D2B48C] text-neutral-900 border-2 border-neutral-900 shadow-[3px_3px_0px_0px_#111111]"
              : "bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-900"
          }`}
        >
          <Cpu size={16} />
          <span>Physical Setup & Calibration</span>
        </button>
      </div>

      {/* Tab 1: Interactive Controller Result Buttons (Core Request: "give only restults only from in it as buttons") */}
      {activeTab === "results" && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="font-fredoka text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
              Select Controller to View Experimental Results
            </span>
            <h4 className="font-fredoka font-bold text-2xl sm:text-3xl text-neutral-900">
              Real-Time Closed Loop Test Results (Single Tank Level System)
            </h4>
          </div>

          {/* Interactive Result Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {project.results.map((c) => {
              const isSelected = c.id === selectedControllerId;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setSelectedControllerId(c.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-3.5 rounded-2xl border-2 border-neutral-900 flex flex-col items-center justify-between text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#D2B48C] text-neutral-950 font-bold shadow-[4px_4px_0px_0px_#111111] translate-y-[-2px]"
                      : "bg-white text-neutral-800 hover:bg-[#FAF8F5] shadow-[2px_2px_0px_0px_#111111]"
                  }`}
                >
                  {c.isBest && (
                    <span className="absolute -top-2.5 px-2 py-0.5 bg-red-600 text-white rounded-full font-fredoka text-[9px] font-black uppercase tracking-wider shadow">
                      Winner
                    </span>
                  )}
                  <span className="font-fredoka text-xs uppercase font-extrabold mt-1">
                    {c.shortName}
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 font-bold mt-1">
                    {c.category}
                  </span>
                  <div className="mt-2 text-[11px] font-fredoka text-neutral-900">
                    <span className="block opacity-60 text-[9px]">ITAE</span>
                    <strong className="text-sm">{c.itae.toFixed(1)}</strong>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Controller Detailed Results Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedController.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-white border-2 border-neutral-900 rounded-[24px] shadow-[6px_6px_0px_0px_#111111]"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-dashed border-neutral-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-fredoka font-black text-2xl sm:text-3xl text-neutral-900">
                      {selectedController.name}
                    </h5>
                    {selectedController.isBest && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-600 rounded-full font-fredoka text-xs font-black uppercase">
                        Superior Response in Real Time
                      </span>
                    )}
                  </div>
                  <p className="font-patrick text-neutral-600 text-lg font-semibold mt-1">
                    {selectedController.keyTakeaway}
                  </p>
                </div>
              </div>

              {/* Quantitative Metrics Grid from Chapter 8 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                <div className="p-3.5 bg-[#FCF8EC] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    Rise Time (Tr)
                  </span>
                  <span className="font-fredoka font-black text-2xl text-neutral-900">
                    {selectedController.riseTime}s
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    Speed of ascent
                  </span>
                </div>

                <div className="p-3.5 bg-[#FCF8EC] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    Settling Time (Ts)
                  </span>
                  <span className="font-fredoka font-black text-2xl text-neutral-900">
                    {selectedController.settlingTime}s
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    To reach ±2% band
                  </span>
                </div>

                <div className="p-3.5 bg-[#FCF8EC] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    Overshoot (%)
                  </span>
                  <span className={`font-fredoka font-black text-2xl ${selectedController.overshoot < 0.1 ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {selectedController.overshoot}%
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    Peak surge above SP
                  </span>
                </div>

                <div className="p-3.5 bg-[#FAF9F6] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    ITAE
                  </span>
                  <span className="font-fredoka font-black text-2xl text-neutral-900">
                    {selectedController.itae}
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    Integral Time Abs Error
                  </span>
                </div>

                <div className="p-3.5 bg-[#FAF9F6] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    ISE
                  </span>
                  <span className="font-fredoka font-black text-2xl text-neutral-900">
                    {selectedController.ise}
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    Integral Square Error
                  </span>
                </div>

                <div className="p-3.5 bg-[#FAF9F6] border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_0px_#111111]">
                  <span className="font-fredoka text-[11px] font-bold text-neutral-500 uppercase block">
                    IAE
                  </span>
                  <span className="font-fredoka font-black text-2xl text-neutral-900">
                    {selectedController.iae}
                  </span>
                  <span className="font-patrick text-xs text-neutral-600 block mt-0.5">
                    Integral Absolute Error
                  </span>
                </div>
              </div>

              {/* Tuning Parameters Summary */}
              <div className="mt-6 p-4 bg-[#F4F2ED] border-2 border-neutral-900 rounded-2xl flex flex-wrap items-center justify-between gap-4 font-fredoka text-sm">
                <span className="font-black uppercase text-amber-900">
                  Controller Tuning Parameters (Evaluated in Chapter 7):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedController.tuningParameters.kp !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>Kp:</strong> {selectedController.tuningParameters.kp}
                    </span>
                  )}
                  {selectedController.tuningParameters.ki !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>Ki:</strong> {selectedController.tuningParameters.ki}
                    </span>
                  )}
                  {selectedController.tuningParameters.lambda !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>λ (Filter):</strong> {selectedController.tuningParameters.lambda}
                    </span>
                  )}
                  {selectedController.tuningParameters.tc !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>τc (Closed-Loop):</strong> {selectedController.tuningParameters.tc}
                    </span>
                  )}
                  {selectedController.tuningParameters.mu !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>μ (Fractional Order):</strong> {selectedController.tuningParameters.mu}
                    </span>
                  )}
                  {selectedController.tuningParameters.predictionHorizon !== undefined && (
                    <span className="px-3 py-1 bg-white border border-neutral-900 rounded-lg shadow-sm">
                      <strong>P (Horizon):</strong> {selectedController.tuningParameters.predictionHorizon} | <strong>M:</strong> {selectedController.tuningParameters.controlHorizon}
                    </span>
                  )}
                </div>
              </div>

              {/* Simulated Closed Loop Output Response SVG based on Fig 8.1 - Fig 8.6 */}
              <div className="mt-6 p-4 bg-neutral-900 rounded-2xl border-2 border-neutral-900 text-white flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-fredoka text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Setpoint (h = 35 cm)
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block ml-3" /> Measured Level y(t)
                  </span>
                  <span>Time (seconds)</span>
                </div>

                <div className="w-full h-36 relative overflow-hidden flex items-end">
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:30px_20px] opacity-30" />
                  
                  {/* Setpoint Line at 70% height */}
                  <div className="absolute left-0 right-0 top-[28%] border-b border-dashed border-red-500 opacity-80" />
                  
                  {/* Step response curve visualization based on controller data */}
                  <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                    <path
                      d={
                        selectedController.id === "mpc"
                          ? "M 0 110 Q 15 35, 35 34 L 500 34" // Swift, crisp rise, zero overshoot
                          : selectedController.id === "imc"
                          ? "M 0 110 Q 60 40, 110 34 L 500 34" // Smooth, no overshoot, moderate rise
                          : selectedController.id === "ds"
                          ? "M 0 110 Q 200 60, 450 34 L 500 34" // Very slow monotonic rise
                          : selectedController.id === "auto-tune"
                          ? "M 0 110 Q 40 18, 70 24 Q 100 42, 140 34 L 500 34" // Fast rise with 8.4% overshoot
                          : selectedController.id === "fopi"
                          ? "M 0 110 Q 90 20, 130 25 Q 180 40, 240 34 L 500 34" // Memory effect with overshoot
                          : "M 0 110 Q 300 65, 480 34 L 500 34" // Manual trial error very slow
                      }
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[11px] font-fredoka text-neutral-400">
                  <span>0s</span>
                  <span>1000s</span>
                  <span>2000s</span>
                  <span>3000s</span>
                  <span>5000s</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Tab 2: Full Comparison Tables (Table 8.1 & Table 8.2 verbatim from report) */}
      {activeTab === "comparison" && (
        <div className="flex flex-col gap-6">
          {/* Table 8.1 Error Criteria */}
          <div className="p-6 bg-white border-2 border-neutral-900 rounded-[24px] shadow-[5px_5px_0px_0px_#111111]">
            <h4 className="font-fredoka font-black text-xl sm:text-2xl text-neutral-900 mb-2">
              Table 8.1: Error Based Criteria Comparison
            </h4>
            <p className="font-patrick text-neutral-600 text-base mb-4">
              Evaluating Integral Time Absolute Error (ITAE), Integral Square Error (ISE), and Integral Absolute Error (IAE).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-patrick text-base sm:text-lg">
                <thead>
                  <tr className="bg-neutral-100 border-2 border-neutral-900 font-fredoka text-xs uppercase tracking-wider text-neutral-900">
                    <th className="p-3 text-left border-r-2 border-neutral-900">Type of Controller</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">ITAE</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">ISE</th>
                    <th className="p-3 text-center">IAE</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-900 border-2 border-neutral-900">
                  {project.results.map((c) => (
                    <tr
                      key={c.id}
                      className={c.isBest ? "bg-amber-100/60 font-bold" : "hover:bg-neutral-50"}
                    >
                      <td className="p-3 font-fredoka font-bold text-sm text-neutral-900 border-r-2 border-neutral-900">
                        {c.name} {c.isBest && <span className="text-xs text-red-600 font-black">(Best)</span>}
                      </td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.itae}</td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.ise}</td>
                      <td className="p-3 text-center">{c.iae}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 8.2 Time Domain Specifications */}
          <div className="p-6 bg-white border-2 border-neutral-900 rounded-[24px] shadow-[5px_5px_0px_0px_#111111]">
            <h4 className="font-fredoka font-black text-xl sm:text-2xl text-neutral-900 mb-2">
              Table 8.2: Time Domain Specifications Comparison
            </h4>
            <p className="font-patrick text-neutral-600 text-base mb-4">
              Comparing Rise time, Settling time, Percentage Overshoot, Peak value, and Peak time.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-patrick text-base sm:text-lg">
                <thead>
                  <tr className="bg-neutral-100 border-2 border-neutral-900 font-fredoka text-xs uppercase tracking-wider text-neutral-900">
                    <th className="p-3 text-left border-r-2 border-neutral-900">Controller</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">Rise Time (s)</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">Settling Time (s)</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">Overshoot (%)</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">Peak Value</th>
                    <th className="p-3 text-center border-r-2 border-neutral-900">Peak Time (s)</th>
                    <th className="p-3 text-center">Steady State</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-900 border-2 border-neutral-900">
                  {project.results.map((c) => (
                    <tr
                      key={c.id}
                      className={c.isBest ? "bg-amber-100/60 font-bold" : "hover:bg-neutral-50"}
                    >
                      <td className="p-3 font-fredoka font-bold text-sm text-neutral-900 border-r-2 border-neutral-900">
                        {c.shortName}
                      </td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.riseTime}</td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.settlingTime}</td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.overshoot}%</td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.peakValue}</td>
                      <td className="p-3 text-center border-r-2 border-neutral-900">{c.peakTime}</td>
                      <td className="p-3 text-center">{c.steadyStateValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Conferences & Literature Review (Core Request: "check the conferences") */}
      {activeTab === "conferences" && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="font-fredoka text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
              Chapter 2 Literature Review & References
            </span>
            <h4 className="font-fredoka font-bold text-2xl sm:text-3xl text-neutral-900">
              Conferences & Research Publications Studied
            </h4>
            <p className="font-patrick text-neutral-600 text-lg max-w-2xl mx-auto mt-1">
              Theoretical foundation and benchmarking literature referenced for the modeling, optimization, and control design of fluid and industrial systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PORTFOLIO_DATA.conferencesAndLiterature.map((lit, idx) => (
              <motion.div
                key={idx}
                className="p-5 bg-white border-2 border-neutral-900 rounded-[20px] shadow-[4px_4px_0px_0px_#111111] flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 border border-neutral-900 rounded-md font-fredoka text-xs font-bold text-amber-900">
                      {lit.year}
                    </span>
                    <span className="font-patrick text-neutral-500 font-bold text-sm">
                      Ref #{idx + 1}
                    </span>
                  </div>

                  <h5 className="font-fredoka font-bold text-lg text-neutral-900 leading-snug">
                    "{lit.title}"
                  </h5>

                  <p className="font-patrick text-amber-800 font-bold text-sm mt-1">
                    Authors: {lit.authors}
                  </p>

                  <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <strong className="font-fredoka text-[11px] uppercase tracking-wider text-neutral-600 block">
                      Research Outcomes:
                    </strong>
                    <p className="font-patrick text-neutral-700 text-sm leading-relaxed mt-0.5">
                      {lit.outcomes}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-dashed border-neutral-200">
                  <span className="font-patrick text-xs text-neutral-500 font-semibold italic">
                    {lit.remarks}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Physical Plant & Calibration */}
      {activeTab === "plant" && (
        <div className="p-6 sm:p-8 bg-white border-2 border-neutral-900 rounded-[24px] shadow-[6px_6px_0px_0px_#111111] flex flex-col gap-6">
          <div className="border-b-2 border-dashed border-neutral-200 pb-4">
            <h4 className="font-fredoka font-black text-2xl text-neutral-900">
              Three-Tank Experimental Workstation (JITTS-01 Setup)
            </h4>
            <p className="font-patrick text-neutral-600 text-lg">
              Configured Tank 1 from the Three-Tank fluid station for empirical single tank calibration and real-time control valve testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-patrick">
            <div className="p-4 bg-[#FCF8EC] border-2 border-neutral-900 rounded-2xl">
              <h5 className="font-fredoka font-bold text-lg text-neutral-900 mb-2">
                Physical Specifications
              </h5>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-base text-neutral-800">
                <li><strong>Process Tank:</strong> Acrylic material, 150 mm diameter, 600 mm height</li>
                <li><strong>Control Valve:</strong> Equal percentage, Air-to-open, 3–15 psi signal, CV = 2</li>
                <li><strong>Level Transmitter:</strong> Smart DPT, 0–6000 mmwc, 4–20 mA output</li>
                <li><strong>E/P Converter:</strong> 4–20 mA input to 3–15 psi pneumatic signal</li>
                <li><strong>Pump & Rotameter:</strong> 0.5 HP, 1500 LPH max flow; 50–500 LPH rotameter</li>
              </ul>
            </div>

            <div className="p-4 bg-white border-2 border-neutral-900 rounded-2xl">
              <h5 className="font-fredoka font-bold text-lg text-neutral-900 mb-2">
                Calibration & Linearization
              </h5>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-base text-neutral-800">
                <li>Non-linear flow vs. level relationship calibrated across 0% to 100% valve opening.</li>
                <li>Piece-wise linearization performed around local operating points.</li>
                <li>Maximum operating flowrate: 350 LPH at 100% opening.</li>
                <li>PRBS input signal applied to identify First-Order Transfer Function (FOTF).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
