'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Users, Plus } from 'lucide-react';
import TagInput from '@/components/common/TagInput';

export default function SoftSkillsForm() {
  const { resume, updateSoftSkills } = useResumeStore();
  const softSkills = resume.softSkills;

  const popularSuggestions = [
    'Cross-functional Communication',
    'Critical Thinking',
    'Agile Collaboration',
    'Technical Problem Solving',
    'Time Management',
    'Leadership & Mentorship',
    'Teamwork',
    'Public Speaking',
  ];

  const handleAddSuggestion = (skill: string) => {
    if (!softSkills.includes(skill)) {
      updateSoftSkills([...softSkills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <span>Soft Skills & Competencies</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Interpersonal strengths, leadership capabilities, and working styles.
        </p>
      </div>

      <div className="space-y-4">
        <TagInput
          label="Your Soft Skills"
          placeholder="e.g., Problem Solving, Team Leadership..."
          tags={softSkills}
          onChange={(tags) => updateSoftSkills(tags)}
          helperText="Type a skill and hit Enter to add it to your resume."
        />

        <div>
          <span className="block text-xs font-semibold text-slate-600 mb-2">
            Quick Add Recommendations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularSuggestions.map((suggestion) => {
              const isAdded = softSkills.includes(suggestion);
              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddSuggestion(suggestion)}
                  disabled={isAdded}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all inline-flex items-center gap-1 ${
                    isAdded
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {!isAdded && <Plus className="w-3 h-3 text-indigo-500" />}
                  <span>{suggestion}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
