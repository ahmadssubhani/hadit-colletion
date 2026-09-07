import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentCitation } from "@/components/AssessmentCitation";
import { ErrorState } from "@/components/States";
import { TransmissionEvidence } from "@/components/TransmissionEvidence";
import { meanDisplayScore } from "@/lib/narrator-evidence";
import { getNarratorBySlug } from "@/lib/queries";

export const revalidate = 60;

export default async function NarratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { narrator, assessments, appearances, transmission, error } = await getNarratorBySlug(slug);

  if (error) {
    return (
      <div className="shell">
        <ErrorState message={error.message} />
      </div>
    );
  }
  if (!narrator) notFound();

  const initial = narrator.arabic_name?.[0] ?? narrator.name[0] ?? "?";
  const uniqueReports = [...new Map(appearances.filter((item) => item.hadith_slug).map((item) => [item.hadith_slug, item])).values()];
  const mappedScore = meanDisplayScore(assessments);
  const scoredCount = assessments.filter((row) => typeof row.display_score === "number").length;

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
      <div className="shell">
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
            <p className="notice">
              No sourced narrator assessments are attached to this profile. Named rijal judgments appear here only when a
              reference book or source URL is recorded.
            </p>
          )}
          <p className="score-note">
            Display scores, when present, are transparent editorial mappings of textual categories. They are not classical
            grades and not a substitute for the original wording.
          </p>
          <div className="section-head">
            <div>
              <div className="eyebrow">Transmission</div>
              <h2 className="title">Teachers and students</h2>
            </div>
          </div>
          <TransmissionEvidence 
            transmission={transmission} 
            narrator={narrator} 
            mappedScore={mappedScore} 
            scoredCount={scoredCount} 
            reportsIndexed={uniqueReports.length} 
          />
          <div className="section-head">
            <div>
              <div className="eyebrow">Occurrences</div>
              <h2 className="title">Verified chains that include this narrator</h2>
            </div>
          </div>
          <div className="cards">
            {uniqueReports.map((item) => (
              <Link className="card clickable" key={`${item.hadith_slug}-${item.book_title}`} href={`/hadiths/${item.hadith_slug}`}>
                <div className="meta">{item.book_title ?? "Source not named"}</div>
                <h3>{item.hadith_title}</h3>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
