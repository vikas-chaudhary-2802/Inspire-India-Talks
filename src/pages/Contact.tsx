import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

// ✅ EASY TO EDIT — Change your social media links here
const socialLinks = [
  { name: "Instagram", icon: <Instagram className="h-4 w-4" />, url: "https://www.instagram.com/inspireindiatalks/" },
  { name: "Facebook", icon: <Facebook className="h-4 w-4" />, url: "https://www.facebook.com/p/Inspire-India-Talks-61577643296599/" },
  { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, url: "https://www.linkedin.com/company/inspire-india-talks/" },
  { name: "YouTube", icon: <Youtube className="h-4 w-4" />, url: "https://www.youtube.com/@inspireindiatalks" },
];

const WEB3FORMS_KEY = "30ad2072-0d0d-4d0b-8c55-ebeb571f65e4"; // Replace with your Web3Forms access key

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Contact Message — Inspire India Talks");
    formData.append("from_name", "Inspire India Talks — Contact");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: "Message Sent! ✅", description: "Thank you for reaching out. We'll respond soon." });
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

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden gradient-mesh">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Get in Touch</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: <Mail className="h-5 w-5" />, title: "Email", detail: "hello@inspireindiatalks.com" },
              { icon: <Phone className="h-5 w-5" />, title: "Phone", detail: "+91 97187 76830" },
              { icon: <MapPin className="h-5 w-5" />, title: "Location", detail: "Nehru Place, New Delhi, India" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-4">
              <h3 className="font-serif font-bold mb-4 text-foreground">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Full Name *</label>
                  <Input name="name" required placeholder="Your name" className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Email *</label>
                  <Input name="email" type="email" required placeholder="you@example.com" className="bg-background/50 border-border/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Organization</label>
                <Input name="organization" placeholder="Company / College (optional)" className="bg-background/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Inquiry Type</label>
                <Input name="inquiry_type" placeholder="Collaboration, Feedback, etc." className="bg-background/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Message *</label>
                <Textarea name="message" required rows={5} placeholder="Write your message here..." className="bg-background/50 border-border/50" />
              </div>
              <Button type="submit" className="w-full rounded-xl py-6 text-base" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
