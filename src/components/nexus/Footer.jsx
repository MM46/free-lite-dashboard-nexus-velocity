import React from "react";
import { Package, ArrowUpRight } from "lucide-react";

const LINKS = {
  Services: [
    { label: "Ocean Freight", href: "#services" },
    { label: "Air Cargo", href: "#services" },
    { label: "Warehousing", href: "#services" },
    { label: "Last Mile", href: "#services" },
    { label: "Customs", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#hero" },
    { label: "Careers", href: "#hero" },
    { label: "Press", href: "#hero" },
    { label: "Contact", href: "#manifest" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#hero" },
    { label: "Terms of Service", href: "#hero" },
    { label: "Cookie Policy", href: "#hero" },
  ],
};

const OFFICES = [
  "Shanghai", "Rotterdam", "Singapore", "Houston", "Dubai",
];

export default function Footer() {
  const scrollTo = (id) => {
    const clean = id.replace("#", "");
    document.getElementById(clean)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#2a2d35]">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-[#C8FF00] flex items-center justify-center">
                <Package className="w-4 h-4 text-[#0A0B0D]" />
              </div>
              <span className="font-heading font-bold text-sm tracking-[0.12em] uppercase text-[#F2F4F7]">
                Nexus<span className="text-[#C8FF00]">.</span>Velocity
              </span>
            </div>
            <p className="text-sm text-[#8E95A1] leading-relaxed max-w-xs mb-6">
              Redefining global commerce as a fluid, high-resolution stream of 
              data and motion. 194 countries. One platform.
            </p>
            {/* Office locations */}
            <div className="flex flex-wrap gap-2">
              {OFFICES.map(city => (
                <span key={city} className="text-[10px] uppercase tracking-[0.1em] text-[#8E95A1] px-2 py-1 rounded border border-[#2a2d35]">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] uppercase tracking-[0.16em] text-[#C8FF00] font-heading font-medium mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-sm text-[#8E95A1] hover:text-[#F2F4F7] transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#2a2d35] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8E95A1]">
            © 2026 Nexus Velocity. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#8E95A1] hover:text-[#F2F4F7] transition-colors" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#8E95A1] hover:text-[#F2F4F7] transition-colors" aria-label="X (Twitter)">X</a>
            <a href="mailto:hello@nexusvelocity.com" className="text-xs text-[#8E95A1] hover:text-[#F2F4F7] transition-colors" aria-label="Email">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}