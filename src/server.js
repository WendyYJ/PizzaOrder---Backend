require('dotenv').config();
const express = require('express');
const app = express();
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const bodyPaser = require('body-parser');
const port = process.env.port || 3000;
const routes = require("./routes");
const errorHandler = require('./middleware/errorHandler');
const {connectToDB} = require('./util/db');

const morganLog = process.env.NODE_EVN === 'production' ? morgan('common'):morgan('dev');
app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(bodyPaser.json());
app.use('/',routes);
app.use('/',errorHandler);

connectToDB().then (() => {
    app.listen(port,() => {
        console.log(`listen on ${port}`);
    })
}).catch(e => {
    console.log(e);
    process.exit(1);
})
