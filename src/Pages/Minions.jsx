import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MinionCard from "../components/MinionCard"; // We will build this in Step 3
import MountSkeleton from "../UI/MountSkeleton";
import { getCollectedMinions } from "../utils/tracker";
import { getRarity } from "../utils/rarity";
import CollectionNav from "../components/CollectionNav";
import CollectionDashboard from "../components/CollectionDashboard";
import CollectionSearch from "../components/CollectionSearch";

function Minions() {
  const [minions, setMinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMinions, setFilteredMinions] = useState([]);
  const [filterTitle, setFilterTitle] = useState("All Minions");
  const [displayCount, setDisplayCount] = useState(20);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("name_en_end");

  const collectedIds = getCollectedMinions();
  const totalAvailable = minions.length;
  const totalOwned = collectedIds.length;
  const globalPercentage =
    totalAvailable > 0 ? ((totalOwned / totalAvailable) * 100).toFixed(1) : 0;

  async function fetchMinions() {
    try {
      const { data } = await axios.get("https://ffxivcollect.com/api/minions");
      setMinions(data.results);
      setFilteredMinions(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching minions:", error);
    }
  }

  const handleFilterChange = (filter) => {
    filterMinions(filter); //  Correct: Calls your filter engine function
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + 20);
  };

  const showSearchResults = (query) => {
    navigate(`/minions?name_en_end=${query}`);
  };

  useEffect(() => {
    fetchMinions();
  }, []);

  useEffect(() => {
    if (query) {
      // If there's an active name parameter, filter down to matches
      const searchFiltered = minions.filter((minion) =>
        minion.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredMinions(searchFiltered);
      setFilterTitle("Search Results");
    } else {
      // Otherwise reset grid to standard state
      setFilteredMinions(minions);
      setFilterTitle("All Minions");
    }
  }, [query, minions]);

  const filterMinions = (filter) => {
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
      const filtered = minions
        .filter((minion) => {
          const patch = parseFloat(minion.patch);
          return patch >= min && patch < max;
        })
        .sort((a, b) => parseFloat(a.patch) - parseFloat(b.patch));

      setFilteredMinions(filtered); // Changed from activeFilter(filtered)
      setFilterTitle(title); // Changed from setActiveFilter(title)
    } else {
      setFilteredMinions(minions); // Changed from activeFilter(minions)
      setFilterTitle("All minions"); // Changed from setActiveFilter("All")
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 relative overflow-hidden flex justify-center">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto mb-10">
        {/* Header Title Tier */}
        <div className="w-full mb-8">
          <div className="flex items-center mb-3 px-1">
            <span className="text-[20px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
              Minion Archives
            </span>
          </div>

          {/* 1. REUSABLE NAVIGATION DOCK */}
          <CollectionNav
            activeTitle={filterTitle}
            onFilterChange={handleFilterChange}
            allLogsLabel="All Minions"
          />
        </div>

        {/* 2. REUSABLE STATISTICS DASHBOARD */}
        <CollectionDashboard
          dataArray={minions}
          collectedIds={collectedIds}
          getRarity={getRarity}
          overviewTitle="Vault Overview"
        />

        {/* 3. SEARCH BAR */}
        <CollectionSearch
          dataArray={minions}
          setFilteredData={setFilteredMinions}
          setFilterTitle={setFilterTitle}
          basePath="/minions"
        />

        {/* 4. CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <minionSkeleton key={index} />
              ))
            : filteredMinions
                .slice(0, displayCount)
                .map((minion) => (
                  <MinionCard minion={minion} key={minion.id} />
                ))}
        </div>

        {/* Load More Button Container */}
        {displayCount < filteredMinions.length && (
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

export default Minions;
