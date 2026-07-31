import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { personalities } from "@/data/personalities";
import { businessinsights } from "@/data/businessinsights";
import { businesslegacy } from "@/data/businesslegacy";
import { businessstartups } from "@/data/businessstartups";
import { events } from "@/data/events";
import { Radio } from "lucide-react";
import NewsletterSheet from "@/components/NewsletterSheet";

const Index = () => {
  // Each homepage section mirrors its tab, and each tab now has its own data file.
  const newsStories = businessinsights;      // Business Insights (news)
  const legacyStories = businesslegacy;      // Business Legacy
  const startupAll = businessstartups;       // Startups

  const tickerItems = newsStories.slice(0, 8).map((a) => a.title);

  // Get stories for different sections
  const mainStory = personalities[0];
  const insightStories = newsStories.slice(0, 3);
  const legacyStory = legacyStories[0] || businessinsights[0]; // newest Business Legacy
  const startupStories = startupAll.slice(0, 4);
  const inBriefStories = newsStories.slice(3, 6);

  // ===== Right-rail modules =====
  // "Most Read" — a blend across desks, offset from what's already shown above.
  const mostRead = [
    legacyStories[0],
    newsStories[6],
    startupAll[0],
    legacyStories[1],
    newsStories[7],
  ].filter(Boolean);

  // "Voices" — a pull quote from a founder (skip the lead, who already headlines).
  const voice = personalities.slice(1).find((p) => p.quote) ?? personalities[1] ?? personalities[0];

  // "Founders to Watch" — quick-hit profile list.
  const foundersToWatch = personalities.slice(1, 5);

  // "What's On" — events for the bottom of the rail.
  const whatsOn = events.slice(0, 3);

  return (
    <Layout>
      {/* Ticker Strip */}
      {tickerItems.length > 0 && (
        <div className="bg-foreground text-background border-b-[3px] border-foreground">
          <div className="container mx-auto px-4 flex items-center gap-4 py-2">
            <span className="shrink-0 inline-flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Radio className="h-3 w-3 animate-pulse" /> LATEST
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...tickerItems, ...tickerItems].map((t, i) => (
                  <span key={i} className="text-[11px] font-medium text-background/90 mx-8 flex items-center">
                    {t}
                    <span className="ml-8 text-primary">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 lg:border-r border-border lg:pr-8">

            {/* Main Headline Story */}
            <article className="mb-12 border-b border-border pb-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
                  Founders Stories
                </span>
              </div>
              <Link to={`/personality/${mainStory.id}`} className="group block">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] mb-6 group-hover:text-primary transition-colors">
                  {mainStory.name} {mainStory.title.toLowerCase().includes('founder') ? '' : '— ' + mainStory.title}
                </h2>
                <div className="aspect-[16/9] mb-6 overflow-hidden bg-muted">
                  <img
                    src={mainStory.image}
                    alt={mainStory.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <p className="text-xl md:text-2xl text-foreground/80 font-serif leading-relaxed mb-4">
                  {mainStory.knownFor}
                </p>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  <span>By Editorial Desk</span>
                  <span>•</span>
                  <span>{mainStory.addedAt ? new Date(mainStory.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jul 29, 2026'}</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </Link>
            </article>

            {/* Business Insights Row */}
            <section className="mb-12 border-b border-border pb-12">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
                <h3 className="font-serif text-3xl font-bold text-foreground">Business Insights</h3>
                <Link to="/business-insights" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                  More from this desk
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightStories.map((story) => (
                  <article key={story.id} className="group cursor-pointer">
                    <Link to={`/business-insights/${story.id}`}>
                      <div className="aspect-[4/3] mb-4 overflow-hidden bg-muted">
                        <img src={story.image} alt={story.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">{story.category}</span>
                      <h4 className="font-serif text-xl font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-sm text-foreground/70 line-clamp-3 mb-3">
                        {story.content.substring(0, 120)}...
                      </p>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        By Editorial Desk • {story.date}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* Business Legacy */}
            <section className="mb-12 border-b border-border pb-12">
               <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
                <h3 className="font-serif text-3xl font-bold text-foreground">Business Legacy</h3>
                <Link to="/business-legacy" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                  Deep research files
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <article className="group cursor-pointer col-span-1 md:col-span-2">
                  <Link to={`/business-insights/${legacyStory.id}`}>
                    <div className="aspect-[21/9] mb-4 overflow-hidden bg-muted">
                      <img src={legacyStory.image} alt={legacyStory.title} className="w-full h-full object-cover sepia-[30%] group-hover:sepia-0 transition-all duration-500" />
                    </div>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">The Long Read</span>
                    <h4 className="font-serif text-3xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                      {legacyStory.title}
                    </h4>
                    <p className="text-lg text-foreground/80 font-serif mb-4">
                      A deep research file on the governance design, trust structure and succession discipline behind India's most enduring empires.
                    </p>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      By Editorial Desk • {legacyStory.date} • 22 min read
                    </div>
                  </Link>
                </article>
              </div>
            </section>

            {/* Startup Stories */}
            <section className="mb-12 lg:mb-0">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
                <h3 className="font-serif text-3xl font-bold text-foreground">Startup Stories</h3>
                <Link to="/startup-stories" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                  The Startup Desk
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {startupStories.map((story) => (
                  <article key={story.id} className="group cursor-pointer">
                    <Link to={`/business-insights/${story.id}`}>
                      <div className="aspect-square mb-3 overflow-hidden bg-muted">
                        <img src={story.image} alt={story.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">{story.category}</span>
                      <h4 className="font-serif text-base font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                        {story.title}
                      </h4>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                        By Editorial Desk • {story.date}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-10">

            {/* In Brief */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  In Brief
                </h3>
              </div>
              <div className="space-y-6">
                {inBriefStories.map((story) => (
                  <article key={story.id} className="group border-b border-border pb-6 last:border-0">
                    <Link to={`/business-insights/${story.id}`}>
                      <span className="text-primary text-[9px] font-bold uppercase tracking-widest mb-1.5 block">
                        {story.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-1.5">
                        {story.title}
                      </h4>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        {story.date}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Most Read */}
            {mostRead.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Most Read
                  </h3>
                </div>
                <ol className="space-y-5">
                  {mostRead.map((story, i) => (
                    <li key={story.id}>
                      <Link
                        to={`/business-insights/${story.id}`}
                        className="group flex gap-4 items-start border-b border-border pb-5 last:border-0"
                      >
                        <span className="font-serif text-4xl font-black text-primary/30 leading-none w-9 shrink-0 group-hover:text-primary transition-colors">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <span className="text-primary text-[9px] font-bold uppercase tracking-widest mb-1 block">
                            {story.category}
                          </span>
                          <h4 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                            {story.title}
                          </h4>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Voices — quote of the week */}
            {voice && (
              <div className="bg-foreground text-background p-8">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest block mb-4">
                  Voices
                </span>
                <Link to={`/personality/${voice.id}`} className="group block">
                  <blockquote className="font-serif text-2xl font-bold italic leading-tight mb-5 group-hover:text-primary transition-colors">
                    “{voice.quote}”
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-background/20">
                    <img
                      src={voice.image}
                      alt={voice.name}
                      className="h-11 w-11 rounded-full object-cover bg-muted"
                      style={{ objectPosition: "center 25%" }}
                    />
                    <div>
                      <p className="text-sm font-bold">{voice.name}</p>
                      <p className="text-[11px] text-background/60 uppercase tracking-wider">{voice.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Founders to Watch */}
            {foundersToWatch.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Founders to Watch
                  </h3>
                </div>
                <div className="space-y-4">
                  {foundersToWatch.map((p) => (
                    <Link key={p.id} to={`/personality/${p.id}`} className="group flex gap-4 items-center">
                      <div className="h-14 w-14 shrink-0 overflow-hidden bg-muted rounded-full">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                          style={{ objectPosition: "center 25%" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{p.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* What's On — events */}
            {whatsOn.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6 border-b-2 border-foreground pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    What's On
                  </h3>
                  <Link to="/events" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                    All events
                  </Link>
                </div>
                <div className="space-y-5">
                  {whatsOn.map((ev) => (
                    <Link
                      key={ev.id}
                      to={`/events/${ev.slug}`}
                      className="group flex gap-4 border-b border-border pb-5 last:border-0"
                    >
                      <div className="shrink-0 w-14 text-center border border-border py-2">
                        <span className="block font-serif text-lg font-black text-primary leading-none">
                          {ev.date.match(/\d+/)?.[0] ?? ""}
                        </span>
                        <span className="block text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                          {ev.date.split(" ")[0].slice(0, 3)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{ev.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Box */}
            <div className="bg-secondary/50 p-8 border border-border">
              <div className="mb-4">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest block mb-2">The Newsletter</span>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  One considered edition, every Friday
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                  The week's reporting from all five desks, condensed for readers who are short on time and long on curiosity.
                </p>
              </div>
              <NewsletterSheet source="home-sidebar" triggerLabel="Subscribe Free" />
            </div>

          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
