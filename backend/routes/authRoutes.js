import express from 'express';
import { signup, signin, googleLogin, refreshToken } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome back, ${req.user.name}!` });
  });
router.get('/google', googleLogin)

router.post('/refresh-token', refreshToken);                    //For token life-span inc

export default router;
