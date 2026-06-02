// src/utils/tracker.js

const MOUNT_KEY = "xiv_collected_mounts";
const MINION_KEY = "xiv_collected_minions";

/**
 * Retrieves the array of collected mount IDs from localStorage.
 * @returns {string[]} Array of mount IDs
 */
export const getCollectedMounts = () => {
  const stored = localStorage.getItem(MOUNT_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Adds or removes a mount ID from the collection list.
 * @param {string} mountId
 * @returns {string[]} The updated array of collected mount IDs
 */
export const toggleMountCollection = (mountId) => {
  const current = getCollectedMounts();
  const idString = String(mountId);

  let updated;
  if (current.includes(idString)) {
    // Remove if already owned
    updated = current.filter((id) => id !== idString);
  } else {
    // Add if not owned
    updated = [...current, idString];
  }

  localStorage.setItem(MOUNT_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Checks if a specific mount is collected.
 * @param {string} mountId
 * @returns {boolean}
 */
export const isMountCollected = (mountId) => {
  const current = getCollectedMounts();
  return current.includes(String(mountId));
};

// ---Minion tracker---
export function getCollectedMinions() {
  const collected = localStorage.getItem(MINION_KEY);
  return collected ? JSON.parse(collected) : [];
}

export function toggleMinionCollected(minionId) {
  const collected = getCollectedMinions();
  const idStr = String(minionId);
  let updated;

  if (collected.includes(idStr)) {
    updated = collected.filter((id) => id !== idStr);
  } else {
    updated = [...collected, idStr];
  }

  localStorage.setItem(MINION_KEY, JSON.stringify(updated));
  return updated;
}

export function isMinionCollected(minionId) {
  const collected = getCollectedMinions();
  return collected.includes(String(minionId));
}
