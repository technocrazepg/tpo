const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        // required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
    },
    address:{
        type: String,
    },
    course:{
        type: String
    },
    department:{
        type: String
    },
    year:{
        type: Number
    },
    scholar:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("users", UserSchema)
// User.createIndexes();
module.exports = User;