import { NextRequest, NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL, isGeminiConfigured } from '@/lib/gemini';
import { ResumeData } from '@/types/resume';

export async function POST(req: NextRequest) {
  try {
    const { targetRole, jobDescription, resume } = await req.json();

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json({ error: 'Job description is required.' }, { status: 400 });
    }

    const currentResume: ResumeData = resume;
    const userSkills = [
      ...currentResume.technicalSkills.languages,
      ...currentResume.technicalSkills.frameworks,
      ...currentResume.technicalSkills.databases,
      ...currentResume.technicalSkills.tools,
      ...currentResume.technicalSkills.other,
      ...currentResume.softSkills,
    ];

    if (isGeminiConfigured() && genAI) {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const prompt = `
You are an expert ATS recruiter and Career Consultant.
Analyze the provided Job Description against the Candidate's actual resume profile.

Target Job Title: "${targetRole || 'Software Professional'}"
Job Description:
"""
${jobDescription}
"""

Candidate's Actual Profile:
- Skills: ${userSkills.join(', ')}
- Work History: ${currentResume.workExperience.map(e => `${e.position} at ${e.company}: ${e.bullets.join(' ')}`).join(' | ')}
- Projects: ${currentResume.projects.map(p => `${p.title} (${p.technologies.join(', ')}): ${p.bullets.join(' ')}`).join(' | ')}
- Education: ${currentResume.education.map(e => `${e.degree} in ${e.fieldOfStudy} from ${e.institution}`).join(', ')}

INSTRUCTIONS & STRICT RULES:
1. Identify keywords and technical skills from the Job Description that the candidate ALREADY possesses (matchingSkills).
2. Identify important skills requested in the Job Description that are NOT in the candidate's profile (missingSkills).
3. Compute an ATS Match Score (0 to 100) based on realistic keyword coverage.
4. Provide 3-4 actionable recommendations to tailor bullet points and highlight relevant strengths WITHOUT fabricating unearned experience.
5. Provide a rewritten, aligned professional summary tailored to the target role using ONLY the candidate's real capabilities.
6. Return STRICT JSON with this schema:
{
  "matchScore": 75,
  "matchingSkills": ["Skill A", "Skill B"],
  "missingSkills": ["Skill C", "Skill D"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "tailoredSummarySuggestion": "A compelling 3-sentence summary aligned with the target role..."
}
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    }

    // Heuristic fallback analysis when offline or without Gemini key
    const lowerJd = jobDescription.toLowerCase();
    const matching: string[] = [];
    const missing: string[] = [];

    userSkills.forEach((skill) => {
      if (lowerJd.includes(skill.toLowerCase())) {
        matching.push(skill);
      }
    });

    const commonKeyTechs = ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'GraphQL', 'Microservices', 'TypeScript', 'PostgreSQL', 'Redis', 'Python'];
    commonKeyTechs.forEach((tech) => {
      if (lowerJd.includes(tech.toLowerCase()) && !userSkills.some(s => s.toLowerCase() === tech.toLowerCase())) {
        missing.push(tech);
      }
    });

    const score = Math.min(Math.max(Math.round((matching.length / (matching.length + missing.length + 1)) * 100), 55), 92);

    return NextResponse.json({
      matchScore: score,
      matchingSkills: matching.length > 0 ? matching : ['Problem Solving', 'Software Engineering'],
      missingSkills: missing.slice(0, 4),
      recommendations: [
        'Move matching skills to the front of your technical skills section so ATS scanners catch them immediately.',
        'Highlight your projects that utilized technologies mentioned in the job description.',
        'Emphasize collaborative problem solving and testing methodologies.',
      ],
      tailoredSummarySuggestion: `Results-focused ${targetRole || 'Software Professional'} with proven ability to build robust applications with ${matching.slice(0, 3).join(', ') || 'modern frameworks'}. Dedicated to engineering clean, maintainable systems and driving scalable technical solutions.`,
    });
  } catch (error: any) {
    console.error('API Tailor Job Error:', error);
    return NextResponse.json(
      { error: 'Failed to tailor job: ' + (error?.message || 'Internal Server Error') },
      { status: 500 }
    );
  }
}
