'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';
import BulletListInput from '@/components/common/BulletListInput';

export default function WorkExperienceForm() {
  const { resume, addWorkExperienceItem, updateWorkExperienceItem, removeWorkExperienceItem } = useResumeStore();
  const workExperience = resume.workExperience;

  const handleAddNew = () => {
    addWorkExperienceItem({
      id: generateId('exp'),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Work Experience & Internships</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Previous professional roles, internships, teaching assistantships, or freelance work.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No work experience added yet.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            (If you are a student or fresh graduate, you can also leave this blank and focus on Projects).
          </p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add Position or Internship
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workExperience.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Position #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeWorkExperienceItem(exp.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperienceItem(exp.id, { company: e.target.value })}
                    placeholder="e.g., Acme Corp / UT Austin"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title / Role *</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateWorkExperienceItem(exp.id, { position: e.target.value })}
                    placeholder="e.g., Software Engineering Intern"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateWorkExperienceItem(exp.id, { location: e.target.value })}
                    placeholder="e.g., Austin, TX / Remote"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperienceItem(exp.id, { startDate: e.target.value })}
                      placeholder="e.g., Jun 2024"
                      className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateWorkExperienceItem(exp.id, { endDate: e.target.value })}
                      placeholder={exp.current ? 'Present' : 'e.g., Aug 2024'}
                      className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateWorkExperienceItem(exp.id, { current: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>I currently work in this role</span>
                  </label>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <BulletListInput
                    label="Responsibilities & Measurable Achievements"
                    bullets={exp.bullets}
                    onChange={(bullets) => updateWorkExperienceItem(exp.id, { bullets })}
                    targetRole={resume.metadata.targetRole}
                    contextTitle={`${exp.position} at ${exp.company}`}
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
