# ResumeAI — AI-Powered Intelligent Resume Builder

ResumeAI is an intelligent, full-stack resume builder designed to help students, fresh graduates, and experienced professionals create high-impact, ATS-optimized resumes in minutes.

---

## 🌟 Key Features

1. **Hybrid Input Engine:**
   - **Natural Language Prompt:** Speak freely in plain English (e.g., *"I'm a final-year CS student with a 3.8 GPA. I built a Next.js code review app..."*). The AI extracts and organizes fields into the appropriate resume sections.
   - **Structured 10-Section Forms:** Dedicated modular editors for Personal Info, Summary, Education, Tech Skills, Soft Skills, Work Experience, Projects, Certifications, Achievements, and Additional Info.
   - **Follow-Up Questions:** If your prompt is incomplete, the AI asks targeted clarifying questions instead of hallucinating details.

2. **Strict Anti-Hallucination Guardrails:**
   - The AI **never** fabricates fake companies, degrees, dates, GPA, or metrics.
   - Real-world action verb framing with the **STAR methodology** (Situation, Task, Action, Result).

3. **5 Recruiter-Approved ATS Templates:**
   - **Minimalist Professional:** Clean, high ATS pass rate.
   - **Modern Corporate:** Sophisticated executive header with accent borders.
   - **ATS Traditional:** Classic single-column serif design with standard headings.
   - **Student & Fresher:** Prioritizes education, academic projects, and coursework above work history.
   - **Creative Tech:** Developer-centric layout with skill badges and modern sidebar.

4. **Live Split-Screen Studio:**
   - Live canvas preview with zoom controls.
   - Section reordering (move any section up/down).
   - Section visibility toggling (hide sections you don't need).
   - Accent color palette selector (7 modern themes).
   - Font switcher (Inter Sans, Merriweather Serif, JetBrains Mono).
   - One-click sample loaders (Student Sample, Experienced Pro Sample, or Blank).

5. **Job Description Tailoring Assistant:**
   - Paste any target Job Description (JD).
   - Calculates ATS keyword match score.
   - Highlights matching vs. missing qualifications.
   - Generates a targeted summary aligned specifically with the job requirements.

6. **High-Fidelity PDF & JSON Export:**
   - **Direct PDF Download:** High-resolution vector PDF formatted to standard Letter / A4 paper.
   - **Print Engine:** Native browser vector printing for 100% selectable text.
   - **Backup & Restore:** Full JSON export and import with zero data loss.

---

## 🚀 Running the Application

### 1. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- Landing Page: `http://localhost:3000`
- Resume Studio / Editor: `http://localhost:3000/builder`

### 2. Optional: Configure Google Gemini API (Free Tier)
ResumeAI includes intelligent built-in fallback parsers and heuristic engines that work immediately without any setup.

To enable advanced Gemini AI capabilities:
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Open `.env.local` and add:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
3. Restart the dev server.

---

## 📁 Project Architecture

```
ResumeAI/
├── src/
│   ├── app/
│   │   ├── page.tsx               # SaaS Landing Page
│   │   ├── builder/page.tsx       # Resume Builder Studio
│   │   └── api/ai/                # Server-Side AI API Routes
│   │       ├── parse-prompt/      # NL Prompt Extractor
│   │       ├── improve-bullet/    # STAR Bullet Improver
│   │       ├── generate-summary/  # Professional Summary Generator
│   │       └── tailor-job/        # JD Matcher & Optimizer
│   ├── components/
│   │   ├── landing/               # Hero, HowItWorks, Features, Templates, FAQ, Footer
│   │   ├── builder/               # HybridInput, FormEditor, Toolbar, Modals
│   │   │   └── sections/          # 10 Modular section forms
│   │   ├── templates/             # 5 ATS-Optimized Templates
│   │   └── common/                # TagInput, BulletListInput
│   ├── store/
│   │   └── useResumeStore.ts      # Zustand Store + LocalStorage Sync
│   ├── types/
│   │   └── resume.ts              # Complete TypeScript interfaces
│   └── lib/
│       ├── gemini.ts              # Gemini SDK client
│       ├── sampleData.ts          # Student & Pro presets
│       └── utils.ts               # ID & class helper utilities
```
