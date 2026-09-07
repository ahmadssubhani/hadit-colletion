import Link from "next/link";
import type { TransmissionStrip } from "@/lib/narrator-evidence";

const ROLE_LABEL: Record<TransmissionStrip["nodes"][number]["role"], string> = {
  teacher: "Teacher",
  current: "This narrator",
  student: "Student",
  collector: "Collector",
};

export function TransmissionStripView({ strip }: { strip: TransmissionStrip }) {
  return (
    <div className="chain-wrap">
      <div className="chain compact">
        {strip.nodes.map((node, index) => {
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
              {node.slug ? (
                <Link className={`node${node.role === "current" ? " current" : ""}`} href={`/narrators/${node.slug}`}>
                  {content}
                </Link>
              ) : (
                <div className={`node${node.role === "current" ? " current" : ""}`}>{content}</div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
