import mongoose from 'mongoose';

const collegeDataSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    fileUrl: { type: String, default: null },
    fileType: { type: String, default: null },
    fileName: { type: String, default: null },
}, {
    timestamps: true,
    collection: 'college_info'
});

export default mongoose.model('CollegeData', collegeDataSchema);