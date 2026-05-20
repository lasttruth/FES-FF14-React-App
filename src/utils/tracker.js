// src/utils/tracker.js

const STORAGE_KEY = "xiv_collected_mounts";

/**
 * Retrieves the array of collected mount IDs from localStorage.
 * @returns {string[]} Array of mount IDs
 */
export const getCollectedMounts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
