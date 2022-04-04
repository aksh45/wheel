const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const admin = require('./routes/Admin')
require("dotenv/config");
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/admin',admin);
app.get('*',function(req, res){
	res.status(400).send('Sorry this Page does not excist');
});

mongoose.connect('mongodb://akshit:2243610@localhost:27017/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true },() =>{
});
app.listen(process.env.PORT || 3000);