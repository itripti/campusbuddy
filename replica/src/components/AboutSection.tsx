"use client";

import React from "react";
import { Award, ShieldCheck, Milestone, CheckCircle2, TrendingUp, Users, GraduationCap, MapPin, Briefcase, Trophy, DollarSign } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { label: "Placements Till Date", count: "14,000+", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
    { label: "Pan India Students", count: "11,200+", icon: Users, color: "text-purple-600 bg-purple-50" },
    { label: "Alumni Globally", count: "25,000+", icon: GraduationCap, color: "text-emerald-600 bg-emerald-50" },
    { label: "Institutions (Engg/Mgmt/Pharma)", count: "9", icon: Trophy, color: "text-amber-600 bg-amber-50" },
    { label: "Faculty from Industry & Academia", count: "750+", icon: Users, color: "text-indigo-600 bg-indigo-50" },
    { label: "Scholarships Disbursed", count: "₹5.5 Cr+", icon: DollarSign, color: "text-red-600 bg-red-50" },
    { label: "Acres Campus Area", count: "250", icon: MapPin, color: "text-pink-600 bg-pink-50" },
    { label: "Indoor Sport Complex", count: "20k SQFT", icon: Trophy, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <section id="why-united" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-secondary font-extrabold uppercase tracking-widest text-xs">
                About UGI
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                A Legacy of Educational Excellence Since 1998
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              United Group of Institutions (UGI) has evolved into one of India&apos;s leading educational groups, renowned for offering quality professional training in Engineering, Management, Pharmacy, Law, and Journalism. 
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              With 9 modern campuses spanning across Prayagraj and Greater Noida (Delhi-NCR), UGI provides an state-of-the-art environment with world-class faculty, intensive placement preparation courses, and industry-oriented training curriculum.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">AKTU Affiliated</h4>
                  <p className="text-[11px] text-slate-500">Dr. A.P.J. Abdul Kalam Technical Univ.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Approved by AICTE</h4>
                  <p className="text-[11px] text-slate-500">Ministry of Education, Govt. of India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">PCI Approved</h4>
                  <p className="text-[11px] text-slate-500">Pharmacy Council of India courses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Global Collaborations</h4>
                  <p className="text-[11px] text-slate-500">MOU with top international univ.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#history"
                className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-red-800 transition-colors"
              >
                <span>Read UGI Journey & Milestones</span>
                <Milestone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="space-y-4 mb-6">
                <span className="bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  UGI At a Glance
                </span>
                <h3 className="text-lg font-bold text-primary">Our Achievements in Numbers</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md hover:border-primary/10 transition-all duration-300 group"
                    >
                      <div className={`p-3 rounded-lg ${stat.color} transition-transform group-hover:scale-105 duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-extrabold text-primary leading-tight tracking-tight">
                          {stat.count}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium leading-normal">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
