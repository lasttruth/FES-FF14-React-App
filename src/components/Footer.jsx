import React from "react";
import logo from "../assets/ff14icon.png";

function Footer() {
  return (
    <footer className="w-full px-6 py-12 flex justify-center border-t border-white/5 bg-black">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 opacity-50" />
            <span className="text-sm font-black italic uppercase tracking-widest text-slate-500">
              Final Fantasy XIV Collection Database
            </span>
          </div>
          <p className="text-[10px] text-slate-600 max-w-xs leading-relaxed text-center md:text-left">
            This site is for educational purposes and is not affiliated with
            SQUARE ENIX CO., LTD. All game content and imagery are property of
            their respective owners.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-6 mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-white transition-colors">
              API Docs
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
          <p className="text-[10px] text-slate-700 font-black tracking-widest uppercase">
            &copy; {new Date().getFullYear()} XIVCOLLECT • v2.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
