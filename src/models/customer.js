const mongoose = require("mongoose");

const joi = require("@hapi/joi");

const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:email => !joi.string().email().validate(email).error,
            msg:'Invalid email format'
        }
    },
    ShippingAddresses:{
        type:Array,
        required:true,
        items:{
            type:String
        }
    },
    BillingAddress:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Postcode:{
        type:"number",
        required:true,
        minlength:4,
        maxlength:4
    },
    Phone:{
        type:"number",
        required:true
    },
    __v:{
        type:Number,
        select:false
    },
    orders:[
        {
            type:String,
            ref:"order"
        }
    ]
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
}
);

schema.virtual('fullName').get(function() {
    return this.firstName + " " + this.lastName;
})

schema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password,10);
}

schema.methods.validatePassword = async function(password) {
    const validatePassword = await bcrypt.compare(password,this.password); 
    return validatePassword;
}

const model = mongoose.model('Customer',schema);

module.exports = model;