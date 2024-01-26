const { Recipe, RecipeDetails } = require("../models");

const recipesController = {};

const calculateTimes = (recipe) => {
  // Assuming the user provides prepTime and cookTime in minutes
  const prepTimeInMinutes = recipe.prepTime || 0;
  const cookTimeInMinutes = recipe.cookTime || 0;

  // Calculate totalTime by adding prepTime and cookTime
  const totalTimeInMinutes = prepTimeInMinutes + cookTimeInMinutes;

  // Convert totalTime to hours and minutes for a more user-friendly format
  const totalTimeHours = Math.floor(totalTimeInMinutes / 60);
  const totalTimeMinutes = totalTimeInMinutes % 60;

  return {
    prepTime: prepTimeInMinutes,
    cookTime: cookTimeInMinutes,
    totalTime: totalTimeInMinutes,
    totalTimeFormatted: `${totalTimeHours}h ${totalTimeMinutes}m`,
  };
};

const generateRandomRecipeId = () => {
  // Generate a random 9-digit number
  return Math.floor(100000000 + Math.random() * 900000000);
};

// POST a new recipe (Will add recipe fields info to both collections)
recipesController.postRecipe = async (req, res) => {
  try {
    const newRecipeData = req.body;

    // Generate a random 9-digit recipeId
    newRecipeData.recipeId = generateRandomRecipeId();

    // Calculate times
    const times = calculateTimes(newRecipeData);

    // Save in the "recipes" collection
    const createdRecipe = await Recipe.postRecipe({
      ...newRecipeData,
      prepTime: times.prepTime,
      cookTime: times.cookTime,
      totalTime: times.totalTime,
    });

    // Save in the "recipe_details" collection
    const newRecipeDetailsData = {
      recipeId: createdRecipe.recipeId,
      name: createdRecipe.name,
      category: createdRecipe.category,
      cuisine: createdRecipe.cuisine,
      prepTime: times.prepTime,
      cookTime: times.cookTime,
      totalTime: times.totalTime,
      ingredients: req.body.ingredients || [],
      instructions: req.body.instructions || [],
      notes: req.body.notes || "",
    };

    await RecipeDetails.postRecipeDetails(newRecipeDetailsData);

    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT a recipe by ID (Will update all recipe fields for both collections)
recipesController.putRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const update = req.body;

    // Calculate times
    const times = calculateTimes(update);

    // Update in the "recipes" collection
    const updatedRecipe = await Recipe.updateById(recipeId, {
      ...update,
      prepTime: times.prepTime,
      cookTime: times.cookTime,
      totalTime: times.totalTime,
    });

    // Update in the "recipe_details" collection
    const updatedRecipeDetailsData = {
      name: update.name,
      category: update.category,
      cuisine: update.cuisine,
      prepTime: times.prepTime,
      cookTime: times.cookTime,
      totalTime: times.totalTime,
      // Add other fields from the update as needed
    };
    await RecipeDetails.updateById(recipeId, updatedRecipeDetailsData);

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a recipe by ID (Will delete recipe from both collections)
recipesController.deleteRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Delete from the "recipes" collection
    await Recipe.deleteById(recipeId);

    // Delete from the "recipe_details" collection
    await RecipeDetails.deleteById(recipeId);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = recipesController;
