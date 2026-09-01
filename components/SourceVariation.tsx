import { bookInitial, formatList } from "@/lib/format";
import { AssessmentCitation } from "@/components/AssessmentCitation";
import { EvidenceStatuses } from "@/components/EvidenceStatuses";
import { IsnadChain } from "@/components/IsnadChain";
import type { SourceVariationDetail } from "@/lib/types";

export function SourceVariation({ variation, defaultOpen = false }: { variation: SourceVariationDetail; defaultOpen?: boolean }) {
  const book = variation.books;
  const citationParts = [
    book?.title,
    variation.chapter,
    variation.hadith_number ? `Hadith ${variation.hadith_number}` : null,
    variation.volume ? `vol. ${variation.volume}` : null,
    variation.page ? `p. ${variation.page}` : null,
  ].filter(Boolean);

  return (
    <details className="variant" open={defaultOpen}>
      <summary>
        <div className="variant-title">
          <span className="source-icon">{bookInitial(book?.title ?? "S")}</span>
          <div>
            <div className="tradition">{book?.tradition ?? "Unclassified"} · {book?.book_type?.replace(/_/g, " ")}</div>
            <h3>{citationParts[0] ?? "Untitled source"}</h3>
            <div className="meta">{citationParts.slice(1).join(" · ") || "Reference not recorded"}</div>
          </div>
        </div>
      </summary>
      <div className="variant-body">
        <div className="variant-text">
          {variation.arabic_text ? (
            <div className="arabic" lang="ar">
              {variation.arabic_text}
            </div>
          ) : (
            <p className="meta">Arabic text is not recorded for this occurrence.</p>
          )}
          {variation.english_text ? <p className="serif">{variation.english_text}</p> : <p className="meta">English text is not recorded for this occurrence.</p>}
        </div>
        <EvidenceStatuses
          hadithStatus={variation.hadith_status}
          chainStatus={variation.chain_status}
          narrationStatus={variation.narration_status}
          notes={variation.status_notes}
        />
        {variation.hadith_assessments.length ? (
          <div className="card" style={{ marginTop: 16 }}>
            {variation.hadith_assessments.map((assessment) => (
              <AssessmentCitation key={assessment.id} assessment={assessment} />
            ))}
          </div>
        ) : (
          <p className="meta">No verified scholarly assessments are attached to this exact occurrence.</p>
        )}
        {variation.chains.map((chain) => (
          <div key={chain.id}>
            <div className="chain-label">
              <div>
                <b>Chain {chain.chain_number} for this source</b>
                <div className="meta">{chain.raw_chain_text || "Click a narrator for biography and rijal analysis"}</div>
              </div>
              <span className="pill">{chain.continuity_status.replace(/_/g, " ")}</span>
            </div>
            <IsnadChain nodes={chain.chain_narrators ?? []} />
          </div>
        ))}
        {!variation.chains.length ? <p className="meta">No verified isnad is recorded for this occurrence.</p> : null}
        <div className="provenance">
          <div>
            <b>Provenance</b>
          </div>
          <div>Translator: {variation.translator || "Not recorded"}</div>
          <div>Source URL: {variation.source_url || "Not recorded"}</div>
          <div>Narration class: {formatList(variation.narration_status) || "Not recorded"}</div>
        </div>
      </div>
    </details>
  );
}
