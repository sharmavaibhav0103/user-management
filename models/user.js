const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: Number
    }
},{
    timestamps: true
});

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;