# Essay Insight AI

Essay Insight AI is a multi-page NLP-inspired web app that evaluates essay drafts and returns explainable feedback across readability, structure, and coherence.

Live: https://essay.rollsev.work

## Why this project exists

Students often receive slow and vague feedback. This project demonstrates a transparent scoring pipeline that produces understandable feedback, not just a black-box number.

## Product goals

- Provide fast draft-level feedback
- Explain score composition clearly
- Track historical analysis quality
- Present methodology for academic review

## Pages and user flows

- `/` Overview
  - Product context and route map
- `/analyze`
  - Submit essay text and get immediate scoring + suggestions
- `/history`
  - Review sample analysis records and score progression
- `/methodology`
  - Explain pipeline stages and scoring logic

## API surface

### `POST /api/analyze`
Analyzes essay text and returns score payload.

Input:
```json
{ "text": "...minimum 80 characters..." }
```

Validation:
- Requires text length >= 80 characters

Output:
- `overallScore`
- `readabilityScore`
- `structureScore`
- `coherenceScore`
- `wordCount`, `sentenceCount`, `averageSentenceLength`
- `topKeywords`
- `strengths`
- `suggestions`

## Scoring logic (implemented)

From `src/lib/analyze.ts`:
- Readability uses a Flesch-style formula approximation
- Structure checks intro/conclusion signals and document length
- Coherence uses transition-signal density and sentence-length behavior
- Overall score weighting:
  - Readability: `35%`
  - Structure: `35%`
  - Coherence: `30%`

## Explainability design

The analyzer returns explicit strengths and suggestions, e.g.:
- missing thesis signal
- missing conclusion signal
- too-long average sentence length
- weak transition usage

## UI / UX stack

- Ant Design (`Card`, `Table`, `Steps`, `Collapse`, `Statistic`, `Tag`)
- Framer Motion for transitions
- Tailwind CSS styling layer

## Technical stack

- Next.js 16 (App Router + Route Handlers)
- TypeScript
- Tailwind CSS 4
- Ant Design
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

- Deployed on Railway
- Public domain: `essay.rollsev.work`

## Portfolio value

This project demonstrates explainable AI-style product design: transparent metrics, actionable feedback, and methodology-first communication.

## Roadmap

- Add draft persistence with user accounts
- Add rubric customization by essay type
- Add plagiarism and citation helper integrations
