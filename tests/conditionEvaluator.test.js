const { isRuleValidForPlayer } = require('../utils/conditionEvaluator');

describe('isRuleValidForPlayer()', () => {
  it('should return true when all numeric conditions match', () => {
    const conditions = {
      playerLevel: '>=10',
      daysSinceLastPurchase: '<=5',
    };

    const playerData = {
      playerLevel: 15,
      daysSinceLastPurchase: 3,
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(true);
  });

  it('should return false if any condition fails', () => {
    const conditions = {
      playerLevel: '>=10',
      daysSinceLastPurchase: '<=5',
    };

    const playerData = {
      playerLevel: 8,
      daysSinceLastPurchase: 3,
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(false);
  });

  it('should support boolean comparisons', () => {
    const conditions = {
      hasActiveBonus: '==true',
    };

    const playerData = {
      hasActiveBonus: true,
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(true);
  });

  it('should support string comparisons', () => {
    const conditions = {
      spendTier: '==low',
    };

    const playerData = {
      spendTier: 'low',
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(true);
  });

  it('should return false if player field is missing', () => {
    const conditions = {
      spendTier: '==low',
    };

    const playerData = {
      // spendTier missing
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(false);
  });

  it('should return false for invalid operator format', () => {
    const conditions = {
      playerLevel: '>>15', // invalid
    };

    const playerData = {
      playerLevel: 20,
    };

    const result = isRuleValidForPlayer(conditions, playerData);
    expect(result).toBe(false);
  });
});
