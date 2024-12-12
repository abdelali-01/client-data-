const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema ;

const client = mongoose.model('client' , new schema ({
    FirstName: String ,
    LastName: String ,
    Email: String ,
    number : Number ,
    Age: Number ,
    Country: String ,
    Gender: String

}, {timestamps : true}));

module.exports = client ;