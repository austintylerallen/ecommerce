// routes/tag-routes.js
const router = require('express').Router();
const { Tag } = require('../models');

// Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single tag by ID
router.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/tags', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a tag by ID
router.put('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    await tag.update(req.body);
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a tag by ID
router.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    await tag.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
