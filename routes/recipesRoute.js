const router = require('express').Router();
const controller = require('../controllers/recipesController');
const controller2 = require('../controllers/recipesGetController');

// GET a list of all recipes (Will return all recipes from only the recipes collection)
router.get('/', controller2.getAllRecipes);

// GET recipes by category (Will return all recipes of said category from only the recipes collection)
router.get('/category/:category', controller2.getRecipesByCategory);

// GET recipes by cuisine (Will return all recipes of said cuisine from only the recipes collection)
router.get('/cuisine/:cuisine', controller2.getRecipesByCuisine);

// GET a recipe by ID (Will return recipe from only the recipe_details collection)
router.get('/:id', controller2.getRecipeById);

// POST a new recipe (Will add recipe fields info to both collections)
router.post('/', controller.postRecipe);

// PUT a recipe by ID (Will update all recipe fields for both collections)
router.put('/:id', controller.putRecipeById);

// DELETE a recipe by ID (Will delete recipe from both collections)
router.delete('/:id', controller.deleteRecipeById);

module.exports = router;