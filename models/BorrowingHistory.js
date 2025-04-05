import pool from '../db/db.js';

const BorrowingHistory = {
  async borrowBook(userId, bookId, borrowDuration = 7) {

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + borrowDuration);

    const result = await pool.query(
      'INSERT INTO borrowing_history (user_id, book_id, borrowed_date, returned_date) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *',
      [userId, bookId, returnDate] 
    );

    await pool.query(
      'UPDATE books SET quantity = quantity - 1 WHERE id = $1',
      [bookId] 
    );

    return result.rows[0];  
  },

  async getAllborrows() {
    const result = await pool.query('SELECT * FROM borrowing_history');
    return result.rows; 
  },

  async getTotalBorrows() {
    const result = await pool.query('SELECT COUNT(*) AS total_borrows FROM borrowing_history');
    return result.rows[0];
  },

  // 📚 Sách được mượn nhiều nhất
  async getMostBorrowedBooks(limit = 5) {
    const result = await pool.query(`
      SELECT books.title, COUNT(*) AS borrow_count
      FROM borrowing_history
      JOIN books ON books.id = borrowing_history.book_id
      GROUP BY books.title
      ORDER BY borrow_count DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  },

  // 🌟 Sách đặc biệt (mượn trên 10 lần)
  async getSpecialBooks(minBorrowCount = 10) {
    const result = await pool.query(`
      SELECT books.title, COUNT(*) AS borrow_count
      FROM borrowing_history
      JOIN books ON books.id = borrowing_history.book_id
      GROUP BY books.title
      HAVING COUNT(*) >= $1
      ORDER BY borrow_count DESC
    `, [minBorrowCount]);
    return result.rows;
  },
  
};

export default BorrowingHistory;
