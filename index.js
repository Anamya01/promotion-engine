const express = require('express');
const promotionRoutes = require('./routes/promotionRoutes');
const { initializeRules } = require('./services/ruleService');
const app = express();
const PORT = process.env.PORT || 3000;
initializeRules();// loading rules
app.use(express.json());

//promotion-related routes
app.use('/api', promotionRoutes);

app.get('/', (req, res) => {
  res.send('Promotion Rule Engine is running');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });