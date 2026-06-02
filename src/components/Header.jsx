import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ff14icon.png";

function Header() {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/mounts", label: "Mounts" },
    { path: "/minions", label: "Minions" }, // FFXIV-103: Added Minions target entry
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 flex justify-center">
      {/* Glassmorphic Nav Bar */}
      <div className="w-full max-w-7xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-3 flex items-center justify-between shadow-2xl">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-black italic uppercase tracking-tighter hidden md:block">
            XIV<span className="text-blue-500">COLLECT</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Mounts", path: "/mounts" },
            { name: "Minions", path: "/minions" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-blue-400 ${
                  isActive(link.path) ? "text-blue-400" : "text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:block">
          <button className="bg-white text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 transition-colors shadow-lg">
            Connect Character
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
