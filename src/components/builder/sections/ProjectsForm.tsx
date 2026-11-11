'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';
import TagInput from '@/components/common/TagInput';
import BulletListInput from '@/components/common/BulletListInput';

export default function ProjectsForm() {
  const { resume, addProjectItem, updateProjectItem, removeProjectItem } = useResumeStore();
  const projects = resume.projects;

  const handleAddNew = () => {
    addProjectItem({
      id: generateId('proj'),
      title: '',
      description: '',
      technologies: [],
      link: '',
      bullets: [''],
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
            <span>Projects & Portfolio Work</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key academic, personal, or open-source software applications you built.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProjectItem(proj.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProjectItem(proj.id, { title: e.target.value })}
                    placeholder="e.g., DevPulse - Code Review System"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Link / Repo</label>
                  <input
                    type="text"
                    value={proj.link || ''}
                    onChange={(e) => updateProjectItem(proj.id, { link: e.target.value })}
                    placeholder="e.g., github.com/username/project"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description / Subtitle</label>
                  <input
                    type="text"
                    value={proj.description}
                    onChange={(e) => updateProjectItem(proj.id, { description: e.target.value })}
                    placeholder="e.g., A cloud-native web app enabling engineering teams to benchmark code in real-time."
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <TagInput
                    label="Technologies Used (Press Enter to add)"
                    placeholder="e.g., React, TypeScript, Node.js, PostgreSQL, Docker..."
                    tags={proj.technologies}
                    onChange={(tags) => updateProjectItem(proj.id, { technologies: tags })}
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <BulletListInput
                    label="Key Contributions & Quantifiable Outcomes"
                    bullets={proj.bullets}
                    onChange={(bullets) => updateProjectItem(proj.id, { bullets })}
                    targetRole={resume.metadata.targetRole}
                    contextTitle={`Project: ${proj.title}`}
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
