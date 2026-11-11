'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useResumeStore } from '@/store/useResumeStore';
import { TemplateId } from '@/types/resume';
import {
  Sparkles,
  LayoutTemplate,
  Palette,
  Type,
  Sliders,
  Target,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';
import CustomizeModal from './CustomizeModal';
import JobTailorModal from './JobTailorModal';
import ExportModal from './ExportModal';

const ACCENT_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Slate', value: '#334155' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
];

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'traditional', label: 'Traditional (ATS)' },
  { id: 'student', label: 'Student / Fresher' },
  { id: 'creative', label: 'Creative Tech' },
];

export default function Toolbar() {
  const {
    resume,
    setTemplate,
    setAccentColor,
    setFontFamily,
    loadSampleResume,
    resetToBlank,
    zoomLevel,
    setZoomLevel,
  } = useResumeStore();

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isTailorOpen, setIsTailorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showSamplesMenu, setShowSamplesMenu] = useState(false);

  return (
    <>
      <div className="builder-toolbar bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm sticky top-0 z-40">
        {/* Left Side: Back & Branding & Template Picker */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-md"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <div className="h-5 w-px bg-slate-200" />

          {/* Template Dropdown */}
          <div className="flex items-center gap-1.5">
            <LayoutTemplate className="w-4 h-4 text-slate-400" />
            <select
              value={resume.metadata.template}
              onChange={(e) => setTemplate(e.target.value as TemplateId)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  Template: {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Family Selector */}
          <div className="hidden lg:flex items-center gap-1.5">
            <Type className="w-4 h-4 text-slate-400" />
            <select
              value={resume.metadata.fontFamily}
              onChange={(e) => setFontFamily(e.target.value as 'sans' | 'serif' | 'mono')}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="sans">Font: Inter (Sans)</option>
              <option value="serif">Font: Merriweather (Serif)</option>
              <option value="mono">Font: JetBrains (Mono)</option>
            </select>
          </div>

          {/* Accent Color Palette Dots */}
          <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5" />
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setAccentColor(c.value)}
                title={c.name}
                style={{ backgroundColor: c.value }}
                className={`w-4 h-4 rounded-full transition-transform ${
                  resume.metadata.accentColor === c.value
                    ? 'ring-2 ring-offset-1 ring-slate-900 scale-110'
                    : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Section Customizer Button */}
          <button
            type="button"
            onClick={() => setIsCustomizeOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-all"
            title="Reorder or hide sections"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Sections</span>
          </button>

          {/* Job Tailoring Assistant Button */}
          <button
            type="button"
            onClick={() => setIsTailorOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-sm transition-all"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tailor to Job</span>
          </button>

          {/* Samples Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSamplesMenu(!showSamplesMenu)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all"
            >
              <span>Load Sample</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showSamplesMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50 animate-fade-in text-xs">
                <button
                  type="button"
                  onClick={() => {
                    loadSampleResume('student');
                    setShowSamplesMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors"
                >
                  Student / Fresher Sample
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loadSampleResume('professional');
                    setShowSamplesMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors"
                >
                  Experienced Pro Sample
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    resetToBlank();
                    setShowSamplesMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-medium transition-colors"
                >
                  Reset to Blank
                </button>
              </div>
            )}
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-indigo-500/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
      <JobTailorModal
        isOpen={isTailorOpen}
        onClose={() => setIsTailorOpen(false)}
      />
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </>
  );
}
