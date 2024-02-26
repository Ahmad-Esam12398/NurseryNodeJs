const mongoose = require("mongoose");
const AutoIncrement = require("./AutoIncrement");

const AddressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    }
});

const ChildSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    level:{
        type: String,
        required: true,
        enum: ['PreKG', 'KG1', 'KG2']
    },
    address: AddressSchema,
    class:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
    }
});

// ChildSchema.plugin(AutoIncrement, {inc_field: '_id'});
module.exports = mongoose.model("Child", ChildSchema);