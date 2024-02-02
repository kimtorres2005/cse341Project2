const { Recipe, RecipeDetails } = require('../models');

const recipesGetController = {};

// GET a list of all recipes (Will return all recipes from only the recipes collection)
recipesGetController.getAllRecipes = async (req, res) => {
  try {
    // swagger.tags = ['Recipes'];
    // swagger.description = 'This endpoint will return all recipes in the database.';

    const allRecipes = await Recipe.findAll({});
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET recipes by category (Will return all recipes of said category from only the recipes collection)
recipesGetController.getRecipesByCategory = async (req, res) => {
    try {
        // swagger.tags = ['Recipes'];
        // swagger.description = 'This endpoint will return all recipes of a given category in the database.';
    
      const category = new RegExp(req.params.category.trim(), 'i');
      const recipesByCategory = await Recipe.findByCategory(category);
      res.status(200).json(recipesByCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // GET recipes by cuisine (Will return all recipes of said cuisine from only the recipes collection)
  recipesGetController.getRecipesByCuisine = async (req, res) => {
    try {
        // swagger.tags = ['Recipes'];
        // swagger.description = 'This endpoint will return all recipes of a given cuisine in the database.';
    
      const cuisine = new RegExp(req.params.cuisine.trim(), 'i');
      const recipesByCuisine = await Recipe.findByCuisine(cuisine);
      res.status(200).json(recipesByCuisine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// GET a recipe by ID (Will return recipe from only the recipe_details collection)
recipesGetController.getRecipeById = async (req, res) => {
  try {
    // swagger.tags = ['Recipe Details'];
    // swagger.description = 'This endpoint will return a recipe by ID in the database.';

    const recipeId = req.params.id;
    
    // Get details from the "recipe_details" collection
    const recipeDetails = await RecipeDetails.findById(recipeId);

    // Combine the data before sending the response
    const combinedRecipe = {
      ...recipeDetails.toObject()
    };

    res.status(200).json(combinedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = recipesGetController;