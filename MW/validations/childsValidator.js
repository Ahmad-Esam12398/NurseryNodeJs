const {body} = require("express-validator");

exports.insertArray = [
    body("name").isString().withMessage("user's name should be string")
    .isLength({min:5, max: 50}).withMessage("user's Name 50 >= length >= 5"),
    body("password").isLength({min: 8, max: 50}).withMessage("user's Password >= 8 and <= 50"),
    body("profileImage").optional().custom((value, { req })=>{
        if(!validator.isURL(value)){
            let error = new Error('Profile Image must be a valid URL')
            error.status(400);
            throw error;
        }
    })
]
module.exports.updateArray = [
    body("name").optional().isString().withMessage("user's name should be string")
    .isLength({min: 5, max: 50}).withMessage("user's Name 50 >= length >= 5"),
    body("password").optional().isLength({min: 8, max: 50}).withMessage("user's Password >= 8 and <= 50"),
    body("profileImage").optional().custom((value, { req })=>{
        if(!req.file){
            let error = new Error('No File Uploaded')
            error.status = 400;
            throw error;
        }
        if(!req.file.mimetype.startsWith("image")){
            let error = new Error('File must be an image')
            error.status = 400;
            throw error;
        }
    })
]
module.exports.updatePassword = [
    body("oldPassword").exists().withMessage("You Must write oldPassword")
    .isLength({min: 8, max: 50}).withMessage("user's OldPassword >= 8 and <= 50"),
    body("newPassword").exists().withMessage("You Must write newPassword")
    .isLength({min: 8, max: 50}).withMessage("user's OldPassword >= 8 and <= 50")
]