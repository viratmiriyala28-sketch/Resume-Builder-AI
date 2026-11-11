'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';
import TagInput from '@/components/common/TagInput';

export default function EducationForm() {
  const { resume, addEducationItem, updateEducationItem, removeEducationItem } = useResumeStore();
  const education = resume.education;

  const handleAddNew = () => {
    addEducationItem({
      id: generateId('edu'),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      gpaOrPercentage: '',
      relevantCoursework: [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Education</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Academic degrees, institutions, graduation dates, and relevant coursework.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add Your Degree or School
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Entry #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducationItem(edu.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / University Name *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducationItem(edu.id, { institution: e.target.value })}
                    placeholder="e.g., University of Texas at Austin"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducationItem(edu.id, { degree: e.target.value })}
                    placeholder="e.g., Bachelor of Science / B.Tech"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Field of Study / Major *
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducationItem(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="e.g., Computer Science"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Year / Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducationItem(edu.id, { startDate: e.target.value })}
                    placeholder="e.g., 2022"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Year / Graduation Date
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducationItem(edu.id, { endDate: e.target.value })}
                    placeholder="e.g., 2026 or Present"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GPA / Percentage / Honors
                  </label>
                  <input
                    type="text"
                    value={edu.gpaOrPercentage || ''}
                    onChange={(e) => updateEducationItem(edu.id, { gpaOrPercentage: e.target.value })}
                    placeholder="e.g., 3.85 / 4.0 or 88%"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => updateEducationItem(edu.id, { current: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>Currently enrolled here</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <TagInput
                    label="Relevant Coursework (Press Enter to add)"
                    placeholder="e.g., Data Structures, Operating Systems..."
                    tags={edu.relevantCoursework || []}
                    onChange={(tags) => updateEducationItem(edu.id, { relevantCoursework: tags })}
                    helperText="Showcases specialized academic modules directly aligned with the job."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
