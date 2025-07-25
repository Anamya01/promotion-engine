/**
 * Evaluates whether all rule conditions are satisfied for a given player.
 * @param {Object} conditions - Rule conditions (e.g., { playerLevel: ">=15" })
 * @param {Object} playerData - Incoming player data (e.g., { playerLevel: 18 })
 * @returns {boolean} True if all conditions pass, false otherwise
 */
function isRuleValidForPlayer(conditions, playerData) {
    for (const key in conditions) {
      const conditionValue = conditions[key];
      const playerValue = playerData[key];
  
      const result = evaluateCondition(playerValue, conditionValue);
      console.log(`Checking condition: ${key} | Player: ${playerValue} | Rule: ${conditionValue} | Match: ${result}`);
  
      if (!result) {
        console.log(`Condition failed: ${key}`);
        return false;
      }
    }
  
    return true;
  }
  
  /**
   * Evaluates a single condition expression (e.g., ">=15") against a player's value.
   * @param {any} playerValue - Actual value from player data
   * @param {string} conditionStr - Condition string from YAML (e.g., ">=15")
   * @returns {boolean} Whether the condition is met
   */
  function evaluateCondition(playerValue, conditionStr) {
    const match = conditionStr.match(/^([<>!=]=?|==)(.+)$/);
  
    if (!match) {
      console.warn(`Invalid condition format: "${conditionStr}"`);
      return false;
    }
  
    const [, operator, rawExpected] = match;
    const expectedValue = parseIfPossible(rawExpected.trim());
  
    switch (operator) {
      case '==': return playerValue == expectedValue;
      case '!=': return playerValue != expectedValue;
      case '>=': return playerValue >= expectedValue;
      case '<=': return playerValue <= expectedValue;
      case '>':  return playerValue > expectedValue;
      case '<':  return playerValue < expectedValue;
      default:
        console.warn(`Unsupported operator in condition: "${operator}"`);
        return false;
    }
  }
  
  /**
   * Attempts to parse a string value into number or boolean, otherwise returns original string.
   * @param {string} value - Raw string value (e.g., "true", "18", "low")
   * @returns {number | boolean | string}
   */
  function parseIfPossible(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(Number(value))) return Number(value);
    return value;
  }
  
  module.exports = {
    isRuleValidForPlayer,
  };
  