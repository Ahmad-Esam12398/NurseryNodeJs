const users = require("./../Model/usersSchema")

exports.register = (request, response, next)=>{
    const newTeacher = new users({
        ...request.body,
        role: "Teacher",
    })
    console.log("Teacher Register")
    newTeacher.save()
    .then((data)=>{
        response.status(201).json({message: "Success", data});
    })
    .catch(error=>next(error))
}