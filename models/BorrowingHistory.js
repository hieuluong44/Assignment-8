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
};

export default BorrowingHistory;
