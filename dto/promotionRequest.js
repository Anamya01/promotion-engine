class PromotionRequest {
    constructor(data) {
      this.playerId = data.playerId;
      this.playerLevel = Number(data.playerLevel);
      this.spendTier = data.spendTier;
      this.country = data.country;
      this.daysSinceLastPurchase = Number(data.daysSinceLastPurchase);
      this.hasActiveBonus = Boolean(data.hasActiveBonus);
      this.isPremiumUser = Boolean(data.isPremiumUser);
    }
  }
  
  module.exports = PromotionRequest;
  