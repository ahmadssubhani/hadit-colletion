import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-banner">
      <div className="hero-banner-media" aria-hidden="true" />
      <div className="hero-banner-overlay" />
      <div className="hero-banner-copy shell">
        <p className="eyebrow light">Hadith research, source by source</p>
        <h1>Discover the Teachings of the Prophet ﷺ</h1>
        <p className="hero-lead">
          Explore authentic Hadith collections, learn from the Sunnah, and discover timeless guidance for everyday life.
          Each source keeps its own wording, chain, and attributed scholarly judgments.
        </p>
        <div className="hero-ctas">
          <Link className="btn-solid light" href="/search">
            Explore Hadith
          </Link>
          <Link className="btn-outline light" href="/collections">
            Browse Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
