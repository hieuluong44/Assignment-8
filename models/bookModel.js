import pool from '../db/db.js';

// Lấy tất cả sách
const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};

// Lấy sách theo ID
const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

// Thêm sách mới
const createBook = async (title, author, genre, publishedYear) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, genre, publishedYear]
  );
  return result.rows[0];
};

const deleteBook = async(id) => {
  const result = await pool.query(
    'DELETE FROM books WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows;  
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
};
