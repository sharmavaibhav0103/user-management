const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Create and Save a new User
exports.create = async (req, res) => {

        //Validating User Data
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        //Checking if the user already exists
        const {name, email, password, mobile} = req.body;
        const foundUser = await User.findOne({email});
        if(foundUser){
            return res.status(401).send("User already exists");
        } 
        //Registering the User
        try{
            const user = new User({
                name,
                email,
                password,
                mobile
            });    

        //Hashing Password
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;

            user.save();
            res.json({user});
        }
        catch(err){
            res.status(500).json({"Error": err.message})
        }
    }

// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
    try{
        const allUsers = await User.find();
        if(!allUsers){
            res.status(401).send("No user found.");
        }
        res.send(allUsers);
    }
    catch(err){
        res.status(404).json({errors:err.message});
    }
};

// Find a single user with a userId
exports.findOne = async (req, res) => {
    try{
        console.log(req.params.userId);
        const user = await User.findOne({id: req.params.id});
        if(!user){
           return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch(err){
        res.status(500).send(err.message);
    }
};

// Update a user identified by the userId in the request
exports.update = async (req, res) => {
    if(!req.body){
        return res.status(401).send("No Parameters.");
    }
    try{
        console.log(req.body);
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(req.params.userId,
            { name },
            { new: true,
                useFindAndModify: true });
        if(!user){
            return res.status(404).send('User Not Found');
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
};

// Delete a user with the specified userId in the request
exports.delete = async (req, res) => {
    try {
        const removerUser =  await User.findByIdAndDelete(req.params.userId);
        if(!removerUser){
         return res.status(500).send('User not Found');
        }
        res.send(removerUser);
    }
    catch(err) {
        res.send(err.message);
    }
};