const State = require('../models/state');
const Service = require('./service');

class stateService extends Service {
    async getOneByField(field) {
        return this.Model.findOne(field);
      }

      async getAllByState(field) {
        return this.Model.find({State:field}).exec();
      }
}

module.exports = new stateService(State);