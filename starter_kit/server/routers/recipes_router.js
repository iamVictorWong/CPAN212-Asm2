// recipes_router.js
const express = require("express");
const Recipe = require("../models/recipe"); 

const router = express.Router();

// fetch all recipes
router.get("/recipe", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a recipe to our Collection
router.post("/recipe", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to find and send content to the client app
router.get("/recipe/:id", getRecipe, (req, res) => {
  res.json(res.recipe);
});

// to find and edit documents on the front end
router.put("/recipe/:id", getRecipe, async (req, res) => {
  if (req.body.name != null) {
    res.recipe.name = req.body.name;
  }
  if (req.body.description != null) {
    res.recipe.description = req.body.description;
  }
  if (req.body.difficulty != null) {
    res.recipe.difficulty = req.body.difficulty;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.steps != null) {
    res.recipe.steps = req.body.steps;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to find and delete the selected document
router.delete("/recipe/:id", getRecipe, async (req, res) => {
  try {
    await res.recipe.deleteOne();
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: "Cannot find recipe" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
