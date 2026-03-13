"use client";

import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Table, Tag } from "antd";

const historyRows = [
  {
    key: "1",
    timestamp: "2026-03-12 18:25",
    title: "Urban mobility policy essay",
    overall: 83,
    readability: 79,
    structure: 88,
    coherence: 82,
    status: "Approved",
  },
  {
    key: "2",
    timestamp: "2026-03-11 16:03",
    title: "Climate adaptation draft",
    overall: 71,
    readability: 66,
    structure: 74,
    coherence: 72,
    status: "Needs revision",
  },
  {
    key: "3",
    timestamp: "2026-03-10 09:11",
    title: "Education equity response",
    overall: 77,
    readability: 73,
    structure: 80,
    coherence: 78,
    status: "Approved",
  },
];

const columns = [
  { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
  { title: "Essay", dataIndex: "title", key: "title" },
  { title: "Overall", dataIndex: "overall", key: "overall", render: (value: number) => `${value}/100` },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <Tag color={value === "Approved" ? "green" : "orange"}>{value}</Tag>
    ),
  },
];

export default function HistoryPage() {
  const avgScore = Math.round(historyRows.reduce((sum, row) => sum + row.overall, 0) / historyRows.length);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-7 px-4 py-8 md:py-10">
      <section className="glass rounded-3xl p-7 md:p-10">
        <h1 className="text-4xl leading-tight font-semibold md:text-5xl">Analysis History and Progress Tracking</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-lg">
          This section demonstrates repeat usage patterns and score growth across multiple essay drafts.
        </p>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Average score" extra={<CheckCircleOutlined />}>
            <Progress percent={avgScore} strokeColor="var(--accent)" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Approved drafts" extra={<CheckCircleOutlined />}>
            <p className="text-3xl font-semibold">{historyRows.filter((row) => row.status === "Approved").length}</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Recent analyses" extra={<ClockCircleOutlined />}>
            <p className="text-3xl font-semibold">{historyRows.length}</p>
          </Card>
        </Col>
      </Row>

      <Card title="Analysis log">
        <Table columns={columns} dataSource={historyRows} pagination={false} scroll={{ x: 740 }} />
      </Card>
    </main>
  );
}
