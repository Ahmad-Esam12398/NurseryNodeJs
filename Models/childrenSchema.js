const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let schema = new mongoose.Schema({
    _id: Number,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: String,
    age: Number,
    address: String,
    level: String
})
schema.pre("save", function(next){
    const user = this;
    if(user.isModified("password")) {
        user.password = bcrypt.hash(user.password, 8, function(err, hash){
            if(err) {
                throw new Error("Password hashing failed");
            } else {
                user.password = hash;
                next();
            }        
        });    
}});


module.exports = mongoose.model("children", schema);