import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { businessinsights, getBusinessInsightById } from "@/data/businessinsights";
import { events } from "@/data/events";
import { highlightKeywords } from "@/lib/highlight";
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import NewsletterSheet from "@/components/NewsletterSheet";

const BusinessInsightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = getBusinessInsightById(id || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-serif text-3xl font-bold">Article not found</h1>
          <Link to="/business-insights" className="text-primary mt-4 inline-block">
            ← Back to Business Insights
          </Link>
        </div>
      </Layout>
    );
  }

  const paragraphs = (article.content ?? article.excerpt ?? "").split(/\n\s*\n/).filter(Boolean);
  // Keep "Other Stories" within the same section as the current article
  // (a Business Insights article shows other news, a Business Legacy article shows other legacy, etc.).
  const feedOf = (a: { category?: string }) =>
    a.category === "Business Legacy" ? "legacy" : a.category && /^Startups/i.test(a.category) ? "startups" : "insights";
  const currentFeed = feedOf(article);
  const related = businessinsights
    .filter((a) => a.id !== article.id && feedOf(a) === currentFeed)
    .slice(0, 4);

  // Extra rail modules so the sidebar fills the column alongside a long article.
  const relatedIds = new Set([article.id, ...related.map((r) => r.id)]);
  const mostRead = businessinsights.filter((a) => !relatedIds.has(a.id)).slice(0, 5);
  const whatsOn = events.slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>{article.title} — Business Insights</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ===== Main article column ===== */}
          <article className="lg:col-span-8">
            {/* Breadcrumb / section tag */}
            <div className="flex items-center gap-2 text-sm mb-5">
              <Link to="/business-insights" className="text-primary font-bold hover:underline">
                Business Insights
              </Link>
              {article.category && (
                <>
                  <span className="text-border">/</span>
                  <span className="text-muted-foreground">{article.category}</span>
                </>
              )}
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-3xl md:text-[2.5rem] font-extrabold leading-[1.15] tracking-tight text-foreground"
            >
              {article.title}
            </motion.h1>

            {/* Dek / standfirst */}
            {article.excerpt && (
              <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed font-serif italic">
                {article.excerpt}
              </p>
            )}

            {/* Byline row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <div className="flex items-center gap-x-5 gap-y-1 flex-wrap text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {article.date}
                </span>
                {article.readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {article.readTime}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <a href="https://www.instagram.com/inspireindiatalks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                </a>
                <a href="https://www.facebook.com/p/Inspire-India-Talks-61577643296599/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/company/inspire-india-talks/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                </a>
                <a href="https://x.com/inspireindia_" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 hover:text-primary transition-colors cursor-pointer">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hero image */}
            <figure className="mt-8">
              <div className="relative w-full bg-muted border border-border">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted-foreground border-l-2 border-primary pl-2">
                {article.title}
              </figcaption>
            </figure>

            {/* Body */}
            <div className="mt-10">
              {paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="font-sans text-[18px] leading-[1.8] text-foreground/90 mb-6"
                >
                  {highlightKeywords(para)}
                </motion.p>
              ))}

              <div className="mt-12 border-t border-border pt-8">
                <p className="font-serif text-xl font-bold text-foreground">Enjoyed this article?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get more inspiring stories and business insights in your inbox.
                </p>
                <NewsletterSheet
                  source="business-insight-article"
                  triggerLabel="Subscribe"
                  triggerClassName="mt-4"
                />
              </div>

              <div className="mt-10 pt-6 border-t border-border">
                <Link
                  to="/business-insights"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Business Insights
                </Link>
              </div>
            </div>
          </article>

          {/* ===== Right rail ===== */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Other Stories */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-foreground">Other Stories</h3>
                <div className="h-1 w-10 bg-primary mb-6" />
                <div className="divide-y divide-border border-t border-b border-border">
                  {related.map((r) => (
                    <Link key={r.id} to={`/business-insights/${r.id}`} className="group flex gap-4 py-5">
                      <div className="h-20 w-28 shrink-0 overflow-hidden bg-muted border border-border">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        {r.category && (
                          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                            {r.category}
                          </span>
                        )}
                        <h4 className="font-serif text-sm font-bold leading-snug mt-1 text-foreground group-hover:text-primary transition-colors line-clamp-3">
                          {r.title}
                        </h4>
                        <span className="mt-1.5 block text-muted-foreground text-xs">{r.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/business-insights"
                  className="mt-6 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  View all stories <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* Most Read */}
            {mostRead.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-foreground">Most Read</h3>
                <div className="h-1 w-10 bg-primary mb-6" />
                <ol className="space-y-4 border-t border-b border-border divide-y divide-border">
                  {mostRead.map((r, i) => (
                    <li key={r.id}>
                      <Link to={`/business-insights/${r.id}`} className="group flex gap-3 py-4">
                        <span className="font-serif text-2xl font-black text-primary/30 leading-none w-7 shrink-0 group-hover:text-primary transition-colors">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          {r.category && (
                            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                              {r.category}
                            </span>
                          )}
                          <h4 className="font-serif text-sm font-bold leading-snug mt-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-3">
                            {r.title}
                          </h4>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* What's On */}
            {whatsOn.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-foreground">What's On</h3>
                <div className="h-1 w-10 bg-primary mb-6" />
                <div className="space-y-4">
                  {whatsOn.map((ev) => (
                    <Link key={ev.id} to={`/events/${ev.slug}`} className="group flex gap-3 border-b border-border pb-4 last:border-0">
                      <div className="shrink-0 w-12 text-center border border-border py-1.5">
                        <span className="block font-serif text-base font-black text-primary leading-none">
                          {ev.date.match(/\d+/)?.[0] ?? ""}
                        </span>
                        <span className="block text-[8px] uppercase tracking-widest text-muted-foreground mt-1">
                          {ev.date.split(" ")[0].slice(0, 3)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{ev.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-secondary/50 border border-border p-6">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest block mb-2">The Newsletter</span>
              <p className="font-serif text-lg font-bold text-foreground mb-4 leading-snug">
                One considered edition, every Friday.
              </p>
              <NewsletterSheet source="business-article-rail" triggerLabel="Subscribe Free" />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessInsightDetail;
