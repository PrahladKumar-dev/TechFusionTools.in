
import { useState } from "react";
import "./Header.css";

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Categories", "#categories"],
  ["Products", "#products"],
  ["Why Us", "#why-us"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a
          className="brand-animated"
          href="#home"
          aria-label="TechFusion Tools home"
          onClick={closeMobileMenu}
        >
          <span className="brand-emblem">
            <img
              src="/assets/logo-emblem.svg"
              alt=""
              draggable="false"
            />
          </span>

          <span className="brand-wordmark">
            <img
              src="/assets/logo-wordmark-continuous.svg"
              alt=""
              draggable="false"
            />
          </span>

          <span className="brand-tools">
            <img
              src="/assets/logo-tools-fixed.svg"
              alt=""
              draggable="false"
            />
          </span>

          <span className="sr-only">TechFusion Tools</span>
        </a>

        <nav
          className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeMobileMenu}
            >
              {label}
            </a>
          ))}

          <a
            className="admin-link"
            href="/admin.html"
            onClick={closeMobileMenu}
          >
            <span aria-hidden="true">✦</span>
            Admin
          </a>
        </nav>

        <button
          className="mobile-menu"
          type="button"
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
