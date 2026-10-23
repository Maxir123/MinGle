'use client';

import { useState } from 'react';

export default function AdBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fade-in"
      style={{
        marginTop: 18,
        marginBottom: 18,
        borderRadius: 18,
        overflow: 'hidden',
        border: '1.5px solid #bbf7d0',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        boxShadow: '0 4px 18px rgba(22,163,74,0.12)',
        position: 'relative',
      }}
    >
      {/* Top Accent Stripe */}
      <div
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #dc2626 100%)',
          width: '100%',
        }}
      />

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        style={{
          position: 'absolute',
          top: 10,
          right: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          fontSize: 18,
          lineHeight: 1,
          fontWeight: 800,
          padding: 3,
        }}
      >
        ×
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 18px',
          flexWrap: 'wrap',
        }}
      >
        {/* Poster image thumbnail */}
        <a
          href="https://abuadsupply.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: 72,
            height: 90,
            borderRadius: 12,
            overflow: 'hidden',
            flexShrink: 0,
            border: '1.5px solid #16a34a',
            boxShadow: '0 4px 12px rgba(22,163,74,0.2)',
          }}
        >
          <img
            src="/abuadsupply-poster.jpg"
            alt="Abuad Supply"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        </a>

        {/* Copy */}
        <div style={{ flex: '1 1 240px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                borderRadius: 5,
                padding: '1px 6px',
                fontSize: 9.5,
                fontWeight: 900,
                letterSpacing: '0.04em',
              }}
            >
              ABUAD SUPPLY 2025
            </span>
            <span
              style={{
                background: '#ecfdf5',
                color: '#15803d',
                borderRadius: 5,
                padding: '1px 6px',
                fontSize: 9.5,
                fontWeight: 800,
              }}
            >
              🚚 FREE DELIVERY
            </span>
          </div>

          <h4
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: '#111827',
              margin: '0 0 3px',
              letterSpacing: '-0.3px',
            }}
          >
            Everything You Need, <span style={{ color: '#16a34a' }}>IN ONE PLACE!</span>
          </h4>

          <p style={{ fontSize: 12, color: '#4b5563', margin: 0, lineHeight: 1.45 }}>
            Hostel essentials, electronics, fashion, food, snacks &amp; student services with fast campus delivery.
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://abuadsupply.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            textDecoration: 'none',
            flexShrink: 0,
            background: btnHover
              ? 'linear-gradient(135deg, #15803d 0%, #047857 100%)'
              : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            color: 'white',
            fontSize: 12.5,
            fontWeight: 800,
            fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
            transition: 'all 0.15s ease',
            transform: btnHover ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          Shop Now 🛍️ ↗
        </a>
      </div>
    </div>
  );
}
