const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const schema = new mongoose.Schema({ 
    id: {
        type:String,
        select:false,
    },
    IngredientName:{
        type:String,
        required:true
    },
    Description: {
        type:String,
        required:true
    },
    UnitPrice: {
        type:Number,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Type: {
        type:String,
        required:true
    },
    Pizza:{
        type:Array,
        items:{
            type:String
        }
    },
    Order:{
        type:Array,
        items:String
    },
    Stock:{
        type:Number,
        required:true
    },
    __v:{
        type:Number,
        select:false
    },
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
}
);

const model = mongoose.model('Ingredient',schema);

module.exports = model;