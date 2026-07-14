import { Link } from "react-router-dom";

const socials = [
  { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/Lasercl" },
  {
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin-in",
    href: "https://www.linkedin.com/in/laser-clauss-latupeirissa-6a4a3829a/",
  },
  {
    label: "Instagram",
    icon: "fa-brands fa-instagram",
    href: "https://www.instagram.com/laser_cl?igsh=MTU0YzV3YzNxeGxiNg==",
  },
  { label: "WhatsApp", icon: "fa-brands fa-whatsapp", href: "https://wa.me/6282134361144" },
];

export default function Footer() {
  return (
    <footer className="relative glass border-t border-white/10 py-10 mt-12">
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-gradient">Laser Clauss Latupeirissa</p>
          <p className="text-gray-500 text-sm mt-1">
            © 2026 All rights reserved · Built with React, Three.js & Tailwind
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/30 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <i className={social.icon} />
            </a>
          ))}
          <Link
            to="/contact"
            aria-label="Contact"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/30 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fa-solid fa-envelope" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
