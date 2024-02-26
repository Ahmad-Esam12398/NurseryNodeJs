const Child = require("../Model/childsSchema");
const Class = require("../Model/classSchema");

exports.getAllChildren = (request, response, next) => {
    Child.find()
        .populate("class")
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
};

exports.insertChild = (request, response, next) => {
    const {_id, fullName, age, level, address, class: classId} = request.body;
    const newChild = new Child({
        _id,
        fullName,
        age,
        level,
        address,
        class: classId
    });
    newChild.save()
        .then((data) => {
            Class.findOneAndUpdate({_id: classId}, {$push: {children: data._id}})
                .then(() => {
                    response.status(201).json({message: "added", data});
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
};

exports.updateChild = (request, response, next) => {
    const {fullName, age, level, address, class: classId} = request.body;
    Child.findOne({_id: request.body.id})
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            data.fullName = fullName;
            data.age = age;
            data.level = level;
            data.address = address;
            data.class = classId;
            return data.save();
        })
        .then((data) => {
            response.status(200).json({message: "updated", data});
        })
        .catch(error => next(error));
}

exports.deleteChild = (request, response, next) => {
    const{ id: _id } = request.body;
    console.log(id);
    Child.findOne({_id: id})
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            Class.findOneAndUpdate({_id: data.class}, {$pull: {children: data._id}})
            Child.findOneAndDelete(id);
        })
        .then(() => {
            response.status(200).json({message: "deleted"});
        })
        .catch(error => next(error));
}

exports.getChildById = (request, response, next) => {
    const childId = request.params.id;
    Child.findOne({_id: childId})
        .populate("class")
        .then((data) => {
            if(!data){
                throw new Error("id doesn't Exist");
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
}