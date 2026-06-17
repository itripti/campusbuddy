import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, signupUser);
router.post('/login', validateLogin, loginUser);

export default router;
