'use client';

import React, { useState, useEffect } from 'react';
import Toolbar from '@/components/builder/Toolbar';
import HybridInput from '@/components/builder/HybridInput';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import { useResumeStore } from '@/store/useResumeStore';
import { ZoomIn, ZoomOut, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BuilderPage() {
  const { resume } = useResumeStore();
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
          <span>Loading ResumeAI Studio...</span>
        </div>
      </div>
    );
  }

  // Completeness & Incomplete field warnings
  const warnings: string[] = [];
  if (!resume.personalInfo.fullName) warnings.push('Full Name is required');
  if (!resume.personalInfo.email) warnings.push('Email is required');
  if (!resume.personalInfo.phone) warnings.push('Phone number is missing');
  if (resume.education.length === 0) warnings.push('Add at least one Education entry');
  if (
    resume.technicalSkills.languages.length === 0 &&
    resume.technicalSkills.frameworks.length === 0
  ) {
    warnings.push('Add your technical skills');
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.7));

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Application Toolbar */}
      <Toolbar />

      {/* Workspace Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-53px)] overflow-hidden">
        {/* Left Side: Hybrid Input (45% on desktop) */}
        <section className="w-full lg:w-[48%] xl:w-[45%] h-full p-3 sm:p-4 overflow-hidden flex flex-col">
          {/* Missing info warning banner if essentials not yet filled */}
          {warnings.length > 0 && (
            <div className="mb-2 p-2 bg-amber-50 border border-amber-200/80 rounded-lg flex items-center justify-between text-xs text-amber-800 animate-fade-in flex-shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span className="font-semibold">Notice:</span>
                <span className="truncate">{warnings[0]}</span>
                {warnings.length > 1 && (
                  <span className="text-[10px] text-amber-600 font-medium">
                    (+{warnings.length - 1} more items)
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0">
            <HybridInput />
          </div>
        </section>

        {/* Right Side: Live Resume Document Canvas (55% on desktop) */}
        <section className="w-full lg:w-[52%] xl:w-[55%] h-full bg-slate-200/70 p-4 sm:p-6 overflow-y-auto relative flex flex-col items-center">
          {/* Floating Zoom & Status Controls */}
          <div className="sticky top-2 z-30 mb-4 bg-white/90 backdrop-blur-md border border-slate-300 rounded-full py-1 px-3 shadow-md flex items-center gap-3 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live ATS Preview</span>
            </div>

            <div className="h-3 w-px bg-slate-300" />

            <div className="flex items-center gap-1 text-slate-500">
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1 hover:text-slate-900 rounded transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1 hover:text-slate-900 rounded transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Container */}
          <div className="w-full flex justify-center pb-16">
            <ResumeRenderer resume={resume} scale={zoom} />
          </div>
        </section>
      </div>
    </div>
  );
}
