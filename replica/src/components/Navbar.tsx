"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, GraduationCap, Search } from "lucide-react";

interface MenuItem {
  title: string;
  href?: string;
  hasDropdown: boolean;
  dropdownGroups?: {
    groupTitle?: string;
    items: { label: string; href: string }[];
  }[];
}

const navItems: MenuItem[] = [
  { title: "Home", href: "#", hasDropdown: false },
  {
    title: "About UGI",
    hasDropdown: true,
    dropdownGroups: [
      {
        items: [
          { label: "Why United", href: "#why-united" },
          { label: "History", href: "#history" },
          { label: "Vision & Mission", href: "#vision-mission" },
          { label: "Advisory Council", href: "#advisory-council" },
          { label: "Our Leaders", href: "#leaders" },
          { label: "Milestones", href: "#milestones" },
          { label: "AKTU Affiliations", href: "#aktu" },
          { label: "AICTE Approvals", href: "#aicte" },
          { label: "Gallery", href: "#gallery" },
        ],
      },
    ],
  },
  {
    title: "Institutions",
    hasDropdown: true,
    dropdownGroups: [
      {
        groupTitle: "Prayagraj Campus",
        items: [
          { label: "United College of Engineering & Research (UCER)", href: "#ucer" },
          { label: "United Institute of Technology (UIT)", href: "#uit" },
          { label: "United Institute of Pharmacy (UIP)", href: "#uip" },
          { label: "United Institute of Management (Faculty for UG Studies)", href: "#uim-ug" },
          { label: "United Institute of Management (UIM)", href: "#uim" },
          { label: "United College of Pharmacy (UCP)", href: "#ucp" },
        ],
      },
      {
        groupTitle: "Delhi-NCR Greater Noida Campus",
        items: [
          { label: "United Institute of Management (UIM Noida)", href: "#uim-noida" },
          { label: "United College of Engineering & Research (UCER Noida)", href: "#ucer-noida" },
          { label: "United College of Engineering & Research (Pharmacy Noida)", href: "#ucer-pharm-noida" },
        ],
      },
    ],
  },
  {
    title: "Admissions",
    hasDropdown: true,
    dropdownGroups: [
      {
        items: [
          { label: "Admissions (Apply Online)", href: "#admissions" },
          { label: "Fee Structures", href: "#fees" },
          { label: "Anti Ragging Policy", href: "#anti-ragging" },
          { label: "Scholarships", href: "#scholarships" },
          { label: "FAQs", href: "#faqs" },
          { label: "Admissions Helpline", href: "#helpline" },
          { label: "Admission Offices", href: "#offices" },
          { label: "Global Tie Ups", href: "#tie-ups" },
        ],
      },
    ],
  },
  {
    title: "Courses",
    hasDropdown: true,
    dropdownGroups: [
      {
        groupTitle: "Prayagraj",
        items: [
          { label: "B.Tech / M.Tech", href: "#courses" },
          { label: "MBA / MCA / BBA / BCA", href: "#courses" },
          { label: "B.Pharm / M.Pharm / D.Pharm", href: "#courses" },
          { label: "Diploma Engineering", href: "#courses" },
        ],
      },
      {
        groupTitle: "Greater Noida",
        items: [
          { label: "B.Tech / M.Tech", href: "#courses" },
          { label: "MBA / BBA / BCA", href: "#courses" },
          { label: "D.Pharm", href: "#courses" },
          { label: "BAJMC (Journalism)", href: "#courses" },
          { label: "BA LLB / BBA LLB (Law)", href: "#courses" },
        ],
      },
    ],
  },
  {
    title: "Placements",
    hasDropdown: true,
    dropdownGroups: [
      {
        items: [
          { label: "Our Placements", href: "#placements" },
          { label: "Our Recruiters", href: "#recruiters" },
          { label: "Placement Training (CRC)", href: "#placement-training" },
          { label: "Industry Collaboration", href: "#collaboration" },
          { label: "Placement Bulletin 2025", href: "#bulletin" },
          { label: "Alumni Portal", href: "#alumni" },
        ],
      },
    ],
  },
  {
    title: "Campus Life",
    hasDropdown: true,
    dropdownGroups: [
      {
        items: [
          { label: "General & Learning Infra", href: "#infra" },
          { label: "Events & Photo Gallery", href: "#gallery" },
          { label: "Blogs & News", href: "#news" },
          { label: "UGI Toastmasters Club", href: "#toastmasters" },
          { label: "Contact Us", href: "#contact" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/united-logo.png"
              alt="United Logo"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300 bg-white p-0.5 rounded-lg border border-slate-100 shadow-xs"
            />
            <div className="flex flex-col">
              <span className="text-primary font-black text-lg leading-tight tracking-wider font-sans">
                UNITED GROUP
              </span>
              <span className="text-secondary font-bold text-[10px] tracking-widest leading-none">
                OF INSTITUTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors ${
                      activeDropdown === item.title ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {item.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href || "#"}
                    className="block px-3 py-2 text-sm font-semibold text-primary hover:text-secondary rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {item.title}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.title && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max min-w-[260px] bg-white rounded-xl shadow-xl border border-slate-100 p-4 transition-all duration-300 origin-top scale-100 opacity-100 flex gap-6 z-50`}
                  >
                    {item.dropdownGroups?.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col gap-2">
                        {group.groupTitle && (
                          <h4 className="text-[10px] font-extrabold tracking-wider text-secondary uppercase border-b border-slate-100 pb-1 mb-1">
                            {group.groupTitle}
                          </h4>
                        )}
                        <ul className="space-y-1">
                          {group.items.map((dropItem, dIdx) => (
                            <li key={dIdx}>
                              <a
                                href={dropItem.href}
                                className="block px-3 py-1.5 text-xs text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md transition-colors font-medium whitespace-nowrap"
                              >
                                {dropItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-primary hover:bg-slate-50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <a
              href="#admissions"
              className="bg-secondary text-white hover:bg-red-800 px-5 py-2 rounded-lg text-sm font-bold shadow-md shadow-secondary/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Apply Online
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#admissions"
              className="bg-secondary text-white text-xs font-bold px-3.5 py-2 rounded-lg"
            >
              Apply
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-primary hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg p-4 max-h-[80vh] overflow-y-auto z-45">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-slate-50 pb-2">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.title ? null : item.title)
                      }
                      className="flex justify-between items-center w-full py-2 text-sm font-bold text-primary"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.title && (
                      <div className="mt-1 pl-4 space-y-3 bg-slate-50/50 p-2 rounded-lg">
                        {item.dropdownGroups?.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1.5">
                            {group.groupTitle && (
                              <h5 className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                                {group.groupTitle}
                              </h5>
                            )}
                            <ul className="space-y-1">
                              {group.items.map((dropItem, dIdx) => (
                                <li key={dIdx}>
                                  <a
                                    href={dropItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-1 text-xs text-slate-600 hover:text-primary font-medium"
                                  >
                                    {dropItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href || "#"}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-bold text-primary"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
