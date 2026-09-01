import { formatStatus, statusTone } from "@/lib/format";

export function EvidenceStatuses({
  hadithStatus,
  chainStatus,
  narrationStatus,
  notes,
}: {
  hadithStatus: string;
  chainStatus: string;
  narrationStatus: string[];
  notes?: string | null;
}) {
  return (
    <>
      <div className="status-help">
        <b>Three separate merits:</b> overall verdict · isnad condition · transmission/attribution class. These are not
        merged into a consensus grade.
      </div>
      <div className="status-grid">
        <StatusCard
          label="Hadith status"
          value={formatStatus(hadithStatus)}
          tone={statusTone(hadithStatus)}
          detail="Named scholarly verdict for this exact source occurrence only."
        />
        <StatusCard
          label="Chain status"
          value={formatStatus(chainStatus)}
          tone={statusTone(chainStatus)}
          detail="Condition of this variation’s isnad, not of the whole cluster."
        />
        <StatusCard
          label="Narration status"
          value={narrationStatus.length ? narrationStatus.map(formatStatus).join(" · ") : "Unspecified"}
          tone={narrationStatus.length ? "ok" : "neutral"}
          detail={notes || "Transmission and attribution class recorded for this occurrence."}
        />
      </div>
    </>
  );
}

function StatusCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "ok" | "pending" | "neutral";
}) {
  return (
    <div className={`status-card ${tone === "ok" ? "" : tone}`.trim()}>
      <span className="label">{label}</span>
      <div className="status-value">
        <span className="status-mark" />
        {value}
      </div>
      <p>{detail}</p>
    </div>
  );
}
