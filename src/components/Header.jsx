import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ff14icon.png";
import { getActiveProfile, clearActiveProfile } from "../utils/profileTracker"; // 🌟 Added import
import ProfileModal from "./ProfileModal";

function Header() {
  const location = useLocation();
  const [activeProfile, setActiveProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setActiveProfile(getActiveProfile());
  }, []);

  const handleProfileCreated = (profile) => {
    setActiveProfile(profile);
  };

  // 🌟 Added handler to trigger a complete session clear and UI reset
  const handleDisconnect = () => {
    clearActiveProfile();
    setActiveProfile(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full px-6 py-4 flex justify-center">
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

          {/* Action Area Section */}
          <div className="hidden md:block">
            {activeProfile ? (
              /* 🌟 UPGRADED CHARACTER PILL: Added cursor-pointer, hover transitions, and click-to-disconnect */
              <div
                onClick={handleDisconnect}
                title="Click to Disconnect Character"
                className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl pl-2 pr-4 py-1.5 shadow-xl cursor-pointer hover:border-red-500/30 hover:bg-red-500/[0.01] transition-all duration-300 group/profile"
              >
                {activeProfile.avatarUrl ? (
                  <img
                    src={activeProfile.avatarUrl}
                    alt={activeProfile.characterName}
                    className="w-7 h-7 rounded-lg border border-white/10 object-cover shadow-inner group-hover/profile:border-red-500/20"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse ml-2 group-hover/profile:bg-red-400" />
                )}

                <div className="flex flex-col items-start leading-none">
                  {/* Subtle red indicator shift on hover text */}
                  <span className="text-[10px] font-black uppercase tracking-wider text-white group-hover/profile:text-red-400 transition-colors">
                    {activeProfile.characterName}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mt-1 group-hover/profile:text-red-500/60 transition-colors">
                    Lv{activeProfile.mainJobLevel || 100}{" "}
                    {activeProfile.mainJob}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all shadow-lg"
              >
                Connect Character
              </button>
            )}
          </div>
        </div>
      </nav>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileCreated={handleProfileCreated}
      />
    </>
  );
}

export default Header;
