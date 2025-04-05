import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook
} from '../controllers/bookController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', authenticate, authorize(['admin']), createBook);
router.delete('/books/:id', authenticate, authorize(['admin']),deleteBook);

export default router;
