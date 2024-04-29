
// routes/category-routes.js
const router = require('express').Router();
const { Category } = require('../models');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a category by ID
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a category by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    await category.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
