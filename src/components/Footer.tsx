import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { name: "Instagram", icon: <Instagram className="h-4 w-4" />, url: "https://www.instagram.com/inspireindiatalks/" },
  { name: "Facebook", icon: <Facebook className="h-4 w-4" />, url: "https://www.facebook.com/p/Inspire-India-Talks-61577643296599/" },
  { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, url: "https://www.linkedin.com/company/inspire-india-talks/" },
  { name: "YouTube", icon: <Youtube className="h-4 w-4" />, url: "https://www.youtube.com/channel/UCrvZvbuRbBc7TEBLH3T5NQQ" },
];

const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground mt-20 bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Col */}
          <div className="md:col-span-5 lg:col-span-6">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Inspire India Talks
            </h2>
            <p className="text-lg font-serif text-foreground/80 max-w-md leading-relaxed">
              In-depth profiles, founder journeys and business insight — reported, written and fact-checked by our editorial team.
            </p>
          </div>

          {/* Center Col: Desks */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">Desks</h4>
            <ul className="space-y-4">
              <li><Link to="/business-insights" className="font-serif text-foreground/90 hover:text-primary transition-colors">Business Insights</Link></li>
              <li><Link to="/founders-talk" className="font-serif text-foreground/90 hover:text-primary transition-colors">Founders Stories</Link></li>
              <li><Link to="/business-legacy" className="font-serif text-foreground/90 hover:text-primary transition-colors">Business Legacy</Link></li>
              <li><Link to="/startup-stories" className="font-serif text-foreground/90 hover:text-primary transition-colors">Startup Stories</Link></li>
              <li><Link to="/events" className="font-serif text-foreground/90 hover:text-primary transition-colors">Events & Interviews</Link></li>
            </ul>
          </div>

          {/* Right Col: The Paper */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">The Paper</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="font-serif text-foreground/90 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/tree-volution" className="font-serif text-foreground/90 hover:text-primary transition-colors">Archive (Tree-volution)</Link></li>
              <li><Link to="/host-event" className="font-serif text-foreground/90 hover:text-primary transition-colors">Host a Talk</Link></li>
              <li><Link to="/contact" className="font-serif text-foreground/90 hover:text-primary transition-colors">Contact the desk</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            © {new Date().getFullYear()} Inspire India Talks. Printed digitally, daily.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
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
