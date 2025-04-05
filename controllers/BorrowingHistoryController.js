import BorrowingHistory from '../models/BorrowingHistory.js';

const BorrowingHistoryController = {
  async borrowBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      const borrowingRecord = await BorrowingHistory.borrowBook(userId, bookId);
      res.status(201).json(borrowingRecord);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAllborrows(req, res) {
    const borrows = await BorrowingHistory.getAllborrows();
    res.json(borrows);
  },
};

export default BorrowingHistoryController;
