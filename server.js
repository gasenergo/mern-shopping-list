const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items')



const app = express();

app.use(bodyParser.json());
//config database
const db = require('./config/keys').mongoURI;
//connect to database
mongoose
    .connect(db)
    .then(()=>console.log('Database connected'))
    .catch(error =>console.log(error));
//use routes
app.use('/api/items',items);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log('Server started on port '+port));