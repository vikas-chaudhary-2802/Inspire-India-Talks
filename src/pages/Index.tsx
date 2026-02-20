import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import PersonalityCard from "@/components/PersonalityCard";
import { categories, getFeaturedPersonalities, personalities } from "@/data/personalities";
import { ArrowRight, Users, BookOpen, Star, Award, Play, Send, Briefcase, Landmark, Rocket, Crown, GraduationCap, Stethoscope, Leaf, Trophy, Shield, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const heroQuotes = [
  { text: "Inspiration that builds nations.", sub: "Stories of those who shaped India's future." },
  { text: "Dream. Dare. Disrupt.", sub: "50+ journeys of relentless ambition." },
  { text: "From struggle to triumph.", sub: "Real stories of India's greatest achievers." },
];

const categoryIcons: Record<string, React.ReactNode> = {
  entrepreneurs: <Briefcase className="h-8 w-8" />,
  "leading-ladies": <Crown className="h-8 w-8" />,
  "teachers-educators": <BookOpen className="h-8 w-8" />,
  "medical-heroes": <Stethoscope className="h-8 w-8" />,
  environmentalists: <Leaf className="h-8 w-8" />,
  "sports-icons": <Trophy className="h-8 w-8" />,
  "indian-heroes": <Shield className="h-8 w-8" />,
  "young-achievers": <Zap className="h-8 w-8" />,
  others: <Users className="h-8 w-8" />,
};

const WEB3FORMS_KEY = "30ad2072-0d0d-4d0b-8c55-ebeb571f65e4";

const Index = () => {
  const featured = getFeaturedPersonalities();
  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % heroQuotes.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const storyOfWeek = personalities.find(p => p.id === "ratan-tata")!;

  return (
    <div ref={pageRef} onMouseMove={handleMouseMove} className="relative">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y - window.scrollY}px, hsl(24 95% 53% / 0.07), transparent 40%)`,
        }}
      />
      <Layout>
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden gradient-mesh">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
          </div>

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left — Quotes */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs">Inspire India Talks</span>
                </div>

                <motion.h1
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="font-serif text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] glow-text"
                >
                  {heroQuotes[quoteIdx].text}
                </motion.h1>

                <motion.p
                  key={`sub-${quoteIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
                >
                  {heroQuotes[quoteIdx].sub}
                </motion.p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/category/entrepreneurs"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    Explore Stories <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/host-event"
                    className="inline-flex items-center gap-2 border border-border text-foreground/80 px-8 py-4 rounded-xl font-medium hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <Play className="h-4 w-4" /> Host a Talk
                  </Link>
                </div>
              </motion.div>

              {/* Right — Conference Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="hidden lg:block relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] glass-card group">
                  <img
                    src="/images/conference-stage.png"
                    alt="Inspire India Talks — Live conference session"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 glass-card px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-foreground/90 tracking-wider uppercase">Live Events</span>
                  </div>
                </div>
                {/* Secondary image overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 w-40 h-28 rounded-xl overflow-hidden glass-card border border-primary/20 shadow-2xl shadow-primary/10"
                >
                  <img
                    src="/images/conference-crowd.png"
                    alt="Inspire India Talks — Audience"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/50 py-8">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Users className="h-5 w-5" />, number: "500+", label: "Inspiring Stories" },
              { icon: <BookOpen className="h-5 w-5" />, number: "30+", label: "Categories" },
              { icon: <Star className="h-5 w-5" />, number: "100+", label: "Achievements" },
              { icon: <Award className="h-5 w-5" />, number: "500+", label: "Inspiration" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-primary">{stat.icon}</div>
                <span className="text-2xl font-bold font-serif text-foreground">{stat.number}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Talks */}
        <section className="container mx-auto px-4 py-20">
          <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative z-10">
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Coming Soon</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">Upcoming Inspire Talks</h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Live sessions, speaker events, and fireside chats with India's most inspiring personalities. Stay tuned for announcements.
              </p>
              <Link
                to="/host-event"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium mt-8 hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Host an Inspire Talk <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <RegistrationSection />

        {/* Story of the Week */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Story of the Week</span>
          </div>
          <Link to={`/personality/${storyOfWeek.id}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-card-hover overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={storyOfWeek.image}
                  alt={storyOfWeek.name}
                  className="personality-image group-hover:scale-105 transition-transform duration-700 h-full"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">{storyOfWeek.category}</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">{storyOfWeek.name}</h2>
                <p className="text-muted-foreground mt-2">{storyOfWeek.title}</p>
                <p className="text-foreground/70 mt-6 leading-relaxed line-clamp-4">{storyOfWeek.story.substring(0, 300)}...</p>
                <blockquote className="mt-6 pl-4 border-l-2 border-primary italic text-foreground/80">
                  "{storyOfWeek.quote}"
                </blockquote>
                <div className="flex items-center gap-2 text-primary font-medium mt-8 group-hover:gap-3 transition-all">
                  Read Full Story <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Featured Personalities Slider */}
        <section className="container mx-auto px-4 py-20 overflow-hidden">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Featured</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Icons of India</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById("featured-slider");
                  if (el) el.scrollBy({ left: -400, behavior: "smooth" });
                }}
                className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("featured-slider");
                  if (el) el.scrollBy({ left: 400, behavior: "smooth" });
                }}
                className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            id="featured-slider"
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featured.map((person, i) => (
              <div key={person.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                <PersonalityCard person={person} index={i} isFeatured={true} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories — With Lucide Icons */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs">Explore by Interest</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">Browse Inspiring Voices</h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  Discover stories of excellence across diverse fields that shape the spirit of modern India.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary/10"
                  >
                    {/* Hover Background Glow */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-150" />

                    <div className="relative z-10">
                      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:from-primary/30 group-hover:ring-primary/40 shadow-lg shadow-primary/5">
                        {categoryIcons[cat.slug] || <Star className="h-8 w-8" />}
                      </div>

                      <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {cat.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between">
                        <span className="text-primary text-sm font-semibold tracking-wide uppercase opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                          View Collection
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-45deg]">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="h-px w-16 bg-primary mx-auto mb-8" />
            <blockquote className="font-serif text-2xl md:text-4xl italic text-foreground leading-relaxed glow-text">
              "I don't believe in taking right decisions. I take decisions and then make them right."
            </blockquote>
            <p className="mt-6 text-primary font-medium tracking-wider">— Ratan Tata</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Want to Inspire Your Audience?</h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Book our speakers for your next event — motivational talks featuring India's most inspiring stories.
                </p>
                <Link
                  to="/host-event"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Host a Talk <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

/* ─── Registration Form Component ─── */
const RegistrationSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Event Registration — Inspire India Talks");
    formData.append("from_name", "Inspire India Talks — Registration");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: "Registration Received! ✅", description: "We'll review your profile and send a confirmation email soon." });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
    { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
    { name: "university", label: "University / Organization", type: "text", required: false, placeholder: "Where are you from?" },
    { name: "interest", label: "Area of Interest", type: "text", required: false, placeholder: "Leadership, Tech, etc." },
  ];

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 border border-primary/10 rounded-3xl" />

        <div className="relative z-10 p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left — Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs">Register Now</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
                  Attend an <br /><span className="text-primary">Inspire Talk</span>
                </h2>
                <p className="mt-6 leading-relaxed max-w-md text-lg text-white/85">

                  Register your interest to attend our upcoming events. We'll review your profile and send a confirmation if selected.
                </p>

                <div className="mt-8 space-y-4">
                  {["Curated audience of changemakers", "Exclusive networking sessions", "Priority access to future events"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
                {fields.map((field) => (
                  <div key={field.name} className="relative">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      {field.label} {field.required && <span className="text-primary">*</span>}
                    </label>
                    <Input
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className={`bg-background/30 border-border/30 rounded-xl h-13 text-base transition-all duration-300 ${focusedField === field.name ? "border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]" : ""
                        }`}
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full rounded-xl py-7 text-base font-medium mt-2 hover:shadow-lg hover:shadow-primary/20 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Register Interest</>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Index;
