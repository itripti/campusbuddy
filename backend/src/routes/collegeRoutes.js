import express from 'express';
import CollegeInfo from '../models/CollegeInfo.js';

const router = express.Router();

// @desc    Get all college information
// @route   GET /api/college-info
// @access  Public
router.get('/', async (req, res) => {
  try {
    const data = await CollegeInfo.find({}).sort({ category: 1 });
    res.json({ data });
  } catch (error) {
    console.error('Error fetching college info:', error.message);
    res.status(500).json({ message: 'Server error retrieving college info' });
  }
});

export default router;
