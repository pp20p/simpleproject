const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { User } = require('../models/user');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/register', (req, res) => {
    var emp = new User({
        name: req.body.name,
        email: req.body.email,
        passwordhash:bcrypt.hashSync(req.body.password, 10),
      
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
    console.log(emp.passwordhash);
});

router.put('/:id', (req, res) => {
    const userExist =  User.findById(req.params.id);
    let newPassword
    if(req.body.passwordhash) {
        newPassword = req.body.passwordhash
    } else {
        newPassword = userExist.passwordhash;
    }
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        email: req.body.email,
        passwordhash: newPassword,
    };
    User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = 'hfdjfjf';
    if(!user) {
        return res.status(400).send('The user not found');
    }
    
    if(user && bcrypt.compareSync(req.body.password, user.passwordhash)) {
        const token = jwt.sign(
            {
                userId: user.id,
               
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})


module.exports = router;