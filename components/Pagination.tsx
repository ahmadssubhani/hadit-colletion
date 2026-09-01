import Link from "next/link";

export function Pagination({
  page,
  pageSize,
  total,
  hrefFor,
}: {
  page: number;
  pageSize: number;
  total: number;
  hrefFor: (page: number) => string;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)}>Previous</Link>
      ) : (
        <span className="disabled">Previous</span>
      )}
      <span>
        Page {page} of {pages}
      </span>
      {page < pages ? <Link href={hrefFor(page + 1)}>Next</Link> : <span className="disabled">Next</span>}
    </nav>
  );
}
