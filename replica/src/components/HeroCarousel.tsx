"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  cta1: { text: string; href: string };
  cta2: { text: string; href: string };
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop",
    badge: "Admissions Open 2026-27",
    title: "Nurturing Tomorrow's Leaders Today",
    subtitle: "Join the distinguished community of scholars at UGI. Shape your career in Engineering, Management, Pharmacy, Law, and Journalism.",
    cta1: { text: "Apply Online Now", href: "#admissions" },
    cta2: { text: "Explore Programs", href: "#courses" },
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
    badge: "Placements Highlights",
    title: "Where Dreams Meet Top Global Recruiters",
    subtitle: "Celebrating our placement milestone of 57.6 LPA highest package, 10 LPA average package, and 700+ campus companies visited.",
    cta1: { text: "Placement Records", href: "#placements" },
    cta2: { text: "Enquiry Form", href: "#enquiry" },
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
    badge: "State-of-the-Art Infrastructure",
    title: "World Class Infrastructure & Campus Life",
    subtitle: "Explore our lush green campuses, modern computer clusters, highly-equipped pharmaceutical labs, and rich libraries.",
    cta1: { text: "Campus Tour", href: "#infra" },
    cta2: { text: "Why United", href: "#why-united" },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[7000ms] ease-out"
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: index === current ? "scale(1.0)" : "scale(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
                <span className="inline-flex items-center gap-1 bg-secondary/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-bounce">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-medium drop-shadow-sm">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={slide.cta1.href}
                    className="bg-secondary hover:bg-red-800 text-white text-sm font-bold px-6 py-3 rounded-lg shadow-lg shadow-secondary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    {slide.cta1.text}
                  </a>
                  <a
                    href={slide.cta2.href}
                    className="bg-transparent hover:bg-white/10 text-white border-2 border-white/60 text-sm font-bold px-6 py-3 rounded-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    {slide.cta2.text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Control Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-105 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-105 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Indicator Bullets */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-secondary" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
