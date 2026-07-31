import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

/* ------------------------------ DATA ------------------------------ */
const whatWeDo: { title: string; body: string }[] = [
  {
    title: "Founder Stories",
    body: "Real journeys of entrepreneurs, innovators, and business leaders.",
  },
  {
    title: "Podcasts & Interviews",
    body: "Candid conversations with founders and industry experts.",
  },
  {
    title: "Business Insights",
    body: "Analysis of startups, markets, funding, technology, and leadership.",
  },
  {
    title: "Business Legacy",
    body: "The history and evolution of iconic Indian houses — Tata, Birla, Godrej, Mahindra, Bajaj, and many more.",
  },
  {
    title: "Innovation Stories",
    body: "Emerging technologies, ideas, and businesses shaping tomorrow.",
  },
];

const highlights: string[] = [
  "Founder of Inspire India Talks",
  "Founder & CEO of Edunachal",
  "Education entrepreneur",
  "Featured among inspiring young leaders by Livemint (2015)",
  "Passionate about entrepreneurship, education & innovation",
  "Speaker, mentor & startup-ecosystem contributor",
];

const visionItems: string[] = [
  "Founder stories",
  "Business history",
  "Startup ecosystem insights",
  "Leadership lessons",
  "Innovation stories",
  "Entrepreneur interviews",
  "Business documentaries",
  "Podcasts & conversations",
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

/* --------------------------- SMALL PIECES --------------------------- */
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-primary font-bold uppercase tracking-[0.3em] text-[11px]">
    {children}
  </span>
);

const SectionHead = ({ kicker, title }: { kicker: string; title: ReactNode }) => (
  <div className="mb-8 border-b-2 border-foreground pb-3">
    <Eyebrow>{kicker}</Eyebrow>
    <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground mt-3">
      {title}
    </h2>
  </div>
);

