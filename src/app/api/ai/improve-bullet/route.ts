import { NextRequest, NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL, isGeminiConfigured } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { bullet, targetRole, contextTitle } = await req.json();

    if (!bullet || typeof bullet !== 'string') {
      return NextResponse.json({ error: 'Bullet text is required.' }, { status: 400 });
    }

    if (isGeminiConfigured() && genAI) {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: {
          temperature: 0.3,
        },
      });

      const prompt = `
You are an expert executive resume editor and career coach.
Rewrite the following resume bullet point to make it concise, impactful, and ATS-optimized using the STAR framework (Strong Action Verb + Context + Outcome).

Context/Role: ${contextTitle || 'Software Professional'}
Target Role: ${targetRole || 'Software Engineer'}
Original bullet: "${bullet}"

RULES:
1. Start with a compelling past-tense action verb (e.g., Architected, Engineered, Streamlined, Spearheaded, Deployed).
2. NEVER invent fake percentages, metrics, dollar values, or certifications.
3. If the user mentions existing metrics or outcomes, preserve them. If not, focus on tangible technical impact (e.g., improved maintainability, reduced query latency, streamlined deployment).
4. Return ONLY the improved single bullet point sentence without quotation marks, bullet symbols, or intro/outro explanations.
`;

      const response = await model.generateContent(prompt);
      const improved = response.response.text().trim().replace(/^[-*•]\s*/, '');
      return NextResponse.json({ improvedBullet: improved });
    }

    // Heuristic fallback if Gemini API is not yet provided
    const actionVerbs = ['Architected', 'Engineered', 'Spearheaded', 'Developed and deployed', 'Optimized'];
    const chosenVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const cleaned = bullet.replace(/^(I |We |Worked on |Helped with )/i, '');
    const fallbackImproved = `${chosenVerb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, ensuring high performance, modular architecture, and adherence to clean code standards.`;

    return NextResponse.json({ improvedBullet: fallbackImproved });
  } catch (error: any) {
    console.error('API Improve Bullet Error:', error);
    return NextResponse.json(
      { error: 'Failed to improve bullet: ' + (error?.message || 'Internal Server Error') },
      { status: 500 }
    );
  }
}
