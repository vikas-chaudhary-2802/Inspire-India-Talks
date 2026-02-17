import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Personality } from "@/data/personalities";

interface Props {
  person: Personality;
  index?: number;
}

const PersonalityCard = ({ person, index = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link
        to={`/personality/${person.id}`}
        className="group block glass-card-hover overflow-hidden h-full"
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
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">{person.category}</p>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-primary transition-colors">{person.name}</h3>
            <p className="text-sm text-white/60 mt-1 line-clamp-1">{person.title}</p>
          </div>
        </div>
        <div className="p-5">
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
