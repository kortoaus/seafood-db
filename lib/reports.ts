import { readFileSync, readdirSync } from "fs";
import path from "path";

const REPORTS_DIR = path.join(process.cwd(), "data");
const MASTER_PATH = path.join(process.cwd(), "data", "species_master.json");

export interface SpeciesEntry {
  id: string;
  nameEN: string;
  nameKR: string | null;
  scientificName: string;
  family: string;
  category: string;
  searchTags: string[];
  sources: string[];
  nameKR_source: string | null;
}

export interface ReportListItem {
  id: string;
  nameEN: string;
  nameKR: string | null;
  scientificName: string;
  category: string;
  family: string;
  sources: string[];
}

export function getSpeciesMaster(): SpeciesEntry[] {
  const raw = readFileSync(MASTER_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getReportIds(): Set<string> {
  const files = readdirSync(REPORTS_DIR).filter((f) => f.endsWith(".md"));
  return new Set(files.map((f) => f.replace(".md", "")));
}

export function getReportList(): ReportListItem[] {
  const master = getSpeciesMaster();
  const reportIds = getReportIds();

  return master
    .filter((s) => reportIds.has(s.id))
    .map((s) => ({
      id: s.id,
      nameEN: s.nameEN,
      nameKR: s.nameKR,
      scientificName: s.scientificName,
      category: s.category,
      family: s.family,
      sources: s.sources,
    }));
}

export function getReport(id: string): string | null {
  try {
    return readFileSync(path.join(REPORTS_DIR, `${id}.md`), "utf-8");
  } catch {
    return null;
  }
}
