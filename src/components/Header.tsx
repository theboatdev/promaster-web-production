"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="nav-row">
          <Link href="/" className="nav-logo" aria-label="Pro Master home" onClick={closeMenu}>

            <span className="nav-logo-text">
              Pro<span>Master</span>
            </span>
          </Link>

          <nav className="nav-groups">
            <div className="nav-group">
              <Link className="nav-group-label" href="/products">Products</Link>
            </div>
            <div className="nav-group">
              <span className="nav-group-label">Company</span>
              <div className="nav-dropdown">
                <Link href="/about">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/distributors">Distributors</Link>
                <Link href="/careers">Careers</Link>
              </div>
            </div>
            <div className="nav-group">
              <span className="nav-group-label">Resources</span>
              <div className="nav-dropdown">
                <a href="/technical-data-sheets">Technical Data Sheets</a>
                <a href="#resources">Safety Data Sheets</a>
                <a href="#resources">Application Guides</a>
                <a href="#resources">Downloads</a>
              </div>
            </div>
          </nav>

          <div className="nav-right">
            <span className="newsletter-label">Newsletter</span>
            <div className="toggle-btn" />
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay${mobileMenuOpen ? " open" : ""}`}>
        <div className="mobile-menu-group">
          <span className="mobile-menu-label">Products</span>
          <div className="mobile-menu-links">
            <Link href="/products" className="mobile-menu-link" onClick={closeMenu}>All Products</Link>
          </div>
        </div>

        <div className="mobile-menu-group">
          <span className="mobile-menu-label">Company</span>
          <div className="mobile-menu-links">
            <Link href="/about" className="mobile-menu-link" onClick={closeMenu}>About</Link>
            <Link href="/projects" className="mobile-menu-link" onClick={closeMenu}>Projects</Link>
            <Link href="/distributors" className="mobile-menu-link" onClick={closeMenu}>Distributors</Link>
            <Link href="/careers" className="mobile-menu-link" onClick={closeMenu}>Careers</Link>
          </div>
        </div>

        <div className="mobile-menu-group">
          <span className="mobile-menu-label">Resources</span>
          <div className="mobile-menu-links">
            <Link href="/technical-data-sheets" className="mobile-menu-link" onClick={closeMenu}>Technical Data Sheets</Link>
            <Link href="#resources" className="mobile-menu-link" onClick={closeMenu}>Safety Data Sheets</Link>
            <Link href="#resources" className="mobile-menu-link" onClick={closeMenu}>Application Guides</Link>
            <Link href="#resources" className="mobile-menu-link" onClick={closeMenu}>Downloads</Link>
          </div>
        </div>
      </div>
    </>
  );
}
