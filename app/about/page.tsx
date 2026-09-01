export default function AboutPage() {
  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="eyebrow">About</div>
          <h1 className="title">A source-neutral hadith research platform</h1>
        </div>
      </div>
      <div className="shell" style={{ maxWidth: 760, paddingBottom: 70 }}>
        <p className="lead">
          Relegious helps readers inspect related hadith reports without merging their differences. Each source variation
          keeps its own Arabic, English, citation, statuses, isnad, and named scholarly assessments.
        </p>
        <p>
          Version one is hadith-only. The platform does not manufacture a consensus grade when scholars disagree, and it does
          not treat historical events as first-class records.
        </p>
      </div>
    </section>
  );
}
