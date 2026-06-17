"use client";

import React, { useState } from "react";
import { GraduationCap, MapPin, Clock, Search, BookOpen, ArrowRight } from "lucide-react";

interface Course {
  name: string;
  shortName: string;
  level: "UG" | "PG" | "Diploma";
  campuses: ("Prayagraj" | "Greater Noida")[];
  duration: string;
  specializations: string[];
  description: string;
}

const coursesData: Course[] = [
  {
    name: "Bachelor of Technology",
    shortName: "B.Tech",
    level: "UG",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "4 Years",
    specializations: ["Computer Science", "Information Technology", "Electronics & Comm.", "Electrical Engg.", "Civil Engg.", "Mechanical Engg."],
    description: "Our flagship engineering program designed to prepare industry-ready engineers in cutting-edge domains like AI, ML, Cyber Security, and robotics.",
  },
  {
    name: "Master of Technology",
    shortName: "M.Tech",
    level: "PG",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "2 Years",
    specializations: ["Computer Science Engg.", "Electronics & Comm.", "Mechanical Engg."],
    description: "Advanced research-focused graduate engineering program emphasizing scientific methodologies, hardware-software integration, and publications.",
  },
  {
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    level: "UG",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "3 Years",
    specializations: ["Marketing", "Finance", "Human Resource", "International Business"],
    description: "Develops managerial skill sets, entrepreneurial mindsets, and leadership styles necessary for running successful modern global enterprises.",
  },
  {
    name: "Master of Business Administration",
    shortName: "MBA",
    level: "PG",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "2 Years",
    specializations: ["Marketing", "HR", "Finance", "IT", "Operations Management"],
    description: "Highly reputed management program that builds corporate leadership capability and offers excellent case-study based industry training.",
  },
  {
    name: "Bachelor of Computer Applications",
    shortName: "BCA",
    level: "UG",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "3 Years",
    specializations: ["Software Engineering", "Cloud Computing", "Data Analytics"],
    description: "Provides strong foundational knowledge of computer applications, database management systems, programming languages, and web design.",
  },
  {
    name: "Master of Computer Applications",
    shortName: "MCA",
    level: "PG",
    campuses: ["Prayagraj"],
    duration: "2 Years",
    specializations: ["Full Stack Dev.", "Information Security", "Software Architecture"],
    description: "Advanced degree training students in complex computing applications, cloud deployment architectures, and corporate software development.",
  },
  {
    name: "Bachelor of Pharmacy",
    shortName: "B.Pharm",
    level: "UG",
    campuses: ["Prayagraj"],
    duration: "4 Years",
    specializations: ["Pharmacology", "Pharmaceutics", "Pharmaceutical Chemistry"],
    description: "PCI approved training covering clinical trials, industrial manufacturing, formulations, drug designs, and regulatory protocols.",
  },
  {
    name: "Diploma in Pharmacy",
    shortName: "D.Pharm",
    level: "Diploma",
    campuses: ["Prayagraj", "Greater Noida"],
    duration: "2 Years",
    specializations: ["Hospital Pharmacy", "Community Pharmacy"],
    description: "Short diploma course introducing candidates to clinical pharmacy practices, drug storage protocols, and pharmaceutical store management.",
  },
  {
    name: "Diploma in Engineering",
    shortName: "Polytechnic",
    level: "Diploma",
    campuses: ["Prayagraj"],
    duration: "3 Years",
    specializations: ["Mechanical Engg.", "Civil Engg.", "Electrical Engg."],
    description: "Focuses on hands-on vocational training and technical design competencies for career roles in heavy manufacturing and infrastructure.",
  },
  {
    name: "Bachelor of Arts in Journalism",
    shortName: "BAJMC",
    level: "UG",
    campuses: ["Greater Noida"],
    duration: "3 Years",
    specializations: ["Print Media", "Broadcast Journalism", "Digital PR & Advertising"],
    description: "Intense communication training with media lab integration, green-screen studios, news recording software, and layout editorial tools.",
  },
  {
    name: "Integrated Law Degree",
    shortName: "BA LLB / BBA LLB",
    level: "UG",
    campuses: ["Greater Noida"],
    duration: "5 Years",
    specializations: ["Corporate Law", "Criminal Law", "Constitutional Law"],
    description: "Approved by BCI. Offers dual-degree training integrating business/humanities study courses with corporate legal frameworks and moot court rooms.",
  },
];

export default function CoursesSection() {
  const [campusFilter, setCampusFilter] = useState<"All" | "Prayagraj" | "Greater Noida">("All");
  const [levelFilter, setLevelFilter] = useState<"All" | "UG" | "PG" | "Diploma">("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = coursesData.filter((course) => {
    const matchesCampus = campusFilter === "All" || course.campuses.includes(campusFilter as any);
    const matchesLevel = levelFilter === "All" || course.level === levelFilter;
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCampus && matchesLevel && matchesSearch;
  });

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-secondary font-extrabold uppercase tracking-widest text-xs">
            Academic Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Find the Course That Fits You
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Browse degrees and specialized programs across our engineering, management, pharmacy, law, and journalism schools tailored to match your career goals.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center md:justify-between">
            
            {/* Campus selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campus Locations</span>
              <div className="flex bg-slate-100 p-1 rounded-lg self-start">
                {(["All", "Prayagraj", "Greater Noida"] as const).map((camp) => (
                  <button
                    key={camp}
                    onClick={() => setCampusFilter(camp)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                      campusFilter === camp
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:text-primary"
                    }`}
                  >
                    {camp === "All" ? "All Campuses" : camp}
                  </button>
                ))}
              </div>
            </div>

            {/* Level selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Degree Level</span>
              <div className="flex bg-slate-100 p-1 rounded-lg self-start">
                {(["All", "UG", "PG", "Diploma"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                      levelFilter === level
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:text-primary"
                    }`}
                  >
                    {level === "All"
                      ? "All Levels"
                      : level === "UG"
                      ? "Undergraduate"
                      : level === "PG"
                      ? "Postgraduate"
                      : "Diploma"}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-1.5 md:w-64">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Search</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search B.Tech, CSE, Finance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:border-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Top header decoration */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-slate-100 text-slate-700 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-secondary" />
                        {course.level}
                      </span>
                      {course.campuses.map((camp) => (
                        <span
                          key={camp}
                          className="bg-primary/5 text-primary text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-accent" />
                          {camp}
                        </span>
                      ))}
                    </div>

                    {/* Course Title */}
                    <div className="mb-2">
                      <h3 className="text-lg font-extrabold text-primary leading-snug group-hover:text-secondary transition-colors">
                        {course.name} ({course.shortName})
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Duration: {course.duration}</span>
                      </div>
                    </div>

                    {/* Course Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Specializations list */}
                  <div>
                    <div className="border-t border-slate-100 pt-4 mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Core Specializations
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.specializations.slice(0, 4).map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                        {course.specializations.length > 4 && (
                          <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">
                            +{course.specializations.length - 4} More
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="#admissions"
                      className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg text-xs font-bold text-primary transition-all duration-300"
                    >
                      <span>Check Eligibility & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-primary">No Matching Courses Found</h3>
            <p className="text-slate-500 text-xs">
              Try adjusting your campus or level filters, or refine your search keywords.
            </p>
            <button
              onClick={() => {
                setCampusFilter("All");
                setLevelFilter("All");
                setSearchTerm("");
              }}
              className="text-xs font-bold text-secondary hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
