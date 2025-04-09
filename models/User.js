import pool from '../db/db.js';

const User = {
  async createUser({ username, email, password, role = 'user' }) {
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, role]
    );
    return result.rows[0];
  },

  async getUserById(id) {
    const result = await pool.query(
      'SELECT id, username, email, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async getUserByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0] || null;
  },

  async getUserByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async getAllUsers() {
    const result = await pool.query('SELECT id, username, email, role FROM users');
    return result.rows;
  },

  async updateUser(id, { username, email, password }) {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [username, email, password, id]
    );
    return result.rows[0];
  },

  async deleteUser(id) {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

export default User;
