import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import typeicon from "../assets/ff14icon.png";
import axios from "axios";

function Mountsmount() {
  const [mount, setMount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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

  if (loading || !mount) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 p-6 lg:p-12 relative overflow-hidden font-sans flex justify-center">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-all uppercase text-xs font-black tracking-widest"
        >
          <span className="text-lg">←</span> Back to Database
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* IMAGE SECTION */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-12">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={mount.image}
                alt={mount.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 shadow-[inner_0_0_100px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="w-full lg:w-7/12">
            {/* Glassmorphic Header Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] mb-8 shadow-2xl">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex-shrink-0 p-1 bg-gradient-to-br from-white/20 to-transparent rounded-2xl">
                  <img
                    src={mount.icon}
                    alt=""
                    className="w-20 h-20 rounded-xl bg-black object-cover"
                  />
                </div>
                <div>
                  <div className="min-w-0">
                    <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-2 italic">
                      {mount.name}
                    </h1>
                    <div className="flex gap-3">
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30 font-black tracking-widest uppercase">
                        Patch {mount.patch}
                      </span>
                      <span className="text-[10px] bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/10 font-black tracking-widest uppercase">
                        {mount.movement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seamless Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/5 mt-8 pt-8 gap-4">
                {[
                  { label: "Capacity", value: `${mount.seats} Seat` },
                  {
                    label: "Marketable",
                    value: mount.tradeable ? "Yes" : "No",
                  },
                  {
                    label: "Global Rarity",
                    value: mount.owned,
                    color: "text-blue-400",
                  },
                  { label: "Collection ID", value: `#${mount.id}` },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black mb-1">
                      {stat.label}
                    </p>
                    <p
                      className={`text-xl font-bold ${stat.color || "text-white"}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lore Glass Card */}
            <div className="space-y-6">
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
              <div className="bg-gradient-to-r from-blue-600/20 to-transparent backdrop-blur-md border border-blue-500/20 p-8 rounded-[2rem] flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <img
                    src={typeicon}
                    className="w-10 h-10 brightness-200 opacity-50"
                    alt=""
                  />
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
                      Primary Source
                    </h4>
                    <p className="text-xl font-bold text-white">
                      {mount.sources?.[0]?.text || "Undisclosed"}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/search?q=ffxiv+how+to+get+${mount.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-400 transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  Locate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Mountsmount;
