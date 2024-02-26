const { response } = require("express");
const users = require("../Model/usersSchema");
const multer = require("multer");
require("dotenv")





const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});
const upload = multer({storage: storage});
exports.upload = upload;

exports.getAllUsers = (request, response, next)=>{
    users.find()
    // console.log("Welcome Admin here you will get all students!")
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch((error)=>next(error));
}

exports.getUserById = (request, response, next)=>{
    users.findOne({_id:request.params.id})
    .then(data=>{
        if(!data)
            throw new Error("id doesn't Exist");

        response.status(200).json(data);
    })
    .catch(error=>next(error));
}


// new users({name: "Abo_Esam", password: "12345678", role: "Admin"}).save();
exports.insertChild = (request, response, next)=>{
    const newChild = new users({
        ...request.body,
        role: 'Child',
        profileImage: request.file ? `http://localhost:${process.env.PORT}/uploads/` + request.file.filename : null
    });
    newChild.save()
    .then((data)=>{
        response.status(201).json({message: "added", data});
    })
    .catch(error=>next(error))
}
exports.updateChild = (request, response, next)=>{
    let newData = {};
    if(request.body.name != undefined){
        newData.name = request.body.name;
    }
    if(request.body.password != undefined){
        newData.password = request.body.password;
    }
    // console.log(request.file);
    if(request.file){
        newData.profileImage = `http://localhost:${process.env.PORT}/uploads/`+ request.file.filename;
    }
    const id = request.params.id;
    console.log(id)
    users.findByIdAndUpdate(id, {$set: newData}, {new: true}) // new -> to return new Document After Update.
    .then((result)=>{
        if(result === null){
            let error = new Error("Id Can't be Found")
            error.status = 404
            throw error;
        }
        response.status(200).json({message: "Update Successfully!", result});
    })
    .catch((error)=>{
        next(error);
    })
}
exports.deleteChild = (request, response, next)=>{
    const id = request.body.id;
    users.findByIdAndDelete(id)
    .then((result)=>{
        if(result === null){
            let error =  new Error("Id Can't be found");
            error.status = 404;
            throw error;
        }
        response.status(200).json({message: "Delete Successfully!", result});
    })
    .catch((error)=>{
        next(error);
    })
}

exports.findAllChildrens = (request, response, next)=>{
    users.find({"role": "Child"})
    .then((result)=>{
        response.status(200).json(result);
    })
    .catch((error)=>{
        next(error)
    })
}