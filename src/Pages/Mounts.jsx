import axios from "axios";
import React, { useEffect, useState } from "react";
import Mount from "../components/Mount";
import MountFilter from "../components/MountFilter";
import Searchbar from "../UI/Searchbar";
import MountSkeleton from "../UI/MountSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { getCollectedMounts } from "../utils/tracker";
import { getRarity } from "../utils/rarity";

function Mounts() {
  const [mounts, setMounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMounts, setFilteredMounts] = useState([]);
  const [fitlerTitle, setFilterTitle] = useState("All Mounts");
  const [displayCount, setDisplayCount] = useState(20);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("name_en_end");
  const navigate = useNavigate();
  const collectedIds = getCollectedMounts(); // e.g., ["444", "12"]
  const totalAvailable = mounts.length;
  const totalOwned = collectedIds.length;
  const globalPercentage =
    totalAvailable > 0 ? ((totalOwned / totalAvailable) * 100).toFixed(1) : 0;

  async function fetchMounts() {
    try {
      const { data } = await axios.get("https://ffxivcollect.com/api/mounts");
      setMounts(data.results);
      setFilteredMounts(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mounts:", error);
    }
  }

  useEffect(() => {
    fetchMounts();
  }, []);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      setFilteredMounts(mounts);
      setFilterTitle("All ");
    }
  }, [query, mounts]);

  const filterMounts = (filter) => {
    const expansions = {
      ARR: { min: 2.0, max: 3.0, title: "A Realm Reborn" },
      HW: { min: 3.0, max: 4.0, title: "Heavensward" },
      SB: { min: 4.0, max: 5.0, title: "Stormblood" },
      ShB: { min: 5.0, max: 6.0, title: "Shadowbringers" },
      EW: { min: 6.0, max: 7.0, title: "Endwalker" },
      DT: { min: 7.0, max: 8.0, title: "Dawntrail" },
    };

    const defaultFilter = {
      ALL: "All", // Default filter option
      title: "All", // Default filter title
    };

    if (filter in expansions) {
      const { min, max, title } = expansions[filter];
      const filtered = mounts
        .filter((mount) => {
          const patch = parseFloat(mount.patch);
          return patch >= min && patch < max;
        })
        .sort((a, b) => {
          const patchA = parseFloat(a.patch);
          const patchB = parseFloat(b.patch);
          return patchA - patchB;
        });
      setFilteredMounts(filtered);
      setFilterTitle(title);
    } else if (filter in defaultFilter) {
      setFilteredMounts(mounts);
      setFilterTitle("All");
    } else {
      setFilteredMounts(mounts);
      setFilterTitle("All");
    }
  };

  const statsMatrix = {
    Common: { owned: 0, total: 0 },
    Rare: { owned: 0, total: 0 },
    Epic: { owned: 0, total: 0 },
    Legendary: { owned: 0, total: 0 },
  };

  mounts.forEach((mount) => {
    // Change this here too
    const rarity = getRarity(mount.owned);
    const isOwned = collectedIds.includes(String(mount.id));

    if (statsMatrix[rarity.label]) {
      statsMatrix[rarity.label].total += 1;
      if (isOwned) {
        statsMatrix[rarity.label].owned += 1;
      }
    }
  });

  const handleFilterChange = (filter) => {
    filterMounts(filter);
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + 20);
  };

  async function handleSearch(query) {
    try {
      const { data } = await axios.get(
        `https://ffxivcollect.com/api/mounts?name_en_end=${query}`,
      );

      if (data.results.length === 0) {
        setFilteredMounts([]);
        setFilterTitle("No results found");
      } else {
        setFilteredMounts(data.results);
        setFilterTitle("Search Results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error gracefully, e.g., display an error message
    }
  }

  //to change the URL to avoid a refresh bug
  const showSearchResults = (query) => {
    navigate(`/mounts?name_en_end=${query}`);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 relative overflow-hidden flex justify-center">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="mounts__header mb-12">
          <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter mb-4">
            {fitlerTitle} <span className="text-blue-500">Mounts</span>
          </h2>
          {/* We can style the MountFilter next to match this glass look */}
          <MountFilter onFilterChange={handleFilterChange} />
        </div>
        {/* FFXIV-101: GLOBAL TRACKER DASHBOARD */}
        <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 mb-12 shadow-2xl flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Panel: Global Summary */}
          <div className="w-full lg:w-1/4 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <span className="text-xl font-black italic text-blue-400">
                {globalPercentage}%
              </span>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1 italic">
                Stable Overview
              </h3>
              <p className="text-2xl font-black text-white">
                {totalOwned}{" "}
                <span className="text-sm font-normal text-slate-500">
                  / {totalAvailable} Unlocked
                </span>
              </p>
            </div>
          </div>

          {/* Right Panel: Rarity Tier Breakdown Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(statsMatrix).map(([tierName, data]) => {
              const isLegendary = tierName === "Legendary";

              return (
                <div
                  key={tierName}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isLegendary
                      ? "bg-amber-500/[0.03] border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] animate-pulse"
                      : "bg-white/[0.01] border-white/5"
                  }`}
                >
                  <p
                    className={`text-[9px] font-black uppercase tracking-widest mb-1 ${
                      isLegendary ? "text-amber-400" : "text-slate-500"
                    }`}
                  >
                    {tierName}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-white">
                      {data.owned}
                    </span>
                    <span className="text-xs text-slate-600">
                      / {data.total}
                    </span>
                  </div>

                  {/* Micro Progress Bar per tier */}
                  <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isLegendary
                          ? "bg-gradient-to-r from-amber-500 to-orange-500"
                          : "bg-blue-500/50"
                      }`}
                      style={{
                        width: `${data.total > 0 ? (data.owned / data.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <Searchbar onSearch={showSearchResults} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <MountSkeleton key={index} />
              ))
            : filteredMounts
                .slice(0, displayCount)
                .map((mount) => <Mount mount={mount} key={mount.id} />)}
        </div>

        {displayCount < filteredMounts.length && (
          <div className="flex justify-center mt-16">
            <button
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
              onClick={handleShowMore}
            >
              Load More Intel
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Mounts;
