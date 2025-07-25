const { evaluateRules, initializeRules } = require('../services/ruleService');

beforeAll(() => {
  initializeRules(); // Load rules before testing
});

describe('evaluateRules()', () => {
  it('should return a promotion for a matching player', () => {
    const playerData = {
      playerId: 'debug_player_123', // Even → A group
      country: 'IN',
      playerLevel: 18,
      spendTier: 'low',
      daysSinceLastPurchase: 2,
    };

    const result = evaluateRules(playerData);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('id', 201); // "Loyal Player Bonus"
    expect(result).toHaveProperty('title', 'Loyal Player Bonus');
  });

  it('should return null for a non-matching player', () => {
    const playerData = {
      playerId: 'player9999', // Odd → B group
      country: 'FR',
      playerLevel: 1,
      spendTier: 'high',
      daysSinceLastPurchase: 100,
      hasActiveBonus: true,
    };

    const result = evaluateRules(playerData);
    expect(result).toBeNull();
  });
});
