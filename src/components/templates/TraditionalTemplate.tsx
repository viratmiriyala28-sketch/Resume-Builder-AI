import React from 'react';
import { ResumeData, SectionKey } from '@/types/resume';

interface TemplateProps {
  resume: ResumeData;
}

export default function TraditionalTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, education, technicalSkills, softSkills, workExperience, projects, achievements, certifications, additionalInfo, metadata } = resume;
  const isHidden = (key: SectionKey) => metadata.hiddenSections?.includes(key);

  return (
    <div className="w-full bg-white text-black p-8 sm:p-12 leading-relaxed text-sm font-serif">
      {/* Traditional Centered Header */}
      <header className="text-center pb-4 mb-5 border-b border-black">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-black">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm font-normal text-slate-800 italic mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-800 mt-2 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedIn && <span>• {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-4">
        {metadata.sectionOrder.map((sectionKey) => {
          if (isHidden(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              if (!summary.content && !summary.careerObjective) return null;
              return (
                <section key="summary" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-900 leading-normal">{summary.content}</p>
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans">
                    EDUCATION
                  </h2>
                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="resume-item">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-black">
                          <span>{edu.institution}</span>
                          <span className="font-normal font-sans text-xs">{edu.startDate} – {edu.endDate}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-900 italic">
                          <span>{edu.degree} in {edu.fieldOfStudy}</span>
                          {edu.gpaOrPercentage && <span className="not-italic font-sans">GPA: {edu.gpaOrPercentage}</span>}
                        </div>
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <p className="text-xs text-slate-800 mt-0.5 font-sans">
                            <strong>Relevant Coursework:</strong> {edu.relevantCoursework.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'workExperience':
              if (!workExperience || workExperience.length === 0) return null;
              return (
                <section key="workExperience" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans">
                    PROFESSIONAL EXPERIENCE
                  </h2>
                  <div className="space-y-3">
                    {workExperience.map((exp) => (
                      <div key={exp.id} className="resume-item">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-black">
                          <span>{exp.position}</span>
                          <span className="font-normal font-sans text-xs">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-900 italic mb-1">
                          <span>{exp.company}</span>
                          {exp.location && <span className="not-italic">{exp.location}</span>}
                        </div>
                        {exp.bullets && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-900 space-y-0.5">
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

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans">
                    PROJECTS
                  </h2>
                  <div className="space-y-2.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="resume-item">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-black">
                          <span>{proj.title} {proj.link && <span className="font-normal font-sans text-xs">({proj.link})</span>}</span>
                          {proj.technologies && (
                            <span className="font-normal font-sans text-xs text-slate-700">{proj.technologies.join(', ')}</span>
                          )}
                        </div>
                        {proj.description && <p className="text-xs text-slate-800 italic">{proj.description}</p>}
                        {proj.bullets && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-900 space-y-0.5 mt-0.5">
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
                technicalSkills.tools.length > 0;
              if (!hasTech) return null;
              return (
                <section key="technicalSkills" className="resume-section font-sans">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    TECHNICAL SKILLS
                  </h2>
                  <div className="text-xs text-slate-900 space-y-0.5">
                    {technicalSkills.languages.length > 0 && (
                      <p><strong>Languages:</strong> {technicalSkills.languages.join(', ')}</p>
                    )}
                    {technicalSkills.frameworks.length > 0 && (
                      <p><strong>Frameworks & Libraries:</strong> {technicalSkills.frameworks.join(', ')}</p>
                    )}
                    {technicalSkills.databases.length > 0 && (
                      <p><strong>Databases:</strong> {technicalSkills.databases.join(', ')}</p>
                    )}
                    {technicalSkills.tools.length > 0 && (
                      <p><strong>Developer Tools:</strong> {technicalSkills.tools.join(', ')}</p>
                    )}
                  </div>
                </section>
              );

            case 'softSkills':
              if (!softSkills || softSkills.length === 0) return null;
              return (
                <section key="softSkills" className="resume-section font-sans">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    CORE COMPETENCIES
                  </h2>
                  <p className="text-xs text-slate-900">{softSkills.join(' • ')}</p>
                </section>
              );

            case 'achievements':
              if (!achievements || achievements.length === 0) return null;
              return (
                <section key="achievements" className="resume-section font-sans">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    HONORS & AWARDS
                  </h2>
                  <div className="space-y-1 text-xs text-slate-900">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="flex justify-between">
                        <span><strong>{ach.title}</strong> {ach.description && `— ${ach.description}`}</span>
                        {ach.date && <span>{ach.date}</span>}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (!certifications || certifications.length === 0) return null;
              return (
                <section key="certifications" className="resume-section font-sans">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    CERTIFICATIONS
                  </h2>
                  <div className="space-y-1 text-xs text-slate-900">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <span><strong>{cert.name}</strong> — {cert.issuer}</span>
                        <span>{cert.issueDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'additionalInfo':
              const hasAddl = additionalInfo.languages.length > 0 || (additionalInfo.interests && additionalInfo.interests.length > 0);
              if (!hasAddl) return null;
              return (
                <section key="additionalInfo" className="resume-section font-sans">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
                    ADDITIONAL INFORMATION
                  </h2>
                  <div className="text-xs text-slate-900 space-y-0.5">
                    {additionalInfo.languages.length > 0 && (
                      <p><strong>Languages:</strong> {additionalInfo.languages.join(', ')}</p>
                    )}
                    {additionalInfo.interests && additionalInfo.interests.length > 0 && (
                      <p><strong>Interests:</strong> {additionalInfo.interests.join(', ')}</p>
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
