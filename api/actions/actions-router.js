const express = require('express');
const actionsRouter = express.Router();
const Actions = require('./actions-model');

actionsRouter.get('/', async(req, res) => {
    const allActions = await Actions.get();
  try {
   res.status(201).json(allActions)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the actions.' });
  }
});

module.exports = actionsRouter;
