export interface EssayAnalysis {
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

const stopWords = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "from",
  "this",
  "have",
  "will",
  "into",
  "their",
  "your",
  "about",
  "when",
  "were",
  "which",
  "there",
  "been",
  "also",
  "because",
  "through",
  "while",
  "where",
  "being",
  "between",
  "under",
  "over",
  "than",
  "then",
  "them",
  "they",
  "such",
  "many",
  "much",
  "some",
  "only",
  "more",
  "most",
  "other",
  "very",
  "into",
  "each",
  "essay",
  "paper",
]);

function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function tokenizeWords(text: string): string[] {
  return text.match(/[A-Za-z']+/g)?.map((word) => word.toLowerCase()) ?? [];
}

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) {
    return 0;
  }

  const vowels = cleaned.match(/[aeiouy]+/g);
  let count = vowels ? vowels.length : 1;

  if (cleaned.endsWith("e") && count > 1) {
    count -= 1;
  }

  return Math.max(1, count);
}

function normalize(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function extractTopKeywords(words: string[]): string[] {
  const frequency: Record<string, number> = {};

  for (const word of words) {
    if (word.length < 4 || stopWords.has(word)) {
      continue;
    }

    frequency[word] = (frequency[word] ?? 0) + 1;
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word]) => word);
}

export function analyzeEssay(text: string): EssayAnalysis {
  const sentences = splitSentences(text);
  const words = tokenizeWords(text);

  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const averageSentenceLength = Number((wordCount / sentenceCount).toFixed(1));

  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  const flesch =
    206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * ((totalSyllables || 1) / (wordCount || 1));
  const readabilityScore = normalize(flesch);

  const introSignals = ["in this essay", "in this paper", "this study", "i argue", "this report"];
  const conclusionSignals = ["in conclusion", "to conclude", "overall", "therefore", "to sum up"];
  const transitionSignals = ["however", "therefore", "moreover", "furthermore", "for example", "in contrast"];

  const lowerText = text.toLowerCase();
  const hasIntro = introSignals.some((signal) => lowerText.includes(signal));
  const hasConclusion = conclusionSignals.some((signal) => lowerText.includes(signal));
  const transitionCount = transitionSignals.reduce(
    (count, signal) => count + lowerText.split(signal).length - 1,
    0,
  );

  const structureScore = normalize((hasIntro ? 50 : 25) + (hasConclusion ? 35 : 15) + (wordCount > 180 ? 15 : 8));
  const coherenceScore = normalize(35 + Math.min(transitionCount * 12, 36) + (averageSentenceLength <= 24 ? 24 : 12));

  const overallScore = normalize(readabilityScore * 0.35 + structureScore * 0.35 + coherenceScore * 0.3);

  const strengths: string[] = [];
  const suggestions: string[] = [];

  if (readabilityScore >= 60) {
    strengths.push("Readable sentence flow for undergraduate-level writing.");
  }

  if (hasIntro) {
    strengths.push("The draft includes a clear opening context.");
  }

  if (hasConclusion) {
    strengths.push("A concluding signal helps frame your final argument.");
  }

  if (transitionCount >= 2) {
    strengths.push("Transition markers improve paragraph-to-paragraph continuity.");
  }

  if (wordCount < 180) {
    suggestions.push("Expand the argument with one extra body paragraph and evidence.");
  }

  if (!hasIntro) {
    suggestions.push("Add an explicit thesis statement in the first 2-3 sentences.");
  }

  if (!hasConclusion) {
    suggestions.push("Add a closing section that restates your core insight.");
  }

  if (averageSentenceLength > 24) {
    suggestions.push("Break long sentences into shorter units for stronger readability.");
  }

  if (transitionCount < 2) {
    suggestions.push("Use transitions such as 'however', 'therefore', or 'for example'.");
  }

  if (!strengths.length) {
    strengths.push("The draft has a useful baseline and can improve quickly with structure edits.");
  }

  if (!suggestions.length) {
    suggestions.push("Refine word choice for precision and cite one additional source.");
  }

  return {
    overallScore,
    readabilityScore,
    structureScore,
    coherenceScore,
    wordCount,
    sentenceCount,
    averageSentenceLength,
    topKeywords: extractTopKeywords(words),
    strengths,
    suggestions,
  };
}
