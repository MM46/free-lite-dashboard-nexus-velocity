import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, LayoutDashboard, Settings, LogOut, Menu, X, ChevronRight, Users, BarChart3, DollarSign, Boxes, MapPin, Bell } from "lucide-react";

const CLIENT_NAV = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Shipments", path: "/dashboard/shipments", icon: Package },
  { label: "Tracking", path: "/dashboard/tracking", icon: MapPin },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

const ADMIN_NAV = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Orders", path: "/admin/orders", icon: Boxes },
  { label: "Clients", path: "/admin/clients", icon: Users },
  { label: "Rates", path: "/admin/rates", icon: DollarSign },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
];

export default function DashboardLayout({ children, variant = "client" }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = variant === "admin" ? ADMIN_NAV : CLIENT_NAV;
  const title = variant === "admin" ? "Admin Console" : "Client Portal";

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-50 glass-manifest border-r border-[#2a2d35] flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#2a2d35]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#C8FF00] flex items-center justify-center">
              <Package className="w-4 h-4 text-[#0A0B0D]" />
            </div>
            <span className="font-heading font-bold text-xs tracking-[0.12em] uppercase text-[#F2F4F7]">
              Nexus<span className="text-[#C8FF00]">.</span>Velocity
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#8E95A1]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Variant badge */}
        <div className="px-5 py-3">
          <span className={`text-[10px] uppercase tracking-[0.12em] font-heading font-medium px-2 py-1 rounded ${
            variant === "admin" ? "bg-[#C8FF00]/10 text-[#C8FF00]" : "bg-[#2a2d35] text-[#8E95A1]"
          }`}>
            {title}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-heading font-medium uppercase tracking-[0.06em] transition-all duration-200 group ${
                  active
                    ? "bg-[#C8FF00]/10 text-[#C8FF00] border-l-2 border-[#C8FF00]"
                    : "text-[#8E95A1] hover:text-[#F2F4F7] hover:bg-[#16181D]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Switch panel */}
        <div className="px-3 py-3 border-t border-[#2a2d35]">
          <Link
            to={variant === "admin" ? "/dashboard" : "/admin"}
            className="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-heading font-medium uppercase tracking-[0.06em] text-[#8E95A1] hover:text-[#F2F4F7] hover:bg-[#16181D] transition-all"
          >
            <Truck className="w-4 h-4" />
            {variant === "admin" ? "Client Portal" : "Admin Console"}
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-heading font-medium uppercase tracking-[0.06em] text-[#8E95A1] hover:text-[#F2F4F7] hover:bg-[#16181D] transition-all"
          >
            <LogOut className="w-4 h-4" />
            Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 glass-manifest border-b border-[#2a2d35] flex items-center justify-between px-5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#8E95A1]">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#8E95A1]">{title}</div>
              <div className="text-sm font-heading font-bold text-[#F2F4F7]">
                {nav.find(n => n.path === location.pathname)?.label || "Overview"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded border border-[#2a2d35] flex items-center justify-center hover:border-[#C8FF00]/30 transition-colors" aria-label="Notifications">
              <Bell className="w-4 h-4 text-[#8E95A1]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C8FF00]" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center">
                <span className="text-xs font-heading font-bold text-[#C8FF00]">JC</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-[#F2F4F7] font-heading font-semibold">John Carter</div>
                <div className="text-[10px] text-[#8E95A1]">{variant === "admin" ? "Administrator" : "Client"}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}