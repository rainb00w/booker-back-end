const Book = require('../models/books');

const listBooks = async owner => {
  const books = await Book.find({ owner }).select({ __v: 0 });
  return books;
};

const getById = async ({ bookId, owner }) => {
  const book = await Book.findOne({ _id: bookId, owner });
  return book;
};

const addBook = async ({ title, author, year, pages, owner }) => {
  const book = new Book({ title, author, year, pages, owner });
  const newBook = await book.save();
  return newBook;
};

const updateBookStatus = async (bookId, owner, { status }) => {
  await Book.findByIdAndUpdate({ _id: bookId, owner }, { $set: { status } });
};

const updateBookResume = async (bookId, owner, { resume, rating }) => {
  await Book.findByIdAndUpdate(
    { _id: bookId, owner },
    { $set: { resume, rating } }
  );
};

const editBook = async (contactId, owner, bookData) => {
  const book = await Book.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: bookData }
  );
  return book;
};

const removeBook = async ({ bookId, owner }) => {
  await Book.findByIdAndRemove({ _id: bookId, owner });
};

module.exports = {
  listBooks,
  getById,
  addBook,
  updateBookStatus,
  updateBookResume,
  editBook,
  removeBook,
};
