"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Compass, Award, Star } from "lucide-react";

interface Testimonial {
  name: string;
  course: string;
  company: string;
  offers?: string;
  package?: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Muskan Seth",
    course: "B.Tech. - Computer Science & Engineering",
    company: "Infosys, Wipro, Nagarro, Mphasis, Knocial, Belair",
    offers: "6 Offers Received",
    package: "8.5 LPA",
    text: "It takes patience and consistency to achieve any height in life. I got 6 offers from Infosys, Wipro, Nagarro, Mphasis, Knocial India Pvt Ltd and Belair Travels. This was only possible by the constant support, excellent teaching skills and guidance of faculty members. The sessions conducted by GRT and PSD teams also helped me to ace my logical reasoning.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Ishita Gupta",
    course: "B.Tech. - Electronics & Communication Engg.",
    company: "Infosys (Power Programmer)",
    offers: "Top Corporate Offer",
    package: "9.5 LPA",
    text: "I feel proud and privileged in becoming the first at United Group for being offered the most coveted and the topmost role of Power Programmer at Infosys at a package of 9.5 LPA. I just believed in this four-letter word HDFC i.e. Hard work, Dedication, Focus and Commitment, and kept on mastering my skills.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Rohit Rajput",
    course: "B.Tech. - Information Technology",
    company: "Vinove, Infosys, Daffodil, Nucleus, AppSierra",
    offers: "5 Offers Received",
    package: "7.0 LPA",
    text: "As a proud student of United, I am now placed in Vinove 7.0 LPA, Infosys 6.25 LPA, Daffodil 5.0 LPA, Nucleus Software 4.25 LPA, and AppSierra Solutions 4 LPA and I am thankful to the team GRT for providing me and my colleagues enormous job opportunities. The entire faculty and department let me grow.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Prapti Bisen",
    course: "B.Tech. - Electronics & Communication Engg.",
    company: "TCS, Wipro, Mphasis, Hexaware",
    offers: "4 Offers Received",
    package: "6.5 LPA",
    text: "My preparation journey started quite late as compared to the set time and I knew it was going to be hard but it was only possible due to the efforts of the GRT team through the boot camps and virtual training classes that helped me a lot with my preparations. As a result, I got placed in four companies TCS NINJA, Wipro Elite, Mphasis and Hexaware.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Vidyangan Shyam",
    course: "B.Tech. - Civil Engineering",
    company: "Infosys",
    offers: "Placed in IT",
    package: "4.5 LPA",
    text: "From the academics to corporate, I experienced a great learning and saw every shade of Engineering Education here. In sync with my interests & skills and the job scenario I made myself career ready. Indeed, my selection in four companies is a proof that there is no substitute for hard work. I, even being from a non-IT background got placed in Infosys.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
];

const recruiterCompanies = [
  "Infosys",
  "TCS",
  "Wipro",
  "HCL Tech",
  "Cognizant",
  "Capgemini",
  "Hexaware",
  "Amazon",
  "Nagarro",
  "Mphasis",
  "Nucleus Software",
  "L&T Infotech",
];

export default function PlacementsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="placements" className="py-16 sm:py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative vector background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Placement Highlight Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight block mb-2">
              57.6 LPA
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">
              Highest Package Received
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight block mb-2">
              10 LPA*
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">
              Average Package (Top 10%)
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight block mb-2">
              700+
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">
              Total Recruiters Visited
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight block mb-2">
              1,500+
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block">
              Yearly Placement Growth
            </span>
          </div>
        </div>

        {/* Mid Grid: Testimonial & Recruiter Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Testimonials Slider */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-accent font-extrabold uppercase tracking-widest text-xs">
                Student Testimonials
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Our Placed Students Share Their Success
              </h2>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-slate-100 min-h-[340px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[activeIdx].avatar}
                      alt={testimonials[activeIdx].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-primary">{testimonials[activeIdx].name}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">{testimonials[activeIdx].course}</p>
                    </div>
                  </div>
                  <Quote className="w-10 h-10 text-secondary/10" />
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{testimonials[activeIdx].text}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Placed In</span>
                  <span className="text-xs font-bold text-secondary">{testimonials[activeIdx].company}</span>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-lg">
                  <span className="text-[10px] font-bold text-secondary block text-center">Package Received</span>
                  <span className="text-xs font-black text-secondary block text-center">{testimonials[activeIdx].package}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-1">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeIdx ? "w-6 bg-accent" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Recruiter Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-accent font-extrabold uppercase tracking-widest text-xs">
                CRC Recruiting Network
              </span>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Top Companies Hiring Our Talent
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                UGI Placement Cell (Corporate Relations Centre) partners with major Indian and Fortune 500 corporations. Our intensive pre-placement training includes mock GDs, technical bootcamps, and coding tests.
              </p>
            </div>

            {/* Highlights bullet list */}
            <ul className="space-y-3 text-xs font-bold text-slate-200">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Dedicated CRC and CRT training program starting from 3rd Year</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>MOU with Infosys, Wipro, and NHRD chapters for student bootcamps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Over 250+ placement drives conducted annually across campuses</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#enquiry"
                className="bg-accent hover:bg-amber-600 text-primary font-black px-6 py-3 rounded-lg text-xs tracking-wider uppercase inline-block shadow-lg shadow-accent/10 transition-all hover:-translate-y-0.5"
              >
                Register for Placements 2026
              </a>
            </div>
          </div>

        </div>

        {/* Recruiter Logos Scrolling Ticker */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <span className="text-center text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-6">
            Prominent Hiring Partners
          </span>
          
          <div className="marquee-container relative w-full overflow-hidden bg-white/5 rounded-xl border border-white/5 py-4">
            <div className="marquee-content flex gap-8 whitespace-nowrap">
              {/* Double up the list to allow infinite scrolling effect */}
              {[...recruiterCompanies, ...recruiterCompanies, ...recruiterCompanies].map((company, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center justify-center bg-white/10 px-6 py-3 rounded-lg border border-white/10 text-sm font-black text-slate-100 tracking-wider hover:bg-white/20 transition-colors cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
