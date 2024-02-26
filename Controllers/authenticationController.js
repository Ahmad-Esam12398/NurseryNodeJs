const jwt = require("jsonwebtoken");
const Teacher = require("../Models/teachersSchema");
const Child = require("../Models/childrenSchema");
const bcrypt = require("bcrypt");

exports.logIn = (req, res, next) => {
    let userFound = false;
    if(req.body.email == "admin@gmail.com" && req.body.password == "123456") {
        userFound = true;
        let token = jwt.sign({
            name: "admin",
            role: "admin"
        }, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.status(201).json({token});
    }
    
    if(!userFound) {
        Teacher.findOne({email: req.body.email})
            .then(data => {
                if(data) {
                    // Compare the provided password with the hashed password in the database
                    bcrypt.compare(req.body.password, data.password)
                        .then(isMatch => {
                            if(isMatch) {
                                let token = jwt.sign({
                                    name: data.name,
                                    role: "teacher"
                                }, process.env.SECRET_KEY, {expiresIn: "1h"})
                                userFound=true;
                                res.status(201).json({token})
                            } else {
                                // Passwords don't match
                                res.status(400).json({message: "Invalid password"});
                            }
                        })
                        .catch(err => next(err));
                } else {
                    // No user found with the provided email
                    res.status(400).json({message: "User not found"});
                }
            })
            .catch(err => next(err));
    }
    if(!userFound) {
        Child.findOne({email: req.body.email})
            .then(data => {
                if(data) {
                    // Compare the provided password with the hashed password in the database
                    bcrypt.compare(req.body.password, data.password)
                        .then(isMatch => {
                            if(isMatch) {
                                let token = jwt.sign({
                                    name: data.name,
                                    role: "child"
                                }, process.env.SECRET_KEY, {expiresIn: "1h"})
                                userFound=true;
                                res.status(201).json({token})
                            } else {
                                // Passwords don't match
                                res.status(400).json({message: "Invalid password"});
                            }
                        })
                        .catch(err => next(err));
                } else {
                    // No user found with the provided email
                    res.status(400).json({message: "User not found"});
                }
            })
            .catch(err => next(err));
    }
}