import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/authService.js';

const userController = {
  async register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser({ username, password: hashedPassword });
    res.json(user);
  },

  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.getUserByUsername(username);

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    } 

    try {
        const match = bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token });

    } catch (error) {
        console.error('Error during password comparison:', error);
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
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await User.updateUser(req.params.id, {
      username,
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