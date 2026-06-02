import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CollectionSearch({
  dataArray,
  setFilteredData,
  setFilterTitle,
  basePath,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query param straight from the URL
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get("name_en_end") || "";

  // 1. Sync internal input text with the URL param (handles page loads/browser back button)
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  // 2. Core filtering engine: executes whenever data finishes loading or the URL changes
  useEffect(() => {
    if (urlQuery && dataArray.length > 0) {
      const matchedResults = dataArray.filter((item) =>
        item.name.toLowerCase().includes(urlQuery.toLowerCase()),
      );

      setFilteredData(matchedResults);
      setFilterTitle(
        matchedResults.length === 0 ? "No Results Found" : "Search Results",
      );
    } else if (!urlQuery && dataArray.length > 0) {
      // If search is cleared, don't break expansion filters, just let the page handle its default state
    }
  }, [urlQuery, dataArray, setFilteredData, setFilterTitle]);

  // 3. Handle form submission to update the URL without refreshing
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `${basePath}?name_en_end=${encodeURIComponent(searchQuery.trim())}`,
      );
    } else {
      navigate(basePath); // Reset URL if searching empty string
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full block">
      {/* FIXED CONTAINER: Changed background from solid tan/gold to premium dark glass */}
      <div className="relative flex items-center w-full bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-2 shadow-lg">
        {/* Search Input Icon */}
        <div className="pl-4 pr-2 text-slate-500 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Text Box */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search archives by name..."
          className="w-full bg-transparent border-none outline-none text-white placeholder-slate-600 text-xs py-2.5 px-2 font-black uppercase tracking-wider"
        />

        {/* Search Action Button matching your navbar aesthetics */}
        <button
          type="submit"
          className="bg-blue-500/20 border border-blue-500/40 text-blue-400 font-black uppercase tracking-[0.15em] text-[10px] px-6 py-2.5 rounded-xl transition-all hover:bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default CollectionSearch;
