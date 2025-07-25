let totalEvaluations = 0;
let totalHits = 0;
let totalMisses = 0;
let totalLatency = 0;

/**
 * Records an evaluation result for metrics tracking.
 * @param {boolean} wasHit - Whether a promotion was returned
 * @param {number} latency - Time taken (ms) to evaluate
 */
function recordEvaluation(wasHit, latency) {
  totalEvaluations += 1;
  totalLatency += latency;

  if (wasHit) {
    totalHits += 1;
  } else {
    totalMisses += 1;
  }

  console.log(`Evaluation recorded | Hit: ${wasHit} | Latency: ${latency}ms`);
}

/**
 * Returns the current aggregated metrics.
 * @returns {Object} Evaluation stats including hit rate and latency
 */
function getMetrics() {
  const averageLatency = totalEvaluations
    ? Math.round(totalLatency / totalEvaluations)
    : 0;

  const hitRate = totalEvaluations
    ? ((totalHits / totalEvaluations) * 100).toFixed(2)
    : '0.00';

  const missRate = totalEvaluations
    ? ((totalMisses / totalEvaluations) * 100).toFixed(2)
    : '0.00';

  return {
    totalEvaluations,
    totalHits,
    totalMisses,
    averageLatencyMs: averageLatency,
    hitRatePercent: hitRate,
    missRatePercent: missRate,
  };
}

module.exports = {
  recordEvaluation,
  getMetrics,
};
