import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Personality } from "@/data/personalities";

interface Props {
  person: Personality;
  index?: number;
  isFeatured?: boolean;
}

const PersonalityCard = ({ person, index = 0, isFeatured = false }: Props) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative h-full"
    >
      {isFeatured && (
        <div className="absolute top-3 right-3 z-30 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/20 animate-pulse">
          Featured
        </div>
      )}
      <Link
        to={`/personality/${person.id}`}
        className="group block glass-card-hover overflow-hidden h-full flex flex-col"
      >
        <div className="aspect-[3/4] min-h-[320px] overflow-hidden relative">
          <img
            src={person.image}
            alt={person.name}
            className="personality-image group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=600&background=1a1a2e&color=f97316&font-size=0.3&bold=true`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]">{person.category}</p>
              {person.addedAt && (
                <span className="text-[10px] text-white/40 uppercase tracking-wider">{formatDate(person.addedAt)}</span>
              )}
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-primary transition-colors">{person.name}</h3>
            <p className="text-sm text-white/60 mt-1 line-clamp-1">{person.title}</p>
          </div>
        </div>
        <div className="p-5 flex-grow">
          <p className="text-sm text-muted-foreground italic line-clamp-2">"{person.quote}"</p>
          <div className="flex items-center gap-1 text-primary text-xs font-medium mt-4 group-hover:gap-2 transition-all">
            Read Story <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PersonalityCard;
