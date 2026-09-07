"use client";

import { useState } from "react";
import Link from "next/link";
import { formatAhYear } from "@/lib/format";
import { mappedReliabilityLabel, type TransmissionStrip } from "@/lib/narrator-evidence";
import type { Narrator } from "@/lib/types";

const ROLE_LABEL: Record<TransmissionStrip["nodes"][number]["role"], string> = {
  teacher: "Teacher",
  current: "Current profile",
  student: "Student",
  collector: "Collector",
};

export function TransmissionEvidence({
  transmission,
  narrator,
  mappedScore,
  scoredCount,
  reportsIndexed,
}: {
  transmission: TransmissionStrip | null;
  narrator: Narrator;
  mappedScore: number | null;
  scoredCount: number;
  reportsIndexed: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="transmission-evidence-group">
      {transmission ? (
        <div 
          className="chain-wrap" 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ cursor: "pointer", transition: "0.2s" }}
        >
          <div className="chain compact">
            {transmission.nodes.map((node, index) => {
              const content = (
                <>
                  <small className="node-role">{ROLE_LABEL[node.role]}</small>
                  <b>{node.name}</b>
                  <small>{node.detail ?? (node.slug ? "Recorded narrator" : "Name in chain")}</small>
                </>
              );
              return (
                <span key={`${node.role}-${node.rawName}-${index}`} style={{ display: "contents" }}>
                  {index > 0 ? <span className="arrow" /> : null}
                  {node.slug && node.role !== "current" ? (
                    <Link 
                      className="node"
                      href={`/narrators/${node.slug}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={`node${node.role === "current" ? " current" : ""}`}>
                      {content}
                    </div>
                  )}
                </span>
              );
            })}
          </div>
          {!isOpen && (
            <div style={{ textAlign: "center", marginTop: 12, color: "var(--muted)", fontSize: 14 }}>
              Click chain to view evidence summary
            </div>
          )}
        </div>
      ) : (
        <p className="notice">No verified isnad nodes are recorded for this narrator yet.</p>
      )}

      {isOpen && (
        <div className="evidence-expanded" style={{ marginTop: 24, animation: "fadeIn 0.3s ease" }}>
          <div 
            className="score-card" 
            style={{ 
              padding: '36px 20px', 
              borderRadius: '16px', 
              marginBottom: '24px',
              backgroundColor: 'var(--green)'
            }}
          >
            {mappedScore !== null ? (
              <>
                <div className="label" style={{ letterSpacing: '0.15em', fontSize: 12, color: '#ffffffb8' }}>EVIDENCE SUMMARY</div>
                <div className="score-ring" style={{ width: 92, height: 92, margin: '16px auto', borderRadius: '50%', border: '7px solid #ffffff42', display: 'grid', placeItems: 'center', font: '700 28px var(--font-serif)', color: '#fff' }}>
                  {mappedScore}
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#fff' }}>{mappedReliabilityLabel(mappedScore)}</h3>
                <div className="meta" style={{ color: '#ffffffb8', fontSize: 14 }}>{scoredCount} mapped assessment{scoredCount === 1 ? "" : "s"}</div>
              </>
            ) : (
              <>
                <div className="label" style={{ color: '#ffffffb8' }}>EVIDENCE SUMMARY</div>
                <h3 style={{ margin: '16px 0 4px', fontSize: 20, color: '#fff' }}>Identity on record</h3>
                <div className="meta" style={{ color: '#ffffffb8' }}>No sourced display scores are attached to this profile.</div>
              </>
            )}
          </div>

          <div className="evidence-summary-body" style={{ padding: '0 8px' }}>
            <div className="label" style={{ marginBottom: 16 }}>Identity</div>
            <div className="fact">
              <span className="label">Died</span>
              <b>{formatAhYear(narrator.death_year_ah)}</b>
            </div>
            <div className="fact">
              <span className="label">Region</span>
              <b>{narrator.region || "Not recorded"}</b>
            </div>
            <div className="fact">
              <span className="label">Reports indexed</span>
              <b>{reportsIndexed}</b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

