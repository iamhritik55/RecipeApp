const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel");

const getRecipes = asyncHandler(async (req, res) => {
  console.log(req.user);
  const recipes = await Recipe.find({ user_id: req.user.id });
  res.status(200).json(recipes);
});

const createRecipe = asyncHandler(async (req, res) => {
  if(await (await Recipe.find({id:req.body.id,user_id:req.user.id})).length>0 ) {
    res.status(403).json("Recipe already exists for this user");
    throw new Error("Recipe already exists for this user");
  }
  const recipe=new Recipe(req.body);
  recipe.user_id=req.user.id;

  const recipeSaved = await Recipe.create(recipe);

  res.status(201).json(recipeSaved);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipeListFetched= await Recipe.find({id : req.params.id});
  const recipe=recipeListFetched[0];

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  if (recipe.user_id !== req.user.id) {
    res.status(403);
    console.log(recipe.user_id," ",req.user.id)
    throw new Error("User don't have permission to update other user recipes");
  }
  await Recipe.deleteOne({ id: req.params.id });
  res.status(200).json(recipe);
});

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
};
