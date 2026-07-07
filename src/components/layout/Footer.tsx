import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">© 2026 Laser Clauss Latupeirissa. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-solid fa-envelope text-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
