const express = require('express');
const router = express.Router();

const { booksValidation } = require('../../middlewares/booksValidation');

const authentificate = require('../../middlewares/autentificate');

const {
  listBooksController,
  getByIdController,
  addBookController,
  updateBookStatusController,
  updateBookResumeController,
} = require('../../controllers/booksController');

router.use(authentificate);

router.get('/', listBooksController);

router.get('/:bookId', getByIdController);

router.post('/', booksValidation, addBookController);

router.put('/status/:bookId', booksValidation, updateBookStatusController);

router.put('/resume/:bookId', booksValidation, updateBookResumeController);

module.exports = router;
