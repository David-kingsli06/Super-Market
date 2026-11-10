"use client";

import React from "react";

const STEPS = [
  {
    step: "01",
    phase: "ENTER",
    title: "The Scent of Crisp Citrus",
    description: "Sliding glass portals give way to misty botanical coolers. Clean, tempered air and natural sunlight set a tranquil rhythm from your first step.",
    stat: "100%",
    statLabel: "Direct Organic Harvest",
  },
  {
    step: "02",
    phase: "DISCOVER",
    title: "Cold-Pressed & Play Aisle",
    description: "Sample raw juices crushed before sunrise, then drift past artisanal family toys and pantry discoveries made with honest, simple materials.",
    stat: "85+",
    statLabel: "Independent Producers",
  },
  {
    step: "03",
    phase: "EXPLORE",
    title: "Main Aisle Freedom",
    description: "Generous wide aisles bathed in natural warm light. No chaotic sale stickers or loudspeaker announcements—only calm, unhurried browsing.",
    stat: "4.2m",
    statLabel: "Spacious Promenade Width",
  },
  {
    step: "04",
    phase: "CHECKOUT",
    title: "Effortless Departure",
    description: "Warm concierge registers, automatic cart reconciliation, and eco-totes packed with care. Walk out smiling, ready for dinner at home.",
    stat: "< 90s",
    statLabel: "Average Checkout Speed",
  },
];

export default function StoreExperience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#090b0a] text-[#f4f4f0] border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.25em] bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 mb-4">
            <span>The Customer Choreography</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-white leading-tight">
            From Fresh To Checkout. <br />
            <span className="text-neutral-400 font-extralight">A Journey Designed For Calm.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-300 font-light leading-relaxed">
            We reimagined supermarket layout engineering from the visitor’s perspective. No disorientation, no sensory overload—just an intuitive, peaceful flow from dawn till dusk.
          </p>
        </div>

        {/* 4-Step Cinematic Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-light text-emerald-400">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400 bg-black/60 px-2.5 py-1 rounded-full border border-white/5">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-xl font-light uppercase text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col">
                <span className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  {step.stat}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mt-0.5">
                  {step.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Quote Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/20 via-black to-neutral-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-2">
              Philosophical Standard
            </span>
            <p className="text-lg sm:text-xl font-light text-neutral-200 italic leading-snug">
              “Grocery shopping shouldn’t be an errand to endure. It should be the most grounding twenty minutes of your day.”
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs uppercase tracking-widest text-white font-medium">Marcello Durand</span>
            <span className="text-[10px] font-mono tracking-wider text-neutral-400">Director of Store Architecture</span>
          </div>
        </div>

      </div>
    </section>
  );
}
