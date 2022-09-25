const {
  listBooks,
  getById,
  addBook,
  updateBookStatus,
  updateBookResume,
} = require('../services/booksServices');

const listBooksController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const books = await listBooks(owner);
    res.json({ status: 'success', code: 200, payload: { books } });
  } catch (err) {
    next(err);
  }
};

const getByIdController = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const { _id: owner } = req.user;
    const book = await getById({ bookId, owner });
    if (!book) {
      res.status(400).json({
        status: `Failure, we didn't find the bookId width id=${bookId}`,
      });
    }
    res.json({ status: 'success', code: 200, payload: { book } });
  } catch (err) {
    next(err);
  }
};

const addBookController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { title, author, year, pages } = req.body;
    addBook({ title, author, year, pages, owner });
    res.json({ status: 'Success' });
  } catch (err) {
    next(err);
  }
};

const updateBookStatusController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const bookId = req.params.bookId;
    const { status } = req.body;
    updateBookStatus(bookId, owner, { status });
    res.json({ status: 'Success' });
  } catch (err) {
    next(err);
  }
};

const updateBookResumeController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const bookId = req.params.bookId;
    const { resume, rating } = req.body;
    updateBookResume(bookId, owner, { resume, rating });
    res.json({ status: 'Success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listBooksController,
  getByIdController,
  addBookController,
  updateBookStatusController,
  updateBookResumeController,
};
