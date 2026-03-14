"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  CircleAlert,
  Gauge,
  Lightbulb,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { analyzeEssay } from "@/lib/analyze";

interface EssayAnalysis {
  overallScore: number;
  readabilityScore: number;
  structureScore: number;
  coherenceScore: number;
  wordCount: number;
  sentenceCount: number;
  averageSentenceLength: number;
  topKeywords: string[];
  strengths: string[];
  suggestions: string[];
}

const sampleText = `In this essay, I argue that public transportation investment can improve both social equity and climate resilience in growing cities. When reliable transit is available, students and workers from lower-income neighborhoods gain better access to education and employment. Moreover, cities can lower road congestion and reduce emissions by shifting trips from private cars to buses and trains. However, transit policy cannot succeed through infrastructure alone. It also requires affordable ticketing, real-time information systems, and neighborhood-level route planning. Therefore, urban governments should align transport planning with housing policy and digital services. In conclusion, transit is not only a mobility tool but also a long-term strategy for inclusive urban development.`;

function scoreLabel(score: number): string {
  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 65) {
    return "Strong";
  }

  if (score >= 50) {
    return "Developing";
  }

  return "Needs revision";
}

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<EssayAnalysis | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const summaryStats = useMemo(
    () =>
      result
        ? [
            { label: "Overall", value: `${result.overallScore}/100`, icon: Gauge, color: "var(--accent)" },
            {
              label: "Readability",
              value: `${result.readabilityScore}/100`,
              icon: NotebookPen,
              color: "var(--accent-2)",
            },
            {
              label: "Structure",
              value: `${result.structureScore}/100`,
              icon: Sparkles,
              color: "var(--accent-3)",
            },
            {
              label: "Coherence",
              value: `${result.coherenceScore}/100`,
              icon: Brain,
              color: "var(--accent)",
            },
          ]
        : [],
    [result],
  );

  async function handleAnalyze() {
    const normalizedText = text.trim();

    setError("");
    setIsLoading(true);
    if (normalizedText.length < 80) {
      setResult(null);
      setError("Please provide at least 80 characters for a meaningful analysis.");
      setIsLoading(false);
      return;
    }

    setResult(analyzeEssay(normalizedText));
    setIsLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-7 px-5 py-8 md:px-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="glass relative overflow-hidden rounded-3xl p-7 md:p-10"
      >
        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[var(--accent)]/22 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-4 h-56 w-56 rounded-full bg-[var(--accent-2)]/22 blur-3xl" />

        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--surface-solid)] px-3 py-1 text-xs font-semibold tracking-[0.17em] text-[var(--accent)] uppercase">
          <Brain size={14} />
          Essay Insight AI
        </p>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
          Analyze essays with transparent, admissions-ready feedback
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-lg">
          This NLP prototype scores readability, structure, and coherence, then explains why each
          suggestion appears. Perfect for showcasing practical AI engineering in your portfolio.
        </p>
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass rounded-3xl p-6"
        >
          <h2 className="text-2xl font-semibold">Essay input</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Paste your draft (at least 80 characters), then run analysis.
          </p>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="panel mt-4 h-64 w-full rounded-2xl p-4 text-sm leading-6"
            placeholder="Paste your essay here..."
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-65"
            >
              {isLoading ? "Analyzing..." : "Run Analysis"}
            </button>
            <button
              type="button"
              onClick={() => setText(sampleText)}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-2 text-sm font-semibold"
            >
              Insert Sample Essay
            </button>
          </div>
          {error ? (
            <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-800">
              <CircleAlert size={14} />
              {error}
            </p>
          ) : null}
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="glass rounded-3xl p-6"
        >
          <h2 className="text-2xl font-semibold">Draft metrics</h2>
          {result ? (
            <div className="mt-4 space-y-3 text-sm">
              <div className="panel rounded-xl p-3">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Quality label</p>
                <p className="mt-1 text-xl font-semibold">{scoreLabel(result.overallScore)}</p>
              </div>
              <div className="panel rounded-xl p-3">
                <p>Words: {result.wordCount}</p>
                <p>Sentences: {result.sentenceCount}</p>
                <p>Average sentence length: {result.averageSentenceLength}</p>
              </div>
              <div className="panel rounded-xl p-3">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Top keywords</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.topKeywords.length ? (
                    result.topKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--accent)]"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[var(--muted)]">No keywords extracted yet.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-[var(--border)] p-4 text-sm text-[var(--muted)]">
              Results will appear here after analysis.
            </p>
          )}
        </motion.article>
      </section>

      {result ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="space-y-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryStats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="glass rounded-2xl p-5"
                >
                  <p className="text-xs tracking-wide text-[var(--muted)] uppercase">{item.label}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-semibold">{item.value}</span>
                    <Icon size={18} color={item.color} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <article className="glass rounded-3xl p-6">
              <h3 className="flex items-center gap-2 text-2xl font-semibold">
                <CheckCircle2 size={20} />
                Strengths
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {result.strengths.map((strength) => (
                  <li key={strength} className="panel rounded-xl p-3">
                    {strength}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass rounded-3xl p-6">
              <h3 className="flex items-center gap-2 text-2xl font-semibold">
                <Lightbulb size={20} />
                Suggestions
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {result.suggestions.map((suggestion) => (
                  <li key={suggestion} className="panel rounded-xl p-3">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>
      ) : null}
    </main>
  );
}
