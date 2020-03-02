const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const schema = new mongoose.Schema({ 

    PizzaName:{
        type:String,
        required:true
    },
    PizzaImage:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    UnitPrice: {
        type:Number,
        required:true
    },
    Discount:{
        type:Number,
    },
    IngredientRef:[
            {
                type:String,
                ref:"Ingredient"
            }
    ],
    OrderRef:[
        {
            type:String,
            ref:"Order"
        }
    ],
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

schema.static.searchQuery = async function(pagination,sort,search) {
    const { page, pageSize } = pagination;
    return this.find({_id:{$regex:search,$options:'i'}})
        .sort(sort)
        .skip((page-1) * pageSize)
        .limit(pageSize);
}

schema.static.searchQueryCount = async function(search) {
    const count = await this.find({_id:{$regex: search, $option:'i'}}).countDocuments();
    return count();
};

const model = mongoose.model('Pizza',schema);

module.exports = model;
