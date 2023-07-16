const express = require("express");
const router = express.Router();
const {
  getRecipes,
  createRecipe,
  deleteRecipe
} = require("../controllers/recipeController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getRecipes).post(createRecipe);
router.route("/:id").delete(deleteRecipe);

module.exports = router;
