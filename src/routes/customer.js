const express = require("express");
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const { addCustomer, 
        updateCustomer,
        getShippingAddress,
        addShippingAddress,
        deleteCustomer,
        getCustomer 
      } = require("../controller/customer");

router.get("/:id",authGuard,getCustomer);

router.get("/shipping/:id",getShippingAddress);

router.post("/shipping/:id",addShippingAddress);

router.post('/',addCustomer);

router.put("/:id",authGuard,updateCustomer);

router.delete("/:id",deleteCustomer);


module.exports= router;