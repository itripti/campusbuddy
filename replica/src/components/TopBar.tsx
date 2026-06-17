"use client";

import React from "react";
import { Phone, FileText, CreditCard, Award, MessageSquare } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-primary text-white text-xs border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 gap-2">
          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 justify-center md:justify-start">
            <a
              href="#admissions"
              className="bg-secondary px-2.5 py-0.5 rounded text-white font-bold animate-pulse inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Admissions Open 2026-27
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="#enquiry"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> Admissions Enquiry
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="#"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> UGI Brochure
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="#"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" /> Online Fee Payment
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="#"
              className="hover:text-accent transition-colors flex items-center gap-1 text-accent font-semibold"
            >
              <Award className="w-3.5 h-3.5 animate-bounce" /> ICAMEET-2026
            </a>
          </div>

          {/* Contact details */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold text-accent">PRAYAGRAJ:</span>
              <a href="tel:18003131808">1800 3131 808</a>
            </div>
            <span className="text-white/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold text-accent">GREATER NOIDA:</span>
              <a href="tel:18001033171">1800 103 3171</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
