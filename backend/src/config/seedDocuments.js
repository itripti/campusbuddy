import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import CollegeData from '../models/CollegeData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const sampleDocuments = [
  {
    title: 'Academic Calendar 2026-27',
    category: 'Calendar',
    content: 'Official academic calendar for odd and even semesters of the academic year 2026-27 including session start dates, examination schedules, and university holidays.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'Academic_Calendar_2026_27.pdf'
  },
  {
    title: 'UGI Admissions Brochure 2026',
    category: 'Brochures',
    content: 'Detailed admission guidelines, courses offered across Prayagraj and Greater Noida campuses, intake capacity, fee structures, eligibility criteria, and campus facilities.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'UGI_Admissions_Brochure_2026.pdf'
  },
  {
    title: 'B.Tech First Year Syllabus (AKTU)',
    category: 'Syllabus',
    content: 'Comprehensive syllabus for all branches of Bachelor of Technology (B.Tech) first and second semesters as per Dr. A.P.J. Abdul Kalam Technical University (AKTU) curriculum.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'BTech_First_Year_Syllabus.pdf'
  },
  {
    title: 'MBA Curriculum & Course Structure',
    category: 'Syllabus',
    content: 'Detailed course structure, semester-wise credit distribution, elective options list, and syllabus details for the Master of Business Administration (MBA) program.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'MBA_Syllabus_2026.pdf'
  },
  {
    title: 'Exam Schedule - Odd Semester 2025-26',
    category: 'Exams',
    content: 'Official datesheet, timetable, and instructions for mid-semester and end-semester examinations of all engineering, management, and pharmacy courses.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'Exam_Schedule_Odd_Sem_2025_26.pdf'
  },
  {
    title: 'UGI Placement Report 2025',
    category: 'Brochures',
    content: 'Annual placement bulletin highlighting recruitment statistics, highest package, average package, placement percentage, and stories from our top recruiters.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'UGI_Placement_Report_2025.pdf'
  },
  {
    title: 'Hostel Allotment & Registration Form',
    category: 'Forms',
    content: 'Application form for room allotment, mess registration, rules, guidelines, and fee structure details for Prayagraj and Greater Noida campus hostels.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'Hostel_Registration_Form_2026.pdf'
  },
  {
    title: 'UGI Scholarship Application Form 2026',
    category: 'Forms',
    content: 'Application form for university merit-based scholarships, category-based fee waivers, and UP government scholarship scheme guidance notes.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'application/pdf',
    fileName: 'Scholarship_Form_2026.pdf'
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI not set in environment.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB to seed documents...');
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    // We only delete documents that have a fileUrl (so we don't delete general college info documents)
    const deleteResult = await CollegeData.deleteMany({ fileUrl: { $ne: null } });
    console.log(`Cleared ${deleteResult.deletedCount} old resource documents.`);

    // Insert new data
    const insertResult = await CollegeData.insertMany(sampleDocuments);
    console.log(`Successfully seeded ${insertResult.length} resource documents.`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
