const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({  // book schema in mongodb
    name: String,
    pages: Number,
    authorID: String
});

module.exports = mongoose.model('book', bookSchema);