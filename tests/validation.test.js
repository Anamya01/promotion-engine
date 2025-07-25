const { validatePlayerData } = require('../utils/validation');

describe('validatePlayerData()', () => {
  it('should return valid for correct player data', () => {
    const input = {
      playerId: '123abc',
      playerLevel: 10,
      daysSinceLastPurchase: 2,
      spendTier: 'low',
      country: 'IN',
      hasActiveBonus: true,
      isPremiumUser: false,
    };

    const result = validatePlayerData(input);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fail if playerId is missing', () => {
    const input = {
      playerLevel: 10,
    };

    const result = validatePlayerData(input);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('playerId is required and must be a string');
  });

  it('should fail if playerId is not a string', () => {
    const input = {
      playerId: 123,
    };

    const result = validatePlayerData(input);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('playerId is required and must be a string');
  });

  it('should fail on invalid optional fields', () => {
    const input = {
      playerId: 'abc123',
      playerLevel: 'ten',
      daysSinceLastPurchase: 'five',
      spendTier: 10,
      country: true,
      hasActiveBonus: 'yes',
      isPremiumUser: 'no',
    };

    const result = validatePlayerData(input);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('playerLevel must be a number');
    expect(result.errors).toContain('daysSinceLastPurchase must be a number');
    expect(result.errors).toContain('spendTier must be a string');
    expect(result.errors).toContain('country must be a string');
    expect(result.errors).toContain('hasActiveBonus must be a boolean');
    expect(result.errors).toContain('isPremiumUser must be a boolean');
  });

  it('should fail if input is null or not an object', () => {
    const result1 = validatePlayerData(null);
    const result2 = validatePlayerData(123);
    const result3 = validatePlayerData('abc');

    expect(result1.isValid).toBe(false);
    expect(result2.isValid).toBe(false);
    expect(result3.isValid).toBe(false);

    expect(result1.errors).toContain('Player data must be a non-null object');
    expect(result2.errors).toContain('Player data must be a non-null object');
    expect(result3.errors).toContain('Player data must be a non-null object');
  });
});
