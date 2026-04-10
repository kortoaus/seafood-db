import { readFileSync } from "fs";
import path from "path";
import { MarkdownContent } from "../species/[id]/markdown";

export default function AboutPage() {
  const content = readFileSync(
    path.join(process.cwd(), "data", "about.md"),
    "utf-8"
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <article>
        <MarkdownContent content={content} />
      </article>
    </div>
  );
}
