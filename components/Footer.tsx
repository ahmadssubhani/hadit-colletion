import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand light" href="/">
            <span className="mark">ر</span> Relegious
          </Link>
          <p>An English-first, source-neutral hadith research platform. Wording, grades, and chains stay with their sources.</p>
        </div>
        <nav aria-label="Footer">
          <span className="label">Explore</span>
          <Link href="/">Home</Link>
          <Link href="/search">Hadiths</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/narrators">Narrators</Link>
          <Link href="/hadiths/knowledge">Knowledge</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">© 2026 Relegious Hadith Collection. All rights reserved.</div>
    </footer>
  );
}
