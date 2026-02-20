import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Calendar, Users, Building, Sparkles } from "lucide-react";

const WEB3FORMS_KEY = "30ad2072-0d0d-4d0b-8c55-ebeb571f65e4"; // Replace with your Web3Forms access key

const HostEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Event Inquiry — Inspire India Talks");
    formData.append("from_name", "Inspire India Talks — Event Inquiry");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: "Inquiry Sent! ✅", description: "We'll get back to you within 24 hours." });
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
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Events</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text">
              Host an <span className="text-primary">Inspire Talk</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              Bring inspiring stories to your audience. Book our speakers for motivational talks, workshops, and events.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: <Calendar className="h-6 w-6" />, title: "Flexible Scheduling", desc: "We work around your timeline — weekdays, weekends, or special occasions." },
              { icon: <Users className="h-6 w-6" />, title: "Any Audience Size", desc: "From intimate workshops of 20 to conferences of 5000+." },
              { icon: <Building className="h-6 w-6" />, title: "All Event Types", desc: "Corporate events, college seminars, school assemblies, Inspiring talks, and more." },
              { icon: <Sparkles className="h-6 w-6" />, title: "Premium Experience", desc: "Our speakers deliver world-class presentations with storytelling that inspires action." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-primary flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-serif font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Phone *</label>
                  <Input name="phone" type="tel" required placeholder="+91 9876543210" className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Organization</label>
                  <Input name="organization" placeholder="Company / College" className="bg-background/50 border-border/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">City</label>
                  <Input name="city" placeholder="Your city" className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Event Type</label>
                  <Input name="event_type" placeholder="Seminar, Workshop, etc." className="bg-background/50 border-border/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Message</label>
                <Textarea name="message" rows={4} placeholder="Tell us about your event and what you're looking for..." className="bg-background/50 border-border/50" />
              </div>
              <Button type="submit" className="w-full rounded-xl py-6 text-base" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send Inquiry</>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HostEvent;
