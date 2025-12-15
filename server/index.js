const express = require('express')
require('../db/mongoose')
const routers = require('./routes/routes.js')
const path = require('path');

const app = express()
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routers);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})