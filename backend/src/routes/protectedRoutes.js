import express from 'express';
import protect from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get user profile (protected)
// @route   GET /api/protected/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'Access granted to protected endpoint!',
      user,
    });
  } catch (error) {
    console.error('Profile retrieval error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
