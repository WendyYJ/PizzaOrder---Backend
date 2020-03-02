const express = require('express');
const { loginUser } = require('../controller/auth.js');

const router = express.Router();

router.post('/',loginUser);

module.exports = router;