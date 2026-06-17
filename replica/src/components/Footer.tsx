"use client";

import React from "react";
import { GraduationCap, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t-4 border-secondary">
      {/* Upper Footer: Multi-column links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10 pb-12">
          
          {/* Col 1: About UGI links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              About UGI
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
              {[
                { label: "History", href: "#history" },
                { label: "Why United", href: "#why-united" },
                { label: "Vision & Mission", href: "#vision-mission" },
                { label: "Advisory Council", href: "#advisory-council" },
                { label: "Our Leaders", href: "#leaders" },
                { label: "Milestones", href: "#milestones" },
                { label: "AKTU Affiliations", href: "#aktu" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-accent transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Admissions & Placements */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Join & Career
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
              {[
                { label: "Admissions Apply", href: "#admissions" },
                { label: "Fee Structures", href: "#fees" },
                { label: "Scholarships", href: "#scholarships" },
                { label: "Our Placements", href: "#placements" },
                { label: "Placement Training", href: "#placement-training" },
                { label: "Industry Collaboration", href: "#collaboration" },
                { label: "Placement Bulletins", href: "#bulletin" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-accent transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Prayagraj Courses */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Prayagraj Courses
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
              {[
                { label: "B.Tech / M.Tech", href: "#courses" },
                { label: "MBA / MCA", href: "#courses" },
                { label: "BBA / BCA", href: "#courses" },
                { label: "B.Pharm / M.Pharm", href: "#courses" },
                { label: "D.Pharm / Diploma", href: "#courses" },
                { label: "UCER Campus", href: "#ucer" },
                { label: "UIT Campus", href: "#uit" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-accent transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Greater Noida Courses */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Greater Noida Courses
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
              {[
                { label: "B.Tech / M.Tech", href: "#courses" },
                { label: "MBA / BBA / BCA", href: "#courses" },
                { label: "D.Pharm (Pharmacy)", href: "#courses" },
                { label: "BAJMC (Journalism)", href: "#courses" },
                { label: "BA LLB / BBA LLB (Law)", href: "#courses" },
                { label: "UIM Greater Noida", href: "#uim-noida" },
                { label: "UCER Greater Noida", href: "#ucer-noida" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-accent transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Life @ UGI & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              Campus Life
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
              {[
                { label: "Blogs & Stories", href: "#news" },
                { label: "Events Calendar", href: "#gallery" },
                { label: "General Infrastructure", href: "#infra" },
                { label: "Toastmasters Club", href: "#toastmasters" },
                { label: "Student Corner ERP", href: "https://student.icampuserp.in/Login.aspx" },
                { label: "Contact Us Support", href: "#contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-accent transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower Footer: Campus addresses, Maps and helpline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 items-start text-xs">
          
          {/* Prayagraj Campus Address */}
          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-accent font-bold">
              <MapPin className="w-4 h-4" />
              <span>PRAYAGRAJ CAMPUS</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              United Tower, 53, Leader Road, Prayagraj, Uttar Pradesh, India - 211003
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-300 font-semibold text-[11px]">
              <a href="tel:18003131808" className="hover:text-white flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-accent" /> Call: 1800 3131 808
              </a>
              <a href="mailto:info@united.ac.in" className="hover:text-white flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-accent" /> info@united.ac.in
              </a>
            </div>
            <div className="pt-1 flex gap-3 text-[10px] font-bold text-accent">
              <a href="#" className="hover:underline">Campus Map</a>
              <span>|</span>
              <a href="#" className="hover:underline">Get Directions</a>
            </div>
          </div>

          {/* Greater Noida Campus Address */}
          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-accent font-bold">
              <MapPin className="w-4 h-4" />
              <span>DELHI-NCR GREATER NOIDA CAMPUS</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              50, Knowledge Park III, Greater Noida, Delhi-NCR, Uttar Pradesh, India - 201306
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-300 font-semibold text-[11px]">
              <a href="tel:18001033171" className="hover:text-white flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-accent" /> Call: 1800 103 3171
              </a>
              <a href="mailto:infogn@united.ac.in" className="hover:text-white flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-accent" /> infogn@united.ac.in
              </a>
            </div>
            <div className="pt-1 flex gap-3 text-[10px] font-bold text-accent">
              <a href="#" className="hover:underline">Campus Map</a>
              <span>|</span>
              <a href="#" className="hover:underline">Get Directions</a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Social Icons */}
      <div className="bg-slate-950/80 border-t border-white/5 py-6 text-slate-400 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            © Copyright 2026, all rights reserved with United Group of Institutions.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
          <div className="flex gap-4 font-bold">
            <a href="#" className="hover:text-white">Disclaimer</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
