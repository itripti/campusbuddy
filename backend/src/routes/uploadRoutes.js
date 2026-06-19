import express from 'express';
import { upload } from '../config/cloudinary.js';
import CollegeData from '../models/CollegeData.js';

const router = express.Router();

// PDF/File upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { category, title, content } = req.body;

        const newDoc = new CollegeData({
            category,
            title,
            content,
            fileUrl: req.file.path,
            fileType: req.file.mimetype,
            fileName: req.file.originalname,
        });

        await newDoc.save();
        res.json({ message: '✅ File uploaded!', data: newDoc });

    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

// Sabhi documents fetch karo
router.get('/documents', async (req, res) => {
    try {
        const docs = await CollegeData.find({ fileUrl: { $ne: null } });
        res.json({ data: docs });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;