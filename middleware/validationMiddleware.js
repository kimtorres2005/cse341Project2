const { body, query, param, validationResult } = require("express-validator");
const { Recipe, RecipeDetails } = require('../models');

const validate = (validationKey) => {
  switch (validationKey) {
    case "postRecipe":
      return [
        body("name").notEmpty().withMessage("Name is required"),
        body("category").notEmpty().withMessage("Category is required"),
        body("cuisine").notEmpty().withMessage("Cuisine is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("prepTime").isInt().withMessage("Prep time must be an integer"),
        body("cookTime").isInt().withMessage("Cook time must be an integer"),
        body("ingredients")
          .isArray()
          .withMessage("Ingredients must be an array"),
        body("instructions")
          .isArray()
          .withMessage("Instructions must be an array"),
      ];

    case "getRecipeById":
      return [
        param("id")
          .notEmpty()
          .isInt()
          .withMessage("Valid recipe ID is required")
          .custom(async (id) => {
            const recipe = await RecipeDetails.findById(id);
            if (!recipe) {
              throw new Error(`Sorry, recipe with ID: ${id} does not exist.`);
            }
            return true;
          }),
      ];

    case "getRecipesByCategory":
      return [
        param("category")
          .notEmpty()
          .withMessage("Category is required")
          .custom(async (category) => {
            const recipes = await Recipe.findByCategory(
              new RegExp(category, "i")
            );
            if (recipes.length === 0) {
              throw new Error(
                `Sorry, no recipes found for category: ${category}.`
              );
            }
            return true;
          }),
      ];

    case "getRecipesByCuisine":
      return [
        param("cuisine")
          .notEmpty()
          .withMessage("Cuisine is required")
          .custom(async (cuisine) => {
            const recipes = await Recipe.findByCuisine(
              new RegExp(cuisine, "i")
            );
            if (recipes.length === 0) {
              throw new Error(
                `Sorry, no recipes found for cuisine: ${cuisine}.`
              );
            }
            return true;
          }),
      ];

    case "putRecipeById":
      return [
        param("id")
          .notEmpty()
          .isInt()
          .withMessage("Valid recipe ID is required")
          .custom(async (id) => {
            const recipe = await RecipeDetails.findById(id);
            if (!recipe) {
              throw new Error(`Sorry, recipe with ID: ${id} does not exist.`);
            }
            return true;
          }),
        // Additional validation rules for updating a recipe
        body("name").notEmpty().withMessage("Name is required"),
        body("category").notEmpty().withMessage("Category is required"),
        body("cuisine").notEmpty().withMessage("Cuisine is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("prepTime").isInt().withMessage("Prep time must be an integer"),
        body("cookTime").isInt().withMessage("Cook time must be an integer"),
        body("ingredients")
          .isArray()
          .withMessage("Ingredients must be an array"),
        body("instructions")
          .isArray()
          .withMessage("Instructions must be an array"),
      ];

    case "deleteRecipeById":
      return [
        param("id")
          .notEmpty()
          .isInt()
          .withMessage("Valid recipe ID is required")
          .custom(async (id) => {
            const recipe = await RecipeDetails.findById(id);
            if (!recipe) {
              throw new Error(`Sorry, recipe with ID: ${id} does not exist.`);
            }
            return true;
          }),
      ];

    default:
      return [];
  }
};

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validate,
  validationMiddleware,
};
