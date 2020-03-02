const Ingredient = require('../models/ingredient');
const Service = require('./service');

class ingredientService extends Service {
    async getOneByField(field) {
      return this.Model.findOne(field);
    }

    async getAllByType(field) {
      return this.Model.find({Type:field}).exec();
    }

    async deductStock(field,number) {
      const ingredient = await this.Model.findById(field);
      if(!ingredient) {
        return null;
      }
      if (ingredient.stock === 0 || (ingredient.Stock - number) <= 0 ) {
        return 'out of stock';
      }
      ingredient.Stock = ingredient.Stock - number;
      await ingredient.save();
      return ingredient;
    }

}

module.exports = new ingredientService(Ingredient);

