'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Target, X, Sparkles, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { JobMatchAnalysis } from '@/types/resume';

interface JobTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobTailorModal({ isOpen, onClose }: JobTailorModalProps) {
  const { resume, setTargetRole, setJobDescriptionInput, updateSummary } = useResumeStore();
  const [targetRole, setLocalTargetRole] = useState(resume.metadata.targetRole || '');
  const [jobDescription, setLocalJobDescription] = useState(resume.metadata.targetJobDescription || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JobMatchAnalysis | null>(null);

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setTargetRole(targetRole);
    setJobDescriptionInput(jobDescription);

    try {
      const response = await fetch('/api/ai/tailor-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          jobDescription,
          resume,
        }),
      });

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      console.error('Job tailoring error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyTailoredSummary = () => {
    if (analysis?.tailoredSummarySuggestion) {
      updateSummary({ content: analysis.tailoredSummarySuggestion });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Job Description Tailoring Assistant
              </h3>
              <p className="text-xs text-slate-500">
                Optimize your resume for a specific job posting and bypass ATS filters.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Job Title
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setLocalTargetRole(e.target.value)}
              placeholder="e.g., Junior Software Engineer / Frontend Developer"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Paste Job Description (JD) *
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setLocalJobDescription(e.target.value)}
              placeholder="Paste the full job requirements, qualifications, and responsibilities here..."
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleRunAnalysis}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Analyze Job Fit & Surface Missing Keywords</span>
          </button>

          {/* Analysis Results View */}
          {analysis && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 mt-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                <span className="text-xs font-bold text-slate-700">ATS Keyword Match Score</span>
                <span className="text-sm font-extrabold text-indigo-600 font-mono">
                  {analysis.matchScore}% Match
                </span>
              </div>

              {/* Matching Skills */}
              <div>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Matching Skills Found in Your Resume:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysis.matchingSkills.length > 0 ? (
                    analysis.matchingSkills.map((s, i) => (
                      <span key={i} className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">None detected yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Missing or Underrepresented Keywords in JD:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysis.missingSkills.length > 0 ? (
                    analysis.missingSkills.map((s, i) => (
                      <span key={i} className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Great coverage!</span>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    AI Suggestions to Align Your Resume:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tailored Summary Recommendation */}
              {analysis.tailoredSummarySuggestion && (
                <div className="p-3 bg-white rounded-lg border border-indigo-200/80 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block">
                    ✨ Recommended Tailored Summary:
                  </span>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{analysis.tailoredSummarySuggestion}"
                  </p>
                  <button
                    type="button"
                    onClick={handleApplyTailoredSummary}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Apply This Summary to My Resume</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
