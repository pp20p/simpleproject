const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: { type: String },
    email: { type: String },
   passwordhash: { type: String },
    
});

module.exports = { User };