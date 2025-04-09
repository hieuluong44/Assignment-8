import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/authService.js';

const userController = {
  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.createUser({ username, email, password: hashedPassword });

      res.status(201).json(user);
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getAll(req, res) {
    const users = await User.getAllUsers();
    res.json(users);
  },

  async getById(req, res) {
    const user = await User.getUserById(req.params.id);
    res.json(user);
  },

  async update(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await User.updateUser(req.params.id, {
      username,
      email,
      password: hashedPassword,
    }); 

    res.json(updated);
  },

  async delete(req, res) {
    const deleted = await User.deleteUser(req.params.id);
    res.json(deleted);
  },
};

export default userController;
