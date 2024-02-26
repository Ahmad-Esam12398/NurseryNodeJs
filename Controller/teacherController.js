const Teacher = require("./../Model/teachersSchema");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, "./uploads/");
    },
    filename: function(request, file, callback){
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }

});
const upload = multer({storage: storage});
exports.upload = upload;

exports.getAllTeachers = (request, response, next) => {
    Teacher.find()
        .populate("class")
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
};

exports.insertTeacher = (request, response, next) => {
    const {fullName, password, email, image, class: classId} = request.body;
    const newTeacher = new Teacher({
        fullName,
        password,
        email,
        class: classId, 
        image
    });
    newTeacher.save()
        .then((data) => {
            response.status(201).json({message: "added", data});
        })
        .catch(error => next(error));
}

exports.updateTeacher = (request, response, next) => {
    const {id, fullName, password, email, image, class: classId} = request.body;
    Teacher.findOne({_id: id})
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            data.fullName = fullName;
            data.password = password;
            data.email = email;
            data.image = image;
            data.class = classId;
            return data.save();
        })
        .then((data) => {
            response.status(200).json({message: "updated", data});
        })
        .catch(error => next(error));
}

exports.deleteTeacher = (request, response, next) => {
    const{id} = request.body;
    Teacher.findOne({_id: id})
        .then((data) => {
            console.log(id);
            if(!data){
                throw new Error("id doesn't Exist");
            }
            return data.remove();
        })
        .then(() => {
            response.status(200).json({message: "deleted"});
        })
        .catch(error => next(error));
}

exports.getTeacherById = (request, response, next) => {
    const teacherId = request.params.id;
    Teacher.findOne({_id: teacherId})
        .populate("class")
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
};

exports.getAllSupervisors = (request, response, next) => {
    Teacher.find({class: {$exists: true}})
        .populate("class")
        .then((data) => {
            if(!data){
                throw new Error("No supervisors found");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
}