const mongoose = require("mongoose");
const AutoIncrement = require("./AutoIncrement");

const ClassSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child"
    }]
});


// ClassSchema.plugin(AutoIncrement, {inc_field: '_id'});
module.exports = mongoose.model("Class", ClassSchema);