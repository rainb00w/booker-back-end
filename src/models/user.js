const { Schema, model } = require('mongoose');

// * Schema
const userSchema = Schema({
    name: {
        type: String,
        minlength: 2
    },
    password: {
        type: String,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: true,
    },
    newPassword: {
        type: String,
        default: ""
    },
    newPasswordToken: {
        type: String,
        default: ""
    }
    
});


// * Model
const User = model("user",userSchema);

module.exports = User;