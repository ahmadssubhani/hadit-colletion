import { getScholars } from "@/lib/queries";

export const revalidate = 3600;

export default async function KnowledgePage() {
  const scholars = await getScholars();

  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="eyebrow">Knowledge guide</div>
          <h1 className="title">How hadith evidence is described</h1>
          <p className="knowledge-intro">
            A plain-language guide to report types, narrator categories, and the scholars whose judgments this platform
            records. Sunni and Shia vocabularies are shown separately where they differ.
          </p>
          <div className="guide-nav">
            <a href="#hadith-kinds">Kinds of hadith</a>
            <a href="#narrator-kinds">Narrator categories</a>
            <a href="#authorities">Authorities covered</a>
            <a href="#how-judgment-works">How judgment works</a>
          </div>
        </div>
      </div>
      <div className="shell">
        <section className="knowledge-section" id="hadith-kinds">
          <div className="eyebrow">Part 1</div>
          <h2>“Kind of hadith” can mean four different things</h2>
          <p className="knowledge-intro">
            These labels answer different questions. One report may be ahad by route count, marfuʿ by attribution, muttasil
            by continuity, and sahih by acceptance.
          </p>
          <div className="method-box" style={{ margin: "18px 0" }}>
            <div className="method-step">
              <b>Hadith status</b>
              <p>The named scholarly verdict on this exact source occurrence: sahih, hasan, daʿif, muwaththaq, or not graded.</p>
            </div>
            <div className="method-step">
              <b>Chain status</b>
              <p>The isnad’s own condition: connected or interrupted, plus any chain-only quality assessment.</p>
            </div>
            <div className="method-step">
              <b>Narration status</b>
              <p>How the report is transmitted and attributed: mutawatir or ahad, and marfuʿ, mawquf, or historical khabar.</p>
            </div>
          </div>
          <div className="axis">
            <div className="axis-head">
              <div>
                <span className="tradition-note">Acceptance · Sunni terminology</span>
                <h3>How strong is the evidence?</h3>
              </div>
              <span className="pill">A judgment, not a topic</span>
            </div>
            <div className="term-grid">
              <div className="term">
                <b>Sahih · sound</b>
                <p>A connected chain of upright, accurate transmitters, free from hidden defect and contradiction with stronger evidence.</p>
              </div>
              <div className="term">
                <b>Hasan · good</b>
                <p>Broadly acceptable, usually with narrator precision below the sahih level.</p>
              </div>
              <div className="term">
                <b>Daʿif · weak</b>
                <p>One or more acceptance conditions are missing. Weakness has many causes and degrees.</p>
              </div>
              <div className="term">
                <b>Mawduʿ · fabricated</b>
                <p>Judged invented and falsely attributed; more severe than ordinary weakness.</p>
              </div>
            </div>
          </div>
          <div className="axis">
            <div className="axis-head">
              <div>
                <span className="tradition-note">Acceptance · Twelver Shia terminology</span>
                <h3>How is the chain characterized?</h3>
              </div>
              <span className="pill">Later fourfold system</span>
            </div>
            <div className="term-grid">
              <div className="term">
                <b>Sahih · sound</b>
                <p>An uninterrupted Imami chain whose transmitters are individually deemed reliable.</p>
              </div>
              <div className="term">
                <b>Hasan · good</b>
                <p>An Imami chain containing a praised transmitter without an explicit reliability statement.</p>
              </div>
              <div className="term">
                <b>Muwaththaq · reliable</b>
                <p>Transmitters are reliable, though one or more is not identified as Imami.</p>
              </div>
              <div className="term">
                <b>Daʿif · weak</b>
                <p>Does not satisfy the stated chain conditions of the other classes.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="knowledge-section" id="narrator-kinds">
          <div className="eyebrow">Part 2</div>
          <h2>Categories and descriptions of narrators</h2>
          <p className="knowledge-intro">Generation labels locate a narrator historically. Reliability terms record a named expert’s judgment.</p>
          <div className="axis">
            <div className="axis-head">
              <div>
                <span className="tradition-note">Rijal assessment</span>
                <h3>How is the narrator described?</h3>
              </div>
              <span className="pill">Always name the assessor</span>
            </div>
            <div className="term-grid">
              <div className="term">
                <b>Thiqah</b>
                <p>Trustworthy: a strong positive reliability judgment.</p>
              </div>
              <div className="term">
                <b>Saduq</b>
                <p>Truthful and generally acceptable, sometimes less precise than thiqah.</p>
              </div>
              <div className="term">
                <b>Majhul</b>
                <p>Identity or reliability is insufficiently known.</p>
              </div>
              <div className="term">
                <b>Daʿif</b>
                <p>Weak; the critic’s reason should be recorded.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="knowledge-section" id="authorities">
          <div className="eyebrow">Part 3</div>
          <h2>Authorities represented</h2>
          <p className="knowledge-intro">
            No single scholar approves hadith for all Muslims. We store attributed judgments and what each judgment evaluates.
          </p>
          <div className="scholar-list">
            {scholars.map((scholar) => (
              <div className="scholar" key={scholar.id}>
                <div>
                  <span className="tradition-note">
                    {scholar.tradition ?? "Unclassified"}
                    {scholar.death_year_ah ? ` · d. ${scholar.death_year_ah} AH` : ""}
                  </span>
                  <h3>{scholar.name}</h3>
                </div>
                <p className="meta">{scholar.credentials}</p>
                <div className="scope">
                  <span>Attributed judgments</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="knowledge-section" id="how-judgment-works">
          <div className="eyebrow">Part 4</div>
          <h2>Who “approves” or “rejects” a report?</h2>
          <div className="method-box">
            <div className="method-step">
              <b>1. Narrator criticism</b>
              <p>Experts assess identity, integrity, precision, teachers, students, dates, and reported defects.</p>
            </div>
            <div className="method-step">
              <b>2. Chain analysis</b>
              <p>Scholars test continuity, possible meetings, supporting routes, contradictions, and hidden defects.</p>
            </div>
            <div className="method-step">
              <b>3. Report judgment</b>
              <p>A hadith critic applies a stated method to chain and text. Another qualified scholar may disagree.</p>
            </div>
          </div>
          <div className="notice" style={{ margin: "18px 0 55px" }}>
            <b>Platform rule:</b> Never say “approved by Islam.” Say “graded sahih by…”, “classed muwaththaq by…”, or
            “narrator declared thiqah by…”, with the exact work and citation. Numerical scores remain secondary editorial
            mappings.
          </div>
        </section>
      </div>
    </section>
  );
}
