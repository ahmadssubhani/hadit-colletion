import { citation, one } from "@/lib/format";
import type { HadithAssessment, NarratorAssessment } from "@/lib/types";

export function AssessmentCitation({
  assessment,
}: {
  assessment: HadithAssessment | NarratorAssessment;
}) {
  const scholar = one(assessment.scholars);
  const original = "original_grade" in assessment ? assessment.original_grade : assessment.original_term;
  const normalized = "normalized_grade" in assessment ? assessment.normalized_grade : assessment.normalized_term;
  const score = "display_score" in assessment ? assessment.display_score : null;
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
