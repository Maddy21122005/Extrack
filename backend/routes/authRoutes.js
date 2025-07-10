import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getMe } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;