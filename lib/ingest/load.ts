import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse";
import type { ParsedCorpus } from "./validate";

async function readCsv(filePath: string): Promise<Record<string, string>[]> {
  try {
    await access(filePath);
  } catch {
    return [];
  }

  return new Promise((resolve, reject) => {
    const rows: Record<string, string>[] = [];
    createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true, trim: true, relax_quotes: true }))
      .on("data", (row: Record<string, string>) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

export async function loadTemplates(rootDir = path.join(process.cwd(), "data-templates")): Promise<ParsedCorpus> {
  const [sources, hadiths, variations, narrators, assessments, chains] = await Promise.all([
    readCsv(path.join(rootDir, "source-register.csv")),
    readCsv(path.join(rootDir, "hadiths.csv")),
    readCsv(path.join(rootDir, "source-variations.csv")),
    readCsv(path.join(rootDir, "narrators.csv")),
    readCsv(path.join(rootDir, "assessments.csv")),
    readCsv(path.join(rootDir, "chains.csv")),
  ]);

  return { sources, hadiths, variations, narrators, assessments, chains };
}
