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
  const contact = new Book({ title, author, year, pages, owner });
  await contact.save();
};

const updateBookStatus = async (bookId, owner, { status }) => {
  await Book.findByIdAndUpdate({ _id: bookId, owner }, { $set: { status } });
};

const updateBookResume = async (contactId, owner, { resume, rating }) => {
  await Book.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { resume, rating } }
  );
};

module.exports = {
  listBooks,
  getById,
  addBook,
  updateBookStatus,
  updateBookResume,
};
