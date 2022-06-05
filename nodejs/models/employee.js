const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String }
});

module.exports = { Employee };