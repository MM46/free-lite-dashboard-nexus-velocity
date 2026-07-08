import React from "react";
import Navbar from "@/components/nexus/Navbar";
import HeroSection from "@/components/nexus/HeroSection";
import Footer from "@/components/nexus/Footer";

export default function Home() {
  return (
    <div className="bg-[#0A0B0D] min-h-screen text-[#E4E4E7] flex flex-col justify-between antialiased selection:bg-zinc-800 selection:text-white relative">
      <div>
        <Navbar />
        <HeroSection />

        {/* ─── POPUP FLOTANTE EN BLANCO (MÁXIMO CONTRASTE) ─── */}
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          maxWidth: '360px',
          width: 'calc(100% - 48px)',
          backgroundColor: '#FFFFFF', // Fondo blanco puro
          border: '1px solid #E4E4E7',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          fontFamily: 'sans-serif'
        }}>
          {/* Línea superior con tu verde neón de marca */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: '#D4FF00'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#71717A' // Texto gris oscuro sobre blanco
              }}>
                Nexus Velocity Suite
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#18181B',
                backgroundColor: '#F4F4F5',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #E4E4E7'
              }}>
                LITE
              </span>
            </div>
            
            <h4 style={{
              margin: '4px 0 0 0',
              fontSize: '18px',
              fontWeight: '800',
              color: '#09090B', // Título negro profundo
              letterSpacing: '-0.025em'
            }}>
              Unlock Premium Modules
            </h4>
            
            <p style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: '1.5',
              color: '#444446' // Descripción en gris legible
            }}>
              Get full access to all analytical grids, live logistics tracking tables, charts, and secure authentication flows.
            </p>

            <div style={{ marginTop: '12px' }}>
              <a 
                href="https://payhip.com/b/1i5us" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  boxSizing: 'border-box',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#D4FF00', // Mantiene tu color de marca
                  color: '#000000',
                  fontWeight: '700',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(212, 255, 0, 0.2)',
                  transition: 'transform 0.1s ease, background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bce600'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D4FF00'}
              >
                Upgrade to Full License ⚡
              </a>
            </div>
          </div>
        </div>
        {/* ─────────────────────────────────────────────────── */}
      </div>

      <Footer />
    </div>
  );
}
