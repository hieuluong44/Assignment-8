import Book from '../models/bookModel.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy danh sách sách.' });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.getBookById(id);
    if (!book) {
      return res.status(404).json({ error: 'Sách không tồn tại.' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy thông tin sách.' });
  }
};

export const createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  try {
    const newBook = await Book.createBook(title, author, genre, publishedYear);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Có lỗi xảy ra khi tạo sách.' });
  }
};

export const deleteBook =  async (req, res) => {
  const deleted = await Book.deleteBook(req.params.id);
  res.json(deleted);
};
