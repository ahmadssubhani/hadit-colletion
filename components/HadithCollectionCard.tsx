import Link from "next/link";

export function HadithCollectionCard({
  title,
  note,
  href,
}: {
  title: string;
  note?: string;
  href: string;
}) {
  return (
    <Link className="card clickable collection-card" href={href}>
      <div className="source-icon">{title.replace(/^al[- ]/i, "").charAt(0)}</div>
      <h3>{title}</h3>
      {note ? <p className="meta">{note}</p> : null}
    </Link>
  );
}
