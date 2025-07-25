
/**
 * Assigns a player to "A" or "B" group based on their playerId hash.
 * @param {string} playerId
 * @returns {"A" | "B"}
 */
function assignABGroup(playerId = '') {
    if (!playerId) return 'A'; // default fallback
  
    // Simple hash: sum of char codes
    const hash = playerId
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
    // Even hash → group A, odd hash → group B
    return hash % 2 === 0 ? 'A' : 'B';
  }
  
  /**
   * Filters rules by AB group
   * @param {Array} rules - Array of rule objects
   * @param {"A" | "B"} group - The group to filter by
   * @returns {Array}
   */
  function filterByGroup(rules, group) {
    return rules.filter(rule =>
      !rule.metadata?.abGroup || rule.metadata.abGroup === group
    );
  }
  
  module.exports = {
    assignABGroup,
    filterByGroup,
  };
  