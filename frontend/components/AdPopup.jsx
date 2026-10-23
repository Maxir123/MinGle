'use client';

import { useState } from 'react';

export default function AdPopup({ onClose }) {
  const [btnHover, setBtnHover] = useState(false);
  const [showFlyer, setShowFlyer] = useState(false);

  return (
    <>
      {/* Fullscreen Flyer Lightbox */}
      {showFlyer && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setShowFlyer(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: 440,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ color: '#86efac', fontWeight: 800, fontSize: 13 }}>
                Abuad Supply 2025 Official Flyer
              </span>
              <button
                onClick={() => setShowFlyer(false)}
                aria-label="Close"
                style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: 20,
                  padding: '5px 14px',
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: '#111827',
                }}
              >
                ✕ Close
              </button>
            </div>

            <img
              src="/abuadsupply-poster.jpg"
              alt="Abuad Supply Full Poster"
              style={{
                width: '100%',
                maxHeight: '74vh',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,197,94,0.3)',
              }}
            />

            <a
              href="https://abuadsupply.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 12,
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '12px',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                fontWeight: 900,
                fontSize: 14,
                borderRadius: 12,
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(22,163,74,0.5)',
              }}
            >
              Visit abuadsupply.com ↗
            </a>
          </div>
        </div>
      )}

      {/* Main Promo Modal */}
      <div
        className="fade-in"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(5, 30, 15, 0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="fade-in-up"
          style={{
            background: '#ffffff',
            borderRadius: 24,
            overflow: 'hidden',
            width: '100%',
            maxWidth: 460,
            boxShadow: '0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(22, 163, 74, 0.2)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
          }}
        >
          {/* Top Free Delivery Banner */}
          <div
            style={{
              background: 'linear-gradient(90deg, #15803d 0%, #16a34a 50%, #dc2626 100%)',
              color: 'white',
              padding: '7px 16px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🚚</span>
              <span>FREE delivery on ABUAD campus</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: 'none',
                borderRadius: '50%',
                width: 22,
                height: 22,
                color: 'white',
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Scrollable Body */}
          <div style={{ overflowY: 'auto', padding: '18px 20px 20px' }}>
            {/* Header with Poster & Brand */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
              {/* Poster Thumbnail with Click to Expand */}
              <button
                onClick={() => setShowFlyer(true)}
                title="Click to view full flyer"
                style={{
                  display: 'block',
                  width: 105,
                  height: 130,
                  borderRadius: 14,
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
                  border: '2px solid #22c55e',
                  position: 'relative',
                  padding: 0,
                  cursor: 'pointer',
                  background: 'none',
                }}
              >
                <img
                  src="/abuadsupply-poster.jpg"
                  alt="Abuad Supply Poster"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#86efac',
                    fontSize: 8.5,
                    fontWeight: 900,
                    textAlign: 'center',
                    padding: '3px 0',
                    letterSpacing: '0.04em',
                  }}
                >
                  VIEW FLYER 🔍
                </div>
              </button>

              {/* Brand Titles */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      fontSize: 10,
                      fontWeight: 900,
                      padding: '2px 7px',
                      borderRadius: 6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    ABUAD SUPPLY 2025
                  </span>
                  <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 800 }}>
                    ★ 100% Campus
                  </span>
                </div>

                <h3
                  style={{
                    margin: '0 0 4px',
                    fontSize: 19,
                    fontWeight: 900,
                    lineHeight: 1.2,
                    color: '#111827',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Everything You Need,{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #16a34a, #dc2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    IN ONE PLACE!
                  </span>
                </h3>

                <p style={{ margin: 0, fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
                  Spend less, enjoy more. Your campus marketplace &amp; beyond!
                </p>
              </div>
            </div>

            {/* Quick Value Props Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
                marginBottom: 14,
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 14,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#166534' }}>
                <span>🛡️</span>
                <span>Trusted Vendors</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#166534' }}>
                <span>🚚</span>
                <span>Campus Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#166534' }}>
                <span>🏷️</span>
                <span>Great Deals &amp; Discounts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#166534' }}>
                <span>🔒</span>
                <span>Secure Payments</span>
              </div>
            </div>

            {/* Categories Pill List */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>
                Shop Products &amp; Book Services:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {[
                  '👕 Fashion',
                  '📱 Electronics',
                  '🍕 Food & Drinks',
                  '🏠 Hostel Essentials',
                  '🍎 Provisions',
                  '💄 Beauty & Hair',
                  '💻 Tech & Coding Help',
                  '🎮 Gaming',
                ].map((cat, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: 20,
                      padding: '3px 8px',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#374151',
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary CTA Button */}
            <a
              href="https://abuadsupply.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '13px 20px',
                borderRadius: 14,
                textDecoration: 'none',
                background: btnHover
                  ? 'linear-gradient(135deg, #15803d 0%, #047857 100%)'
                  : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: 'white',
                fontSize: 14,
                fontWeight: 900,
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
                boxShadow: '0 6px 20px rgba(22, 163, 74, 0.4)',
                transform: btnHover ? 'translateY(-1px)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Start Shopping on Abuad Supply</span>
              <span style={{ fontSize: 16 }}>🛍️ ↗</span>
            </a>

            {/* Footer Contact */}
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 11,
                color: '#6b7280',
                fontWeight: 600,
              }}
            >
              <span>📞 0704 166 5118</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>Together We Grow!</span>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  fontSize: 11,
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
