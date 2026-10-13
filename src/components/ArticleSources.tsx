import type { ContentSource } from "@/data/editorialTypes";

interface ArticleSourcesProps {
  sources?: ContentSource[];
}

const ArticleSources = ({ sources }: ArticleSourcesProps) => {
  const links = (sources ?? []).filter((source) => {
    try {
      const url = new URL(source.url);
      return source.title.trim() && (url.protocol === "https:" || url.protocol === "http:");
    } catch {
      return false;
    }
  });

  if (!links.length) return null;

  return (
    <section className="mt-10 border-t border-border pt-6">
      <h2 className="font-serif text-lg font-bold text-foreground">Sources</h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {links.map((source, index) => (
          <li key={`${source.url}-${index}`}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              {source.title}
            </a>
            {(source.publishedAt || source.accessedAt) && (
              <span className="ml-2 text-xs text-muted-foreground">
                {[
                  source.publishedAt && `Published ${source.publishedAt}`,
                  source.accessedAt && `Accessed ${source.accessedAt}`,
                ].filter(Boolean).join(" · ")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticleSources;
