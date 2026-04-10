"use client";

import Link from "next/link";
import { useState } from "react";

interface Report {
  id: string;
  nameEN: string;
  nameKR: string | null;
  scientificName: string;
  category: string;
}

export function SearchList({ reports }: { reports: Report[] }) {
  const [query, setQuery] = useState("");

  if (!query) return (
    <input
      type="text"
      placeholder="검색 (영문/한글/학명)..."
      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );

  const q = query.toLowerCase();
  const filtered = reports.filter(
    (r) =>
      r.nameEN.toLowerCase().includes(q) ||
      (r.nameKR && r.nameKR.includes(q)) ||
      r.scientificName.toLowerCase().includes(q) ||
      r.id.includes(q)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="검색 (영문/한글/학명)..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-3 space-y-1">
        {filtered.slice(0, 20).map((r) => (
          <Link
            key={r.id}
            href={`/species/${r.id}`}
            className="block px-4 py-2 bg-white rounded border border-gray-100 hover:bg-blue-50 transition-colors"
          >
            <span className="font-medium">{r.nameEN}</span>
            {r.nameKR && (
              <span className="ml-2 text-blue-600">{r.nameKR}</span>
            )}
            <span className="ml-2 text-xs text-gray-400 italic">
              {r.scientificName}
            </span>
          </Link>
        ))}
        {filtered.length > 20 && (
          <p className="text-sm text-gray-400 px-4">
            ... 외 {filtered.length - 20}건
          </p>
        )}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 px-4">결과 없음</p>
        )}
      </div>
    </div>
  );
}
