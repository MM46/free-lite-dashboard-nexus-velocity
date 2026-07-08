import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Menu, X, LayoutDashboard, Shield } from "lucide-react";

const NAV_ITEMS = [
  { label: "Command Center", id: "hero" },
  { label: "Services", id: "services" },
  { label: "Rate Engine", id: "rates" },
  { label: "Manifest", id: "manifest" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(s => s.el);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const activeIndex = NAV_ITEMS.findIndex(n => n.id === activeSection);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-manifest" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group" aria-label="Nexus Velocity Home">
          <div className="w-8 h-8 rounded bg-[#C8FF00] flex items-center justify-center">
            <Package className="w-4 h-4 text-[#0A0B0D]" />
          </div>
          <span className="font-heading font-bold text-sm tracking-[0.12em] uppercase text-[#F2F4F7]">
            Nexus<span className="text-[#C8FF00]">.</span>Velocity
          </span>
        </button>

        {/* Desktop nav with moving indicator */}
        <div className="hidden md:flex items-center relative">
          <div className="flex items-center gap-1 relative">
            {/* Track line */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-[#2a2d35]" />
            {/* Moving package indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C8FF00] z-10"
              animate={{ left: `${activeIndex * 140 + 50}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ boxShadow: "0 0 12px rgba(200,255,0,0.5)" }}
            />
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative z-10 px-4 py-2 text-xs tracking-[0.08em] uppercase transition-colors duration-300 font-heading font-medium ${
                  activeSection === item.id ? "text-[#C8FF00]" : "text-[#8E95A1] hover:text-[#F2F4F7]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA + Mobile menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-[#8E95A1] hover:text-[#F2F4F7] transition-colors font-heading font-medium"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Client
          </Link>
          <Link
            to="/admin"
            className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-[#8E95A1] hover:text-[#F2F4F7] transition-colors font-heading font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </Link>
          <button
            onClick={() => scrollTo("manifest")}
            className="hidden md:flex btn-scan-line bg-[#C8FF00] text-[#0A0B0D] px-5 h-10 items-center text-xs font-heading font-bold uppercase tracking-[0.08em] rounded-sm hover:bg-[#d4ff33] transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#F2F4F7]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-manifest border-t border-[#C8FF00]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3 py-3 text-sm font-heading uppercase tracking-[0.08em] rounded transition-colors ${
                    activeSection === item.id
                      ? "text-[#C8FF00] bg-[#C8FF00]/5"
                      : "text-[#8E95A1] hover:text-[#F2F4F7]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 mt-2">
                <Link to="/dashboard" className="flex-1 flex items-center justify-center gap-1.5 px-3 h-12 border border-[#2a2d35] rounded text-xs font-heading font-bold uppercase tracking-[0.08em] text-[#8E95A1]">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Client
                </Link>
                <Link to="/admin" className="flex-1 flex items-center justify-center gap-1.5 px-3 h-12 border border-[#2a2d35] rounded text-xs font-heading font-bold uppercase tracking-[0.08em] text-[#8E95A1]">
                  <Shield className="w-3.5 h-3.5" /> Admin
                </Link>
              </div>
              <button
                onClick={() => scrollTo("manifest")}
                className="mt-2 btn-scan-line bg-[#C8FF00] text-[#0A0B0D] px-5 h-12 text-xs font-heading font-bold uppercase tracking-[0.08em] rounded-sm"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}