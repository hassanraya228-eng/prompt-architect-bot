/**
 * Face Anchor & Character Consistency Manager
 * Tracks user-selected character profiles to maintain consistent facial & identity traits across all generated prompts.
 */

const userProfiles = new Map();

function setUserCharacter(userId, characterDescription) {
  userProfiles.set(String(userId), characterDescription);
}

function getUserCharacter(userId) {
  return userProfiles.get(String(userId)) || null;
}

function clearUserCharacter(userId) {
  userProfiles.delete(String(userId));
}

function applyCharacterAnchor(userId, basePrompt) {
  const anchor = getUserCharacter(userId);
  if (!anchor) return basePrompt;

  // Prepend character anchor to maintain consistent facial anatomy & styling
  return `same consistent character (${anchor}), ${basePrompt}`;
}

module.exports = {
  setUserCharacter,
  getUserCharacter,
  clearUserCharacter,
  applyCharacterAnchor
};
