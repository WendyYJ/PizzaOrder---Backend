const express = require("express");
const router = express.Router();

const { addPizza, 
        addIngredient,
        deleteIngredient,
        getAllPizza, 
        getPizza,
        updatePizza,
        deletePizza,
        filterPizzaByIngredient
      } = require('../controller/pizza');

router.get("/",getAllPizza);

router.get("/filter",filterPizzaByIngredient);

router.get("/:id",getPizza);

router.post("/",addPizza);

router.post("/:id/ingredient/:code",addIngredient);

router.put("/:id",updatePizza);

router.delete("/:id/ingredient/:code",deleteIngredient);

router.delete(":/id",deletePizza);


module.exports= router;