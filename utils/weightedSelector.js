/**
 * Selects one rule based on weight (weighted randomness).
 * If weight is not provided, defaults to 100.
 * @param {Array} rules - Array of rule objects
 * @returns {Object|null} - Selected rule or null if no rules
 */
function weightedPick(rules) {
    if (!rules || rules.length === 0) return null;
    if (rules.length === 1) return rules[0];
  
    const totalWeight = rules.reduce((sum, rule) => {
      const weight = rule.metadata?.weight || 100;
      return sum + weight;
    }, 0);
  
    let random = Math.random() * totalWeight;
  
    for (const rule of rules) {
      const weight = rule.metadata?.weight || 100;
      random -= weight;
      if (random <= 0) return rule;
    }
  
    return rules[rules.length - 1]; // Fallback
  }
  
  module.exports = {
    weightedPick,
  };
  