import mongoose from 'mongoose';

const collegeInfoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'college_info', // match the name used in supabase
  }
);

const CollegeInfo = mongoose.model('CollegeInfo', collegeInfoSchema);

export default CollegeInfo;
