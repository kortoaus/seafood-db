import { notFound } from "next/navigation";
import { getReport, getReportIds, getSpeciesMaster } from "../../../lib/reports";
import { MarkdownContent } from "./markdown";
import Link from "next/link";

export function generateStaticParams() {
  const ids = getReportIds();
  return [...ids].map((id) => ({ id }));
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = getReport(id);
  if (!content) notFound();

  const master = getSpeciesMaster();
  const species = master.find((s) => s.id === id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="inline-block mb-6 text-sm text-blue-600 hover:text-blue-800"
      >
        &larr; 목록으로
      </Link>

      {species && (
        <div className="mb-4 flex flex-wrap gap-2">
          {species.sources.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
            >
              {s}
            </span>
          ))}
          {species.nameKR_source && (
            <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
              한국명: {species.nameKR_source}
            </span>
          )}
        </div>
      )}

      <article>
        <MarkdownContent content={content} />
      </article>
    </div>
  );
}
