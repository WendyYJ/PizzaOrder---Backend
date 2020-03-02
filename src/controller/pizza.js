const pizzaService = require('../services/pizza');
const ingredientService = require('../services/ingredient');
const { convertUpdateBody,formatResponse,convertQuery } = require("../util/helper");

async function addPizza(req,res) {
    const {
        PizzaName,
        PizzaImage,
        Description,
        UnitPrice,
        Discount,
        IngredientRef,
    } = req.body;
    const existingPizza = await pizzaService.getOneByField({PizzaName});
    if(existingPizza) {
        return formatResponse(res,'Duplicate Pizza',400);
    }
    const pizza = await pizzaService.createOne({
        PizzaName,
        PizzaImage,
        Description,
        UnitPrice,
        Discount,
        IngredientRef
    });

    return formatResponse(res,{name:pizza.PizzaName, id:pizza._id});
}

async function addIngredient(req,res) {
    const {id,code} = req.params; 
    if (id.length != 24 || code.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }  
    const ingredient = await ingredientService.getOne(code);
    if (!ingredient) {
        return formatResponse(res,'No existing ingredient',404);
    } 
    const pizza = await pizzaService.addIngreident(id,code);
    if (!pizza) {
        return formatResponse(res,'No existing pizza',404);
    } 
      return formatResponse(res,pizza);
}


async function getAllPizza(req,res){
    const { q } = req.query;
    const total = await pizzaService.countAllWithSearch(q);  
    const { pagination, sort, search } = convertQuery(req.query,total);
    const pizzas = await pizzaService.getAll(pagination, sort, search);
    return formatResponse(res,{data:pizzas,pagination});
}

async function getPizza(req,res) {
    const { id } = req.params;
    if (id.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }
    const pizza = await pizzaService.getOne(id);
    if (!pizza) {
        return formatResponse(res,'No existing pizza',404);
    }
    return formatResponse(res,pizza);
}

async function filterPizzaByIngredient(req,res) {
    const {ingr} = req.query;
    const ingredients = ingr.split(',');
    const result = await pizzaService.filterPizzaByIngredients(ingredients);
    return formatResponse(res,result);
}

async function addOrderRef(req,res) {
    const {id,code} = req.params; 
    if (id.length != 24 || code.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }
    const pizza = await pizzaService.addOrder(id,code);
    const order = await ingredientService.getOne(code);
    if (!pizza) {
        return formatResponse(res,'No existing pizza',404);
    } else if (!order) {
        return formatResponse(res,'No existing ingredient',404);
    }
    return formatResponse(res,{pizza});
}

async function updatePizza(req,res) {
    const { id } = req.params;
    if (id.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }
    const keys = [
        'PizzaName',
        'PizzaImage',
        'Description',
        'UnitPrice',
        'Discount',
        'IngredientRef',
    ]
    const pizza =  await pizzaService.updateOne(
        id,
        convertUpdateBody(req.body,keys)
    );
    if (!pizza) {
        return formatResponse(res,'No existing pizza',404);
    }
    return formatResponse(res,pizza);
}

async function deletePizza(req,res) {
    const { id } = req.params;
    if (id.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }
    const pizza = pizzaService.deleteOne(id);
    return formatResponse(res,pizza);
}

async function deleteIngredient(req,res) {
    const {id,code} = req.params; 
    if (id.length != 24 || code.length != 24) {
        return formatResponse(res,'Incorrect ObjectID',400);
    }  
    const ingredient = await ingredientService.getOne(code);
    if (!ingredient) {
        return formatResponse(res,'No existing ingredient',404);
    } 
    const pizza = await pizzaService.deleteIngredient(id,code);
    if (!pizza) {
        return formatResponse(res,'No existing pizza',404);
    } 
    if(pizza === 'not add ingredient') {
        return formatResponse(res,'Have not add this ingredient',404);
    }
      return formatResponse(res,pizza);
}

module.exports = {
    addPizza,
    addIngredient,
    deleteIngredient,
    addOrderRef,
    getAllPizza,
    getPizza,
    filterPizzaByIngredient,
    updatePizza,
    deletePizza
}

