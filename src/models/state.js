const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    
}
);

const model = mongoose.model('State',schema);

module.exports = model;