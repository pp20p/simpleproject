const express = require('express');
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser")
const cors = require('cors');
const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var userController=require('./controllers/userController');

var app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/employees', employeeController);
app.use('/users', userController);


