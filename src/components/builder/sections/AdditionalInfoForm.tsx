'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Globe2 } from 'lucide-react';
import TagInput from '@/components/common/TagInput';

export default function AdditionalInfoForm() {
  const { resume, updateAdditionalInfo } = useResumeStore();
  const addl = resume.additionalInfo;

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-indigo-600" />
          <span>Additional Information & Background</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Languages, extracurricular leadership, community volunteer contributions, and genuine personal interests.
        </p>
      </div>

      <div className="space-y-4">
        <TagInput
          label="Languages Spoken"
          placeholder="e.g., English (Fluent), Spanish (Conversational)..."
          tags={addl.languages}
          onChange={(tags) => updateAdditionalInfo({ languages: tags })}
          helperText="Press Enter to add each language and proficiency level."
        />

        <TagInput
          label="Extracurricular Leadership & Clubs"
          placeholder="e.g., Vice President of ACM Student Chapter, Competitive Programming Club..."
          tags={addl.extracurriculars || []}
          onChange={(tags) => updateAdditionalInfo({ extracurriculars: tags })}
          helperText="Demonstrates active leadership, initiative, and community engagement."
        />

        <TagInput
          label="Volunteer Experience & Community Service"
          placeholder="e.g., Coding Tutor at Girls Who Code, Food Bank Organizer..."
          tags={addl.volunteerExperience || []}
          onChange={(tags) => updateAdditionalInfo({ volunteerExperience: tags })}
        />

        <TagInput
          label="Relevant Interests & Hobbies"
          placeholder="e.g., Open Source Software, Autonomous Robotics, Chess..."
          tags={addl.interests || []}
          onChange={(tags) => updateAdditionalInfo({ interests: tags })}
        />
      </div>
    </div>
  );
}
