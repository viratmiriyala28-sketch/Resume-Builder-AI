'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { FileText, Sparkles, Loader2 } from 'lucide-react';

export default function SummaryForm() {
  const { resume, updateSummary } = useResumeStore();
  const summary = resume.summary;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: resume.personalInfo.fullName,
          jobTitle: resume.personalInfo.jobTitle,
          targetRole: resume.metadata.targetRole || resume.personalInfo.jobTitle,
          education: resume.education,
          skills: [...resume.technicalSkills.languages, ...resume.technicalSkills.frameworks],
          experienceSummary: resume.workExperience.map((e) => `${e.position} at ${e.company}`).join(', '),
          projectsSummary: resume.projects.map((p) => p.title).join(', '),
        }),
      });

      const data = await response.json();
      if (data.summary) {
        updateSummary({ content: data.summary });
      }
    } catch (err) {
      console.error('Failed to generate summary:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Professional Summary</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A concise 3-4 sentence elevator pitch highlighting your core competencies and career focus.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAiGenerateSummary}
          disabled={isGenerating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          )}
          <span>Generate with AI</span>
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Summary / Profile Statement
          </label>
          <textarea
            rows={5}
            value={summary.content}
            onChange={(e) => updateSummary({ content: e.target.value })}
            placeholder="e.g., Dedicated Computer Science undergraduate with hands-on experience in full-stack web development and database management..."
            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Career Objective (Especially useful for students & freshers)
          </label>
          <input
            type="text"
            value={summary.careerObjective || ''}
            onChange={(e) => updateSummary({ careerObjective: e.target.value })}
            placeholder="e.g., Seeking a Software Engineering Internship for Summer 2026..."
            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
