import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Layout from "@/components/Layout";
import { getPersonalityById, getPersonalitiesByCategory } from "@/data/personalities";
import { ArrowLeft, Quote, ArrowRight } from "lucide-react";

const PersonalityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const person = getPersonalityById(id || "");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

  if (!person) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold">Personality not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const related = getPersonalitiesByCategory(person.categorySlug).filter(p => p.id !== person.id).slice(0, 4);

  return (
    <Layout>
      {/* Hero Image with scroll shrink */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroRadius }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden origin-top"
      >
        <img
          src={person.image}
          alt={person.name}
          className="personality-hero-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=1200&background=1a1a2e&color=f97316&font-size=0.25&bold=true`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <Link to={`/category/${person.categorySlug}`} className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to {person.category}
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-primary text-sm uppercase tracking-widest font-medium mb-2">{person.category}</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground glow-text">{person.name}</h1>
              <p className="text-muted-foreground mt-2 text-lg">{person.title}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="glass-card p-8 md:p-10 flex gap-5 border-l-4 border-l-primary">
                <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1 opacity-60" />
                <p className="font-serif text-xl md:text-2xl italic text-foreground/90 leading-relaxed">"{person.quote}"</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">The Inspiring Story</h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-line text-lg">{person.story}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Key Achievements</h2>
              <div className="space-y-4">
                {person.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-4 glass-card p-5 border-l-2 border-l-primary/40 hover:border-l-primary transition-colors">
                    <span className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-foreground/80 pt-1.5">{a}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {person.authorName && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="mt-10 pt-6 border-t border-border/40 flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 p-4 rounded-xl">
                  <span className="italic">Story curated by</span>
                  {person.authorLinkedin ? (
                    <a
                      href={person.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline flex items-center gap-1"
                    >
                      {person.authorName}
                      <ArrowRight className="h-3 w-3 -rotate-45" />
                    </a>
                  ) : (
                    <span className="font-bold text-foreground">{person.authorName}</span>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-serif text-lg font-bold mb-5">Quick Facts</h3>
              <dl className="space-y-4 text-sm">
                {[
                  { label: "Born", value: person.born },
                  { label: "Profession", value: person.profession },
                  { label: "Known For", value: person.knownFor },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-border/30 pb-3">
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">{label}</dt>
                    <dd className="font-medium text-foreground mt-1">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {related.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-serif text-lg font-bold mb-5">Related Personalities</h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link key={r.id} to={`/personality/${r.id}`} className="flex items-center gap-3 group">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="h-12 w-12 rounded-xl object-cover bg-muted"
                        style={{ objectPosition: 'center 30%' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&size=96&background=1a1a2e&color=f97316`;
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalityDetail;
