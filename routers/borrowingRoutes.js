import express from 'express';
import BorrowingHistoryController from '../controllers/BorrowingHistoryController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/borrow', authenticate, authorize(['user']), BorrowingHistoryController.borrowBook);

router.get('/borrow', BorrowingHistoryController.getAllborrows);

router.get('/stats/total', authenticate, authorize(['admin']), BorrowingHistoryController.getTotalBorrows);
router.get('/stats/most-borrowed', authenticate, authorize(['admin']), BorrowingHistoryController.getMostBorrowedBooks);
router.get('/stats/special', authenticate, authorize(['admin']), BorrowingHistoryController.getSpecialBooks);

export default router;
