## Promotion Rule Evaluation Engine

A lightweight, extensible rule engine built with Node.js to evaluate dynamic player-specific promotions based on YAML-configured rules. It supports A/B testing, expiration, priority-based resolution, and weighted randomness.

---

### Features

- Dynamic rule evaluation from YAML
- Condition-based filtering (`>=`, `<=`, `==`, etc.)
- A/B group support
- Rule expiry handling
- Priority-based rule resolution
- Weighted randomness between competing rules
- Real-time evaluation metrics
- Complete test suite with Jest

---


---

## Getting Started
### Install Dependencies
```bash
npm install
```
### Start the server
```bash
node index.js 
```

### Api Endpoints 

#### Post /api/promotion

##### Request Body 
```bash
{
  "playerId": "user123",
  "playerLevel": 20,
  "spendTier": "low",
  "country": "IN",
  "daysSinceLastPurchase": 2,
  "hasActiveBonus": false,
  "isPremiumUser": false
}
```

#### Repsonse 
```bash 
{
  "promotion": {
    "id": 201,
    "title": "Loyal Player Bonus",
    "description": "100 Free Spins + 2X XP for loyal users",
    "reward": {
      "type": "spins",
      "amount": 100
    }
  }
}
```

#### GET /api/metrics

##### Response
```bash
{
  "totalEvaluations": 12,
  "totalHits": 10,
  "totalMisses": 2,
  "averageLatencyMs": 3,
  "hitRatePercent": "83.33",
  "missRatePercent": "16.67"
}
```


#### Get /api/reload/

##### Response
```bash 
{
  "message": "Rules reloaded successfully.",
  "rulesCount": 20
}
```

### Sample rules.yaml
```bash
rules:
  - id: "promo_loyal_low_spender"
    priority: 1
    conditions:
      country: "==IN"
      playerLevel: ">=15"
      spendTier: "==low"
      daysSinceLastPurchase: "<=3"
    metadata:
      weight: 80
      abGroup: "A"
      validUntil: "2025-12-31"
    promotion:
      id: 201
      title: "Loyal Player Bonus"
      description: "100 Free Spins + 2X XP for loyal users"
      reward: 
        type: "spins"
        amount: 100

```
=======
# Promotion Rule Evaluation Engine

A lightweight, extensible rule engine built with Node.js to evaluate dynamic player-specific promotions based on YAML-configured rules. It supports A/B testing, expiration, priority-based resolution, and weighted randomness.

---

## Features

- Dynamic rule evaluation from YAML
- Condition-based filtering (`>=`, `<=`, `==`, etc.)
- A/B group support
- Rule expiry handling
- Priority-based rule resolution
- Weighted randomness between competing rules
- Real-time evaluation metrics
- Complete test suite with Jest

---


---

## Getting Started
### Install Dependencies
```bash
npm install
```
### Start the server
```bash
node index.js 
```

### Api Endpoints 

#### Post /api/promotion

##### Request Body 
```bash
{
  "playerId": "user123",
  "playerLevel": 20,
  "spendTier": "low",
  "country": "IN",
  "daysSinceLastPurchase": 2,
  "hasActiveBonus": false,
  "isPremiumUser": false
}
```

#### Repsonse 
```bash 
{
  "promotion": {
    "id": 201,
    "title": "Loyal Player Bonus",
    "description": "100 Free Spins + 2X XP for loyal users",
    "reward": {
      "type": "spins",
      "amount": 100
    }
  }
}
```

#### GET /api/metrics

##### Response
```bash
{
  "totalEvaluations": 12,
  "totalHits": 10,
  "totalMisses": 2,
  "averageLatencyMs": 3,
  "hitRatePercent": "83.33",
  "missRatePercent": "16.67"
}
```


#### Get /api/reload/

##### Response
```bash 
{
  "message": "Rules reloaded successfully.",
  "rulesCount": 20
}
```
