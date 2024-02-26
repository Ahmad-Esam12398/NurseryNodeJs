const Class = require("./../Model/classSchema");
const Child = require("./../Model/childsSchema");

exports.getAllClasses = (request, response, next) => {
    Class.find()
        .populate("children")
        .populate("supervisor")
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
};

exports.insertClass = (request, response, next) => {
    const newClass = new Class(request.body);
    newClass.save()
        .then((data) => {
            response.status(201).json({message: "added", data});
        })
        .catch(error => next(error));
};

exports.updateClass = (request, response, next) => {
    const id = request.params.id;
    const newData = request.body;
    Class.findByIdAndUpdate(id, {$set: newData}, {new: true})
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json({message: "updated", data});
        })
        .catch(error => next(error));
}

exports.deleteClass = (request, response, next) => {
    const id = request.params.id;
    Class.findOne({_id: id})
        .then((data) => {
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

exports.getClassById = (request, response, next) => {
    const classId = request.params.id;
    Class.findOne({_id: classId})
        .populate("children")
        .populate("supervisor")
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
}

exports.getChildrenByClassId = (request, response, next) => {
    const classId = request.params.id;
    Child.find({class: classId})
        .then((data) => {
            if(!data.length){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
}

exports.getTeacherByClassId = (request, response, next) => {
    const classId = request.params.id;
    Class.findOne({_id: classId})
        .populate("supervisor")
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
}