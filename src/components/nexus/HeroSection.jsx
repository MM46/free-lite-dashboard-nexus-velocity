const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe, Zap, Shield } from "lucide-react";

const HERO_BG = "https://media.db.com/images/public/6a4e7920f2ed6ecc497d4f79/a2609b468_generated_4a656128.png";

const STATS = [
  { value: "194", label: "Countries", icon: Globe },
  { value: "99.7%", label: "On-Time Rate", icon: Zap },
  { value: "24/7", label: "Live Tracking", icon: Shield },
];

export default function HeroSection() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const showLine = origin.length > 0 && destination.length > 0;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0D] via-[#0A0B0D]/90 to-[#0A0B0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-transparent to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(200,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Vector paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <motion.line
          x1="10%" y1="30%" x2="90%" y2="70%"
          stroke="#C8FF00" strokeWidth="0.5" opacity="0.15"
          className="animate-draw-path"
        />
        <motion.line
          x1="5%" y1="60%" x2="95%" y2="40%"
          stroke="#C8FF00" strokeWidth="0.5" opacity="0.1"
          className="animate-draw-path"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8FF00]/20 bg-[#C8FF00]/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span className="text-[#C8FF00] text-xs tracking-[0.1em] uppercase font-heading font-medium">Global Routing Engine — Live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.04em] leading-[0.95] text-[#F2F4F7] mb-6"
          >
            The Velocity
            <br />
            of <span className="text-[#C8FF00]">Precision</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#8E95A1] text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            Route any shipment across 194 countries with real-time rate optimization, 
            end-to-end tracking, and guaranteed delivery windows.
          </motion.p>

          {/* Routing Engine Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="glass-manifest rounded-lg p-1.5 max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-1.5">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8FF00]" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Origin port or city"
                  className="w-full h-12 pl-10 pr-4 bg-[#0A0B0D]/60 border border-[#2a2d35] rounded text-sm text-[#F2F4F7] placeholder:text-[#8E95A1]/50 focus:border-[#C8FF00]/40 focus:outline-none focus:ring-2 focus:ring-[#C8FF00]/10 transition-all"
                />
              </div>

              {/* Vector connector */}
              <div className="hidden sm:flex items-center px-1">
                <svg width="40" height="2" className="overflow-visible" aria-hidden="true">
                  <line x1="0" y1="1" x2="32" y2="1" stroke={showLine ? "#C8FF00" : "#2a2d35"} strokeWidth="1.5" className="transition-all duration-500" />
                  <circle cx="36" cy="1" r="3" fill={showLine ? "#C8FF00" : "#2a2d35"} className="transition-all duration-500" />
                </svg>
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E95A1]" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination port or city"
                  className="w-full h-12 pl-10 pr-4 bg-[#0A0B0D]/60 border border-[#2a2d35] rounded text-sm text-[#F2F4F7] placeholder:text-[#8E95A1]/50 focus:border-[#C8FF00]/40 focus:outline-none focus:ring-2 focus:ring-[#C8FF00]/10 transition-all"
                />
              </div>

              <button
                className="btn-scan-line bg-[#C8FF00] text-[#0A0B0D] h-12 px-6 rounded flex items-center justify-center gap-2 font-heading font-bold text-xs uppercase tracking-[0.08em] hover:bg-[#d4ff33] transition-colors shrink-0"
                aria-label="Calculate route"
              >
                Route
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-8 md:gap-16"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#2a2d35] flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#C8FF00]" />
              </div>
              <div>
                <div className="text-xl font-heading font-bold text-[#F2F4F7] tracking-[-0.02em]">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-[#8E95A1]">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}