const express = require('express');
const router = express.Router();

const {
  evaluateRules,
  reloadRules,
} = require('../services/ruleService');

const {
  recordEvaluation,
  getMetrics,
} = require('../services/metricsService');

const PromotionRequest = require('../dto/promotionRequest');
const { validatePlayerData } = require('../utils/validation');

// POST /api/promotion - Evaluate and return best matching promotion
router.post('/promotion', (req, res) => {
  const startTime = Date.now();

  try {
    const playerData = new PromotionRequest(req.body); //Convert raw body into DTO

    //Validate input
    const { isValid, errors } = validatePlayerData(playerData);
    if (!isValid) {
      return res.status(400).json({
        error: 'Invalid player data',
        details: errors,
      });
    }

    const promotion = evaluateRules(playerData);
    const latency = Date.now() - startTime;

    //Record metrics
    recordEvaluation(!!promotion, latency);

    res.status(200).json({
      promotion: promotion || null,
    });
  } catch (error) {
    console.error('Error in /promotion:', error);
    res.status(500).json({ error: 'Failed to evaluate promotion.' });
  }
});

// GET /api/reload - Hot reload YAML rules
router.get('/reload', (req, res) => {
  try {
    const count = reloadRules();
    res.status(200).json({
      message: `Rules reloaded successfully.`,
      rulesCount: count,
    });
  } catch (error) {
    console.error('Error in /reload:', error);
    res.status(500).json({ error: 'Failed to reload rules.' });
  }
});

// GET /api/metrics - Show hit/miss/latency stats
router.get('/metrics', (req, res) => {
  try {
    const stats = getMetrics();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error in /metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics.' });
  }
});

module.exports = router;
