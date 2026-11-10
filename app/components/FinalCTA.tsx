"use client";

import React from "react";

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070908] text-[#f4f4f0] pt-24 pb-16 border-t border-white/10 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.25em] bg-white/[0.04] border border-white/10 text-emerald-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Ready For A Better Journey</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white leading-[1.05] mb-6">
            Your Next Shopping <br />
            <span className="text-neutral-400 font-extralight">Trip Starts Here.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Experience food shopping as it was meant to be—unhurried, sensorial, and naturally nourishing. Visit one of our markets or replay the journey anytime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("locator");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-medium text-xs uppercase tracking-[0.22em] transition-all duration-200 shadow-xl"
            >
              Find A Store
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("departments");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-white font-medium text-xs uppercase tracking-[0.22em] border border-white/15 transition-all duration-200"
            >
              Explore Departments
            </button>
            <button
              onClick={scrollToTop}
              className="px-6 py-3.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 font-mono text-xs uppercase tracking-[0.2em] border border-emerald-500/30 transition-all duration-200"
            >
              ↑ Replay Journey
            </button>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/10 text-xs text-neutral-400">
          <div>
            <span className="font-mono uppercase tracking-[0.2em] text-white block mb-3">Departments</span>
            <ul className="space-y-2 font-light">
              <li><a href="#departments" className="hover:text-emerald-400 transition-colors">Fresh Produce</a></li>
              <li><a href="#departments" className="hover:text-emerald-400 transition-colors">Artisan Cold-Press</a></li>
              <li><a href="#departments" className="hover:text-emerald-400 transition-colors">Wooden Toys & Play</a></li>
              <li><a href="#departments" className="hover:text-emerald-400 transition-colors">Heritage Hearth Bakery</a></li>
              <li><a href="#departments" className="hover:text-emerald-400 transition-colors">Pasture Creamery</a></li>
            </ul>
          </div>
          <div>
            <span className="font-mono uppercase tracking-[0.2em] text-white block mb-3">Our Standards</span>
            <ul className="space-y-2 font-light">
              <li>100% Regenerative Growers</li>
              <li>Zero Chemical Ripening</li>
              <li>Small Batch Micro-Producers</li>
              <li>Plastic-Neutral Checkout</li>
              <li>Daily Composting Loop</li>
            </ul>
          </div>
          <div>
            <span className="font-mono uppercase tracking-[0.2em] text-white block mb-3">Concierge Care</span>
            <ul className="space-y-2 font-light">
              <li>Valet Trunk Loading</li>
              <li>Bespoke Box Delivery</li>
              <li>Sommelier Consultation</li>
              <li>Weekly Seasonal Subscriptions</li>
              <li>Private Market Hours</li>
            </ul>
          </div>
          <div>
            <span className="font-mono uppercase tracking-[0.2em] text-white block mb-3">Brand Identity</span>
            <p className="font-light leading-relaxed mb-4">
              Provence Market & Co. is a cinematic retail exploration bringing serenity, craft, and honest nourishment back to daily life.
            </p>
            <span className="text-[10px] font-mono text-emerald-400">© 2026 Provence Market. All rights reserved.</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span>Cinematic Experience Powered by Emil Design + Impeccable + Taste</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Next.js • TypeScript • Tailwind CSS</span>
            <button onClick={scrollToTop} className="hover:text-white transition-colors">
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
