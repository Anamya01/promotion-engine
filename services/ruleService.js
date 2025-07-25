const { loadRulesFromYaml } = require('../utils/ruleParser');
const { isRuleValidForPlayer } = require('../utils/conditionEvaluator');
const { isRuleExpired } = require('../utils/dateUtils');
const { assignABGroup } = require('../utils/groupAssigner');
const { weightedPick } = require('../utils/weightedSelector');

let _rules = [];

/**
 * Loads rules from YAML file into memory at startup.
 */
function initializeRules() {
    _rules = loadRulesFromYaml();
    console.log('Rules initialized:', _rules.length);
}

/**
 * Reloads the rules from file manually (used for hot reload).
 * @returns {number} Number of rules reloaded
 */
function reloadRules() {
    _rules = loadRulesFromYaml();
    console.log('Rules reloaded:', _rules.length);
    return _rules.length;
}

/**
 * Returns currently loaded rules.
 * @returns {Array} Rule objects
 */
function getRules() {
    return _rules;
}

/**
 * Main function to evaluate which promotion rule applies to a given player.
 * @param {Object} playerData - Input player information
 * @returns {Object|null} Matched promotion object or null
 */
function evaluateRules(playerData) {
    const abGroup = assignABGroup(playerData.playerId);
    console.log('Evaluating rules for player:', playerData.playerId, '| Group:', abGroup);

    // Step 1: Filter rules by A/B group, expiry, and conditions
    const filtered = _rules.filter(rule => {
        if (rule.metadata?.abGroup && rule.metadata.abGroup !== abGroup) {
            return false;
        }

        if (rule.metadata?.validUntil && isRuleExpired(rule.metadata.validUntil)) {
            return false;
        }

        return isRuleValidForPlayer(rule.conditions, playerData);
    });

    console.log('Matching rules found:', filtered.length);

    // Step 2: If no rules matched, return null
    if (filtered.length === 0) {
        return null;
    }

    // Step 3: Sort and select highest priority rules
    const topPriority = Math.min(...filtered.map(r => r.priority ?? 999));
    const topPriorityRules = filtered.filter(r => (r.priority ?? 999) === topPriority);

    // Step 4: If only one rule at top priority, return it directly
    if (topPriorityRules.length === 1) {
        console.log('Selected rule:', topPriorityRules[0].id, '(highest priority)');
        return topPriorityRules[0].promotion;
    }

    // Step 5: Use weighted random selection among top-priority rules
    const selectedRule = weightedPick(topPriorityRules);
    console.log('Selected rule by weight:', selectedRule?.id);
    return selectedRule?.promotion || null;
}

module.exports = {
    initializeRules,
    reloadRules,
    getRules,
    evaluateRules,
};
