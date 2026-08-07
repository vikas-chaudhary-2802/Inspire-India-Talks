import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Handshake,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const missionPillars = [
  {
    icon: Sparkles,
    title: "Inspire",
    text: "Share real journeys that make ambition feel close, possible, and Indian.",
    image: "/images/founder-stories/srikanth-bolla.webp",
  },
  {
    icon: BookOpen,
    title: "Educate",
    text: "Turn lived experience into practical lessons for students, founders, and young leaders.",
    image: "/images/founder-stories/anand-kumar.jpeg",
  },
  {
    icon: Rocket,
    title: "Empower",
    text: "Give emerging voices the confidence to build, lead, serve, and dream beyond geography.",
    image: "/images/events/Khushi-grewal.jpg",
  },
  {
    icon: Users,
    title: "Connect",
    text: "Bring together changemakers, institutions, and youth through thoughtful storytelling.",
    image: "/images/conference-crowd.png",
  },
];

const journey = [
  {
    year: "Origin",
    title: "A Small-Town Conviction",
    text: "The idea began with a simple belief: talent exists everywhere, but visibility does not.",
  },
  {
    year: "Stage",
    title: "Voices From Bharat",
    text: "Inspire India Talks started documenting founders, educators, officers, artists, and social leaders.",
  },
  {
    year: "Community",
    title: "Youth Conversations",
    text: "The platform grew into a space where young Indians could meet stories that felt relatable.",
  },
  {
    year: "Now",
    title: "A Growing Movement",
    text: "Today, the mission is expanding through stories, events, campaigns, and partnerships.",
  },
];

const coverAreas = [
  {
    title: "Inspiring Voices",
    category: "Stories",
    image: "/images/founder-stories/srikanth-bolla.webp",
  },
  {
    title: "Business Insights",
    category: "Ideas",
    image: "/images/business-insights/non-metro-startup-story.png",
  },
  {
    title: "Youth Leadership",
    category: "Impact",
    image: "/images/events/Khushi-grewal.jpg",
  },
  {
    title: "Innovation",
    category: "Future",
    image: "/images/business-insights/deeptech.png",
  },
  {
    title: "Education",
    category: "Learning",
    image: "/images/founder-stories/anand-kumar.jpeg",
  },
  {
    title: "Social Change",
    category: "Bharat",
    image: "/images/founder-stories/Chami-Murmu.jpg",
  },
];

const whyPoints = [
  "Real Indian journeys, not borrowed motivation",
  "Voices from towns, districts, campuses, and grassroots communities",
  "Stories curated for young builders, students, educators, and leaders",
  "A platform where visibility becomes belief",
];

