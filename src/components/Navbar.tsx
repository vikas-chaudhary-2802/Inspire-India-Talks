import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsletterSheet from "@/components/NewsletterSheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const links = [
    { path: "/", label: "FRONT PAGE" },
    { path: "/business-insights", label: "BUSINESS INSIGHTS" },
    { path: "/founders-talk", label: "FOUNDERS STORIES" },
    { path: "/business-legacy", label: "BUSINESS LEGACY" },
    { path: "/startup-stories", label: "STARTUP STORIES" },
    { path: "/events", label: "EVENTS" },
  ];

  return (
    <header className="w-full bg-background border-b-[3px] border-foreground">
      {/* Top Banner — real date left, edition line right */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 text-[10px] sm:text-xs font-semibold uppercase tracking-widest flex justify-between items-center">
        <span>{today}</span>
        <span className="hidden sm:inline">New Delhi Edition · Independent Journalism</span>
      </div>

      <div className="container mx-auto px-4 pt-5 pb-3">
        {/* Masthead — logo & tagline (left), title (centre), newsletter (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-x-6 gap-y-4 mb-4">
          {/* Left flank: logo + editorial line */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Link to="/" className="inline-block shrink-0" aria-label="Inspire India Talks home">
              <img
                src="/logo-transparent.png"
                alt="Inspire India Talks"
                className="h-16 w-16 md:h-24 md:w-24 object-contain"
              />
            </Link>
            <p className="hidden lg:block max-w-[20ch] font-serif text-[13px] italic leading-snug text-foreground/70 border-l border-border pl-4">
              Reported profiles of the founders, companies and ideas shaping a new India.
            </p>
          </div>

          {/* Centre: masthead title */}
          <div className="text-center">
            <Link to="/" className="inline-block">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
                Inspire India Talks
              </h1>
            </Link>
          </div>

          {/* Right flank: newsletter + cadence note */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <NewsletterSheet source="navbar" triggerLabel="Newsletter" />
            <p className="hidden lg:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
              A considered edition, every Friday
            </p>
          </div>
        </div>

        {/* Subtitle rule */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px bg-foreground/25 flex-1 max-w-[140px]"></div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-foreground/80 font-semibold text-center">
            The People Building a New India — and the Ideas Behind Them
          </p>
          <div className="h-px bg-foreground/25 flex-1 max-w-[140px]"></div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center gap-8 border-y border-border py-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                isActive(link.path) ? "text-primary relative after:absolute after:bottom-[-16px] after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex justify-center border-y border-border py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-border overflow-hidden bg-background"
          >
            <div className="flex flex-col py-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-4 text-center text-xs font-bold uppercase tracking-widest border-b border-border/50 last:border-0 ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
