"use client";

import { useState } from "react";
import Link from "next/link";
import { one } from "@/lib/format";
import { AssessmentCitation } from "@/components/AssessmentCitation";
import { chainEvidenceScore, evidenceLabel, formatStatus } from "@/lib/format";
import type { Chain } from "@/lib/types";

export function InteractiveChain({ chain }: { chain: Chain }) {
  const [isOpen, setIsOpen] = useState(false);

  const nodes = chain.chain_narrators ?? [];
  const score = chainEvidenceScore(chain.quality_status, chain.continuity_status);
  const label = evidenceLabel(score);
  const verifiedAssessments = (chain.chain_assessments ?? []).filter((row) => row.verified);

  if (!nodes.length) {
    return <p className="meta">No verified chain nodes are recorded for this source variation.</p>;
  }

  return (
    <div className="interactive-chain-group">
      <div 
        className="chain-wrap" 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: "pointer", transition: "0.2s" }}
      >
        <div className="chain compact">
          {nodes.map((node, index) => {
            const narrator = one(node.narrators);
            const content = (
              <>
                <b>{narrator?.name ?? node.raw_name}</b>
                <small>{narrator?.generation ?? narrator?.region ?? "Recorded name"}</small>
              </>
            );
            return (
              <span key={node.id} style={{ display: "contents" }}>
                {index > 0 ? <span className="arrow" /> : null}
                {narrator ? (
                  <Link 
                    className="node" 
                    href={`/narrators/${narrator.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(!isOpen);
                    }}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="node">{content}</div>
                )}
              </span>
            );
          })}
        </div>
        {!isOpen && (
          <div style={{ textAlign: "center", marginTop: 12, color: "var(--muted)", fontSize: 14 }}>
            Click any box in the chain to view evidence summary
          </div>
        )}
      </div>

      {isOpen && (
        <div className="evidence-expanded" style={{ marginTop: 24, animation: "fadeIn 0.3s ease" }}>
          <div className="card score-card" style={{ padding: '36px 20px', borderRadius: '16px', marginBottom: '24px', backgroundColor: 'var(--green)' }}>
            <div className="label" style={{ color: '#ffffffb8', letterSpacing: '0.15em', fontSize: 12 }}>EVIDENCE SUMMARY</div>
            <div className="score-ring" style={{ width: 92, height: 92, margin: '16px auto', borderRadius: '50%', border: '7px solid #ffffff42', display: 'grid', placeItems: 'center', font: '700 28px var(--font-serif)', color: '#fff' }}>
              {score ?? "–"}
            </div>
            <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#fff' }}>{label}</h3>
            <div className="meta" style={{ color: '#ffffffb8', fontSize: 14 }}>
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
            ingestion. They are not classical grades and are not a substitute for consulting a scholar&apos;s original wording.
          </p>
        </div>
      )}
    </div>
  );
}
