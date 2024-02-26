const Teacher = require("../Models/teachersSchema");
const {validationResult} = require("express-validator");

exports.register = (req, res, next) => {

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
        throw error;
    }

    let object = new Teacher({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.image
    })

    object.save()
            .then(data=>res.status(201).json({msg: "Registered Successfully", data}))
            .catch(err=>next(err))
}