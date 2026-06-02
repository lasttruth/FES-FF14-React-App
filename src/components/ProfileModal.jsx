import React, { useState } from "react";
import { saveLocalProfile, setActiveProfileId } from "../utils/profileTracker";
import { searchLodestoneCharacter } from "../utils/xivapi"; // Import the live API service

function ProfileModal({ isOpen, onClose, onProfileCreated }) {
  const [characterName, setCharacterName] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!characterName.trim() || !server.trim()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      // Fetch data live from the Lodestone API
      const liveProfileData = await searchLodestoneCharacter(
        characterName.trim(),
        server.trim(),
      );

      // Persist the live schema object to localStorage
      saveLocalProfile(liveProfileData);
      setActiveProfileId(liveProfileData.id);
      onProfileCreated(liveProfileData);

      // Clean up and close
      setCharacterName("");
      setServer("");
      onClose();
    } catch (error) {
      setErrorMessage(
        error.message || "Sync failed. Please verify name and server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white italic">
            Sync Lodestone Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider disabled:opacity-30"
          >
            Cancel
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium tracking-wide">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full text-left"
        >
          <div className="flex flex-col w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
              Character Name
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="e.g., Alisaie Leveilleur"
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white text-xs outline-none focus:border-blue-500/30 transition-all font-medium disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
              Home World / Server
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={server}
              onChange={(e) => setServer(e.target.value)}
              placeholder="e.g., Balmung, Gilgamesh"
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white text-xs outline-none focus:border-blue-500/30 transition-all font-medium disabled:opacity-50"
            />
          </div>

          <div className="w-full pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500/20 border border-blue-500/40 hover:bg-blue-500/30 text-blue-400 font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Searching Database..." : "Fetch Lodestone Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
