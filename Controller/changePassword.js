const users = require("../Model/usersSchema");
const bcrypt = require("bcrypt")
module.exports.updatePassword = async (request, response, next)=>{
    try{
        let oldPassword = request.body.oldPassword;
        let user = await users.findById(request.body.id);

        const valid = await bcrypt.compare(oldPassword, user.password);
        if(!valid){
            let error = new Error("Wrong old Password");
            error.status = 401;
            throw error;
        }
        user.password = request.body.newPassword;
        await user.save();
        response.status(200).json({Message: "updated Successfully", user});
    }
    catch(error){
        next(error);
    }
}