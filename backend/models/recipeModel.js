const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the recipe name"],
    },
    image: {
      type: String,
      required: [false],
    },
    link: {
      type: String,
      required: [false],
    },
    datapoints: {
      type: Array,
      required: [false],
    },
    id:{
        type: Number,
        required: [true],
    },
    type:{
        type: String,
        required: [true],
    },
    relevance:{
        type: Number,
        required: [true],
    },
    content:{
        type:String,
        required:[false],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
