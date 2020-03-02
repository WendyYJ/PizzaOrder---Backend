const Customer = require('../models/customer');
const Service = require('./service');

class customerService extends Service {
    async createOne(fields) {
        const document = new this.Model(fields);
        await document.hashPassword();
        await document.save();
        return document;
    }
    async getOneByField(field) {
        return this.Model.findOne(field);
    }
    async validateCustomer(email,password) {
        const customer = await this.Model.findOne({email});
        const validatePassword = await customer.validatePassword(password);
        return validatePassword ? customer : null;
    }

    async addShipping(id,address) {
        const customer = await this.Model.findById(id);
        console.log(id);
        if (!customer) {
            return null;
        }
        await customer.ShippingAddresses.push(address);
        await customer.save();
        return customer;
    }

    async getShipping(id) {
        const customer = await this.Model.findById(id);
        if (!customer) {
            return null;
        }
        const address = await customer.ShippingAddresses;
        return address;

    }
}

module.exports = new customerService(Customer);