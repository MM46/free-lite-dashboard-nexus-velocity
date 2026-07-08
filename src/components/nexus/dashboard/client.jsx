import React from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, Clock, CheckCircle, ArrowUpRight, Truck, Ship, Plane } from "lucide-react";

const KPIS = [
  { label: "Active Shipments", value: "12", change: "+3", icon: Package, trend: "up" },
  { label: "In Transit", value: "8", change: "+2", icon: Truck, trend: "up" },
  { label: "Avg Transit Time", value: "18d", change: "-2d", icon: Clock, trend: "down" },
  { label: "Delivered (MTD)", value: "47", change: "+12", icon: CheckCircle, trend: "up" },
];

const SHIPMENTS = [
  { id: "NVX-2847", origin: "Shanghai, CN", dest: "Rotterdam, NL", mode: "Ocean", status: "In Transit", progress: 65, eta: "Jul 22", icon: Ship },
  { id: "NVX-2851", origin: "Hong Kong, CN", dest: "Hamburg, DE", mode: "Ocean", status: "In Transit", progress: 42, eta: "Jul 28", icon: Ship },
  { id: "NVX-2855", origin: "Shenzhen, CN", dest: "Chicago, US", mode: "Air", status: "Customs", progress: 88, eta: "Jul 10", icon: Plane },
  { id: "NVX-2860", origin: "Singapore, SG", dest: "Dubai, AE", mode: "Ocean", status: "Loading", progress: 12, eta: "Aug 03", icon: Ship },
  { id: "NVX-2863", origin: "Tokyo, JP", dest: "Los Angeles, US", mode: "Air", status: "Delivered", progress: 100, eta: "Jul 06", icon: Plane },
];

const STATUS_COLORS = {
  "In Transit": "text-[#C8FF00] bg-[#C8FF00]/10",
  "Customs": "text-[#FFB800] bg-[#FFB800]/10",
  "Loading": "text-[#8E95A1] bg-[#2a2d35]",
  "Delivered": "text-[#3EE79F] bg-[#3EE79F]/10",
};

export function ShipmentsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-[-0.04em] text-[#F2F4F7]">Welcome back, John</h1>
        <p className="text-sm text-[#8E95A1] mt-1">Here's your logistics overview for this month.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-manifest rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded border border-[#2a2d35] flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-[#C8FF00]" />
              </div>
              <span className={`text-[10px] font-heading font-bold flex items-center gap-0.5 ${kpi.trend === "up" ? "text-[#3EE79F]" : "text-[#C8FF00]"}`}>
                {kpi.change} <TrendingUp className={`w-3 h-3 ${kpi.trend === "down" ? "rotate-180" : ""}`} />
              </span>
            </div>
            <div className="text-2xl font-heading font-black text-[#F2F4F7] tracking-[-0.02em]">{kpi.value}</div>
            <div className="text-[10px] uppercase tracking-[0.1em] text-[#8E95A1] mt-1">{kpi.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ActiveShipments() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-base uppercase tracking-[0.02em] text-[#F2F4F7]">Active Shipments</h2>
        <button className="text-[10px] uppercase tracking-[0.1em] text-[#C8FF00] font-heading font-medium flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2">
        {SHIPMENTS.map((ship, i) => (
          <motion.div
            key={ship.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="glass-manifest rounded-lg p-4 hover:border-[#C8FF00]/20 transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* ID + mode */}
              <div className="flex items-center gap-3 md:w-48 shrink-0">
                <div className="w-9 h-9 rounded border border-[#2a2d35] flex items-center justify-center shrink-0">
                  <ship.icon className="w-4 h-4 text-[#C8FF00]" />
                </div>
                <div>
                  <div className="text-xs font-heading font-bold text-[#F2F4F7]">{ship.id}</div>
                  <div className="text-[10px] text-[#8E95A1] uppercase tracking-[0.08em]">{ship.mode}</div>
                </div>
              </div>

              {/* Route */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#F2F4F7] font-heading font-semibold truncate">{ship.origin}</span>
                  <div className="flex-1 h-px bg-[#2a2d35] relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-[#C8FF00]" style={{ width: `${ship.progress}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C8FF00]" style={{ left: `${ship.progress}%` }} />
                  </div>
                  <span className="text-[#F2F4F7] font-heading font-semibold truncate">{ship.dest}</span>
                </div>
                <div className="text-[10px] text-[#8E95A1] mt-1">{ship.progress}% complete</div>
              </div>

              {/* Status + ETA */}
              <div className="flex items-center gap-3 md:justify-end shrink-0">
                <span className={`text-[10px] uppercase tracking-[0.08em] font-heading font-bold px-2 py-1 rounded ${STATUS_COLORS[ship.status]}`}>
                  {ship.status}
                </span>
                <div className="text-right">
                  <div className="text-[10px] text-[#8E95A1] uppercase tracking-[0.08em]">ETA</div>
                  <div className="text-xs text-[#F2F4F7] font-heading font-semibold">{ship.eta}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TrackingMap() {
  const points = [
    { x: 75, y: 45, label: "Shanghai" },
    { x: 48, y: 38, label: "Rotterdam" },
    { x: 55, y: 55, label: "Dubai" },
    { x: 20, y: 42, label: "New York" },
    { x: 15, y: 60, label: "São Paulo" },
  ];

  return (
    <div className="mt-8">
      <h2 className="font-heading font-bold text-base uppercase tracking-[0.02em] text-[#F2F4F7] mb-4">Live Tracking Network</h2>
      <div className="glass-manifest rounded-lg p-6 relative overflow-hidden" style={{ aspectRatio: "21/9" }}>
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(rgba(200,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* SVG routes */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1="75%" y1="45%" x2="48%" y2="38%" stroke="#C8FF00" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
          <line x1="75%" y1="45%" x2="55%" y2="55%" stroke="#C8FF00" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
          <line x1="48%" y1="38%" x2="20%" y2="42%" stroke="#C8FF00" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
          <line x1="20%" y1="42%" x2="15%" y2="60%" stroke="#C8FF00" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
        </svg>

        {/* Points */}
        {points.map((pt, i) => (
          <div key={pt.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pt.x}%`, top: `${pt.y}%` }}>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#C8FF00]" style={{ boxShadow: "0 0 12px rgba(200,255,0,0.6)" }} />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#C8FF00] animate-ping opacity-30" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-[#8E95A1] font-heading font-medium uppercase tracking-[0.08em]">
                {pt.label}
              </div>
            </div>
          </div>
        ))}

        {/* Center label */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
            <span className="text-[10px] text-[#C8FF00] font-heading uppercase tracking-[0.1em]">5 active routes</span>
          </div>
        </div>
      </div>
    </div>
  );
}