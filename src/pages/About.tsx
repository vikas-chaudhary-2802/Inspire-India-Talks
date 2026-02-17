import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Sparkles } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden gradient-mesh">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Our Story</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text mb-8">
              Inspire India Talks did not begin in a boardroom.<br />
              <span className="text-primary">It began in small towns.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/public/founder-photo.png"
                alt="Founder Shamshad Alam"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-6">Founder <span className="text-primary">Shamshad Alam</span></h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              comes from the kind of India where ambition is strong but platforms are rare. Growing up outside metropolitan privilege meant witnessing something powerful and painful at the same time — talent exists everywhere, but visibility does not.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Across Bharat, there are teachers transforming classrooms without recognition. Entrepreneurs building from zero without funding. Women leading silently without headlines. Students breaking barriers without applause.
            </p>
            <div className="mt-6 p-4 border-l-4 border-primary bg-primary/5">
              <p className="font-medium text-foreground">
                The problem was never lack of potential. The problem was lack of access.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">The Realisation</h2>
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">

            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Over years of working closely with youth and educational communities, one pattern became clear:
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Students often admire global icons. But they rarely meet role models who look like them, speak like them, or began where they began.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xl font-serif italic text-muted-foreground">"Inspiration felt distant. Success felt urban. Stories felt imported."</p>
              </div>
              <div>
                <p className="font-medium mb-2">The question emerged:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>What if Bharat had its own stage?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>What if unheard Indian journeys were documented, celebrated, and amplified?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>What if young people could see proof that geography does not define possibility?</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xl font-bold text-center text-primary">That thought became Inspire India Talks.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-6">What Inspire India Talks Stands For</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Inspire India Talks is not a motivational show. It is not a celebrity platform. It is not a PR-driven stage.
            </p>
            <p className="text-lg font-medium text-foreground mb-6">
              It is a storytelling movement rooted in Indian realities.
            </p>
            <div className="space-y-4">
              {[
                "India's strongest stories are often off-camera",
                "Leadership is built in struggle, not spotlight",
                "Innovation does not require a metro address",
                "Representation creates belief"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium">This platform exists to bring voices from the ground to the stage.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              The Bharat Narrative
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              In today's India, conversations are shifting. We speak about startups from small cities. We celebrate grassroots innovation. We talk about inclusive growth, social impact, and youth leadership.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              But storytelling has not fully caught up.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Inspire India Talks aims to build a new narrative — One where Bharat is not an afterthought. One where stories from villages, districts, and non-metro India stand at the center.
            </p>
            <p className="font-medium text-primary text-lg">
              Because the future of India is not only urban. It is distributed. It is diverse. It is deeply local.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-secondary/30 rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">A Growing Movement</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              What began as a personal conviction is now evolving into a national youth storytelling platform.
            </p>
            <div className="max-w-2xl mx-auto text-left glass-card p-8 mb-8">
              <p className="font-medium mb-4 text-center">Inspire India Talks is committed to:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Celebrating real Indian journeys",
                  "Making inspiration relatable",
                  "Creating spaces for thoughtful dialogue",
                  "Building a culture of grounded leadership"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-2xl font-serif font-bold text-foreground">
              This is not just about talks.<br />
              <span className="text-primary">It is about rewriting whose stories get heard.</span>
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default About;
