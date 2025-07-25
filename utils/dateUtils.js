const dayjs = require('dayjs');

/**
 * Checks whether a rule has expired based on its 'validUntil' date.
 * @param {string} validUntil 
 * @returns {boolean} True if expired, otherwise false
 */
function isRuleExpired(validUntil) {
  if (!validUntil) return false;

  const now = dayjs();
  const expiry = dayjs(validUntil);

  return now.isAfter(expiry, 'day'); // Check if current date is strictly after expiry
}

/**
 * Determines if the current day is a weekend (Saturday or Sunday).
 * @returns {boolean} True if today is Saturday or Sunday
 */
function isTodayWeekend() {
  const day = dayjs().day(); // Sunday = 0, Saturday = 6
  return day === 0 || day === 6;
}

/**
 * Stub for evaluating weekend-related conditions in rules.
 * Currently unused in rule evaluation.
 * @param {string} operatorValue
 * @returns {boolean} Always returns true (placeholder)
 */
function evaluateWeekendCondition(operatorValue) {
  // Not implemented
  return true;
}

module.exports = {
  isRuleExpired,
  isTodayWeekend,
  evaluateWeekendCondition,
};
