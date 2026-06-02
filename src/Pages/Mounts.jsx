import axios from "axios";
import React, { useEffect, useState } from "react";
import Mount from "../components/Mount";
import MountSkeleton from "../UI/MountSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { getCollectedMounts } from "../utils/tracker";
import { getRarity } from "../utils/rarity";
import CollectionNav from "../components/CollectionNav";
import CollectionDashboard from "../components/CollectionDashboard";
import CollectionSearch from "../components/CollectionSearch";

function Mounts() {
  const [mounts, setMounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMounts, setFilteredMounts] = useState([]);
  const [filterTitle, setFilterTitle] = useState("All Mounts");
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
      setFilteredMounts(data.results); // Changed from activeFilter(data.results)
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
      setFilteredMounts(mounts); // Changed from activeFilter(mounts)
      setFilterTitle("All Mounts"); // Changed from setActiveFilter("All ")
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
        .sort((a, b) => parseFloat(a.patch) - parseFloat(b.patch));

      setFilteredMounts(filtered); // Changed from activeFilter(filtered)
      setFilterTitle(title); // Changed from setActiveFilter(title)
    } else {
      setFilteredMounts(mounts); // Changed from activeFilter(mounts)
      setFilterTitle("All Mounts"); // Changed from setActiveFilter("All")
    }
  };

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
        setFilteredMounts([]); // Changed from activeFilter([])
        setFilterTitle("No results found"); // Changed from setActiveFilter("No results found")
      } else {
        setFilteredMounts(data.results); // Changed from activeFilter(data.results)
        setFilterTitle("Search Results"); // Changed from setActiveFilter("Search Results")
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

      <div className="w-full max-w-7xl mx-auto mb-10">
        {/* Header Title Tier */}
        <div className="w-full mb-8">
          <div className="flex items-center mb-3 px-1">
            <span className="text-[20px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
              Data Archives
            </span>
          </div>

          {/* 1. REUSABLE NAVIGATION DOCK */}
          <CollectionNav
            activeTitle={filterTitle}
            onFilterChange={handleFilterChange}
            allLogsLabel="All Logs"
          />
        </div>

        {/* 2. REUSABLE STATISTICS DASHBOARD */}
        <CollectionDashboard
          dataArray={mounts}
          collectedIds={collectedIds}
          getRarity={getRarity}
          overviewTitle="Stable Overview"
        />

        {/* 3. SEARCH BAR */}
        <CollectionSearch
          dataArray={mounts}
          setFilteredData={setFilteredMounts}
          setFilterTitle={setFilterTitle}
          basePath="/mounts"
        />

        {/* 4. CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <MountSkeleton key={index} />
              ))
            : filteredMounts
                .slice(0, displayCount)
                .map((mount) => <Mount mount={mount} key={mount.id} />)}
        </div>

        {/* Load More Button Container */}
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
