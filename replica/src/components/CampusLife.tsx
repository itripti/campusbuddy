"use client";

import React from "react";
import { BookOpen, Monitor, Award, Heart, Globe, Users, Trophy } from "lucide-react";

interface Facility {
  title: string;
  category: string;
  icon: React.ComponentType<any>;
  image: string;
  description: string;
  bullets: string[];
}

const facilities: Facility[] = [
  {
    title: "General Campus Infra",
    category: "Infrastructure",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    description: "UGI campuses feature modern architectural designs, spacious green lawns, smart classrooms, security operations, and eco-friendly solar systems.",
    bullets: ["Fully air-conditioned lecture halls", "Modern student cafeterias", "Safe and secure hostel units"],
  },
  {
    title: "Learning Infrastructure",
    category: "Academics",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
    description: "Equipped with rich physical libraries, computerized indexes, and full digital subscriptions to international journals and technical database lists.",
    bullets: ["50,000+ print volumes and textbooks", "E-library login portal access", "Fully integrated computer systems"],
  },
  {
    title: "National Seminars & Youth Parliaments",
    category: "Events",
    icon: Users,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    description: "We host annual corporate conclaves, national seminars, and Model United Nations (MUNs) to develop debate and leadership skills in our scholars.",
    bullets: ["Sangam Annual HR Conclave", "Regional debate championships", "Guest talks by corporate directors"],
  },
  {
    title: "International Collaborations",
    category: "Global Reach",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
    description: "UGI has established exchange partnerships with foreign colleges and laboratories to facilitate study-abroad terms and research networks.",
    bullets: ["MoUs with American universities", "Global research publications", "Foreign student delegations"],
  },
];

export default function CampusLife() {
  return (
    <section id="infra" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-secondary font-extrabold uppercase tracking-widest text-xs">
              Vibrant Campus Life
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              State-of-the-Art Facilities & Experience
            </h2>
            <p className="text-slate-600 text-sm">
              Discover what makes UGI a special place to learn, research, grow, and make life-long memories.
            </p>
          </div>
          <div>
            <a
              href="#gallery"
              className="text-xs font-bold text-secondary hover:text-red-800 flex items-center gap-1 group whitespace-nowrap"
            >
              <span>View Infra Gallery</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Image side */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${fac.image}')` }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-primary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {fac.category}
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-primary/5 text-primary">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-extrabold text-primary text-sm sm:text-base leading-snug">
                        {fac.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 border-t border-slate-200/50 pt-4 text-[11px] font-semibold text-slate-600">
                    {fac.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini Club Bar */}
        <div className="mt-12 bg-primary/5 rounded-2xl border border-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary text-white rounded-xl">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-primary">UGI Toastmasters Club & Student Chapters</h4>
              <p className="text-[11px] text-slate-500 font-medium">Empowering scholars through public speaking, leadership programs, and national networking events.</p>
            </div>
          </div>
          <a
            href="#"
            className="bg-primary hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm whitespace-nowrap"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}
