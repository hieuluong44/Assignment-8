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
    try {
      const borrows = await BorrowingHistory.getAllborrows();
      res.json(borrows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getTotalBorrows(req, res) {
    try {
      const total = await BorrowingHistory.getTotalBorrows();
      res.json(total);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getMostBorrowedBooks(req, res) {
    try {
      const { limit } = req.query; 
      const books = await BorrowingHistory.getMostBorrowedBooks(limit || 5);
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getSpecialBooks(req, res) {
    try {
      const { min } = req.query;
      const special = await BorrowingHistory.getSpecialBooks(min || 10);
      res.json(special);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default BorrowingHistoryController;
