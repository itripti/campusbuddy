"use client";

import React, { useState } from "react";
import { X, Sparkles, AlertCircle } from "lucide-react";

export default function CampusBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      
      {/* Campus Buddy Panel */}
      {isOpen && (
        <div className="w-[300px] sm:w-[340px] bg-white rounded-2xl border border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.15)] overflow-hidden mb-4 animate-slide-up">
          
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-slate-900 shrink-0">
                <img
                  src="/campus-buddy-logo.jpg"
                  alt="Campus Buddy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight flex items-center gap-1">
                  Campus Buddy AI
                  <span className="bg-accent/20 text-accent text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Sparkles className="w-2 h-2" /> AI
                  </span>
                </h3>
                <p className="text-[9px] text-slate-300 font-semibold">Your Smart College Assistant</p>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 bg-slate-50/50 text-center space-y-4">
            <div className="p-3 bg-primary/5 text-primary rounded-2xl inline-block">
              <AlertCircle className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-primary">System Notice</h4>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Welcome to Campus Buddy. AI integration coming soon.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Widget Entry Point */}
      <div 
        className="flex flex-col items-end group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        
        {/* Animated Label Box */}
        <div className="mb-2 relative transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 select-none">
          <div className="bg-white text-primary border border-slate-200/80 shadow-md rounded-lg py-1.5 px-3 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 relative whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping absolute -top-0.5 -right-0.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute -top-0.5 -right-0.5" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="transition-all duration-300">
              {hovered ? "Your AI Campus Assistant" : "Ask Campus Buddy"}
            </span>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute right-6 -bottom-1 w-2 h-2 bg-white border-r border-b border-slate-200/80 transform rotate-45" />
        </div>

        {/* Floating Circular Bot Avatar */}
        <button
          className="relative w-[70px] h-[70px] rounded-full overflow-hidden focus:outline-none transition-all duration-500 ease-out hover:scale-105 active:scale-95"
          style={{
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.6), 0 0 15px rgba(139, 92, 246, 0.4)",
          }}
          aria-label="Open Campus Buddy Assistant"
        >
          {/* Glow / Purple Gradient Ring Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-500 p-[3px] rounded-full animate-spin [animation-duration:8s] opacity-90 group-hover:opacity-100" />
          
          {/* Inner Avatar Container */}
          <div className="absolute inset-[3px] rounded-full overflow-hidden bg-slate-900 border border-slate-800">
            <img
              src="/campus-buddy-logo.jpg"
              alt="Campus Buddy AI Avatar"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Floating Subtle Pulse Ping effect */}
          <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-25 pointer-events-none scale-105 [animation-duration:3s]" />
        </button>

      </div>

    </div>
  );
}
