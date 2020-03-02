const express = require("express");
const router = express.Router();
const { addIngredient } = require("../controller/ingredient");
const { getIngredientByType } = require("../controller/ingredient");
const { deductStock } = require("../controller/ingredient");
const { updateIngredient } = require("../controller/ingredient");
const { deleteIngredient } = require("../controller/ingredient");

router.get("/:type",getIngredientByType);

router.post("/",addIngredient);

router.post("/:id/stock/:number",deductStock)

router.put("/:id",updateIngredient);

router.delete("/:id",deleteIngredient);


module.exports= router;