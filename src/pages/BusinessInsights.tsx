import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { businessinsights as rawInsights } from "../data/businessinsights";
import { businesslegacy } from "../data/businesslegacy";
import { businessstartups } from "../data/businessstartups";
import { highlightKeywords } from "@/lib/highlight";

/* Loose local type so this page compiles regardless of how
   src/data/businessinsights.ts is typed. */
interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featured?: boolean;
  readTime?: string;
}

/* "DD-MM-YYYY" -> sortable timestamp. Falls back to 0 if malformed. */
const toTime = (d: string): number => {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(d?.trim() ?? "");
  if (!m) return 0;
  return new Date(+m[3], +m[2] - 1, +m[1]).getTime();
};

/* Newest first — so the latest story is always at the top. */
const articles = ([
  ...(rawInsights as unknown as Article[]),
  ...(businesslegacy as unknown as Article[]),
  ...(businessstartups as unknown as Article[]),
]).sort((a, b) => toTime(b.date) - toTime(a.date));

/* ===== Feeds — each tab shows only its own category of article ===== */
export type Feed = "insights" | "legacy" | "startups";

export const isLegacy = (a: Article) => a.category === "Business Legacy";
export const isStartup = (a: Article) => !!a.category && /^Startups/i.test(a.category);
export const isNews = (a: Article) => !isLegacy(a) && !isStartup(a);

const FEED_META: Record<
  Feed,
  { eyebrow: string; title: string; subtitle: string; match: (a: Article) => boolean }
> = {
  insights: {
    eyebrow: "Independent Journalism",
    title: "Business Insights",
    subtitle:
      "Sharp reporting on the deals, markets, and founders shaping India's economy — newest first.",
    match: isNews,
  },
  legacy: {
    eyebrow: "The Long Read",
    title: "Business Legacy",
    subtitle:
      "Deep research files on the empires that built modern India — their governance, trust structures and staying power.",
    match: isLegacy,
  },
  startups: {
    eyebrow: "The Startup Desk",
    title: "Startup Stories",
    subtitle:
      "The founders, funding rounds and breakout ventures defining India's next generation of companies.",
    match: isStartup,
  },
};

const Cover = ({ article, className = "" }: { article: Article; className?: string }) => (
  <div className={`relative overflow-hidden bg-muted ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
      <span className="font-serif text-muted-foreground/40 text-lg leading-snug">{article.title}</span>
    </div>
    <img
      src={article.image}
      alt={article.title}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  </div>
);

const MetaRow = ({ article }: { article: Article }) => (
  <div className="font-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground">
    {article.category && <span className="text-primary font-bold">{article.category}</span>}
    {article.category && <span className="h-1 w-1 rounded-full bg-border" />}
    <span className="inline-flex items-center gap-1.5">
      <Calendar className="h-3 w-3" /> {article.date}
    </span>
    {article.readTime && (
      <>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3 w-3" /> {article.readTime}
        </span>
      </>
    )}
  </div>
);

const BusinessInsights = ({ feed = "insights" }: { feed?: Feed }) => {
  const meta = FEED_META[feed];
  // Only the articles belonging to this feed/tab.
  const feedArticles = articles.filter(meta.match);
  // The newest article always takes the hero slot, so every new article pushed
  // is automatically featured on top. (`featured` can still pin one as a fallback.)
  const latest = feedArticles[0] ?? feedArticles.find((a) => a.featured);
  const rest = feedArticles.filter((a) => a !== latest);

  return (
    <Layout>
      {/* ===== Page header — newspaper masthead style ===== */}
      <section className="relative pt-14 pb-8 border-b-4 border-foreground">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="font-mono text-primary font-bold tracking-[0.3em] uppercase text-[11px]">
                {meta.eyebrow}
              </span>
              <span className="font-mono text-muted-foreground text-[11px] uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight text-foreground">
              {meta.title}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl text-lg font-light">
              {meta.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 pb-24">
        {/* ===== Latest / featured story ===== */}
        {latest && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative grid lg:grid-cols-2 gap-0 my-12 border border-border bg-card hover:shadow-xl transition-shadow"
          >
            <Link to={`/business-insights/${latest.id}`} className="absolute inset-0 z-20" aria-label={latest.title} />
            <Cover article={latest} className="h-72 lg:h-full min-h-[340px]" />
            <div className="p-8 md:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border">
              <div className="font-mono inline-flex items-center gap-2 self-start mb-5 border border-primary text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> Latest Story
              </div>
              <MetaRow article={latest} />
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.1] mt-4 mb-4 text-foreground group-hover:text-primary transition-colors">
                {latest.title}
              </h2>
              {latest.excerpt && (
                <p className="text-foreground/75 text-lg leading-relaxed line-clamp-3">
                  {highlightKeywords(latest.excerpt)}
                </p>
              )}
              <span className="mt-7 text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read full story <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.article>
        )}

        {/* ===== Section label ===== */}
        {rest.length > 0 && (
          <div className="flex items-center gap-4 mb-8 border-b-2 border-foreground pb-2">
            <h3 className="font-serif text-2xl md:text-3xl font-bold whitespace-nowrap text-foreground">
              More Stories
            </h3>
          </div>
        )}

        {/* ===== Grid of the rest ===== */}
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 items-stretch bg-border border border-border">
          {rest.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group bg-card flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/business-insights/${article.id}`} className="flex flex-col flex-1">
                <Cover article={article} className="h-52" />
                <div className="p-6 flex flex-col flex-1">
                  <MetaRow article={article} />
                  <h3 className="font-serif text-xl font-bold leading-snug mt-3 mb-2 text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {highlightKeywords(article.excerpt)}
                    </p>
                  )}
                  <span className="mt-5 pt-4 border-t border-border text-primary text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BusinessInsights;
