// src/components/Mount.jsx
import React from "react";
import typeicon from "../assets/ff14icon.png";
import { Link } from "react-router-dom";
import { getRarity } from "../utils/rarity";

function Mount({ mount }) {
  const rarity = getRarity(mount.owned);

  return (
    <Link
      to={`/mounts/${mount.id}`}
      className={`group block bg-white/[0.03] backdrop-blur-lg border ${rarity.border} ${rarity.shadow} rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2`}
    >
      <figure className="relative aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={mount.image}
          alt={mount.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Rarity Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${rarity.color} shadow-lg`}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-white">
            {rarity.label}
          </p>
        </div>

        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300">
          P-{mount.patch}
        </div>
      </figure>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <img
            className="w-5 h-5 opacity-50 brightness-200"
            src={typeicon}
            alt=""
          />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 truncate">
            {mount.sources?.[0]?.type || "Unknown"}
          </p>
        </div>

        <h4
          className={`text-2xl font-black italic uppercase tracking-tighter leading-tight transition-colors ${rarity.label === "Legendary" ? "text-orange-400" : "group-hover:text-blue-400"}`}
        >
          {mount.name}
        </h4>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-1 italic">
              Ownership
            </p>
            <p
              className={`text-sm font-bold ${rarity.label === "Legendary" ? "text-orange-400" : "text-slate-300"}`}
            >
              {mount.owned}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-1 italic">
              ID
            </p>
            <p className="text-sm font-bold text-slate-300">#{mount.id}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Mount;
