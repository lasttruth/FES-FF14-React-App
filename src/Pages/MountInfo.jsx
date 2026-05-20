import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import typeicon from "../assets/ff14icon.png";
import axios from "axios";
import { getRarity } from "../utils/rarity";
import { isMountCollected, toggleMountCollection } from "../utils/tracker";
import { motion } from "framer-motion";

function Mountsmount() {
  const [mount, setMount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isCollected, setIsCollected] = useState(false);
  const navigate = useNavigate();

  const handleTrackToggle = () => {
    toggleMountCollection(mount.id);
    setIsCollected(!isCollected);
  };

  async function renderMounts() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ffxivcollect.com/api/mounts/${id}`,
      );
      setMount(data);
    } catch (error) {
      console.error("Error fetching mount:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    renderMounts();
  }, [id]);

  useEffect(() => {
    if (mount) {
      setIsCollected(isMountCollected(mount.id));
    }
  }, [mount]);

  // 1. DATA GUARD: This must come BEFORE any rarity logic
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-blue-500 animate-pulse font-black uppercase tracking-widest">
          Loading Intel...
        </div>
      </div>
    );
  }

  // 2. ADDITIONAL GUARD: If mount is still null after loading, don't crash
  if (!mount) return null;

  // 3. NOW define rarity (Safe because mount is guaranteed to exist here)
  const rarity = getRarity(mount.owned);

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 p-6 lg:p-12 relative overflow-hidden flex justify-center font-sans">
      {/* Ambient Background Glow (Fades in slowly) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Back Button (Slides in from left) */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-all uppercase text-xs font-black tracking-widest group"
        >
          <span className="text-lg transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          Back to Database
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* IMAGE SECTION (Slides in smoothly from the left) */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 lg:sticky lg:top-12"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={mount.image}
                alt={mount.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 shadow-[inner_0_0_100px_rgba(0,0,0,0.5)]" />
            </div>
          </motion.div>

          {/* CONTENT SECTION (Elevates slightly from the bottom) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full lg:w-7/12"
          >
            {/* Glassmorphic Header & Stats Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] mb-8 shadow-2xl">
              {/* Title Block */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex-shrink-0 p-1 bg-gradient-to-br from-white/20 to-transparent rounded-2xl">
                  <img
                    src={mount.icon}
                    alt=""
                    className="w-20 h-20 rounded-xl bg-black object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-2 italic truncate">
                    {mount.name}
                  </h1>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* Dynamic Gamified Rarity Badge */}
                    <span
                      className={`text-[10px] bg-gradient-to-r ${rarity.color} text-white px-3 py-1 rounded-full font-black tracking-widest uppercase shadow-lg`}
                    >
                      {rarity.label}
                    </span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30 font-black tracking-widest uppercase whitespace-nowrap">
                      Patch {mount.patch}
                    </span>
                    <span className="text-[10px] bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/10 font-black tracking-widest uppercase whitespace-nowrap">
                      {mount.movement}
                    </span>
                    {/* DYNAMIC GAMIFIED TRACKING BUTTON */}
                    <button
                      onClick={handleTrackToggle}
                      className={`ml-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                        isCollected
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "bg-white/[0.03] border-white/10 text-slate-400 hover:border-blue-500/50 hover:text-white"
                      }`}
                    >
                      {isCollected ? "✓ In Inventory" : "+ Claim Mount"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Seamless Stats Grid (Staggered Children Entrance) */}
              <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/5 mt-8 pt-8 gap-8">
                {[
                  { label: "Capacity", value: `${mount.seats} Person` },
                  {
                    label: "Marketable",
                    value: mount.tradeable ? "Yes" : "No",
                  },
                  {
                    label: "Ownership",
                    value: mount.owned,
                    isRarityProgress: true,
                  },
                  {
                    label: "Collection ID",
                    value: `#${mount.id}`,
                    isRight: true,
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    className={stat.isRight ? "text-right min-w-0" : "min-w-0"}
                  >
                    <p
                      className={`text-[9px] uppercase tracking-[0.3em] font-black mb-1 italic ${stat.isRarityProgress ? "text-blue-400" : "text-slate-500"}`}
                    >
                      {stat.label}
                    </p>

                    {stat.isRarityProgress ? (
                      <div className="flex items-center gap-3">
                        <p className="text-xl font-bold text-white">
                          {stat.value}
                        </p>
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: mount.owned }}
                            transition={{
                              duration: 1,
                              delay: 0.8,
                              ease: "easeOut",
                            }}
                            className={`h-full bg-gradient-to-r ${rarity.color}`}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-white">
                        {stat.value}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Supplementary Info Cards (Loads seamlessly at the end) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Lore Glass Card */}
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 rounded-[2rem]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 italic">
                  Intel & Archive
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed italic mb-6">
                  "{mount.enhanced_description}"
                </p>
                <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-white/10 pl-6">
                  {mount.description}
                </p>
              </div>

              {/* Acquisition Glass Card */}
              <div className="bg-gradient-to-r from-blue-600/20 to-transparent backdrop-blur-md border border-blue-500/20 p-8 rounded-[2rem] flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 min-w-0">
                  <img
                    src={typeicon}
                    className="w-10 h-10 brightness-200 opacity-50 flex-shrink-0"
                    alt=""
                  />
                  <div className="min-w-0">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
                      Primary Source
                    </h4>
                    <p className="text-xl font-bold text-white truncate">
                      {mount.sources?.[0]?.text || "Undisclosed"}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/search?q=ffxiv+how+to+get+${mount.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl flex-shrink-0"
                >
                  Locate
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default Mountsmount;
