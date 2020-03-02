const stateService = require('../services/state');

const { formatResponse } = require("../util/helper");

async function addState(req,res) { 
    const { State, City } = req.body;
    const existingState = await stateService.getOneByField({City});
    if(existingState) {
        return formatResponse(res,'Duplicate State',400);
    }
    const states = await stateService.createOne({
        City,
        State
    });

    return formatResponse(res,states);
}

async function getCityByState(req,res) {
    const {State} = req.params;
    const City = await stateService.getAllByState(State);
    return formatResponse(res,City);
}

module.exports = {
    addState,
    getCityByState
}
