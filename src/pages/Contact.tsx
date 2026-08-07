import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Send, Mail, Instagram, Facebook, Linkedin, Youtube, MessageSquare, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WEB3FORMS_KEY = "30ad2072-0d0d-4d0b-8c55-ebeb571f65e4";

const socialLinks = [
  { name: "Instagram", handle: "@inspireindiatalks", icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/inspireindiatalks/", color: "hover:bg-pink-500/10 hover:border-pink-500/40 hover:text-pink-400" },
  { name: "Facebook", handle: "Inspire India Talks", icon: <Facebook className="h-5 w-5" />, url: "https://www.facebook.com/p/Inspire-India-Talks-61577643296599/", color: "hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-400" },
  { name: "LinkedIn", handle: "inspire-india-talks", icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/company/inspire-india-talks/", color: "hover:bg-sky-500/10 hover:border-sky-500/40 hover:text-sky-400" },
  { name: "YouTube", handle: "Inspire India Talks", icon: <Youtube className="h-5 w-5" />, url: "https://www.youtube.com/channel/UCrvZvbuRbBc7TEBLH3T5NQQ", color: "hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400" },
  { name: "X", handle: "@inspireindia_", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, url: "https://x.com/inspireindia_", color: "hover:bg-neutral-500/10 hover:border-neutral-400/40 hover:text-foreground" },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Contact Message — Inspire India Talks");
    formData.append("from_name", "Inspire India Talks — Contact Form");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Message Sent! ✅", description: "We've received your message and will get back to you soon." });
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
    { name: "subject", label: "Subject", type: "text", required: true, placeholder: "What's this about?" },
  ];

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden gradient-mesh">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Get in Touch</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text mb-6">
              We'd Love to<br /><span className="text-primary">Hear From You.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Whether you have a story to share, a collaboration in mind, or just want to say hello — our team is here.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                  <a href="mailto:hello@inspireindiatalks.com" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    hello@inspireindiatalks.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For general enquiries, partnership proposals, media requests, or speaker nominations. We aim to reply within 2–3 business days.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Follow Us</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((s, i) => (
                  <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`glass-card p-5 flex items-center gap-4 border border-border/30 transition-all duration-300 rounded-2xl group ${s.color}`}>
                    <div className="flex-shrink-0 text-muted-foreground group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
            <div className="absolute inset-0 border border-primary/10 rounded-3xl" />
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Send a Message</span>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-6">Drop Us a Line</h2>
              <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl space-y-5">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      {field.label} {field.required && <span className="text-primary">*</span>}
                    </label>
                    <Input name={field.name} type={field.type} required={field.required} placeholder={field.placeholder}
                      onFocus={() => setFocusedField(field.name)} onBlur={() => setFocusedField(null)}
                      className={`bg-background/30 border-border/30 rounded-xl h-12 text-base transition-all duration-300 ${focusedField === field.name ? "border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]" : ""}`} />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea name="message" required rows={5} placeholder="Write your message here…"
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                    className={`w-full bg-background/30 border border-border/30 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground resize-none transition-all duration-300 outline-none ${focusedField === "message" ? "border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]" : ""}`} />
                </div>
                <Button type="submit" className="w-full rounded-xl py-6 text-base font-medium hover:shadow-lg hover:shadow-primary/20 transition-all" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Sending…
                    </span>
                  ) : (<><Send className="h-4 w-4 mr-2" /> Send Message</>)}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
