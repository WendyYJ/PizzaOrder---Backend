const Pizza = require('../models/pizza');
const Service = require('./service');


class pizzaService extends Service {
    async getOneByField(field) {
        return this.Model.findOne(field);
    }

    async addIngreident(field,ingredientID) {
      const pizza = await this.Model.findById(field)
      if(!pizza) {
        return null;
      }
      pizza.IngredientRef.addToSet(ingredientID);
      await pizza.save();
      return pizza;
    }

    async deleteIngredient(field,ingredientID) {
      const pizza = await this.Model.findById(field);
      const oldLength = pizza.IngredientRef.length;
      if(!pizza) {
        return null;
      }
      pizza.IngredientRef.pull(ingredientID);
      if (oldLength === pizza.IngredientRef.length) {
        return 'not add ingredient';
      }
      await pizza.save();
      return pizza;
    }

    async addOrder(field,orderID) {
      const pizza = await this.Model.findById(field)
      if(!pizza) {
        return null;
      }
      pizzaOrderRef.addToSet(orderID);
      await pizza.save();
      return pizza;
    }

    async filterPizzaByIngredients(ingredients) {
      const result = await this.Model.find({'IngredientRef':{$all: ingredients}});
      return result;
   }

   async updateManyPizza(ingredient) {
      await this.Model.updateMany(
        {
          IngredientRef:ingredient
        },
        {
            $pull:{
              IngredientRef:ingredient
            }
        }
      );
   }
}

module.exports = new pizzaService(Pizza);