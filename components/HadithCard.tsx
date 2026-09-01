import Link from "next/link";
import type { Hadith } from "@/lib/types";

export function HadithCard({
  hadith,
  variationCount,
}: {
  hadith: Pick<Hadith, "slug" | "title" | "summary" | "topics">;
  variationCount?: number;
}) {
  return (
    <Link className="card clickable" href={`/hadiths/${hadith.slug}`}>
      <div className="meta">
        {hadith.slug}
        {typeof variationCount === "number" ? ` · ${variationCount} source variation${variationCount === 1 ? "" : "s"}` : ""}
      </div>
      <h3>{hadith.title}</h3>
      {hadith.summary ? <p className="meta">{hadith.summary}</p> : null}
      <div className="pills">
        {(hadith.topics ?? []).map((topic) => (
          <span className="pill" key={topic}>
            {topic}
          </span>
        ))}
      </div>
    </Link>
  );
}
