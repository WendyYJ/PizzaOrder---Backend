const express = require("express");
const router = express.Router();

const { addState,getCityByState } = require('../controller/state');

router.get("/:State",getCityByState);
router.post("/",addState);

module.exports = router;