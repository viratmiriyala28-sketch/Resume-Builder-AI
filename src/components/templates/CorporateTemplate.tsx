import React from 'react';
import { ResumeData, SectionKey } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
}

export default function CorporateTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, education, technicalSkills, softSkills, workExperience, projects, achievements, certifications, additionalInfo, metadata } = resume;
  const accent = metadata.accentColor || '#0f766e'; // Teal/Navy corporate

  const isHidden = (key: SectionKey) => metadata.hiddenSections?.includes(key);

  return (
    <div className="w-full bg-white text-slate-800 leading-relaxed text-sm">
      {/* Executive Top Banner */}
      <header className="p-8 sm:p-10 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm sm:text-base font-medium opacity-90 tracking-wide uppercase mt-1">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-white/90 mt-4 pt-3 border-t border-white/20">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.linkedIn}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 opacity-80" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Main Body */}
      <div className="p-8 sm:p-10 space-y-6">
        {metadata.sectionOrder.map((sectionKey) => {
          if (isHidden(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              if (!summary.content && !summary.careerObjective) return null;
              return (
                <section key="summary" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2.5" style={{ borderColor: accent }}>
                    Executive Summary
                  </h2>
                  {summary.content && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{summary.content}</p>}
                </section>
              );

            case 'workExperience':
              if (!workExperience || workExperience.length === 0) return null;
              return (
                <section key="workExperience" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-3" style={{ borderColor: accent }}>
                    Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {workExperience.map((exp) => (
                      <div key={exp.id} className="resume-item pl-3 border-l-2 border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{exp.position}</span>
                          <span className="text-xs text-slate-500 font-mono">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                          <span style={{ color: accent }}>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-3" style={{ borderColor: accent }}>
                    Education
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="resume-item pl-3 border-l-2 border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{edu.institution}</span>
                          <span className="text-xs text-slate-500 font-mono">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700">
                          <span>{edu.degree} in {edu.fieldOfStudy}</span>
                          {edu.gpaOrPercentage && <span className="font-semibold text-slate-800"> (GPA: {edu.gpaOrPercentage})</span>}
                        </div>
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            <span className="font-semibold">Coursework:</span> {edu.relevantCoursework.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-3" style={{ borderColor: accent }}>
                    Key Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="resume-item pl-3 border-l-2 border-slate-100">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{proj.title}</span>
                          {proj.technologies && (
                            <span className="text-xs font-mono text-slate-500">
                              {proj.technologies.join(', ')}
                            </span>
                          )}
                        </div>
                        {proj.description && <p className="text-xs text-slate-600 mb-1">{proj.description}</p>}
                        {proj.bullets && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                            {proj.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'technicalSkills':
              const hasTech =
                technicalSkills.languages.length > 0 ||
                technicalSkills.frameworks.length > 0 ||
                technicalSkills.databases.length > 0 ||
                technicalSkills.tools.length > 0 ||
                technicalSkills.other.length > 0;
              if (!hasTech) return null;
              return (
                <section key="technicalSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2.5" style={{ borderColor: accent }}>
                    Technical Proficiencies
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {technicalSkills.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {technicalSkills.languages.join(', ')}</p>
                    )}
                    {technicalSkills.frameworks.length > 0 && (
                      <p><strong className="text-slate-900">Frameworks:</strong> {technicalSkills.frameworks.join(', ')}</p>
                    )}
                    {technicalSkills.databases.length > 0 && (
                      <p><strong className="text-slate-900">Databases:</strong> {technicalSkills.databases.join(', ')}</p>
                    )}
                    {technicalSkills.tools.length > 0 && (
                      <p><strong className="text-slate-900">Tools:</strong> {technicalSkills.tools.join(', ')}</p>
                    )}
                  </div>
                </section>
              );

            case 'softSkills':
              if (!softSkills || softSkills.length === 0) return null;
              return (
                <section key="softSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2" style={{ borderColor: accent }}>
                    Core Competencies
                  </h2>
                  <p className="text-xs text-slate-700">{softSkills.join(' • ')}</p>
                </section>
              );

            case 'achievements':
              if (!achievements || achievements.length === 0) return null;
              return (
                <section key="achievements" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2" style={{ borderColor: accent }}>
                    Honors & Achievements
                  </h2>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="flex justify-between">
                        <div>
                          <strong className="text-slate-900">{ach.title}</strong>
                          {ach.description && <span className="text-slate-600"> — {ach.description}</span>}
                        </div>
                        {ach.date && <span className="text-slate-500 font-mono text-[11px]">{ach.date}</span>}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (!certifications || certifications.length === 0) return null;
              return (
                <section key="certifications" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2" style={{ borderColor: accent }}>
                    Certifications & Licenses
                  </h2>
                  <div className="space-y-1 text-xs text-slate-700">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <div>
                          <strong className="text-slate-900">{cert.name}</strong>
                          <span className="text-slate-600"> — {cert.issuer}</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{cert.issueDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'additionalInfo':
              const hasAddl =
                additionalInfo.languages.length > 0 ||
                (additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0);
              if (!hasAddl) return null;
              return (
                <section key="additionalInfo" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-4 pl-2.5 mb-2" style={{ borderColor: accent }}>
                    Additional Information
                  </h2>
                  <div className="text-xs space-y-1 text-slate-700">
                    {additionalInfo.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {additionalInfo.languages.join(', ')}</p>
                    )}
                    {additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0 && (
                      <p><strong className="text-slate-900">Community:</strong> {additionalInfo.volunteerExperience.join('; ')}</p>
                    )}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
