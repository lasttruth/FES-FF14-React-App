const PROFILES_KEY = "xiv_local_profiles";
const ACTIVE_PROFILE_KEY = "xiv_active_profile_id";

// Get all saved profiles
export function getLocalProfiles() {
  const profiles = localStorage.getItem(PROFILES_KEY);
  return profiles ? JSON.parse(profiles) : [];
}

export function clearActiveProfile() {
  localStorage.removeItem("xiv_active_profile_id");
  // Optional: If you want to wipe the stored profile entirely from history, uncomment below:
  // localStorage.removeItem("xiv_local_profiles");
}

/**
 * Save or update a profile using the advanced schema model
 * @param {Object} profilePayload - The profile data object to persist
 */
export function saveLocalProfile(profilePayload) {
  const profiles = getLocalProfiles();

  // Enforce the new target data schema structure with smart fallbacks
  const structuredProfile = {
    id: profilePayload.id || `local_${Date.now()}`,
    characterName: profilePayload.characterName,
    server: profilePayload.server,
    dc: profilePayload.dc || "Unknown", // Added for datacenter categorization
    avatarUrl: profilePayload.avatarUrl || null, // URL path to face thumbnail
    portraitUrl: profilePayload.portraitUrl || null, // URL path to full character image
    mainJob: profilePayload.mainJob || "Paladin",
    mainJobLevel: Number(profilePayload.mainJobLevel) || 100, // Added for level tracking
    lastSyncedAt: profilePayload.lastSyncedAt || new Date().toISOString(),
    createdAt: profilePayload.createdAt || new Date().toISOString(),
  };

  const exists = profiles.find((p) => p.id === structuredProfile.id);
  let updatedProfiles;

  if (exists) {
    // Merge existing profile data with incoming schema updates to preserve early metrics
    updatedProfiles = profiles.map((p) =>
      p.id === structuredProfile.id ? { ...p, ...structuredProfile } : p,
    );
  } else {
    updatedProfiles = [...profiles, structuredProfile];
  }

  localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
  return updatedProfiles;
}

// Get the currently active profile ID
export function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || null;
}

// Set the currently active profile
export function setActiveProfileId(id) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

// Get the full active profile data matching the schema
export function getActiveProfile() {
  const profiles = getLocalProfiles();
  const activeId = getActiveProfileId();
  return profiles.find((p) => p.id === activeId) || null;
}

/**
 * Force update specific fields (e.g., refreshing just the avatar after an API pull)
 */
export function updateActiveProfileFields(fieldsToUpdate) {
  const activeProfile = getActiveProfile();
  if (!activeProfile) return null;

  const updatedProfile = {
    ...activeProfile,
    ...fieldsToUpdate,
    lastSyncedAt: new Date().toISOString(),
  };

  saveLocalProfile(updatedProfile);
  return updatedProfile;
}
