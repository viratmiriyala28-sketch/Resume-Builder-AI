import React from 'react';
import { ResumeData, SectionKey } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, GraduationCap, Award, Code2, Briefcase } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
}

export default function StudentTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, education, technicalSkills, softSkills, workExperience, projects, achievements, certifications, additionalInfo, metadata } = resume;
  const accent = metadata.accentColor || '#2563eb'; // Blue-600

  const isHidden = (key: SectionKey) => metadata.hiddenSections?.includes(key);

  return (
    <div className="w-full bg-white text-slate-800 p-8 sm:p-11 leading-relaxed text-sm">
      {/* Student Centered & Balanced Header */}
      <header className="border-b-2 pb-5 mb-5 text-center" style={{ borderColor: accent }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {personalInfo.fullName || 'Student Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm sm:text-base font-semibold mt-1" style={{ color: accent }}>
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-2.5">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.linkedIn}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-5">
        {metadata.sectionOrder.map((sectionKey) => {
          if (isHidden(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              if (!summary.content && !summary.careerObjective) return null;
              return (
                <section key="summary" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: accent }}>
                    <span>Candidate Objective & Background</span>
                  </h2>
                  {summary.content && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{summary.content}</p>}
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b flex items-center gap-1.5" style={{ color: accent, borderColor: `${accent}33` }}>
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="resume-item">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-900">
                          <span>{edu.institution}</span>
                          <span className="text-xs font-mono font-normal text-slate-500">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>{edu.degree} in {edu.fieldOfStudy}</span>
                          {edu.gpaOrPercentage && (
                            <span className="font-semibold text-slate-900">GPA: {edu.gpaOrPercentage}</span>
                          )}
                        </div>
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <p className="text-[11px] text-slate-600 mt-1">
                            <strong className="text-slate-800">Relevant Coursework:</strong> {edu.relevantCoursework.join(', ')}
                          </p>
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
                <section key="technicalSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b flex items-center gap-1.5" style={{ color: accent, borderColor: `${accent}33` }}>
                    <Code2 className="w-4 h-4" />
                    <span>Technical & Programming Skills</span>
                  </h2>
                  <div className="text-xs space-y-1 text-slate-700">
                    {technicalSkills.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {technicalSkills.languages.join(', ')}</p>
                    )}
                    {technicalSkills.frameworks.length > 0 && (
                      <p><strong className="text-slate-900">Web & Frameworks:</strong> {technicalSkills.frameworks.join(', ')}</p>
                    )}
                    {technicalSkills.databases.length > 0 && (
                      <p><strong className="text-slate-900">Databases & Cloud:</strong> {technicalSkills.databases.join(', ')}</p>
                    )}
                    {technicalSkills.tools.length > 0 && (
                      <p><strong className="text-slate-900">Tools & Environments:</strong> {technicalSkills.tools.join(', ')}</p>
                    )}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b flex items-center gap-1.5" style={{ color: accent, borderColor: `${accent}33` }}>
                    <Award className="w-4 h-4" />
                    <span>Academic & Personal Projects</span>
                  </h2>
                  <div className="space-y-3.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="resume-item">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{proj.title}</span>
                            {proj.link && <span className="text-[11px] text-slate-500 font-mono">({proj.link})</span>}
                          </div>
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

            case 'workExperience':
              if (!workExperience || workExperience.length === 0) return null;
              return (
                <section key="workExperience" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b flex items-center gap-1.5" style={{ color: accent, borderColor: `${accent}33` }}>
                    <Briefcase className="w-4 h-4" />
                    <span>Internships & Work Experience</span>
                  </h2>
                  <div className="space-y-3.5">
                    {workExperience.map((exp) => (
                      <div key={exp.id} className="resume-item">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-900">
                          <span>{exp.position}</span>
                          <span className="text-xs font-mono font-normal text-slate-500">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                          <span>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.bullets && (
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

            case 'achievements':
              if (!achievements || achievements.length === 0) return null;
              return (
                <section key="achievements" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}33` }}>
                    Achievements & Competitions
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
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}33` }}>
                    Certifications & Specializations
                  </h2>
                  <div className="space-y-1 text-xs text-slate-700">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <div>
                          <strong className="text-slate-900">{cert.name}</strong>
                          <span className="text-slate-600"> ({cert.issuer})</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{cert.issueDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'softSkills':
              if (!softSkills || softSkills.length === 0) return null;
              return (
                <section key="softSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}33` }}>
                    Core Strengths & Soft Skills
                  </h2>
                  <p className="text-xs text-slate-700">{softSkills.join(' • ')}</p>
                </section>
              );

            case 'additionalInfo':
              const hasAddl =
                additionalInfo.languages.length > 0 ||
                (additionalInfo.extracurriculars && additionalInfo.extracurriculars.length > 0) ||
                (additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0) ||
                (additionalInfo.interests && additionalInfo.interests.length > 0);
              if (!hasAddl) return null;
              return (
                <section key="additionalInfo" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}33` }}>
                    Leadership & Extracurriculars
                  </h2>
                  <div className="text-xs space-y-1 text-slate-700">
                    {additionalInfo.extracurriculars && additionalInfo.extracurriculars.length > 0 && (
                      <p><strong className="text-slate-900">Activities:</strong> {additionalInfo.extracurriculars.join('; ')}</p>
                    )}
                    {additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0 && (
                      <p><strong className="text-slate-900">Volunteering:</strong> {additionalInfo.volunteerExperience.join('; ')}</p>
                    )}
                    {additionalInfo.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {additionalInfo.languages.join(', ')}</p>
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
