import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentCitation } from "@/components/AssessmentCitation";
import { ErrorState } from "@/components/States";
import { formatAhYear } from "@/lib/format";
import { getNarratorBySlug } from "@/lib/queries";

export const revalidate = 60;

export default async function NarratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { narrator, assessments, appearances, error } = await getNarratorBySlug(slug);

  if (error) {
    return (
      <div className="shell">
        <ErrorState message={error.message} />
      </div>
    );
  }
  if (!narrator) notFound();

  const initial = narrator.arabic_name?.[0] ?? narrator.name[0] ?? "?";

  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="breadcrumbs">
            <Link href="/narrators">Narrators</Link> / {narrator.slug}
          </div>
          <div className="profile">
            <div className="avatar">{initial}</div>
            <div>
              <div className="eyebrow">Narrator · {narrator.slug}</div>
              <h1 className="title">{narrator.name}</h1>
              {narrator.arabic_name ? (
                <div className="arabic" lang="ar" style={{ fontSize: 20, textAlign: "left" }}>
                  {narrator.arabic_name}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="shell layout">
        <article>
          <p className="lead">
            {narrator.biography ||
              "Only recorded fields are shown. Disagreements between rijal scholars are listed separately and are not reduced to one grade."}
          </p>
          <div className="section-head">
            <div>
              <div className="eyebrow">Rijal analysis</div>
              <h2 className="title">What individual scholars said</h2>
            </div>
          </div>
          {assessments.length ? (
            <div className="card">
              {assessments.map((assessment) => (
                <AssessmentCitation key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <p className="notice">No verified narrator assessments are attached to this profile.</p>
          )}
          <p className="score-note">
            Display scores, when present, are transparent editorial mappings of textual categories. They are not classical
            grades and not a substitute for the original wording.
          </p>
          <div className="section-head">
            <div>
              <div className="eyebrow">Occurrences</div>
              <h2 className="title">Verified chains that include this narrator</h2>
            </div>
          </div>
          <div className="cards">
            {appearances
              .filter((item) => item.hadith_slug)
              .map((item) => (
                <Link className="card clickable" key={`${item.hadith_slug}-${item.book_title}`} href={`/hadiths/${item.hadith_slug}`}>
                  <div className="meta">{item.book_title ?? "Source not named"}</div>
                  <h3>{item.hadith_title}</h3>
                </Link>
              ))}
          </div>
        </article>
        <aside className="aside">
          {narrator.summary_score !== null ? (
            <div className="card score-card">
              <div className="label">Evidence summary</div>
              <div className="score-ring">{narrator.summary_score}</div>
              <b>Mapped display score</b>
              <div className="meta">{assessments.length} attributed assessment{assessments.length === 1 ? "" : "s"}</div>
            </div>
          ) : null}
          <div className="card">
            <div className="label">Identity</div>
            <div className="fact">
              <span className="label">Born</span>
              <b>{formatAhYear(narrator.birth_year_ah)}</b>
            </div>
            <div className="fact">
              <span className="label">Died</span>
              <b>{formatAhYear(narrator.death_year_ah)}</b>
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
          </div>
        </aside>
      </div>
    </section>
  );
}