const About = () => {
  return (
    <Layout>
      <section id="top" className="relative overflow-hidden border-b border-white/5 gradient-mesh">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 lg:self-center"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                  India&apos;s storytelling platform
                </span>
              </div>

              <h1 className="font-serif mt-8 max-w-5xl text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
                Inspiring minds.
                <br />
                <span className="text-primary">Shaping India&apos;s</span>{" "}
                <span className="italic font-normal text-foreground">future.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70">
                Inspire India Talks is built to document stories, ideas, innovations, and
                journeys that help young India see what is possible from wherever they begin.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/inspiring-voices"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Explore Stories
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  Partner With Us
                </Link>
              </div>

              <div className="mt-14 grid max-w-xl grid-cols-3 gap-6">
                {[
                  ["50+", "Voices"],
                  ["12+", "States"],
                  ["40+", "Sectors"],
                ].map(([value, label]) => (
                  <div key={label} className="border-l border-primary pl-4">
                    <div className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:col-span-5 lg:block"
            >
              <div className="relative h-full min-h-[560px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="/images/conference-stage.png"
                  alt="Inspire India Talks event stage"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                    Stories. Ideas. Impact.
                  </div>
                  <div className="font-serif mt-3 text-2xl font-semibold leading-tight">
                    A stage for the India that is building quietly.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="founder" className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="/images/founder-photo.png"
                alt="Founder Shamshad Alam"
                className="aspect-[4/5] h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                  Founder
                </div>
                <div className="font-serif mt-2 text-2xl font-semibold">Shamshad Alam</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-8"
          >
            <SectionLabel>Meet The Founder</SectionLabel>
            <h2 className="font-serif mt-6 text-4xl font-bold leading-tight md:text-6xl">
              The story behind <span className="text-primary">our story.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Storyteller", "Youth Builder", "Bharat First", "Platform Creator"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/70"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-foreground/75">
              Shamshad Alam comes from the kind of India where ambition is strong but
              platforms are rare. Growing up outside metropolitan privilege meant seeing a
              truth up close: talent exists everywhere, but visibility does not.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/75">
              Inspire India Talks was born from that conviction. The platform exists to bring
              grounded Indian journeys to the front, so students, builders, and young leaders
              can meet role models who began closer to where they are.
            </p>
            <figure className="glass-card relative mt-8 overflow-hidden border-l-2 border-primary p-8 pl-10">
              <span className="font-serif pointer-events-none absolute -top-4 left-4 select-none text-7xl leading-none text-primary/25">
                &ldquo;
              </span>
              <blockquote className="font-serif relative text-2xl font-medium italic leading-snug text-foreground md:text-3xl">
                The problem was never lack of potential. The problem was lack of access.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm not-italic text-foreground/60">
                <span className="h-px w-8 bg-primary" /> Shamshad Alam, Founder
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      <section id="mission" className="border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 className="font-serif mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Four pillars driving everything{" "}
                <span className="text-primary">we publish.</span>
              </h2>
            </div>
            <p className="max-w-md text-foreground/65">
              A clear purpose shapes our stories, our events, our partners, and every
              conversation we choose to amplify.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {missionPillars.map(({ icon: Icon, title, text, image }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
                <div className="relative p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-serif text-xs tracking-[0.25em] text-primary/80">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif mt-6 text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="font-serif mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Milestones that shaped <span className="text-primary">the road ahead.</span>
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {journey.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative border-l border-white/10 pl-6"
              >
                <div className="absolute -left-[7px] top-0 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background shadow-[0_0_20px_hsl(var(--primary)/0.7)]" />
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  {item.year}
                </div>
                <h3 className="font-serif mt-3 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cover" className="border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-14 max-w-3xl">
            <SectionLabel>What We Cover</SectionLabel>
            <h2 className="font-serif mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Editorial pillars, <span className="text-primary">one mission.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/65">
              From classrooms to startups, from public service to grassroots innovation, the
              platform follows stories that move India forward.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={area.image}
                  alt={area.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                  {area.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-semibold leading-tight transition group-hover:text-primary">
                    {area.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-xs text-foreground/60">
                    Read latest <span className="h-px w-8 bg-current" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1 lg:col-span-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/conference-crowd.png"
                  alt="Audience at Inspire India Talks"
                  className="aspect-[3/4] rounded-2xl border border-white/10 object-cover"
                />
                <img
                  src="/images/business-insights/startup-funding-2026.jpg"
                  alt="Startup and innovation discussion"
                  className="mt-12 aspect-[3/4] rounded-2xl border border-white/10 object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 lg:col-span-6"
            >
              <SectionLabel>Why Inspire India Talks?</SectionLabel>
              <h2 className="font-serif mt-6 text-4xl font-bold leading-tight md:text-6xl">
                We bridge inspiration <span className="text-primary">with action.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-foreground/70">
                Young people do not only need success stories. They need believable proof,
                practical insight, and representation that tells them their starting point is
                not their limit.
              </p>
              <ul className="mt-10 space-y-4">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground/80">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="vision" className="relative overflow-hidden border-t border-white/5 py-24 md:py-36">
        <div className="absolute inset-0 gradient-mesh opacity-70" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-primary">
              <Target className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                Our Vision
              </span>
            </div>
            <h2 className="font-serif mx-auto mt-8 max-w-5xl text-4xl font-bold leading-tight md:text-7xl">
              To become India&apos;s most trusted platform for{" "}
              <span className="text-primary">inspiration, knowledge, and transformative storytelling.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70">
              Built for the leaders of tomorrow: entrepreneurs, educators, innovators,
              students, and changemakers writing India&apos;s next chapter.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="join" className="border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="glass-card overflow-hidden p-8 md:p-14 lg:p-16"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <SectionLabel>Join The Movement</SectionLabel>
                <h2 className="font-serif mt-6 text-4xl font-bold leading-tight md:text-6xl">
                  Be part of a community{" "}
                  <span className="text-primary">shaping India&apos;s future.</span>
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-foreground/70">
                  Read the stories, host a conversation, partner with the platform, or help us
                  bring more unheard Indian journeys into the light.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-5">
                <Link
                  to="/inspiring-voices"
                  className="inline-flex items-center justify-between rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Explore Stories
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/events"
          