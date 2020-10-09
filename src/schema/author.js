const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({ // author schema in mongodb
    name: String,
    age: Number
});

module.exports = mongoose.model('author', authorSchema);