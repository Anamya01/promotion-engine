const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Loads and parses rules from the YAML file.
 * @returns {Array} Parsed rules array
 * @throws Will throw an error if the file is invalid or improperly formatted
 */
function loadRulesFromYaml() {
  try {
    const yamlPath = path.join(__dirname, '../data/rules.yaml');
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const parsed = yaml.load(fileContents);

    // Basic format validation
    if (!parsed || !parsed.rules || !Array.isArray(parsed.rules)) {
      throw new Error('Invalid YAML format: Missing or malformed "rules" array');
    }

    // Optional: Validate each rule has required fields
    parsed.rules.forEach((rule, index) => {
      if (!rule.id || !rule.conditions || !rule.promotion) {
        throw new Error(`Invalid rule : Missing required fields`);
      }
    });

    console.log(`Loaded ${parsed.rules.length} rules from YAML`);
    return parsed.rules;
  } catch (error) {
    console.error('Failed to load rules.yaml:', error.message);
    throw error;
  }
}

module.exports = {
  loadRulesFromYaml,
};
