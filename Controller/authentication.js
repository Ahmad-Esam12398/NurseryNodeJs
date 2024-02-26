const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../Model/usersSchema");

exports.login=(request, response, next)=>{
    console.log(request.file);
    users.findOne({name: request.body.name})
    .then(async data=>{
        if(!data){
            let error = new Error("UserName Or Password incorrect");
            error.status = 401;
            throw error;
        }
        else{
            const validPassword = await bcrypt.compare(request.body.password, data.password);
            if(!validPassword){
                let error = new Error("UserName Or Password incorrect");
                error.status = 401;
                throw error;
            }
            else{
                console.log("Success");
                let token = jwt.sign({
                    id: data._id,
                    role: data.role
                }, process.env.secret_key)
                response.status(200).json({data, token});
            }
        }
    }).catch(error => next(error))
}
