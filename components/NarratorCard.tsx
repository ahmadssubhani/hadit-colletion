import Link from "next/link";
import type { Narrator } from "@/lib/types";
import { formatAhYear } from "@/lib/format";

export function NarratorCard({ narrator }: { narrator: Narrator }) {
  return (
    <Link className="card clickable" href={`/narrators/${narrator.slug}`}>
      <div className="meta">{narrator.slug}</div>
      <h3>{narrator.name}</h3>
      {narrator.arabic_name ? (
        <div className="arabic" lang="ar">
          {narrator.arabic_name}
        </div>
      ) : null}
      <p className="meta">
        {narrator.region ?? "Region not recorded"} · died {formatAhYear(narrator.death_year_ah)}
      </p>
    </Link>
  );
}
