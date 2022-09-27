const express = require('express');
const router = express.Router();

const {
  addBookValidation,
  updateStatesValidation,
  updateResumeValidation,
} = require('../../middlewares/joiBooksValidation');

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

router.post('/', addBookValidation, addBookController);

router.put(
  '/status/:bookId',
  updateStatesValidation,
  updateBookStatusController
);

router.put(
  '/resume/:bookId',
  updateResumeValidation,
  updateBookResumeController
);

module.exports = router;
