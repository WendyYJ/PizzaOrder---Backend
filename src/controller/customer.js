const Customer = require("../models/customer.js");
const customerService = require("../services/customer");
const { convertUpdateBody,formatResponse } = require("../util/helper");
const {generateToken} = require('../util/jwt');

async function addCustomer(req,res) {
    const { customerName, password, firstName, lastName, email, Phone,
        ShippingAddress, BillingAddress, City, State, Postcode} = req.body;
    const existingCustomer = await (Customer.findOne({email})).exec();
    if( existingCustomer ) {
        return res.status(400).json("User already exist");
    }
    const customer = new Customer ({
        password, 
        firstName, 
        lastName, 
        Phone,
        email, 
        BillingAddress, 
        City, 
        State, 
        Postcode
    });
    if(password.length > 6 || password.length < 6) {
        return res.status(401).json("password length is incorrect, should be six digits");
    }
    customer.ShippingAddresses.push(ShippingAddress);
    await customer.hashPassword();
    await customer.save();
    const token = generateToken(customer._id);
    return res.status(201).json({customerName,token});
}

async function getCustomer(req,res) {
    const {id} = req.params;
    const customer = await customerService.getOne(id);
    if(!customer) {
        return formatResponse(res,'No existing customer',400);
    }
    return formatResponse(res,customer);
}

async function updateCustomer(req,res) {
    const { id } = req.params;
    const keys = [
        'firstName', 
        'lastName', 
        'Phone',
        'email', 
        'BillingAddress', 
        'City', 
        'State', 
        'Postcode'
    ];
    if(id.length != 24) {
        return formatResponse(res,'No existing customer',404);
    } 
    console.log(req.body);
    const customer = await customerService.updateOne(
        id,
        convertUpdateBody(req.body,keys)
    );
    if (! customer) {
        return formatResponse(res,'No existing customer',404);
    }
    return formatResponse(res,customer);
}

async function addShippingAddress(req,res) {
    const {id} = req.params;
    const {ShippingAddress} = req.body;
    const customer = await customerService.addShipping(id,ShippingAddress);
    if(!customer) {
        return formatResponse(res,'No existing customer',400);
    }
    return formatResponse(res,customer);
}

async function getShippingAddress(req,res) {
    const {id} = req.params;
    const address = await customerService.getShipping(id);
    if(!address) {
        return formatResponse(res,'No existing customer',400);
    }
    return formatResponse(res,address);
}

async function deleteCustomer(req,res) {
    const {id} = req.params;
    const customer = await customerService.deleteOne(id);
    if(!customer) {
        return formatResponse(res,'No existing customer',400);
    }
    return formatResponse(res,customer);
}

module.exports = {
    getCustomer,
    addCustomer,
    updateCustomer,
    addShippingAddress,
    getShippingAddress,
    deleteCustomer,
}