'use client'

export default function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <>
      {/* ====== DESKTOP HEADER ====== */}
      <header className="header">
        <a href="/" className="header-logo">
          <img src="/logo.png" alt="ADM" />
        </a>
        <div className="header-nav-pill-wrap" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <nav className="header-nav-pill">
            <a href="/portfolio">Portfolio</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div className="header-start-btn" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <a href="/contact" className="btn-primary btn-accent">Get a Quote</a>
        </div>
      </header>

      {/* ====== MOBILE HEADER ====== */}
      <div className="mobile-header">
        <div className="mobile-header-inner">
          <a href="/" className="header-logo">
            <img src="/logo.png" alt="ADM" />
          </a>
          <button className="hamburger" onClick={onMenuOpen} aria-label="Open menu">
            <svg width="30" height="30" viewBox="0 0 60 60" fill="none">
              <rect x="12" y="18" width="36" height="3" rx="1.5" fill="white"/>
              <rect x="12" y="28.5" width="36" height="3" rx="1.5" fill="white"/>
              <rect x="12" y="39" width="36" height="3" rx="1.5" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
