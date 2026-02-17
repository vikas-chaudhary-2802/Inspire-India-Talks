import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/data/personalities";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10" : "bg-transparent"}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Inspire India Talks" className="h-10 w-auto" />
          <span className="font-serif text-lg font-bold text-foreground hidden sm:block">
            Inspire India <span className="text-primary">Talks</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { path: "/", label: "Home" },
          ].map(({ path, label }) => (
            <Link key={path} to={path} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(path) ? "text-primary" : "text-foreground/70"}`}>
              {label}
            </Link>
          ))}

          <div className="relative" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
            <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-foreground/70">
              Inspiring Voices <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-2 w-72 glass-card py-2 overflow-hidden"
                >
                  {categories.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="block px-5 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setShowCategories(false)}
                    >
                      <span className="mr-3">{cat.icon}</span>{cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { path: "/about", label: "About" },
            { path: "/host-event", label: "Host a Talk" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <Link key={path} to={path} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(path) ? "text-primary" : "text-foreground/70"}`}>
              {label}
            </Link>
          ))}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              <Link to="/" className="block text-sm font-medium py-2 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3">Inspiring Voices</div>
              {categories.map(cat => (
                <Link key={cat.slug} to={`/category/${cat.slug}`} className="block text-sm py-2 pl-3 hover:text-primary" onClick={() => setIsOpen(false)}>
                  {cat.icon} {cat.name}
                </Link>
              ))}
              <Link to="/about" className="block text-sm font-medium py-2 hover:text-primary" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/host-event" className="block text-sm font-medium py-2 hover:text-primary" onClick={() => setIsOpen(false)}>Host a Talk</Link>
              <Link to="/contact" className="block text-sm font-medium py-2 hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
