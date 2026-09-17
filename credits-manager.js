/**
 * Daily Credits & Rate Limiting System for Telegram Bot
 * Gives each user 10 free generations per day, tracked by Telegram ID.
 */

const userCredits = new Map();

const DAILY_LIMIT = 10;

function checkAndConsumeCredit(userId) {
  const id = String(userId);
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let userData = userCredits.get(id);

  if (!userData || now - userData.lastReset > ONE_DAY) {
    // Reset or initialize
    userData = {
      remaining: DAILY_LIMIT,
      lastReset: now,
      totalGenerated: (userData ? userData.totalGenerated : 0)
    };
    userCredits.set(id, userData);
  }

  if (userData.remaining <= 0) {
    return {
      allowed: false,
      remaining: 0,
      resetHours: Math.ceil((userData.lastReset + ONE_DAY - now) / (60 * 60 * 1000))
    };
  }

  // Consume 1 credit
  userData.remaining -= 1;
  userData.totalGenerated += 1;
  userCredits.set(id, userData);

  return {
    allowed: true,
    remaining: userData.remaining,
    totalGenerated: userData.totalGenerated
  };
}

function getUserStats(userId) {
  const id = String(userId);
  const userData = userCredits.get(id);
  return {
    remaining: userData ? userData.remaining : DAILY_LIMIT,
    limit: DAILY_LIMIT
  };
}

module.exports = {
  checkAndConsumeCredit,
  getUserStats,
  DAILY_LIMIT
};
