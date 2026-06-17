"use client";

import React, { useState } from "react";
import { Eye, X, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  image: string;
  category: "Campus" | "Labs" | "Events" | "Placements";
  title: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    category: "Campus",
    title: "United Campus Prayagraj",
    caption: "Main administrative block and academic buildings surrounded by lush greenery.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop",
    category: "Labs",
    title: "Advanced Computer Lab",
    caption: "State-of-the-art computing facilities equipped with high-speed internet clusters.",
  },
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    category: "Placements",
    title: "Graduation Placement Drive",
    caption: "Students celebrating their selection in leading MNCs during campus drive.",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Events",
    title: "National Seminar Hall",
    caption: "Students participating in annual technical seminars and research lectures.",
  },
  {
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    category: "Labs",
    title: "Pharmaceutical Chemistry Lab",
    caption: "Modern research and formulation equipment at United Institute of Pharmacy.",
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    category: "Campus",
    title: "Central Library Block",
    caption: "Extensive collections of educational resources, scientific publications, and books.",
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    category: "Placements",
    title: "Corporate HR Roundtables",
    caption: "Interactive networking opportunities during our annual HR Conclave - Sangam.",
  },
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    category: "Events",
    title: "Youth Parliaments Room",
    caption: "Students engaging in democratic debate mock-ups and leadership exercises.",
  },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<"All" | "Campus" | "Labs" | "Events" | "Placements">("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => filter === "All" || item.category === filter);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-secondary font-extrabold uppercase tracking-widest text-xs">
            Visual Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            UGI Campus Gallery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Take a visual walk through our classrooms, research laboratories, placement celebration drives, and vibrant campus life.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["All", "Campus", "Labs", "Events", "Placements"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 border border-slate-100 hover:text-primary"
              }`}
            >
              {cat === "All"
                ? "All Photos"
                : cat === "Labs"
                ? "Labs & Library"
                : cat === "Events"
                ? "Seminars & Events"
                : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightbox(item)}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/95 text-primary rounded-full shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-primary text-[8px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {item.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-primary mb-1">{item.title}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightbox && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-up border border-white/10">
              <div className="relative aspect-video max-h-[70vh] bg-slate-900 flex items-center justify-center">
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-secondary tracking-widest uppercase block mb-1">
                  {lightbox.category}
                </span>
                <h3 className="text-base font-extrabold text-primary mb-2">{lightbox.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{lightbox.caption}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
