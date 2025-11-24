require('dotenv').config();
const mongoose = require('mongoose')
const databaseUrl = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
