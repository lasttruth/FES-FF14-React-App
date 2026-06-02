import React from "react";

function CollectionNav({
  activeTitle,
  onFilterChange,
  allLogsLabel = "All Logs",
}) {
  const expansions = [
    { id: "ALL", label: allLogsLabel },
    { id: "ARR", label: "A Realm Reborn" },
    { id: "HW", label: "Heavensward" },
    { id: "SB", label: "Stormblood" },
    { id: "ShB", label: "Shadowbringers" },
    { id: "EW", label: "Endwalker" },
    { id: "DT", label: "Dawntrail" },
  ];

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-2 shadow-lg">
      <nav className="w-full grid grid-cols-2 sm:flex sm:flex-wrap md:flex-nowrap items-center justify-between gap-1.5">
        {expansions.map((exp) => {
          // Flexible match to handle "All Mounts" or "All Minions" states dynamically
          const isActive =
            activeTitle === exp.label ||
            (exp.id === "ALL" && activeTitle.startsWith("All"));

          return (
            <button
              key={exp.id}
              onClick={() => onFilterChange(exp.id)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 text-center flex-1 ${
                isActive
                  ? "bg-blue-500/20 border border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  : "border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {exp.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default CollectionNav;
