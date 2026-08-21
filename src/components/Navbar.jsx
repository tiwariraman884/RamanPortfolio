import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "INDEX", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1Jc1ZbQGYGFF40yneorPwTcV0qpUrqbw0/view?usp=sharing";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{
          y: -25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <a href="#top" className="logo">
          RAMAN KUMAR TIWARI
        </a>

        <nav
          className="nav-links"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);

            return (
              <a
                key={item.label}
                href={item.href}
                className={
                  activeSection === sectionId
                    ? "active"
                    : ""
                }
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <a
            href={RESUME_URL}
            className="resume-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESUME ↗
          </a>

          <button
            type="button"
            className={`menu-button ${
              menuOpen ? "open" : ""
            }`}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((current) => !current)
            }
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <motion.div
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        }`}
        initial={false}
        animate={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen
            ? "auto"
            : "none",
        }}
        transition={{ duration: 0.25 }}
      >
        <nav>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}

          <a
            href= {RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
          >
            RESUME ↗
          </a>
        </nav>
      </motion.div>
    </>
  );
}