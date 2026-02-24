import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import {
    Youtube,
    Target,
    Mic2,
    Share2,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const WEB3FORMS_KEY = "d77dc1ef-a855-4e35-9f65-f97285ea5df2";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
    }),
};

const features = [
    {
        icon: <Youtube className="h-6 w-6" />,
        title: "Long-Form YouTube Feature",
        desc: "A dedicated deep-dive episode on our growing YouTube channel, crafted for lasting impact.",
    },
    {
        icon: <Target className="h-6 w-6" />,
        title: "High-Intent Audience",
        desc: "Our viewers are students, aspiring founders, and professionals actively seeking inspiration.",
    },
    {
        icon: <Mic2 className="h-6 w-6" />,
        title: "Premium Storytelling Format",
        desc: "Thoughtfully produced conversations — not interviews. Stories told with depth and dignity.",
    },
    {
        icon: <Share2 className="h-6 w-6" />,
        title: "Cross-Platform Visibility",
        desc: "Your story reaches audiences across YouTube, Instagram, LinkedIn, and our website.",
    },
];

const stageOptions = [
    "Idea",
    "MVP",
    "Revenue Generating",
    "Funded",
    "Scaling",
];

const modeOptions = ["In-Person", "Virtual"];

const FoundersTalk = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        formData.append("access_key", WEB3FORMS_KEY);
        formData.append("subject", "Founders Talk Application — Inspire India Talks");
        formData.append("from_name", "Founders Talk Application");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: "Application Received ✅",
                    description: "Thank you. Our team will review your application and get back to you.",
                });
                (e.target as HTMLFormElement).reset();
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        } catch {
            toast({
                title: "Error",
                description: "Network error. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Founders Talk — Inspire India Talks</title>
                <meta
                    name="description"
                    content="Apply to be featured on Founders Talk — long-form conversations with builders, operators, and visionaries shaping India's future."
                />
                <meta property="og:title" content="Founders Talk — Inspire India Talks" />
                <meta property="og:description" content="Long-form conversations with builders, operators, and visionaries shaping India's future. Apply to be featured." />
                <meta property="og:image" content="https://inspireindiatalks.com/images/founders-talk-og.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://inspireindiatalks.com/founders-talk" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Founders Talk — Inspire India Talks" />
                <meta name="twitter:description" content="Long-form conversations with builders, operators, and visionaries shaping India's future." />
                <meta name="twitter:image" content="https://inspireindiatalks.com/images/founders-talk-og.png" />
            </Helmet>

            {/* ─── HERO ─── */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Subtle background mesh */}
                <div className="absolute inset-0 gradient-mesh opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } },
                        }}
                    >
                        <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-px w-10 bg-primary/60" />
                            <span className="text-primary/80 font-medium tracking-[0.25em] uppercase text-xs">
                                Apply to be Featured
                            </span>
                            <div className="h-px w-10 bg-primary/60" />
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            custom={1}
                            className="font-serif text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            Founders{" "}
                            <span className="text-primary">Talk</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="text-foreground/70 mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                        >
                            We feature founders building meaningful companies and shaping India's future.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            custom={3}
                            className="text-muted-foreground mt-3 text-base md:text-lg"
                        >
                            Long-form conversations with builders, operators, and visionaries.
                        </motion.p>

                        <motion.div variants={fadeUp} custom={4} className="mt-10">
                            <Button
                                onClick={scrollToForm}
                                size="lg"
                                className="rounded-full px-10 py-6 text-base font-medium tracking-wide group"
                            >
                                Apply for Feature
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── WHY GET FEATURED ─── */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">
                            Why Get <span className="text-primary">Featured</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="glass-card p-8 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
                            >
                                <div className="text-primary mb-4">{f.icon}</div>
                                <h3 className="font-serif text-lg font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SELECTIVE NOTICE ─── */}
            <section className="py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <p className="text-sm text-muted-foreground tracking-wide">
                            We feature a limited number of founders each month.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ─── APPLICATION FORM ─── */}
            <section ref={formRef} className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">
                            Application
                        </h2>
                        <p className="text-muted-foreground mt-3 text-base max-w-lg mx-auto">
                            Tell us about yourself and your startup. We review every application personally.
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 md:p-12 space-y-12"
                    >
                        {/* ── Section 1: Basic Information ── */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">01</span>
                                <h3 className="font-serif text-lg font-semibold">Basic Information</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Full Name <span className="text-primary">*</span></label>
                                    <Input name="full_name" required placeholder="Your full name" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Startup / Organization <span className="text-primary">*</span></label>
                                    <Input name="startup_name" required placeholder="Your startup name" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Email <span className="text-primary">*</span></label>
                                    <Input name="email" type="email" required placeholder="you@startup.com" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Phone Number</label>
                                    <Input name="phone" type="tel" placeholder="+91 9876543210" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">LinkedIn Profile URL</label>
                                    <Input name="linkedin" placeholder="linkedin.com/in/yourprofile" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Website URL</label>
                                    <Input name="website" placeholder="yourstartup.com" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border/30" />

                        {/* ── Section 2: Startup Details ── */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">02</span>
                                <h3 className="font-serif text-lg font-semibold">Startup Details</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Industry</label>
                                    <Input name="industry" placeholder="e.g. EdTech, FinTech, AgriTech" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Stage</label>
                                    <select
                                        name="stage"
                                        className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                                    >
                                        <option value="">Select stage</option>
                                        {stageOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Founded Year</label>
                                    <Input name="founded_year" placeholder="e.g. 2022" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                                <div className="sm:col-span-1" />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Current Traction</label>
                                <Textarea
                                    name="traction"
                                    rows={3}
                                    placeholder="Users, revenue, growth metrics, or any measurable progress..."
                                    className="bg-background/50 border-border/40 focus:border-primary/50 resize-none"
                                />
                            </div>
                        </div>

                        <div className="border-t border-border/30" />

                        {/* ── Section 3: Founder Story Fit ── */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">03</span>
                                <h3 className="font-serif text-lg font-semibold">Founder Story Fit</h3>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-foreground/80">What problem are you solving? <span className="text-primary">*</span></label>
                                <Textarea
                                    name="problem"
                                    required
                                    rows={3}
                                    placeholder="Describe the problem your startup addresses..."
                                    className="bg-background/50 border-border/40 focus:border-primary/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-foreground/80">What has been your biggest challenge as a founder?</label>
                                <Textarea
                                    name="challenge"
                                    rows={3}
                                    placeholder="The hardest parts of your journey so far..."
                                    className="bg-background/50 border-border/40 focus:border-primary/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Why should students hear your story?</label>
                                <Textarea
                                    name="why_students"
                                    rows={3}
                                    placeholder="What makes your story worth sharing with our audience..."
                                    className="bg-background/50 border-border/40 focus:border-primary/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-foreground/80">What makes your journey different?</label>
                                <Textarea
                                    name="differentiator"
                                    rows={3}
                                    placeholder="Your unique story, unconventional path, or defining moment..."
                                    className="bg-background/50 border-border/40 focus:border-primary/50 resize-none"
                                />
                            </div>
                        </div>

                        <div className="border-t border-border/30" />

                        {/* ── Section 4: Logistics ── */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">04</span>
                                <h3 className="font-serif text-lg font-semibold">Logistics</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Preferred Mode</label>
                                    <select
                                        name="mode"
                                        className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                                    >
                                        <option value="">Select mode</option>
                                        {modeOptions.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-foreground/80">Available Dates / Time Window</label>
                                    <Input name="availability" placeholder="e.g. March 2026, weekdays preferred" className="bg-background/50 border-border/40 focus:border-primary/50" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border/30" />

                        {/* ── Section 5: Confirmation ── */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">05</span>
                                <h3 className="font-serif text-lg font-semibold">Confirmation</h3>
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="confirmation"
                                    required
                                    className="mt-1 h-4 w-4 rounded border-border/40 bg-background/50 accent-primary"
                                />
                                <span className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
                                    I confirm that the information provided is accurate and I am authorised to represent this startup.
                                </span>
                            </label>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                size="lg"
                                className="w-full rounded-xl py-6 text-base font-medium tracking-wide group"
                            >
                                {isSubmitting ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Apply for Feature
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </section>
        </Layout>
    );
};

export default FoundersTalk;
