import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PersonalityCard from "@/components/PersonalityCard";
import { getPersonalitiesByCategory, getCategoryBySlug } from "@/data/personalities";

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const people = getPersonalitiesByCategory(slug || "");

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold">Category not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden gradient-mesh">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-5xl mb-4">{category.icon}</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text">{category.name}</h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">{category.description}</p>
            <p className="text-sm text-primary mt-4 font-medium">{people.length} Personalities</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {people.map((person, i) => (
            <PersonalityCard key={person.id} person={person} index={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryDetail;
