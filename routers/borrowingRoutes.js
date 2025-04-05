import express from 'express';
import BorrowingHistoryController from '../controllers/BorrowingHistoryController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/borrow', authenticate, authorize(['user']), BorrowingHistoryController.borrowBook);
router.get('/borrow', BorrowingHistoryController.getAllborrows);

export default router;
