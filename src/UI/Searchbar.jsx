import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full group">
      <input
        type="text"
        placeholder="Search for a mount..."
        className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-14 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all text-sm font-bold tracking-wide shadow-2xl"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
      >
        Search
      </button>
    </form>
  );
}

export default Searchbar;
