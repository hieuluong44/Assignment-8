import pool from '../db/db.js';
import bcrypt from 'bcrypt';

const User = {
  async createUser({ username, password, role = 'user' }) {

    const hashedPassword = await bcrypt.hash(password, 10); 

    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );
    return result.rows[0]; 
  },

  async getUserById(id) {
    const result = await pool.query(
      'SELECT id, username, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows; 
  },

  async getUserByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows; 
  },

  async getAllUsers() {
    const result = await pool.query('SELECT id, username, role FROM users');
    return result.rows; 
  },

  async updateUser(id, { username, password }) {
    const result = await pool.query(
      'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *',
      [username, password, id]
    );
    return result.rows;  
  },

  async deleteUser(id) {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows;  
  },
};

export default User;
