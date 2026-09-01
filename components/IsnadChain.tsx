import Link from "next/link";
import type { ChainNarrator } from "@/lib/types";
import { one } from "@/lib/format";

export function IsnadChain({ nodes }: { nodes: ChainNarrator[] }) {
  if (!nodes.length) {
    return <p className="meta">No verified chain nodes are recorded for this source variation.</p>;
  }

  return (
    <div className="chain-wrap">
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
                <Link className="node" href={`/narrators/${narrator.slug}`}>
                  {content}
                </Link>
              ) : (
                <div className="node">{content}</div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
