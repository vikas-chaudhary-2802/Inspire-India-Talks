import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { getPersonalityById, getPersonalitiesByCategory } from "@/data/personalities";
import { businessinsights } from "@/data/businessinsights";
import { events } from "@/data/events";
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import NewsletterSheet from "@/components/NewsletterSheet";

const PersonalityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const person = getPersonalityById(id || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!person) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-serif text-3xl font-bold">Personality not found</h1>
          <Link to="/founders-talk" className="text-primary mt-4 inline-block">
            ← Back to Founders Stories
          </Link>
        </div>
      </Layout>
    );
  }

  const related = getPersonalitiesByCategory(person.categorySlug)
    .filter((p) => p.id !== person.id)
    .slice(0, 4);

  // Extra rail modules so the sidebar fills the column alongside a long story.
  const fromDesk = businessinsights.slice(0, 5);
  const whatsOn = events.slice(0, 3);

  const paragraphs = (person.story ?? "").split(/\n\s*\n/).filter(Boolean);
  // Drop the pull quote into the middle of the story.
  const quoteAfterIdx = person.quote ? Math.max(0, Math.ceil(paragraphs.length / 2) - 1) : -1;

  // Reading time from the story length.
  const wordCount = (person.story ?? "").split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(3, Math.round(wordCount / 200));

  // Published date, shown DD-MM-YYYY to match the rest of the paper.
  const dateStr = person.addedAt
    ? new Date(person.addedAt)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
        .replace(/\//g, "-")
    : "";

  // Render text supporting **bold** and *italic*.
  const renderRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const subParts = part.split(/(\*.*?\*)/g);
      return subParts.map((sub, j) => {
        if (sub.startsWith("*") && sub.endsWith("*")) {
          return (
            <em key={`${i}-${j}`} className="italic text-foreground/90">
              {sub.slice(1, -1)}
            </em>
          );
        }
        return sub;
      });
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>{person.name} — Inspire India Talks</title>
        <meta name="description" content={person.story.substring(0, 160) + "..."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://inspireindiatalks.com/personality/${person.id}`} />
        <meta property="og:title" content={`${person.name} — Inspire India Talks`} />
        <meta property="og:description" content={`${person.title}. ${person.knownFor}`} />
        <meta property="og:image" content={`https://inspireindiatalks.com${person.image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://inspireindiatalks.com/personality/${person.id}`} />
        <meta name="twitter:title" content={`${person.name} — Inspire India Talks`} />
        <meta name="twitter:description" content={person.quote} />
        <meta name="twitter:image" content={`https://inspireindiatalks.com${person.image}`} />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ===== Main article column ===== */}
          <article className="lg:col-span-8">
            {/* Breadcrumb / section tag */}
            <div className="flex items-center gap-2 text-sm mb-5">
              <Link to="/founders-talk" className="text-primary font-bold hover:underline">
                Founders Stories
              </Link>
              {person.category && (
                <>
                  <span className="text-border">/</span>
                  <span className="text-muted-foreground">{person.category}</span>
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
              {person.name}
            </motion.h1>

            {/* Dek / standfirst */}
            {person.knownFor && (
              <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed font-serif italic">
                {person.title}. {person.knownFor}
              </p>
            )}

            {/* Byline row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <div className="flex items-center gap-x-5 gap-y-1 flex-wrap text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">By Editorial Desk</span>
                {dateStr && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {dateStr}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {readMins} min read
                </span>
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
              </div>
            </div>

            {/* Hero image */}
            <figure className="mt-8">
              <div className="relative w-full bg-muted border border-border">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      person.name
                    )}&size=1200&background=1a1a2e&color=f97316&font-size=0.25&bold=true`;
                  }}
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted-foreground border-l-2 border-primary pl-2">
                {person.name} — {person.title}
              </figcaption>
            </figure>

            {/* Fact box — Born / Profession / Known For */}
            <div className="mt-8 border-t border-b border-border grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                { label: "Born", value: person.born },
                { label: "Profession", value: person.profession },
                { label: "Known For", value: person.knownFor },
              ].map(({ label, value }) => (
                <div key={label} className="py-5 sm:px-6 first:sm:pl-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-1.5">{label}</p>
                  <p className="font-serif text-sm md:text-base text-foreground/90 leading-snug">{value}</p>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="mt-10">
              {paragraphs.map((para, idx) => {
                const isHighlight = para.trim().startsWith("Key:") || para.trim().startsWith("Crucially:");

                return (
                  <Fragment key={idx}>
                    {isHighlight ? (
                      <blockquote className="my-10 border-l-4 border-primary bg-secondary/40 py-6 px-6 md:px-8 font-serif text-xl md:text-2xl italic font-medium text-foreground leading-relaxed">
                        {renderRichText(para.replace(/^(Key:|Crucially:)\s*/, ""))}
                      </blockquote>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        className={
                          idx === 0
                            ? "font-sans text-[18px] leading-[1.8] text-foreground/90 mb-6 first-letter:font-serif first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1"
                            : "font-sans text-[18px] leading-[1.8] text-foreground/90 mb-6"
                        }
                      >
                        {renderRichText(para)}
                      </motion.p>
                    )}

                    {/* Pull quote — set into the middle of the story */}
                    {person.quote && idx === quoteAfterIdx && (
                      <figure className="my-12 border-y-2 border-foreground py-8 text-center">
                        <blockquote className="font-serif text-2xl md:text-3xl font-bold italic text-foreground leading-tight max-w-3xl mx-auto">
                          “{person.quote}”
                        </blockquote>
                        <figcaption className="mt-4 text-primary text-xs uppercase tracking-[0.2em] font-bold">
                          {person.name}
                        </figcaption>
                      </figure>
                    )}
                  </Fragment>
                );
              })}

              {person.authorName && (
                <p className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground italic">
                  Story curated by{" "}
                  {person.authorLinkedin ? (
                    <a
                      href={person.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold not-italic hover:underline"
                    >
                      {person.authorName}
                    </a>
                  ) : (
                    <span className="font-bold not-italic text-foreground">{person.authorName}</span>
                  )}
                  .
                </p>
              )}

              {/* Newsletter CTA */}
              <div className="mt-12 border-t border-border pt-8">
                <p className="font-serif text-xl font-bold text-foreground">Enjoyed this story?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Subscribe for more inspiring Indian journeys, delivered weekly.
                </p>
                <NewsletterSheet source="personality-article" triggerLabel="Subscribe" triggerClassName="mt-4" />
              </div>

              <div className="mt-10 pt-6 border-t border-border">
                <Link
                  to="/founders-talk"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Founders Stories
                </Link>
              </div>
            </div>
          </article>

          {/* ===== Right rail ===== */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Other Founders */}
            {related.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-foreground">Other Founders</h3>
                <div className="h-1 w-10 bg-primary mb-6" />
                <div className="divide-y divide-border border-t border-b border-border">
                  {related.map((r) => (
                    <Link key={r.id} to={`/personality/${r.id}`} className="group flex gap-4 py-5">
                      <div className="h-20 w-28 shrink-0 overflow-hidden bg-muted border border-border">
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ objectPosition: "center 25%" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              r.name
                            )}&size=200&background=1a1a2e&color=f97316`;
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
                          {r.name}
                        </h4>
                        <span className="mt-1.5 block text-muted-foreground text-xs">{r.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/founders-talk"
                  className="mt-6 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  View all founders <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* From the Business Desk */}
            {fromDesk.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-foreground">From the Business Desk</h3>
                <div className="h-1 w-10 bg-primary mb-6" />
                <ol className="border-t border-b border-border divide-y divide-border">
                  {fromDesk.map((r, i) => (
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
              <NewsletterSheet source="founder-article-rail" triggerLabel="Subscribe Free" />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalityDetail;
