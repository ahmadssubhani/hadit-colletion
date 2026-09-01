import type { DemoHadith } from "@/lib/content/home";

export function FeaturedHadith({ hadith, featured = false }: { hadith: DemoHadith; featured?: boolean }) {
  return (
    <article className={`hadith-showcase${featured ? " featured" : ""}`}>
      {featured ? <div className="eyebrow">Hadith of the Day</div> : <div className="pill">{hadith.tag}</div>}
      <p className="arabic" lang="ar">
        {hadith.arabic}
      </p>
      <p className="serif">{hadith.english}</p>
      <dl className="hadith-meta">
        <div>
          <dt>Narrator</dt>
          <dd>{hadith.narrator}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{hadith.collection}</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>{hadith.reference}</dd>
        </div>
      </dl>
      <p className="score-note">Illustrative wording for layout. Open a published cluster for verified source text.</p>
    </article>
  );
}
