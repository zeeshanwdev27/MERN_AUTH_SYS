import express from 'express';
import { signup, signin, googleLogin } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome back, ${req.user.name}!` });
  });
router.get('/google', googleLogin)

export default router;
