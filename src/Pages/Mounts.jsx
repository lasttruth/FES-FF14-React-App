import axios from "axios";
import React, { useEffect, useState } from "react";
import Mount from "../components/Mount";
import MountFilter from "../components/MountFilter";
import Searchbar from "../UI/Searchbar";
import MountSkeleton from "../UI/MountSkeleton";
import { useLocation, useNavigate } from "react-router-dom";

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
