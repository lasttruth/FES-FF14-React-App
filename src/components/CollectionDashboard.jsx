import React from "react";

function CollectionDashboard({
  dataArray,
  collectedIds,
  getRarity,
  overviewTitle = "Stable Overview",
}) {
  const totalAvailable = dataArray.length;
  const totalOwned = collectedIds.length;
  const globalPercentage =
    totalAvailable > 0 ? ((totalOwned / totalAvailable) * 100).toFixed(1) : 0;

  const statsMatrix = {
    Common: { owned: 0, total: 0 },
    Rare: { owned: 0, total: 0 },
    Epic: { owned: 0, total: 0 },
    Legendary: { owned: 0, total: 0 },
  };

  dataArray.forEach((item) => {
    const rarity = getRarity(item.owned);
    const isOwned = collectedIds.includes(String(item.id));

    if (statsMatrix[rarity.label]) {
      statsMatrix[rarity.label].total += 1;
      if (isOwned) {
        statsMatrix[rarity.label].owned += 1;
      }
    }
  });

  return (
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
            {overviewTitle}
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
          const completionWidth =
            data.total > 0 ? (data.owned / data.total) * 100 : 0;

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
                className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isLegendary ? "text-amber-400" : "text-slate-500"}`}
              >
                {tierName}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">
                  {data.owned}
                </span>
                <span className="text-xs text-slate-600">/ {data.total}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${isLegendary ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-blue-500/50"}`}
                  style={{ width: `${completionWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionDashboard;
