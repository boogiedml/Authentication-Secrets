require("dotenv").config();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


userSchema.plugin(encrypt, { secret: process.env.SECRET,  encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);

module.exports = User;