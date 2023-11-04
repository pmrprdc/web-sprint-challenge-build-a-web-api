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


actionsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    res.status(200).json(action);
  } catch (err) {
    console.error('Error getting action:', err);
    res.status(500).json({ message: 'Something went wrong while trying to fetch the action.' });
  }
});


actionsRouter.post('/', async (req, res) => {
  try {
    const { notes, description, project_id } = req.body;

    if (!notes || !description || !project_id) {
      return res.status(400).json({
        message: 'Please include notes, description, and project_id in the request body.',
      });
    }

    const newAction = await Actions.insert(req.body);

    res.status(201).json(newAction);
  } catch (err) {
    console.error('Error creating action:', err);
    res.status(500).json({ message: 'Something went wrong while trying to create the action.' });
  }
});



module.exports = actionsRouter;
