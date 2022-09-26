const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: Number,
  },
  pages: {
    type: Number,
  },
  status: {
    type: String,
    default: 'toRead',
  },
  rating: {
    type: Number,
  },
  resume: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Book = mongoose.model('book', booksSchema);

module.exports = Book;
