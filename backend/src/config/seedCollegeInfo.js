import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import CollegeInfo from '../models/CollegeInfo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const data = [
  // Overview
  { category: 'overview', title: 'Full Name', content: 'United University, Prayagraj (UU Prayagraj)' },
  { category: 'overview', title: 'Also Known As', content: 'United Prayagraj, United Group of Institutions (UGI)' },
  { category: 'overview', title: 'Type', content: 'State Private University' },
  { category: 'overview', title: 'Established', content: '2021 (under U.P. Private University Act); United Group founded in 1951, first institute in 1998' },
  { category: 'overview', title: 'Location', content: 'Rawatpur, Jhalwa, Prayagraj, Uttar Pradesh 211012' },
  { category: 'overview', title: 'Corporate Office', content: 'United Tower, Ground Floor, 53 Leader Road, Prayagraj, UP 211003' },
  { category: 'overview', title: 'Campus Size', content: '250 acres' },
  { category: 'overview', title: 'Approvals', content: 'UGC, NMC (Medical), BCI (Law), INC (Nursing), PCI (Pharmacy), AICTE, AIU, AKTU' },
  { category: 'overview', title: 'Contact Numbers', content: 'Toll Free: 1800-121-8797, Helpline: 6390166660, 6389209921' },
  { category: 'overview', title: 'Email', content: 'contact@uniteduniversity.edu.in, info@united.ac.in' },
  { category: 'overview', title: 'Website', content: 'https://uniteduniversity.edu.in/' },
  { category: 'overview', title: 'Admission Portal', content: 'https://admissions.uniteduniversity.edu.in' },

  // Courses (UG)
  { category: 'courses_ug', title: 'B.Tech', content: 'Total Fees: ₹5.54L - ₹6.34L | Duration: 4 Years | Eligibility: 10+2, 45% in relevant subjects' },
  { category: 'courses_ug', title: 'B.Tech (Honours)', content: 'Total Fees: ₹5.54L - ₹6.34L | Duration: 4 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'B.Tech IBM', content: 'Total Fees: ₹5.54L - ₹6.34L | Duration: 4 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'MBBS', content: 'Total Fees: ₹57.81L - ₹59.52L | Duration: 5.5 Years | Eligibility: NEET UG qualified, 10+2 PCB 50% (40% SC/ST)' },
  { category: 'courses_ug', title: 'B.Sc Nursing', content: 'Total Fees: ₹5.82L | Duration: 4 Years | Eligibility: 10+2 PCB, 45%' },
  { category: 'courses_ug', title: 'BBA', content: 'Total Fees: ₹2.34L - ₹2.37L | Duration: 3 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'BCA', content: 'Total Fees: ₹2.34L - ₹2.88L | Duration: 3 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'B.Com (Hons)', content: 'Total Fees: ₹1.74L - ₹1.77L | Duration: 3 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'BA (Hons)', content: 'Total Fees: ₹1.17L - ₹2.04L / ₹1.20L | Duration: 3 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'B.Des', content: 'Total Fees: ₹5.02L - ₹5.05L | Duration: 4 Years | Eligibility: 10+2, 50%' },
  { category: 'courses_ug', title: 'BHMCT', content: 'Total Fees: ₹5.80L | Duration: 4 Years | Eligibility: 10+2, 45%' },
  { category: 'courses_ug', title: 'BA LLB / BBA LLB', content: 'Total Fees: ₹4.55L - ₹5.08L | Duration: 5 Years | Eligibility: 10+2, 60%' },
  { category: 'courses_ug', title: 'LLB', content: 'Total Fees: ₹2.48L - ₹2.61L | Duration: 3 Years | Eligibility: 10+2, 45% (42% OBC, 40% SC/ST)' },
  { category: 'courses_ug', title: 'B.Pharm', content: 'Total Fees: ₹5.54L | Duration: 4 Years | Eligibility: 10+2 PCB, 45%' },
  { category: 'courses_ug', title: 'D.Pharm', content: 'Total Fees: ₹2.77L | Duration: 2 Years | Eligibility: 10+2, 45%' },

  // Courses (PG)
  { category: 'courses_pg', title: 'MBA', content: 'Total Fees: ₹2.75L - ₹3.19L | Duration: 2 Years | Eligibility: Graduation, 50%' },
  { category: 'courses_pg', title: 'MCA', content: 'Total Fees: ₹2.06L - ₹2.09L | Duration: 2 Years | Eligibility: BCA/B.Sc CS, 45%' },
  { category: 'courses_pg', title: 'M.Sc', content: 'Total Fees: ₹1.20L - ₹3.64L / ₹1.23L | Duration: 2 Years | Eligibility: Graduation in subject, 55%' },
  { category: 'courses_pg', title: 'M.Com', content: 'Total Fees: ₹1.30L - ₹1.33L | Duration: 2 Years | Eligibility: Graduation, 45%' },
  { category: 'courses_pg', title: 'LLM', content: 'Total Fees: ₹89,000 - ₹92,000 | Duration: 2 Years | Eligibility: LLB, 50% + Law Admission Test' },

  // Courses (Doctoral)
  { category: 'courses_doctoral', title: 'Ph.D.', content: 'Total Fees: ₹36,000 - ₹99,600 | Eligibility: Master\'s Degree, 55%' },

  // Faculties
  { category: 'faculties', title: 'Faculties Offered', content: 'Arts, Science, Nursing, Pharmacy, Computer Applications, Engineering & Technology, Law, Agriculture & Allied Sciences, Mass Communication & Journalism, Design, Hotel Management, Commerce, Management, Medical Sciences' },

  // Admission Process
  { category: 'admission_process', title: 'Eligibility UG', content: 'Minimum 45-50% in 10+2' },
  { category: 'admission_process', title: 'Eligibility PG', content: 'Minimum 50% in Graduation' },
  { category: 'admission_process', title: 'Entrance Exam MBBS', content: 'NEET UG (mandatory, no direct admission)' },
  { category: 'admission_process', title: 'Entrance Exam B.Tech', content: 'JEE Main OR United University Admission Test (UUAT) OR CUET' },
  { category: 'admission_process', title: 'Entrance Exam LLM', content: 'Law Admission Test (LLB score valid)' },
  { category: 'admission_process', title: 'Entrance Exam Other', content: 'Merit-based on 10+2/Graduation marks' },
  { category: 'admission_process', title: 'Steps', content: '1. Application (Online via university site or Careers360) -> 2. Eligibility Check -> 3. Entrance Test (if applicable) -> 4. Counseling (NEET/JEE) -> 5. Fee Payment' },
  { category: 'admission_process', title: 'Status 2026', content: 'Admissions for 2026 are currently OPEN for UG and PG programs' },

  // Fees
  { category: 'fees', title: 'UG Course Fees', content: '₹1.17L - ₹6.34L' },
  { category: 'fees', title: 'PG Course Fees', content: '₹89,000 - ₹3.19L' },
  { category: 'fees', title: 'Ph.D. Fees', content: '₹36,000 - ₹99,600' },
  { category: 'fees', title: 'MBBS Fees', content: '₹57.81L - ₹59.52L' },
  { category: 'fees', title: 'Hostel 2-Seater (Non-AC)', content: '₹84,000 per year (Hostel + Mess)' },
  { category: 'fees', title: 'Hostel 2-Seater (AC)', content: '₹91,000 per year (Hostel + Mess)' },
  { category: 'fees', title: 'Hostel 3-Seater (Non-AC)', content: '₹69,000 per year (Hostel + Mess)' },
  { category: 'fees', title: 'Hostel 3-Seater (AC)', content: '₹77,000 per year (Hostel + Mess)' },
  { category: 'fees', title: 'Hostel Extra Charges', content: 'Hostel Registration: ₹3,000 (one-time) | Security Deposit: ₹10,000 (refundable) | Total Hostel Cost: ₹80,000 - ₹94,000 per annum' },

  // Scholarships
  { category: 'scholarships', title: 'Merit Score 90%+', content: '₹10,000 - ₹30,000 fee waiver' },
  { category: 'scholarships', title: 'Merit Score 75% - 89.9%', content: '₹8,000 - ₹20,000 fee waiver' },
  { category: 'scholarships', title: 'Merit Score 65% - 74.9%', content: '₹5,000 - ₹10,000 fee waiver' },
  { category: 'scholarships', title: 'Samaj Kalyan Vibhag', content: 'UP Govt. Scholarship: Fee reimbursement for SC/ST/OBC/EWS' },
  { category: 'scholarships', title: 'CUET Scholarships', content: 'CUET-qualified Students: Merit-based scholarships available' },
  { category: 'scholarships', title: 'Other Waivers', content: 'Special scholarships for Economically Weaker Sections (EWS) and Reserved Categories' },

  // Hostel Facilities
  { category: 'hostel_facilities', title: 'Room Types', content: '2-Seater and 3-Seater rooms (AC & Non-AC)' },
  { category: 'hostel_facilities', title: 'Amenities', content: 'Well-maintained comfortable environment, separate boys/girls hostels, mess available with all meals' },
  { category: 'hostel_facilities', title: 'Policy', content: 'Optional (not mandatory, students can stay off-campus)' },

  // Placements
  { category: 'placements', title: 'Students Placed (2024 Batch)', content: '2,000+' },
  { category: 'placements', title: 'Average CTC (2024)', content: '₹4.5 - ₹5.5 LPA' },
  { category: 'placements', title: 'Highest Package (2025)', content: '₹54 LPA' },
  { category: 'placements', title: 'Employment Rate', content: '~90%' },
  { category: 'placements', title: 'Top Recruiters', content: 'Infosys (171), Wipro (52), Cognizant (20), Capgemini (18), HCL (12)' },
  { category: 'placements', title: 'Placement Cell (CRC)', content: 'Corporate Relations Centre (CRC) bridges the academia-industry gap, providing training, interview prep, and partnerships' },

  // Faculty
  { category: 'faculty', title: 'Total Faculty', content: '750+ members across all institutes' },
  { category: 'faculty', title: 'Total Students', content: '11,200+' },
  { category: 'faculty', title: 'Institutes', content: '9 well-established institutes in Prayagraj & Greater Noida' },
  { category: 'faculty', title: 'Quality & Mentorship', content: 'Highly qualified team providing constant guidance, with specialized professors and industry-experienced faculty' },

  // Academics
  { category: 'academics', title: 'Odd Semester 2025-26', content: 'Aug 1, 2025 - Jan 1, 2026 (22 weeks)' },
  { category: 'academics', title: 'Even Semester 2025-26', content: 'Jan 2, 2026 onwards (21 weeks)' },
  { category: 'academics', title: 'Structure & Exams', content: 'Semester-based system (2 semesters/year) | Mid-semester exams (2 modules) | End-semester exams (1 module)' },
  { category: 'academics', title: 'Holidays', content: 'Dussehra (Oct 1-3) | Diwali (Oct 20-21) | Winter Vacation (Dec 15 - Jan 1)' },
  { category: 'academics', title: 'Infrastructure', content: 'Spacious 250-acre campus with well-established labs, central library + departmental libraries, and large exploration area' },

  // Events & Fests
  { category: 'events_fests', title: 'Hackdiwas 3.0', content: '36-hour national-level hackathon (April 2026) focusing on AI/ML, Web Development, and Java' },
  { category: 'events_fests', title: 'Fests & Events', content: 'Utsaah (Annual sports event), regular Tech Fests, and industry expert seminars' },
  { category: 'events_fests', title: 'Campus Culture', content: 'Innovation and leadership-focused community with active student participation' },

  // History
  { category: 'history', title: '1951', content: 'United Group founded by Late Shri Shiv Ram Das Gulati (started as transport business)' },
  { category: 'history', title: '1998', content: 'United College of Engineering & Research established' },
  { category: 'history', title: 'Milestone 1998-2026', content: '32 years in the education field' },
  { category: 'history', title: '2021', content: 'United University established under U.P. Private University Act' },
  { category: 'history', title: 'Current Status', content: '9 institutes, 11,200+ students, 750+ faculty members' },

  // Collaborations
  { category: 'collaborations', title: 'International Collaborations', content: 'Academic collaboration with international universities/institutions focusing on internationality, innovation, integration, information technology, and industrial partnerships (offering study/work/placement abroad opportunities)' },

  // Important Notes
  { category: 'important_notes', title: 'Name Clarification', content: '"United Prayagraj" refers to United University, Prayagraj (part of United Group)' },
  { category: 'important_notes', title: 'Medical College Policy', content: 'United Medical College Prayagraj is separate from United University; MBBS admission is strictly through NEET only (no direct admission)' },
  { category: 'important_notes', title: 'Student Reviews', content: 'Positives: Good placement support, Large campus for exploration. Negatives: Hygiene needs improvement, Not all classrooms have AC.' },
  { category: 'important_notes', title: 'University Type', content: 'State Private University (not central/private autonomous)' },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI not set in environment.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB to seed college info...');
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    // Clear existing collection
    const deleteResult = await CollegeInfo.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} old documents from college_info.`);

    // Insert new data
    const insertResult = await CollegeInfo.insertMany(data);
    console.log(`Successfully seeded ${insertResult.length} documents into college_info.`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
