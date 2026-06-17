"use client";

import React from "react";
import { Bell, ArrowRight, Download, Calendar, Sparkles } from "lucide-react";

interface Notice {
  title: string;
  date: string;
  category: "Academic" | "Transport" | "Scholarship" | "Placement";
  isNew?: boolean;
}

const notices: Notice[] = [
  {
    title: "Transport Notice for Odd Semester Examinations (1st & 2nd Year) - 2026-27 (UCER, UIM, UIP)",
    date: "June 10, 2026",
    category: "Transport",
    isNew: true,
  },
  {
    title: "Transport Notice for Odd Semester Examinations (1st & 2nd Year) - 2026-27 (UIT)",
    date: "June 10, 2026",
    category: "Transport",
    isNew: true,
  },
  {
    title: "Scholarship Facilities to SC/ST, GENERAL, OBC & Minority Category students for the Academic Year 2026-27",
    date: "June 05, 2026",
    category: "Scholarship",
    isNew: true,
  },
  {
    title: "Online Campus Recruitment Drive - Wipro and Hexaware Tech scheduled for 25th June 2026",
    date: "May 28, 2026",
    category: "Placement",
  },
  {
    title: "End Semester Project Exhibition - Prayagraj and Greater Noida Engineering Campuses",
    date: "May 15, 2026",
    category: "Academic",
  },
  {
    title: "Odd Sem Admission fee submit extensions circular for outstanding students",
    date: "May 10, 2026",
    category: "Academic",
  },
];

export default function NewsAnnouncements() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Announcements list (2/3 width) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Important Circulars</span>
                <h3 className="text-xl font-extrabold text-primary">Latest News & Notice Board</h3>
              </div>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {notices.map((notice, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-slate-100/70 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-4 group cursor-pointer"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                        <Calendar className="w-3 h-3" />
                        {notice.date}
                      </span>
                      <span
                        className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          notice.category === "Transport"
                            ? "bg-amber-100 text-amber-700"
                            : notice.category === "Scholarship"
                            ? "bg-red-100 text-red-700"
                            : notice.category === "Placement"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.isNew && (
                        <span className="bg-secondary text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full animate-pulse flex items-center gap-0.5">
                          <Sparkles className="w-2 h-2" /> New
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                      {notice.title}
                    </h4>
                  </div>

                  <a
                    href="#"
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-secondary hover:border-secondary transition-all"
                    title="Download Circular PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-red-800 transition-colors"
              >
                <span>Browse All Campus Announcements</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Newsletter Sign-up & Quick Admissions Links (1/3 width) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Admission Open Card banner */}
            <div id="enquiry" className="bg-gradient-to-br from-primary to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                  Admissions Enquiry 2026
                </span>
                <h4 className="text-lg font-extrabold leading-tight">
                  Interested in Joining UGI Campuses?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fill in your academic profile to receive detailed course materials, fee brochures, and campus eligibility requirements.
                </p>

                <form className="space-y-3 pt-2 text-slate-800">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full text-xs font-medium px-4 py-2.5 rounded-lg bg-white border border-transparent focus:outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full text-xs font-medium px-4 py-2.5 rounded-lg bg-white border border-transparent focus:outline-none focus:border-accent"
                  />
                  <select
                    className="w-full text-xs font-medium px-4 py-2.5 rounded-lg bg-white border border-transparent focus:outline-none focus:border-accent text-slate-500"
                  >
                    <option>Select Course Interested</option>
                    <option>B.Tech (Engineering)</option>
                    <option>MBA (Management)</option>
                    <option>B.Pharm (Pharmacy)</option>
                    <option>BCA / BBA</option>
                  </select>
                  <button
                    type="submit"
                    onClick={(e) => e.preventDefault()}
                    className="w-full bg-secondary hover:bg-red-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Submit Enquiry Form
                  </button>
                </form>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-4">
              <h4 className="text-sm font-extrabold text-primary">Subscribe For Newsletter</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Stay updated with the latest educational innovations, placement reports, and events from UGI.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 text-xs font-medium px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-slate-800"
                />
                <button className="bg-primary hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                  Join
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
