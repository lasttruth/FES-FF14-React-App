import React from "react";
import { Link } from "react-router-dom";
import ufo from "../assets/ufo.png"; // Keeping your existing asset

function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center font-sans">
      {/* 1. Ambient Background Orbs (The 'Light Leaks') */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* TEXT CONTENT SECTION */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                Eorzea's Premier Collection
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none">
              Track your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-500">
                Legendary
              </span>{" "}
              <br />
              Journey
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              The most advanced Final Fantasy XIV database for tracking mounts,
              minions, and rare achievements across the realm. Join the hunt
              today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/mounts"
                className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Browse Mounts
              </Link>
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* HERO IMAGE SECTION */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Glassmorphic Image Frame */}
            <div className="relative p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105">
              <img
                src={ufo}
                alt="Featured Content"
                className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              />
            </div>
            {/* Decorative Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-3xl shadow-2xl animate-bounce">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                Total Mounts
              </p>
              <p className="text-2xl font-black italic">840+</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
