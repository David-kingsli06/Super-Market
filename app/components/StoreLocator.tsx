"use client";

import React, { useState } from "react";

const STORES = [
  {
    id: "flagship-tribeca",
    name: "Provence Tribeca Flagship",
    address: "482 Greenwich Street, New York, NY 10013",
    hours: "07:00 AM — 10:00 PM Daily",
    phone: "+1 (212) 555-0182",
    features: ["Curbside Valet", "Cold-Press Juice Bar", "Underground Wine Cellar", "Kids Tasting Nook"],
    status: "Open Now",
  },
  {
    id: "soho-mercer",
    name: "Provence Mercer Gallery",
    address: "118 Mercer Street, New York, NY 10012",
    hours: "07:30 AM — 09:30 PM Daily",
    phone: "+1 (212) 555-0199",
    features: ["Boutique Bakery", "Florist Atelier", "Contactless Express Aisle"],
    status: "Open Now",
  },
  {
    id: "brooklyn-heights",
    name: "Provence Promenade Heights",
    address: "64 Montague Street, Brooklyn, NY 11201",
    hours: "07:00 AM — 10:00 PM Daily",
    phone: "+1 (718) 555-0144",
    features: ["Rooftop Herb Greenhouse", "Farm Direct Produce Drops", "Electric Charging Patios"],
    status: "Open Now",
  },
];

export default function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = STORES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="locator" className="py-28 sm:py-36 bg-[#0c0e0d] text-[#f4f4f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">
                Store Locator
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-white leading-tight">
              Find Your Market. <br />
              <span className="text-neutral-400 font-extralight">Visit Us Today.</span>
            </h2>
          </div>
          
          {/* Quick Search */}
          <div className="mt-6 md:mt-0 w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search neighborhood or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded-full px-5 py-3 text-xs tracking-wider text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <svg
                className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Store Selection & Map Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of locations */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {filteredStores.map((store, idx) => {
              const isSelected = selectedStore === idx;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.06] border-emerald-400/50 shadow-lg"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                      {store.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {store.hours}
                    </span>
                  </div>
                  <h3 className="text-lg font-light uppercase tracking-tight text-white mb-1">
                    {store.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mb-3">
                    {store.address}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {store.features.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase tracking-wider text-neutral-400 bg-black/40 px-2 py-0.5 rounded"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Detail Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-md">
            {filteredStores[selectedStore] && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-1">
                      Featured Location
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light uppercase text-white">
                      {filteredStores[selectedStore].name}
                    </h3>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      filteredStores[selectedStore].address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Get Directions</span>
                    <span>↗</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-xs text-neutral-300">
                  <div>
                    <span className="font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      Address
                    </span>
                    <p className="text-sm text-white font-light">
                      {filteredStores[selectedStore].address}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      Operating Hours
                    </span>
                    <p className="text-sm text-white font-light">
                      {filteredStores[selectedStore].hours}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      Concierge Desk
                    </span>
                    <p className="text-sm text-white font-light">
                      {filteredStores[selectedStore].phone}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      Parking & Transit
                    </span>
                    <p className="text-sm text-white font-light">
                      Dedicated Valet & Metro Station Adjacent
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="font-mono uppercase tracking-widest text-neutral-400 text-xs block mb-3">
                    Available Amenities & Services
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {filteredStores[selectedStore].features.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col items-start gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[11px] text-neutral-200 uppercase tracking-wider font-light">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
