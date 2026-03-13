"use client";

import { ArrowRightOutlined, BulbOutlined, HistoryOutlined, RobotOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Tag } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";

const modules = [
  {
    href: "/analyze",
    title: "Analyze",
    description: "Run real essay scoring with explainable recommendations.",
    icon: <RobotOutlined style={{ fontSize: 22 }} />,
  },
  {
    href: "/history",
    title: "History",
    description: "Review previous analyses and score progression.",
    icon: <HistoryOutlined style={{ fontSize: 22 }} />,
  },
  {
    href: "/methodology",
    title: "Methodology",
    description: "Inspect scoring logic, limitations, and ethics notes.",
    icon: <BulbOutlined style={{ fontSize: 22 }} />,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-7 md:p-10"
      >
        <Tag color="blue" className="mb-3">
          APPLIED NLP ADMISSIONS CASE
        </Tag>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
          Essay Insight AI has been expanded into a complete multi-page application
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-lg">
          Beyond single-screen analysis, the platform now includes exploration routes for methodology,
          analysis history, and structured portfolio storytelling.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/analyze">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Open Analyzer
            </Button>
          </Link>
          <Link href="/history">
            <Button size="large">Open History</Button>
          </Link>
          <Link href="/methodology">
            <Button size="large">Open Methodology</Button>
          </Link>
        </div>
      </motion.section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Core pages" value={4} suffix="routes" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Scoring dimensions" value={3} suffix="metrics" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="API endpoints" value={1} suffix="analysis" />
          </Card>
        </Col>
      </Row>

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module, index) => (
          <motion.div
            key={module.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card
              title={
                <span className="inline-flex items-center gap-2">
                  {module.icon}
                  {module.title}
                </span>
              }
              extra={<Link href={module.href}>Explore</Link>}
              className="h-full"
            >
              <p className="text-sm text-[var(--muted)]">{module.description}</p>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