/* -------------------------------- PAGE -------------------------------- */
const About = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-5 md:px-8" data-testid="about-page">
        {/* ============ MASTHEAD ============ */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-14 pb-10 border-b-4 border-foreground"
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <span className="font-mono text-primary font-bold tracking-[0.3em] uppercase text-[11px]">
              About &middot; The Masthead
            </span>
            <span className="font-mono text-muted-foreground text-[11px] uppercase tracking-widest">
              Inspire India Talks
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground max-w-5xl">
            Every founder has a story. <span className="text-primary">Every story can inspire a generation.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-foreground/70 font-serif">
            Inspire India Talks documents the journeys of founders, entrepreneurs, innovators, business leaders, and iconic companies. Through interviews, podcasts, articles, and business insights, we preserve the stories behind success — so they can inspire the builders of tomorrow.
          </p>
        </motion.header>

        {/* ============ OUR MISSION ============ */}
        <motion.section {...fadeUp} className="mt-20 md:mt-28">
          <SectionHead kicker="Our Mission" title="Why We Exist" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground">
                Every successful company began with an idea. Every entrepreneur faced uncertainty. Every leader made difficult decisions.
              </p>
              <p className="mt-6 font-mono text-sm uppercase tracking-widest text-primary">
                Yet most of these lessons remain untold.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6 text-lg leading-[1.9] text-foreground/75">
              <p>
                At Inspire India Talks, we believe that behind every successful founder and every legendary business lies a story capable of changing someone&apos;s life.
              </p>
              <p>
                Our mission is to capture those stories and make them accessible to aspiring entrepreneurs, students, professionals, investors, and anyone who wants to build something meaningful.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ WHAT WE DO ============ */}
        <motion.section {...fadeUp} className="mt-20 md:mt-28">
          <SectionHead kicker="What We Do" title="The Desks We Run" />
          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, i) => (
              <div key={i} className="bg-background p-7 flex flex-col">
                <span className="font-mono text-[11px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mt-3">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{item.body}</p>
              </div>
            ))}
            <div className="bg-background p-7 flex flex-col justify-center">
              <p className="font-serif text-lg italic text-foreground/60">
                Stories that educate better than theory.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ WHY WE'RE DIFFERENT ============ */}
        <motion.section {...fadeUp} className="mt-20 md:mt-28">
          <SectionHead kicker="Why We're Different" title="We Focus on the Journey" />
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <p className="lg:col-span-6 font-serif text-2xl md:text-3xl leading-snug text-foreground">
              Most platforms focus on headlines. We focus on the journey.
            </p>
            <div className="lg:col-span-6 space-y-6 text-lg leading-[1.9] text-foreground/75">
              <p>
                Instead of simply reporting success, we explore the decisions, failures, lessons, and turning points that shaped remarkable entrepreneurs and businesses.
              </p>
              <p className="font-semibold text-foreground">
                Because stories educate better than theories.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ MEET THE FOUNDER ============ */}
        <motion.section {...fadeUp} id="founder" className="mt-20 md:mt-28">
          <SectionHead kicker="Meet the Founder" title="Shamshad Alam" />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <figure>
                <div className="overflow-hidden border border-border">
                  <img
                    src="/images/founder-photo.png"
                    alt="Shamshad Alam, Founder of Inspire India Talks"
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                </div>
                <figcaption className="mt-4 border-t-2 border-foreground pt-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-serif text-lg font-bold text-foreground">Shamshad Alam</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Founder, Inspire India Talks
                    </div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/shamshad-alam-791b9067/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Shamshad Alam on LinkedIn"
                    className="shrink-0 text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </figcaption>
              </figure>

              {/* Highlights box */}
              <div className="mt-8 border border-border bg-card p-6">
                <Eyebrow>Highlights</Eyebrow>
                <ul className="mt-4 divide-y divide-border">
                  {highlights.map((h, i) => (
                    <li key={i} className="py-2.5 text-sm leading-snug text-foreground/80 flex gap-3">
                      <span className="text-primary font-bold">&mdash;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-6 text-lg leading-[1.9] text-foreground/80">
                <p className="first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                  As an entrepreneur and education leader, I have spent years working closely with students, startups, innovators, and business leaders. During this journey, I realised that while successful founders create immense value for society, their experiences often remain undocumented or inaccessible to those who could learn from them.
                </p>
                <p>
                  That realisation led to the creation of Inspire India Talks. My vision is to build one of India&apos;s most trusted platforms for entrepreneurial storytelling — where every founder, every business, and every innovation contributes knowledge that inspires the next generation of builders.
                </p>
              </div>

              <blockquote className="mt-10 border-l-4 border-primary pl-7">
                <p className="font-serif text-2xl md:text-[1.8rem] leading-snug text-foreground">
                  Success leaves clues &mdash; but those clues are often hidden inside personal stories.
                </p>
              </blockquote>

              {/* Why I started */}
              <div className="mt-12 border-t-2 border-foreground pt-8">
                <Eyebrow>Why I Started Inspire India Talks</Eyebrow>
                <div className="mt-5 space-y-5 text-lg leading-[1.9] text-foreground/75">
                  <p>
                    Every founder has moments of doubt, failure, resilience, and breakthrough. Unfortunately, many of these experiences are never recorded.
                  </p>
                  <p>
                    Inspire India Talks was created to preserve those journeys, so future entrepreneurs can learn directly from the people who have already walked the path.
                  </p>
                  <p className="font-semibold text-foreground">
                    If one conversation gives someone the courage to start a business, our mission is fulfilled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============ OUR VISION ============ */}
        <motion.section {...fadeUp} className="mt-20 md:mt-28">
          <SectionHead kicker="Our Vision" title="India's Largest Library of Entrepreneurial Stories" />
          <p className="max-w-3xl text-lg leading-[1.9] text-foreground/75">
            We envision Inspire India Talks becoming India&apos;s most trusted destination for:
          </p>
          <div className="mt-8 grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-4">
            {visionItems.map((v, i) => (
              <div key={i} className="bg-background p-6">
                <span className="font-mono text-[11px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-lg font-semibold text-foreground mt-2 leading-snug">{v}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ============ JOIN THE JOURNEY ============ */}
        <motion.section {...fadeUp} className="mt-20 md:mt-28 mb-24">
          <div className="border-y-4 border-foreground py-12 text-center">
            <Eyebrow>Join the Journey</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tight text-foreground mt-4 max-w-3xl mx-auto leading-[1.1]">
              Your story matters.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-foreground/70">
              Whether you&apos;re a founder, entrepreneur, investor, innovator, student, or business enthusiast — join us in building a platform that celebrates entrepreneurship and inspires future generations.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="font-mono text-[12px] font-bold uppercase tracking-widest bg-foreground text-background px-7 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Share Your Story
              </Link>
              <Link
                to="/founders-talk"
                className="font-mono text-[12px] font-bold uppercase tracking-widest border border-foreground text-foreground px-7 py-3.5 hover:border-primary hover:text-primary transition-colors"
              >
                Read the Stories
              </Link>
            </div>
            <p className="mt-10 font-serif italic text-lg text-foreground/60">
              Share your story. Inspire the next one.
            </p>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
