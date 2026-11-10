"use client";

import React, { useState } from "react";

const DEPARTMENTS = [
  {
    id: "produce",
    title: "Fresh Produce",
    subtitle: "Orchards & Organic Soils",
    description: "Daily harvested heirloom tomatoes, leafy botanicals, crisp brassicas, and citrus direct from certified regenerative farms.",
    meta: "Harvested < 18h ago",
    items: ["Crimson Heirloom Tomatoes", "Meyer Lemons", "Hydroponic Butter Lettuce", "French Breakfast Radish"],
    color: "from-emerald-950/40 to-black/60",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    badge: "Organic Certified",
    tag: "Aisle 01",
  },
  {
    id: "beverages",
    title: "Cold-Pressed & Cellar",
    subtitle: "Botanical Elixirs & Artisanal Brews",
    description: "Zero pasteurization raw cold-pressed juices, wild-fermented kombuchas, biodynamic vineyards, and small-batch tonic waters.",
    meta: "Raw & Unfiltered",
    items: ["Golden Turmeric Glow", "Pink Grapefruit & Mint", "Sparkling Botanical Cedar", "Alpine Spring Waters"],
    color: "from-amber-950/40 to-black/60",
    accent: "text-amber-400",
    border: "border-amber-500/20",
    badge: "Cold-Pressed Daily",
    tag: "Aisle 04",
  },
  {
    id: "family",
    title: "Family & Play",
    subtitle: "Conscious Toys & Natural Living",
    description: "Sustainably crafted wooden toys, non-toxic craft kits, organic baby nutrition, and uplifting family essentials.",
    meta: "Non-Toxic & FSC Certified",
    items: ["Nordic Wooden Stacking Blocks", "Beeswax Modeling Clay", "Organic Cotton Blankets", "Board Games"],
    color: "from-rose-950/40 to-black/60",
    accent: "text-rose-400",
    border: "border-rose-500/20",
    badge: "Sustainable Craft",
    tag: "Aisle 07",
  },
  {
    id: "bakery",
    title: "Artisan Bakery & Pantry",
    subtitle: "Heritage Grains & Stone Hearth",
    description: "Slow-fermented sourdough loaves, Parisian croissants, cold-pressed olive oils, and small-estate sea salts.",
    meta: "Baked at 4:30 AM",
    items: ["36-Hour Sourdough Boule", "Laminated Almond Croissants", "Sicilian EVOO", "Flaky Sea Salt"],
    color: "from-orange-950/40 to-black/60",
    accent: "text-orange-400",
    border: "border-orange-500/20",
    badge: "Stone-Ground",
    tag: "Aisle 02",
  },
  {
    id: "dairy",
    title: "Artisanal Creamery",
    subtitle: "Pasture-Raised & Farmhouse Aged",
    description: "Grass-fed yogurts, unpasteurized aged cheeses, golden churned butter, and pasture-raised heritage eggs.",
    meta: "100% Grass-Fed",
    items: ["Salted Cultured Butter", "Comté Reserve 24m", "Greek Sheep Yogurt", "Golden Pasture Eggs"],
    color: "from-cyan-950/40 to-black/60",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    badge: "Farmstead Pure",
    tag: "Aisle 03",
  },
  {
    id: "checkout",
    title: "Concierge Checkout",
    subtitle: "Effortless & Thoughtful Service",
    description: "Zero-wait tap and go, compostable recycled tote bags, and curbside loading assistants who take care of every parcel.",
    meta: "Frictionless Speed",
    items: ["Zero-Contact Pay", "Curbside Loading", "Compostable Totes", "Special Order Pickup"],
    color: "from-neutral-900/60 to-black/60",
    accent: "text-white",
    border: "border-white/20",
    badge: "Seamless Care",
    tag: "Registers 1-12",
  },
];

export default function DepartmentSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedDept, setSelectedDept] = useState<number>(0);

  return (
    <section id="departments" className="relative py-28 sm:py-36 bg-[#0e1110] text-[#f4f4f0] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">
                Curated Departments
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-white leading-tight">
              More Than A Supermarket. <br />
              <span className="text-neutral-400 font-extralight">A Feast For The Senses.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Every department is organized with deliberate restraint. No cluttered aisles or artificial discounts—just world-class produce, pure ingredients, and conscious family discoveries.
          </p>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept, index) => {
            const isHighlighted = selectedDept === index;
            return (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(index)}
                className={`group relative p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b ${dept.color} border ${dept.border} hover:border-white/30 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                      {dept.tag}
                    </span>
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold ${dept.accent}`}>
                      {dept.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-light uppercase tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-neutral-400 mt-1 uppercase">
                    {dept.subtitle}
                  </p>

                  <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400 mb-3">
                    Featured Highlights:
                  </div>
                  <ul className="space-y-1.5">
                    {dept.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-200 font-light">
                        <span className={`w-1 h-1 rounded-full ${dept.accent.replace("text-", "bg-")}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{dept.meta}</span>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                      View Shelf →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
