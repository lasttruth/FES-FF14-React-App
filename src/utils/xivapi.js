import axios from "axios";

const BASE_URL = "https://xivapi.com";

export async function searchLodestoneCharacter(name, server) {
  try {
    const searchResponse = await axios.get(`${BASE_URL}/character/search`, {
      params: {
        name: name.trim(),
        server: server.trim(),
      },
    });

    const results = searchResponse.data.Results;
    if (!results || results.length === 0) {
      throw new Error(
        "Character not found. Check your spelling and world server choice.",
      );
    }

    const characterData = results[0];

    return {
      id: `lodestone_${characterData.ID}`,
      characterName: characterData.Name,
      server: server.trim(),
      dc: "Unknown",
      avatarUrl: characterData.Avatar,
      portraitUrl: characterData.Avatar,
      mainJob: "Active Member",
      mainJobLevel: 100,
      lastSyncedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Direct Character Sync Error:", error.message);

    // 🌟 EXTENDED DIAGNOSTICS: Catch Lodestone sync/privacy states
    const rawMessage = error.response?.data?.Message || error.message || "";

    if (rawMessage.toLowerCase().includes("private")) {
      throw new Error(
        "Lodestone sync queued! XIVAPI is currently caching this character. Please wait 2-3 minutes and try clicking fetch again.",
      );
    }

    throw new Error(
      rawMessage || "Failed to communicate with the tracking database.",
    );
  }
}
