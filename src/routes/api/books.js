const express = require('express');
const router = express.Router();

const {
  addBookValidation,
  updateStatesValidation,
  updateResumeValidation,
  editBookValidation,
} = require('../../middlewares/joi/joiBooksValidation');

const authentificate = require('../../middlewares/autentificate');

const {
  listBooksController,
  getByIdController,
  addBookController,
  updateBookStatusController,
  updateBookResumeController,
  editBookController,
  removeBookController,
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

router.put('/edit/:bookId', editBookValidation, editBookController);

router.delete('/:bookId', removeBookController);

module.exports = router;
