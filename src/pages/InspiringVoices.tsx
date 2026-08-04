import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { personalities } from "@/data/personalities";

const FoundersStories = () => {
  // Sort personalities by date
  const stories = [...personalities]
    .sort((a, b) => (b.addedAt ? new Date(b.addedAt).getTime() : 0) - (a.addedAt ? new Date(a.addedAt).getTime() : 0));

  const leadStory = stories[0];
  const gridStories = stories.slice(1);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        
        {/* Section Header — newspaper masthead style (matches other pages) */}
        <div className="pt-6 pb-8 border-b-4 border-foreground mb-8">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-mono text-primary font-bold tracking-[0.3em] uppercase text-[11px]">
              Inspiring Voices
            </span>
            <span className="font-mono text-muted-foreground text-[11px] uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight text-foreground">
            Founders Stories
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl text-lg font-light">
            The people building a new India — reported profiles of the founders whose choices shaped their companies.
          </p>
        </div>

        {/* Lead Story */}
        {leadStory && (
          <article className="mb-12 border-b border-border pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                <Link to={`/personality/${leadStory.id}`}>
                  <img
                    src={leadStory.image}
                    alt={leadStory.name}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3">Feature</span>
              <Link to={`/personality/${leadStory.id}`} className="group">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] mb-6 group-hover:text-primary transition-colors">
                  {leadStory.name} built India's most profitable broker by raising nothing
                </h2>
                <p className="text-xl text-foreground/80 font-serif leading-relaxed mb-6">
                  In an era measured by funding rounds, {leadStory.name} made frugality the entire strategy.
                </p>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  <span>By Editorial Desk</span>
                  <span>•</span>
                  <span>{leadStory.addedAt ? new Date(leadStory.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jul 29, 2026'}</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </Link>
            </div>
          </article>
        )}

        {/* Grid Stories */}
        <div>
          <div className="flex items-center gap-2 mb-8 border-b border-border pb-2">
            <h3 className="font-serif text-3xl font-bold text-foreground">
              More from this desk
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {gridStories.map((p) => (
              <article key={p.id} className="group cursor-pointer flex flex-col">
                <Link to={`/personality/${p.id}`} className="flex flex-col h-full">
                  <div className="aspect-square mb-4 overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">Profile</span>
                  <h4 className="font-serif text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                    {p.name} {p.title.toLowerCase().includes('founder') ? '' : '— ' + p.title}
                  </h4>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-3 flex-grow">
                    {p.knownFor}
                  </p>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mt-auto border-t border-border/50 pt-3">
                    By Editorial Desk • {p.addedAt ? new Date(p.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jul 27, 2026'}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default FoundersStories;
