import React, { useState } from "react";

function MountFilter({ onFilterChange }) {
  const [active, setActive] = useState("ALL");

  const filters = [
    { id: "ALL", label: "All" },
    { id: "ARR", label: "ARR" },
    { id: "HW", label: "HW" },
    { id: "SB", label: "SB" },
    { id: "ShB", label: "ShB" },
    { id: "EW", label: "EW" },
    { id: "DT", label: "DT" },
  ];

  const handleButtonClick = (filterId) => {
    setActive(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleButtonClick(filter.id)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md border ${
            active === filter.id
              ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              : "bg-white/[0.03] border-white/10 text-slate-500 hover:border-white/20 hover:text-white"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default MountFilter;
