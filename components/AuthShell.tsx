import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="auth-page">
      <div className="auth-visual" aria-hidden="true">
        <Link className="brand light" href="/">
          <span className="mark">ر</span> Relegious
        </Link>
        <blockquote>
          <p className="arabic" lang="ar">
            إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
          </p>
          <cite>Source-neutral hadith research</cite>
        </blockquote>
      </div>
      <div className="auth-panel">
        <Link className="brand mobile-only" href="/">
          <span className="mark">ر</span> Relegious
        </Link>
        <div className="auth-card">
          <h1 className="title">{title}</h1>
          <p className="meta">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
