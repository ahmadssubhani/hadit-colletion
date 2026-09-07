import { AssessmentCitation } from "@/components/AssessmentCitation";
import { chainEvidenceScore, evidenceLabel, formatStatus } from "@/lib/format";
import type { Chain } from "@/lib/types";

export function ChainEvidenceSummary({ chain }: { chain: Chain }) {
  const score = chainEvidenceScore(chain.quality_status, chain.continuity_status);
  const label = evidenceLabel(score);
  const verifiedAssessments = (chain.chain_assessments ?? []).filter((row) => row.verified);

  return (
    <details className="evidence-popup">
      <summary className="evidence-popup-trigger">
        <span>View evidence summary for this chain</span>
        <span className="chev" aria-hidden="true">▾</span>
      </summary>
      <div className="evidence-popup-body">
        <div className="card score-card">
          <div className="label">Evidence summary</div>
          <div className="score-ring">{score ?? "–"}</div>
          <b>{label}</b>
          <div className="meta">
            {chain.verified ? "Chain verified during ingestion" : "Chain not yet verified"}
            {" · "}
            {verifiedAssessments.length} mapped assessment{verifiedAssessments.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 20 }}>
          <div>
            <div className="eyebrow">Rijal analysis</div>
            <h3 className="title" style={{ fontSize: 20 }}>
              What individual scholars said
            </h3>
          </div>
        </div>

        {verifiedAssessments.length ? (
          <div className="card">
            {verifiedAssessments.map((assessment) => (
              <AssessmentCitation key={assessment.id} assessment={assessment} />
            ))}
          </div>
        ) : (
          <p className="notice">
            No verified scholarly assessments of this specific chain have been ingested yet. The status above reflects
            {" "}
            {formatStatus(chain.quality_status)} / {formatStatus(chain.continuity_status)} recorded on the chain itself.
          </p>
        )}
        <p className="score-note">
          Display scores are transparent editorial mappings of the continuity and quality statuses recorded during
          ingestion. They are not classical grades and are not a substitute for consulting a scholar's original wording.
        </p>
      </div>
    </details>
  );
}