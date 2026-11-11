import { NextRequest, NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL, isGeminiConfigured } from '@/lib/gemini';
import { generateId } from '@/lib/utils';
import { ResumeData } from '@/types/resume';

export async function POST(req: NextRequest) {
  try {
    const { prompt, existingResume } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    // If Gemini is configured, use Gemini 1.5 Flash with structured JSON
    if (isGeminiConfigured() && genAI) {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2, // Low temperature for high factual accuracy
        },
      });

      const systemInstruction = `
You are the ResumeAI Intelligent Parser.
Your job is to analyze the user's natural language self-description and extract structured resume data.

CRITICAL RULES:
1. NEVER invent degrees, institutions, work experience, certifications, achievements, skills, or metrics.
2. If the user mentions incomplete information (e.g. "I built a project" but doesn't name tech stack), include the project with available details and formulate a polite question in followUpQuestions.
3. Return STRICT JSON matching this schema:
{
  "message": "Friendly confirmation message explaining what was extracted",
  "followUpQuestions": ["Clarifying question 1", "Clarifying question 2"],
  "extractedData": {
    "personalInfo": {
      "fullName": "",
      "jobTitle": "",
      "email": "",
      "phone": "",
      "location": "",
      "linkedIn": "",
      "github": "",
      "portfolio": ""
    },
    "summary": {
      "content": "",
      "careerObjective": ""
    },
    "education": [
      {
        "id": "edu-unique",
        "institution": "",
        "degree": "",
        "fieldOfStudy": "",
        "startDate": "",
        "endDate": "",
        "current": false,
        "gpaOrPercentage": "",
        "relevantCoursework": []
      }
    ],
    "technicalSkills": {
      "languages": [],
      "frameworks": [],
      "databases": [],
      "tools": [],
      "other": []
    },
    "softSkills": [],
    "workExperience": [
      {
        "id": "exp-unique",
        "company": "",
        "position": "",
        "location": "",
        "startDate": "",
        "endDate": "",
        "current": false,
        "bullets": []
      }
    ],
    "projects": [
      {
        "id": "proj-unique",
        "title": "",
        "description": "",
        "technologies": [],
        "link": "",
        "bullets": []
      }
    ],
    "achievements": [
      {
        "id": "ach-unique",
        "title": "",
        "description": "",
        "date": ""
      }
    ],
    "certifications": [
      {
        "id": "cert-unique",
        "name": "",
        "issuer": "",
        "issueDate": "",
        "credentialUrl": ""
      }
    ],
    "additionalInfo": {
      "languages": [],
      "volunteerExperience": [],
      "extracurriculars": [],
      "interests": []
    }
  }
}
Only populate fields that the user mentioned or clearly referenced. Omit empty arrays or leave strings blank if not mentioned.
`;

      const promptPayload = `User Natural Language Input: "${prompt}"`;
      const response = await model.generateContent([systemInstruction, promptPayload]);
      const responseText = response.response.text();

      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed);
    }

    // Heuristic Fallback Parser if API key is not yet configured
    const fallbackExtraction: Partial<ResumeData> = {
      technicalSkills: {
        languages: [],
        frameworks: [],
        databases: [],
        tools: [],
        other: [],
      },
      education: [],
      projects: [],
      workExperience: [],
      softSkills: [],
    };

    const followUpQuestions: string[] = [];

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matchesWord = (text: string, term: string) => {
      const pattern = new RegExp(`(^|[^a-zA-Z0-9+#])${escapeRegExp(term)}($|[^a-zA-Z0-9+#])`, 'i');
      return pattern.test(text);
    };

    // Extract common programming languages
    const knownLangs = ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'SQL', 'Go', 'Rust', 'HTML', 'CSS'];
    knownLangs.forEach((lang) => {
      if (matchesWord(prompt, lang)) {
        fallbackExtraction.technicalSkills?.languages.push(lang);
      }
    });

    // Extract frameworks
    const knownFrameworks = ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'Django', 'Spring', 'Flask'];
    knownFrameworks.forEach((fw) => {
      if (matchesWord(prompt, fw)) {
        fallbackExtraction.technicalSkills?.frameworks.push(fw);
      }
    });

    // Extract databases
    const knownDbs = ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite'];
    knownDbs.forEach((db) => {
      if (matchesWord(prompt, db)) {
        fallbackExtraction.technicalSkills?.databases.push(db);
      }
    });

    // Extract student / education hints
    if (/student|undergraduate|final-year|senior|bachelor|b\.s|b\.tech/i.test(prompt)) {
      fallbackExtraction.education?.push({
        id: generateId('edu'),
        institution: 'University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2022',
        endDate: '2026',
        current: true,
        gpaOrPercentage: '',
        relevantCoursework: [],
      });
      followUpQuestions.push('What is the official name of your college or university?');
      followUpQuestions.push('Do you have a current GPA or percentage you would like to include?');
    }

    if (/project/i.test(prompt)) {
      followUpQuestions.push('What was the name and main purpose of your project?');
    }

    return NextResponse.json({
      message: 'Extracted skills and educational background from your description.',
      followUpQuestions,
      extractedData: fallbackExtraction,
    });
  } catch (error: any) {
    console.error('API Parse Prompt Error:', error);
    return NextResponse.json(
      { error: 'Failed to parse prompt: ' + (error?.message || 'Internal Server Error') },
      { status: 500 }
    );
  }
}
