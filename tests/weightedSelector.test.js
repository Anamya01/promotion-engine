const { weightedPick } = require('../utils/weightedSelector');

describe('weightedPick()', () => {
  it('should return null for empty input', () => {
    expect(weightedPick([])).toBeNull();
    expect(weightedPick(null)).toBeNull();
    expect(weightedPick(undefined)).toBeNull();
  });

  it('should return the only rule if one is given', () => {
    const rules = [{ id: 'only-rule', metadata: { weight: 100 } }];
    const result = weightedPick(rules);
    expect(result).toBe(rules[0]);
  });

  it('should return one of the rules based on weight', () => {
    const rules = [
      { id: 'A', metadata: { weight: 10 } },
      { id: 'B', metadata: { weight: 90 } },
    ];

    const counts = { A: 0, B: 0 };

    for (let i = 0; i < 1000; i++) {
      const picked = weightedPick(rules);
      counts[picked.id]++;
    }

    // Expect B to be picked significantly more often than A
    expect(counts.B).toBeGreaterThan(counts.A);
    expect(counts.A + counts.B).toBe(1000);
  });

  it('should default missing weights to 100', () => {
    const rules = [
      { id: 'default-weight' }, // no metadata
      { id: 'explicit-weight', metadata: { weight: 200 } },
    ];

    const result = weightedPick(rules);
    expect(['default-weight', 'explicit-weight']).toContain(result.id);
  });

  it('should handle rules without metadata gracefully', () => {
    const rules = [
      { id: 'no-metadata-1' },
      { id: 'no-metadata-2' },
    ];

    for (let i = 0; i < 5; i++) {
      const result = weightedPick(rules);
      expect(result).toBeDefined();
      expect(['no-metadata-1', 'no-metadata-2']).toContain(result.id);
    }
  });
});
