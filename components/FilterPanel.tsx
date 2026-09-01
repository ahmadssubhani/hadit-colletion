import type { Book, Scholar } from "@/lib/types";

export function FilterPanel({
  books,
  scholars,
  values,
}: {
  books: Book[];
  scholars: Scholar[];
  values: {
    q?: string;
    bookId?: string;
    hadithStatus?: string;
    chainStatus?: string;
    narrationStatus?: string;
    scholarId?: string;
    assessment?: string;
  };
}) {
  return (
    <form className="filter-panel" action="/search">
      <div>
        <label htmlFor="q">Query</label>
        <input id="q" name="q" defaultValue={values.q ?? ""} placeholder="Text, reference, narrator" />
      </div>
      <div>
        <label htmlFor="bookId">Source</label>
        <select id="bookId" name="bookId" defaultValue={values.bookId ?? ""}>
          <option value="">All sources</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="hadithStatus">Hadith status</label>
        <select id="hadithStatus" name="hadithStatus" defaultValue={values.hadithStatus ?? ""}>
          <option value="">Any</option>
          {["sahih", "hasan", "muwaththaq", "daif", "not_graded"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="chainStatus">Chain status</label>
        <select id="chainStatus" name="chainStatus" defaultValue={values.chainStatus ?? ""}>
          <option value="">Any</option>
          {["muttasil", "mursal", "unverified"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="narrationStatus">Narration status</label>
        <select id="narrationStatus" name="narrationStatus" defaultValue={values.narrationStatus ?? ""}>
          <option value="">Any</option>
          {["ahad", "mutawatir", "marfu", "mawquf", "historical_khabar"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="scholarId">Scholar</label>
        <select id="scholarId" name="scholarId" defaultValue={values.scholarId ?? ""}>
          <option value="">Any scholar</option>
          {scholars.map((scholar) => (
            <option key={scholar.id} value={scholar.id}>
              {scholar.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="assessment">Assessment term</label>
        <input id="assessment" name="assessment" defaultValue={values.assessment ?? ""} placeholder="e.g. sahih, thiqah" />
      </div>
      <div style={{ display: "flex", alignItems: "end" }}>
        <button className="primary" type="submit">
          Apply filters
        </button>
      </div>
    </form>
  );
}
