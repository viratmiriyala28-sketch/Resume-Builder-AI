import { NextRequest, NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL, isGeminiConfigured } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      jobTitle,
      targetRole,
      education,
      skills,
      experienceSummary,
      projectsSummary,
    } = await req.json();

    if (isGeminiConfigured() && genAI) {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: {
          temperature: 0.3,
        },
      });

      const prompt = `
You are an expert resume writer.
Write a professional, impactful 3-4 sentence resume summary / profile statement for a candidate with the following verified credentials:

Candidate Name: ${fullName || 'Candidate'}
Current/Target Role: ${targetRole || jobTitle || 'Software Engineer'}
Skills: ${(skills || []).join(', ') || 'Software Development, Problem Solving'}
Education: ${JSON.stringify(education || [])}
Work Experience: ${experienceSummary || 'None provided / Early Career'}
Projects: ${projectsSummary || 'Various technical projects'}

RULES:
1. Never invent fake degrees, fake companies, or fake metrics.
2. Focus on candidate's proven strengths in software engineering, technical problem solving, and ability to deliver scalable solutions.
3. Keep it between 40 and 70 words.
4. Output ONLY the summary paragraph with no greetings, titles, or quotes.
`;

      const response = await model.generateContent(prompt);
      const summaryText = response.response.text().trim();
      return NextResponse.json({ summary: summaryText });
    }

    // Heuristic fallback
    const role = targetRole || jobTitle || 'Software Engineer';
    const skillsList = (skills && skills.length > 0) ? skills.slice(0, 4).join(', ') : 'modern software technologies';
    const fallbackSummary = `Results-oriented ${role} with practical experience building scalable applications using ${skillsList}. Adept at translating complex requirements into reliable code and eager to contribute strong technical fundamentals to high-impact engineering teams.`;

    return NextResponse.json({ summary: fallbackSummary });
  } catch (error: any) {
    console.error('API Generate Summary Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary: ' + (error?.message || 'Internal Server Error') },
      { status: 500 }
    );
  }
}
