import { formatAhYear } from "@/lib/format";
import { mappedReliabilityLabel } from "@/lib/narrator-evidence";
import type { Narrator } from "@/lib/types";

export function EvidenceSummary({
  narrator,
  mappedScore,
  scoredCount,
  reportsIndexed,
}: {
  narrator: Narrator;
  mappedScore: number | null;
  scoredCount: number;
  reportsIndexed: number;
}) {
  return (
    <details className="evidence-summary">
      <summary>
        {mappedScore !== null ? (
          <>
            <span className="score-ring">{mappedScore}</span>
            <div>
              <div className="label">Evidence Summary</div>
              <b>
                {mappedScore} · {mappedReliabilityLabel(mappedScore)}
              </b>
              <div className="meta">
                {scoredCount} mapped assessment{scoredCount === 1 ? "" : "s"}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="label">Evidence Summary</div>
            <b>Identity on record</b>
            <div className="meta">No sourced display scores are attached to this profile.</div>
          </div>
        )}
      </summary>
      <div className="evidence-summary-body">
        <div className="label">Identity</div>
        <div className="fact">
          <span className="label">Died</span>
          <b>{formatAhYear(narrator.death_year_ah)}</b>
        </div>
        <div className="fact">
          <span className="label">Born</span>
          <b>{formatAhYear(narrator.birth_year_ah)}</b>
        </div>
        <div className="fact">
          <span className="label">Region</span>
          <b>{narrator.region || "Not recorded"}</b>
        </div>
        <div className="fact">
          <span className="label">Generation</span>
          <b>{narrator.generation || "Not recorded"}</b>
        </div>
        <div className="fact">
          <span className="label">Name variants</span>
          <b>{narrator.alternative_names.length || "None recorded"}</b>
        </div>
        <div className="fact">
          <span className="label">Reports indexed</span>
          <b>{reportsIndexed}</b>
        </div>
      </div>
    </details>
  );
}
