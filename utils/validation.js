/**
 * Validates incoming player data for type and required fields.
 * @param {Object} playerData - Incoming request body
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validatePlayerData(playerData) {
    const errors = [];
  
    // Check if body exists and is an object
    if (!playerData || typeof playerData !== 'object') {
      errors.push('Player data must be a non-null object');
      return { isValid: false, errors };
    }
  
    // Required: playerId
    if (!playerData.playerId || typeof playerData.playerId !== 'string') {
      errors.push('playerId is required and must be a string');
    }
  
    // Optional: playerLevel
    if ('playerLevel' in playerData && typeof playerData.playerLevel !== 'number') {
      errors.push('playerLevel must be a number');
    }
  
    // Optional: daysSinceLastPurchase
    if ('daysSinceLastPurchase' in playerData && typeof playerData.daysSinceLastPurchase !== 'number') {
      errors.push('daysSinceLastPurchase must be a number');
    }
  
    // Optional: spendTier
    if ('spendTier' in playerData && typeof playerData.spendTier !== 'string') {
      errors.push('spendTier must be a string');
    }
  
    // Optional: country
    if ('country' in playerData && typeof playerData.country !== 'string') {
      errors.push('country must be a string');
    }
  
    // Optional: hasActiveBonus
    if ('hasActiveBonus' in playerData && typeof playerData.hasActiveBonus !== 'boolean') {
      errors.push('hasActiveBonus must be a boolean');
    }
  
    // Optional: isPremiumUser
    if ('isPremiumUser' in playerData && typeof playerData.isPremiumUser !== 'boolean') {
      errors.push('isPremiumUser must be a boolean');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  
  module.exports = {
    validatePlayerData,
  };
  