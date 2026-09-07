import { one } from "@/lib/format";
import type { ChainNarrator, NarratorAssessment } from "@/lib/types";

const ILLUSTRATIVE_CITATION = /illustrative/i;

const STATUS_RANK: Record<string, number> = {
  sahih: 100,
  hasan_sahih: 95,
  sahih_li_ghayrihi: 90,
  hasan: 80,
  muwaththaq: 75,
  qawi: 70,
  mashhur: 50,
  not_graded: 10,
  daif: 5,
  daeef: 5,
  mawdu: 0,
};

export type TransmissionRole = "teacher" | "current" | "student" | "collector";

export type TransmissionNodeView = {
  role: TransmissionRole;
  name: string;
  slug: string | null;
  rawName: string;
  detail: string | null;
};

export type TransmissionStrip = {
  chainId: number;
  nodes: TransmissionNodeView[];
};

export type ChainCandidate = {
  chainId: number;
  nodes: ChainNarrator[];
  currentNarratorId: number;
  hadithStatus: string | null;
  citedAssessmentCount: number;
};

export function hasSourcedCitation(row: {
  reference_book?: string | null;
  source_url?: string | null;
}): boolean {
  const book = row.reference_book?.trim() ?? "";
  const url = row.source_url?.trim() ?? "";
  if (!book && !url) return false;
  if (book && ILLUSTRATIVE_CITATION.test(book)) return false;
  return true;
}

export function filterSourcedAssessments(assessments: NarratorAssessment[]): NarratorAssessment[] {
  return assessments.filter(hasSourcedCitation);
}

export function meanDisplayScore(assessments: NarratorAssessment[]): number | null {
  const scores = assessments
    .map((row) => row.display_score)
    .filter((score): score is number => typeof score === "number" && Number.isFinite(score));
  if (!scores.length) return null;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function mappedReliabilityLabel(score: number): string {
  if (score >= 90) return "Strongly reliable";
  if (score >= 75) return "Reliable";
  if (score >= 50) return "Mixed assessments";
  if (score >= 25) return "Weak";
  return "Very weak";
}

export function countMatchedNeighbors(nodes: ChainNarrator[], currentNarratorId: number): number {
  return nodes.filter((node) => {
    if (node.narrator_id === currentNarratorId) return false;
    return Boolean(node.narrator_id && one(node.narrators)?.slug);
  }).length;
}

export function pickRepresentativeChain(candidates: ChainCandidate[]): ChainCandidate | null {
  if (!candidates.length) return null;
  return [...candidates].sort((a, b) => {
    const neighborDelta = countMatchedNeighbors(b.nodes, b.currentNarratorId) - countMatchedNeighbors(a.nodes, a.currentNarratorId);
    if (neighborDelta !== 0) return neighborDelta;
    const gradeDelta = variationGradeRank(b.hadithStatus, b.citedAssessmentCount) - variationGradeRank(a.hadithStatus, a.citedAssessmentCount);
    if (gradeDelta !== 0) return gradeDelta;
    return a.chainId - b.chainId;
  })[0];
}

export function buildTransmissionStrip(candidate: ChainCandidate): TransmissionStrip | null {
  const sorted = [...candidate.nodes].sort((a, b) => a.position - b.position);
  const current = sorted.find((node) => node.narrator_id === candidate.currentNarratorId);
  if (!current) return null;

  const teacher = sorted.find((node) => node.position === current.position - 1);
  const student = sorted.find((node) => node.position === current.position + 1);
  const collector = sorted[sorted.length - 1];

  const nodes: TransmissionNodeView[] = [];
  if (teacher) nodes.push(toView("teacher", teacher));
  nodes.push(toView("current", current));
  if (student && student.id !== current.id) nodes.push(toView("student", student));
  if (collector && collector.id !== current.id) nodes.push(toView("collector", collector));

  return { chainId: candidate.chainId, nodes };
}

function variationGradeRank(status: string | null, citedAssessmentCount: number): number {
  const rank = STATUS_RANK[(status ?? "").toLowerCase()] ?? 0;
  return rank * 1000 + citedAssessmentCount;
}

function toView(role: TransmissionRole, node: ChainNarrator): TransmissionNodeView {
  const narrator = one(node.narrators);
  return {
    role,
    name: narrator?.name ?? node.raw_name,
    slug: narrator?.slug ?? null,
    rawName: node.raw_name,
    detail: narrator?.generation ?? narrator?.region ?? null,
  };
}
