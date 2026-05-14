// src/utils/rarity.js

/**
 * Returns styling and label data based on mount ownership percentage.
 * @param {string} ownedString - e.g., "1.5%"
 */
export const getRarity = (ownedString) => {
  if (!ownedString)
    return {
      label: "Unknown",
      color: "from-slate-500",
      shadow: "",
      border: "",
    };
  const percentage = parseFloat(ownedString);

  if (percentage < 2) {
    return {
      label: "Legendary",
      color: "from-orange-500 to-yellow-500",
      shadow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]",
      border: "border-orange-500/50",
      text: "text-orange-400",
    };
  }

  if (percentage < 10) {
    return {
      label: "Epic",
      color: "from-purple-600 to-pink-600",
      shadow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      border: "border-purple-500/50",
      text: "text-purple-400",
    };
  }

  if (percentage < 40) {
    return {
      label: "Rare",
      color: "from-blue-600 to-cyan-500",
      shadow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      border: "border-blue-500/50",
      text: "text-blue-400",
    };
  }

  return {
    label: "Common",
    color: "from-slate-500 to-slate-400",
    shadow: "shadow-2xl",
    border: "border-white/10",
    text: "text-slate-300",
  };
};
