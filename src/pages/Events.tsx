import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { events } from "@/data/events";

const Events = () => {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight">
                            Our <span className="text-primary italic">Events</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join us at our exclusive gatherings to discover, connect, and be inspired by the changemakers of today.
                        </p>
                    </motion.div>

                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`/events/${event.slug}`} className="group block h-full">
                                        <div className="bg-card h-full rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col">
                                            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                                <img
                                                    src={event.coverImage}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80';
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-2xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">
                                                    {event.title}
                                                </h3>
                                                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-primary" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-foreground/80 mb-6 flex-grow line-clamp-3">
                                                    {event.shortDescription}
                                                </p>
                                                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                                    View Event <ArrowRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-xl">More events coming soon.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Events;
