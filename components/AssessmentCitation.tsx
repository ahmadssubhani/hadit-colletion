import { chainEvidenceScore, citation, formatStatus, one } from "@/lib/format";
import type { ChainAssessment, HadithAssessment, NarratorAssessment } from "@/lib/types";

export function AssessmentCitation({
  assessment,
}: {
  assessment: HadithAssessment | NarratorAssessment | ChainAssessment;
}) {
  const scholar = one(assessment.scholars);
  const isChainAssessment = "quality_status" in assessment;
  const original = "original_grade" in assessment
    ? assessment.original_grade
    : "original_term" in assessment
      ? assessment.original_term
      : formatStatus(assessment.quality_status);
  const normalized = "normalized_grade" in assessment
    ? assessment.normalized_grade
    : "normalized_term" in assessment
      ? assessment.normalized_term
      : assessment.continuity_status
        ? formatStatus(assessment.continuity_status)
        : null;
  const score = "display_score" in assessment
    ? assessment.display_score
    : isChainAssessment
      ? chainEvidenceScore(assessment.quality_status, assessment.continuity_status)
      : null;
  const cite = citation(assessment);

  return (
    <div className="assessment-row">
      <div>
        <span className="label">{scholar?.name ?? "Unattributed scholar"}</span>
        <b style={{ display: "block" }}>
          {original}
          {normalized && normalized !== original ? ` · ${normalized}` : ""}
        </b>
        <span className="meta">
          {assessment.explanation || "Attributed judgment"}
          {cite ? ` · ${cite}` : ""}
        </span>
      </div>
      {score !== null && score !== undefined ? <span className="assessment-score">{score}</span> : null}
    </div>
  );
}