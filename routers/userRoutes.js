import express from 'express';
import userController from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users/', authenticate, authorize(['admin']), userController.getAll);
router.get('/users/:id', authenticate, authorize(['user']), userController.getById);
router.put('/users/:id', authenticate, authorize(['user']), userController.update);
router.delete('/users/:id', authenticate, authorize(['user']), userController.delete);

export default router;