import Link from "next/link";
import { getReportList } from "../lib/reports";
import { SearchList } from "./search-list";

export default function Home() {
  const reports = getReportList();

  const grouped = new Map<string, typeof reports>();
  for (const r of reports) {
    const list = grouped.get(r.category) ?? [];
    list.push(r);
    grouped.set(r.category, list);
  }

  const categories = [...grouped.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          총 <span className="font-bold text-gray-900">{reports.length}</span>종
          리포트
        </p>
        <SearchList reports={reports} />
      </div>

      {categories.map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
            {category}{" "}
            <span className="text-sm font-normal text-gray-400">
              ({items.length})
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((r) => (
              <Link
                key={r.id}
                href={`/species/${r.id}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="font-medium text-gray-900">{r.nameEN}</div>
                {r.nameKR && (
                  <div className="text-sm text-blue-600">{r.nameKR}</div>
                )}
                <div className="text-xs text-gray-400 italic mt-1">
                  {r.scientificName}
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {r.sources.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
