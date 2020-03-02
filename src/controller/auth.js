const customerService = require('../services/customer');
const { formatResponse } = require('../util/helper');
const { generateToken } = require('../util/jwt');

async function loginUser(req,res) {
    
    const { email, password } = req.body;
    const customer = await customerService.validateCustomer(email,password);
    if (!customer) {
            return formatResponse(res,'Invalid email or password',401);
    }   
    const token = generateToken(customer._id);
    return formatResponse(res,{name:customer.fullName, token });
}
module.exports = {
    loginUser
}
