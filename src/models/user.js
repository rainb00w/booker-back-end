const { Schema, model } = require('mongoose');

// * Schema
const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});


// * Model
const User = model("user",userSchema);

module.exports = User;