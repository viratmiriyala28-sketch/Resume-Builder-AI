'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { SectionKey } from '@/types/resume';
import { X, Eye, EyeOff, ArrowUp, ArrowDown, MoveVertical } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTION_LABELS: Record<SectionKey, string> = {
  personalInfo: 'Personal Information (Header)',
  summary: 'Professional Summary',
  education: 'Education',
  technicalSkills: 'Technical Skills',
  projects: 'Projects & Portfolio',
  workExperience: 'Work Experience',
  certifications: 'Certifications',
  achievements: 'Honors & Achievements',
  softSkills: 'Soft Skills',
  additionalInfo: 'Additional Information',
};

export default function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const { resume, reorderSections, toggleSectionVisibility } = useResumeStore();

  if (!isOpen) return null;

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...resume.metadata.sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    reorderSections(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === resume.metadata.sectionOrder.length - 1) return;
    const newOrder = [...resume.metadata.sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    reorderSections(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <MoveVertical className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Section Order & Visibility
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Reorder sections to prioritize your strongest assets (e.g. put Education first if you are a student), or hide sections you do not need.
        </p>

        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {resume.metadata.sectionOrder.map((sectionKey, idx) => {
            const isHidden = resume.metadata.hiddenSections.includes(sectionKey);
            const isPersonalInfo = sectionKey === 'personalInfo';

            return (
              <div
                key={sectionKey}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                  isHidden
                    ? 'bg-slate-50 text-slate-400 border-slate-200'
                    : 'bg-white text-slate-800 border-slate-200/90 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 w-4">
                    {idx + 1}
                  </span>
                  <span className="font-semibold">{SECTION_LABELS[sectionKey]}</span>
                </div>

                <div className="flex items-center gap-1">
                  {!isPersonalInfo && (
                    <button
                      type="button"
                      onClick={() => toggleSectionVisibility(sectionKey)}
                      title={isHidden ? 'Show section' : 'Hide section'}
                      className={`p-1.5 rounded transition-colors ${
                        isHidden
                          ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                          : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === resume.metadata.sectionOrder.length - 1}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
