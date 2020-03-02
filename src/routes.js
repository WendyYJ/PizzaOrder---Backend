const express = require("express");
const router = express.Router();

const addCustomerRoute = require('./routes/customer.js');
const authRoute = require('./routes/auth');
const ingredientRoute = require('./routes/ingredient');
const pizzaRoute = require('./routes/pizza');
const stateRoute = require('./routes/state');
//const orderRoute = require('./routes/order');

router.use("/customers",addCustomerRoute);

router.use("/login",authRoute);

router.use("/ingredient",ingredientRoute);

router.use("/pizza",pizzaRoute);

router.use("/state",stateRoute);

//router.use("/order",orderRoute);

module.exports = router;