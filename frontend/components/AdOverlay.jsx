'use client';

import { useState, useEffect } from 'react';

export default function AdOverlay({ onClose }) {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanSkip(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20

  return (
    <div
      className="fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 20, 10, 0.88)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: 16,
      }}
    >
      <div
        className="fade-in-up"
        style={{
          background: '#0f172a',
          borderRadius: 22,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(34,197,94,0.3)',
          position: 'relative',
        }}
      >
        {/* Top bar with Free Delivery */}
        <div
          style={{
            background: 'linear-gradient(90deg, #15803d, #16a34a, #dc2626)',
            padding: '6px 14px',
            color: 'white',
            fontSize: 10.5,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>🚚 FREE DELIVERY ON CAMPUS</span>
          <span style={{ opacity: 0.9 }}>Together We Grow!</span>
        </div>

        {/* Skip button / Countdown */}
        <div style={{ position: 'absolute', top: 40, right: 14, zIndex: 10 }}>
          {canSkip ? (
            <button
              onClick={onClose}
              className="fade-in"
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: 'white',
                color: '#15803d',
                fontWeight: 900,
                fontSize: 12,
                fontFamily: 'Nunito, sans-serif',
                boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              Skip Ad ⏩
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="42" height="42" viewBox="0 0 46 46" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="23"
                  cy="23"
                  r="20"
                  fill="rgba(0,0,0,0.4)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                />
                <circle
                  cx="23"
                  cy="23"
                  r="20"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * (5 - countdown)) / 5}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <text
                  x="23"
                  y="23"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                  style={{ transform: 'rotate(90deg)', transformOrigin: '23px 23px' }}
                >
                  {countdown}
                </text>
              </svg>
            </div>
          )}
        </div>

        {/* Visual Poster Area */}
        <div
          style={{
            position: 'relative',
            height: 230,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #1e1b4b 100%)',
          }}
        >
          <img
            src="/abuadsupply-poster.jpg"
            alt="Abuad Supply Poster"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              filter: 'brightness(0.9)',
            }}
          />

          {/* Overlay gradient for text readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.6) 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 16,
              right: 16,
              textAlign: 'left',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: '#dc2626',
                color: 'white',
                fontSize: 9.5,
                fontWeight: 900,
                padding: '2px 7px',
                borderRadius: 5,
                marginBottom: 4,
                letterSpacing: '0.04em',
              }}
            >
              ABUAD SUPPLY 2025
            </div>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: 18, margin: '0 0 2px' }}>
              Everything You Need, <span style={{ color: '#22c55e' }}>IN ONE PLACE!</span>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: 11.5, margin: 0 }}>
              Hostel essentials, electronics, fashion, food &amp; verified student services.
            </p>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: '#0b1120',
          }}
        >
          <div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 13, margin: '0 0 2px' }}>
              abuadsupply.com
            </p>
            <p style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, margin: 0 }}>
              Spend less, enjoy more.
            </p>
          </div>

          <a
            href="https://abuadsupply.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '9px 18px',
              borderRadius: 10,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white',
              fontSize: 13,
              fontWeight: 800,
              fontFamily: 'Nunito, sans-serif',
              flexShrink: 0,
              boxShadow: '0 2px 14px rgba(22,163,74,0.4)',
            }}
          >
            Visit Store 🛍️ ↗
          </a>
        </div>
      </div>
    </div>
  );
}
