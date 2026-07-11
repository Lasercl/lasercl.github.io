import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { asset } from "../../lib/asset";

const sectionLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills & Experience", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 50;

  return (
    <nav
      className={`fixed w-full z-50 glass transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/#home" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-sm font-extrabold shadow-[0_0_15px_rgba(109,40,217,0.6)] group-hover:shadow-[0_0_25px_rgba(109,40,217,0.9)] transition-shadow">
            LC
          </span>
          <span className="text-xl font-bold tracking-wider text-white glow-text hidden sm:inline">
            Laser Clauss
          </span>
        </Link>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars text-2xl" />
        </button>

        <div className="hidden md:flex space-x-8 items-center">
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-indigo-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-indigo-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </Link>
          <a
            href="https://github.com/Lasercl"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-gray-300 hover:text-white transition-colors text-xl"
          >
            <i className="fa-brands fa-github" />
          </a>

          <div className="relative group">
            <button className="px-5 py-2.5 bg-primary/80 hover:bg-primary text-white rounded-full transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(109,40,217,0.5)]">
              <span>Resume</span> <i className="fa-solid fa-chevron-down text-xs" />
            </button>
            <div className="absolute right-0 mt-2 w-48 glass rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top shadow-2xl">
              <a href={asset("pdf/CVNEW_10Mei2026.pdf")} className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-white transition-colors">
                My CV
              </a>
              <a href={asset("pdf/portfolio.pdf")} className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-white transition-colors">
                My Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-300 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <a href={asset("pdf/CVNEW_10Mei2026.pdf")} className="text-primary font-medium">
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
