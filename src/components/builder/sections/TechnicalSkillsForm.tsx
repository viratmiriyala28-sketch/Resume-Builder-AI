'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Code2 } from 'lucide-react';
import TagInput from '@/components/common/TagInput';

export default function TechnicalSkillsForm() {
  const { resume, updateTechnicalSkills } = useResumeStore();
  const skills = resume.technicalSkills;

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-600" />
          <span>Technical Skills</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Group your technical capabilities into clear categories so recruiters can scan them instantly.
        </p>
      </div>

      <div className="space-y-4">
        <TagInput
          label="Programming Languages"
          placeholder="e.g., Python, Java, TypeScript, C++, SQL..."
          tags={skills.languages}
          onChange={(tags) => updateTechnicalSkills({ languages: tags })}
          helperText="Core programming languages you are confident coding in."
        />

        <TagInput
          label="Frameworks & Libraries"
          placeholder="e.g., React, Next.js, Node.js, Express, Tailwind CSS..."
          tags={skills.frameworks}
          onChange={(tags) => updateTechnicalSkills({ frameworks: tags })}
          helperText="Web frameworks, frontend/backend libraries, or runtime platforms."
        />

        <TagInput
          label="Databases & Cloud Storage"
          placeholder="e.g., PostgreSQL, MongoDB, Redis, MySQL, AWS S3..."
          tags={skills.databases}
          onChange={(tags) => updateTechnicalSkills({ databases: tags })}
        />

        <TagInput
          label="Developer Tools & Platforms"
          placeholder="e.g., Git, Docker, Postman, Linux / Bash, VS Code, CI/CD..."
          tags={skills.tools}
          onChange={(tags) => updateTechnicalSkills({ tools: tags })}
        />

        <TagInput
          label="Other Technical Competencies"
          placeholder="e.g., REST APIs, GraphQL, Microservices, Agile, OOP..."
          tags={skills.other}
          onChange={(tags) => updateTechnicalSkills({ other: tags })}
        />
      </div>
    </div>
  );
}
