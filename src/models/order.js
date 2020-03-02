const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const schema = new mongoose.Schema({ 
    id: {
        type:String,
        select:false,
    },
    OrderDate:{
        type:Date,
        required:true
    },
    PizzaProduct:{
        type:Array,
        items:[subProductSchema]
    },
    PizzaDiy:{
        type:Array,
        items:[subPizzaDIYSchema]
    },
    CustomerID:{
        type:String,
    },
    ShippingAddress:{
        type:String,
        required:true
    },
    BillingAddress:{
        type:String,
        required:true
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    __v:{
        type:Number,
        select:false
    },
}
,
    {
        timestamps:true,
        toJSON:{
            virtuals:true
        }
    }
);

const subProductSchema = new mongoose.Schema({
    PizzaID:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    UnitPrice:{
        type:Number,
        required:true
    },
    Size:{
        type:Number,
        required:true
    }
});

const subPizzaDIYSchema = new mongoose.Schema({
    IngreidentID:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    UnitPrice:{
        type:Number,
        required:true
    }
});

const model = mongoose.model('Order',schema);

module.exports = model;