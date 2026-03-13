"use client";

import { BookOutlined, SafetyCertificateOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Collapse, Steps, Tag } from "antd";

const steps = [
  {
    title: "Text parsing",
    description: "Sentence boundaries, tokenization, and syllable estimation.",
  },
  {
    title: "Metric scoring",
    description: "Readability, structure signals, and coherence transitions.",
  },
  {
    title: "Feedback synthesis",
    description: "Strengths and targeted rewrite suggestions.",
  },
  {
    title: "Explainability",
    description: "Clear output with transparent criteria.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-7 px-4 py-8 md:py-10">
      <section className="glass rounded-3xl p-7 md:p-10">
        <Tag color="cyan" className="mb-3">
          MODEL TRANSPARENCY
        </Tag>
        <h1 className="text-4xl leading-tight font-semibold md:text-5xl">Scoring Methodology and Ethics Notes</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-lg">
          Admissions reviewers can inspect how results are calculated, what assumptions are made, and
          where limitations remain.
        </p>
      </section>

      <Card title="Scoring pipeline">
        <Steps direction="vertical" current={3} items={steps} />
      </Card>

      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: (
              <span className="inline-flex items-center gap-2">
                <SettingOutlined />
                Weighting strategy
              </span>
            ),
            children:
              "Overall score combines readability (35%), structure (35%), and coherence (30%) for balanced writing quality assessment.",
          },
          {
            key: "2",
            label: (
              <span className="inline-flex items-center gap-2">
                <BookOutlined />
                Key limitations
              </span>
            ),
            children:
              "Current prototype does not evaluate factual correctness or citation quality. It focuses on linguistic and structural clarity.",
          },
          {
            key: "3",
            label: (
              <span className="inline-flex items-center gap-2">
                <SafetyCertificateOutlined />
                Responsible use
              </span>
            ),
            children:
              "Outputs are decision-support signals, not final grading decisions. Human review remains necessary for admissions or academic scoring.",
          },
        ]}
      />
    </main>
  );
}
