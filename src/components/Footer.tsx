import { Link } from "react-router-dom";
import { categories } from "@/data/personalities";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

// ✅ EASY TO EDIT — Change your social media links here
const socialLinks = [
  { name: "Instagram", icon: <Instagram className="h-4 w-4" />, url: "https://www.instagram.com/inspireindiatalks/" },
  { name: "Facebook", icon: <Facebook className="h-4 w-4" />, url: "https://www.facebook.com/p/Inspire-India-Talks-61577643296599/" },
  { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, url: "https://www.linkedin.com/company/inspire-india-talks/" },
  { name: "YouTube", icon: <Youtube className="h-4 w-4" />, url: "https://www.youtube.com/channel/UCrvZvbuRbBc7TEBLH3T5NQQ" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Inspire India Talks" className="h-10 w-auto" />
              <span className="font-serif text-xl font-bold">
                Inspire India <span className="text-primary">Talks</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              India's premium storytelling and inspiration platform — showcasing the journeys of entrepreneurs, civil servants, innovators, and trailblazers who shaped the nation.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-5 text-foreground">Categories</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-5 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/host-event" className="text-sm text-muted-foreground hover:text-primary transition-colors">Host a Talk</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inspire India Talks. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
