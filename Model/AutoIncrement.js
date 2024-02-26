const mongoose = require('mongoose');
const autoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.db_URL);
const AutoIncrement = autoIncrementFactory(connection);

module.exports = AutoIncrement;