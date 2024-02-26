const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const autoIncrementFactory = require("mongoose-sequence");
const schema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        unique: true
    },
    password:String,
    role: {
        type: String,
        enum: ['Admin', 'Teacher', 'Child'],
        default: 'Child'
    },
    profileImage: {
        type: String,
        default: null
    }
})
schema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
});

schema.pre('findOneAndUpdate', async function(next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        this.getUpdate().$set.password = hashed;
        next();
    } catch (error) {
        return next(error);
    }
});
// const connection = mongoose.createConnection(process.env.db_URL);
// const AutoIncrement = autoIncrementFactory(connection);
// schema.plugin(AutoIncrement, {inc_field: '_id'});
module.exports = mongoose.model("users", schema);

