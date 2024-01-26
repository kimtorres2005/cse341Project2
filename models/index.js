const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeId: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, required: true },
    description: { type: String, required: true },
}, { collection: 'recipes' });

recipeSchema.statics.findByCategory = async function (category) {
    return this.find({ category: category });
};

recipeSchema.statics.findByCuisine = async function (cuisine) {
    return this.find({ cuisine: cuisine });
};

recipeSchema.statics.postRecipe = async function (recipe) {
    return this.create(recipe);
};

recipeSchema.statics.updateById = async function (recipeId, update) {
    return this.findOneAndUpdate({ recipeId: recipeId }, update, { new: true });
};

recipeSchema.statics.deleteById = async function (recipeId) {
    return this.findOneAndDelete({ recipeId: recipeId });
}

const Recipe = mongoose.model('Recipe', recipeSchema);

const recipeDetailsSchema = new mongoose.Schema({
    recipeId: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    notes: { type: String, required: false },
}, { collection: 'recipe_details' });

recipeDetailsSchema.statics.findById = async function (recipeId) {
    return this.findOne({ recipeId: recipeId });
};

recipeDetailsSchema.statics.postRecipeDetails = async function (recipeDetails) {
    return this.create(recipeDetails);
};

const RecipeDetails = mongoose.model('RecipeDetails', recipeDetailsSchema);

module.exports = {
    Recipe,
    RecipeDetails,
  };