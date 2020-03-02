const ingredientService = require('../services/ingredient');
const pizzaService = require('../services/pizza');
const { convertUpdateBody,formatResponse } = require("../util/helper");

/**
 * Create a new Ingredient to the ingredientDB
 * @param {request} req 
 * @param {response} res 
 */
async function addIngredient(req,res) {
    const {
        IngredientName,
        Description,
        UnitPrice,
        Image,
        Type,
        Stock
    } = req.body;

    const existingIngredient = await ingredientService.getOneByField({IngredientName});
    if(existingIngredient) {
        return formatResponse(res,'Duplicate ingredient code',400);
    }
    const ingredient = await ingredientService.createOne({
        IngredientName,
        Description,
        UnitPrice,
        Image,
        Type,
        Stock
    });
    return formatResponse(res,{name:ingredient.IngredientName, id:ingredient._id});
}
/**
 * This is for pizza builder. 
 * @param {String} type 
 * @returns an array of ingredient by Type.
 */
    async function getIngredientByType(req,res) {
    const { type } = req.params;
    const ingredients = await ingredientService.getAllByType(type);
    if(ingredients) {
        return formatResponse(res,{ingredients});
    } else {
        return formatResponse(res,'No ingredient of this type',400);
    }

}

/**
 * @param ingredientName
 * This is for deducting stock for an ingredient
 */
async function deductStock(req,res) {
    const {id,number} = req.params;
    const ingredient = await ingredientService.deductStock(id,number);
    if (ingredient === null) {
        return formatResponse(res,'No ingredient of this type',400);
    } else if (ingredient === 'out of stock') {
        return formatResponse(res,'out of stock',300);
    } else {
        return formatResponse(res,{ingredient});
    }
}

/**
 * Update ingredients
 * @param {request} req 
 * @param {response} res 
 * @return if successful, return updated ingredient otherwise warning feedback
 */
async function updateIngredient(req,res) {
    const { id } = req.params;
    const keys = [
            'IngredientName',
            'Description',
            'UnitPrice',
            'Image',
            'Type',
            'Stock'
        ];
    if(id.length != 24) {
        return formatResponse(res,'No existing ingredient',404);
    } 
    const ingredient = await ingredientService.updateOne(
        id,
        convertUpdateBody(req.body,keys)
    );
    if (! ingredient) {
        return formatResponse(res,'No existing ingredient',404);
    }
    return formatResponse(res,ingredient);
}

/**
 * Delete the given ingredient from ingredient and the reference in pizza.
 * @param {request} req 
 * @param {response} res 
 */
async function deleteIngredient(req,res) {
    const { id } = req.params;
    const ingredient = ingredientService.deleteOne(id);
    pizzaService.updateManyPizza(id);
    return formatResponse(res,ingredient);
}

module.exports = {
    addIngredient,
    getIngredientByType,
    deductStock,
    updateIngredient,
    deleteIngredient
}