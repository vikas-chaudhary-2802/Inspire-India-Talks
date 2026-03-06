import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, X, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { events } from "@/data/events";
import { Helmet } from "react-helmet-async";

const EventDetail = () => {
    const { slug } = useParams();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const event = events.find((e) => e.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Handle escape key for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h1 className="text-4xl font-serif font-bold mb-4">Event Not Found</h1>
                <p className="text-muted-foreground mb-8">The event you are looking for does not exist.</p>
                <Link to="/events" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 flex flex-col">
            <Helmet>
                <title>{`${event.title} - Inspire India Talks Events`}</title>
                <meta name="description" content={event.shortDescription} />
            </Helmet>

            <Navbar />

            <main className="flex-grow">
                {/* Banner Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-end">
                    <div className="absolute inset-0 z-0">
                        {event.heroVideo ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={event.coverImage}
                                className="w-full h-full object-cover"
                            >
                                <source src={event.heroVideo} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={event.coverImage}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80';
                                }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="container relative z-10 mx-auto px-4 pb-16 max-w-5xl">
                        <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 shadow-sm">
                                {event.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-3xl">
                                {event.tagline}
                            </p>

                            <div className="flex flex-wrap gap-6 text-white/90">
                                <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full border-white/20 bg-white/10 backdrop-blur-md">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full border-white/20 bg-white/10 backdrop-blur-md">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{event.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 max-w-5xl py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* About Event */}
                            <section>
                                <h2 className="text-3xl font-serif font-medium mb-6 relative inline-block">
                                    About Event
                                    <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
                                </h2>
                                <div className="space-y-4 text-lg text-foreground/80 leading-relaxed font-light">
                                    {event.fullDescription.map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>

                            {/* Speakers Section */}
                            {event.speakers && event.speakers.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-serif font-medium mb-8 relative inline-block">
                                        Featured Speakers
                                        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {event.speakers.map((speaker, idx) => (
                                            <motion.div
                                                key={speaker.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50"
                                            >
                                                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                                                    <img
                                                        src={speaker.image}
                                                        alt={speaker.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(speaker.name) + '&background=random';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-serif text-lg font-medium">{speaker.name}</h3>
                                                    <p className="text-sm text-primary">{speaker.role}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Photo Gallery */}
                            {event.gallery && event.gallery.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-serif font-medium mb-8 relative inline-block">
                                        Event Gallery
                                        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {event.gallery.map((image, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group bg-muted"
                                                onClick={() => setLightboxIndex(idx)}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${event.title} gallery image ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar / Highlights */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                                    <h3 className="text-xl font-serif font-medium mb-6 flex items-center gap-2">
                                        Event Highlights
                                    </h3>
                                    {event.highlights && event.highlights.length > 0 ? (
                                        <ul className="space-y-4">
                                            {event.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground/80 leading-relaxed font-light">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-muted-foreground font-light">No highlights available for this event yet.</p>
                                    )}

                                    {/* Future CTA could go here, like "Share this event" or "Join waitlist for next" */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && event.gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="relative w-full h-full max-w-7xl max-h-[85vh] p-4 flex items-center justify-center">
                            <img
                                src={event.gallery[lightboxIndex]}
                                alt="Fullscreen gallery image"
                                className="max-w-full max-h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        {/* Simple Lightbox Controls */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                            <button
                                className="text-white/70 hover:text-white disabled:opacity-30 p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(Math.max(0, lightboxIndex - 1));
                                }}
                                disabled={lightboxIndex === 0}
                            >
                                Previous
                            </button>
                            <span className="text-white/50 flex items-center">
                                {lightboxIndex + 1} / {event.gallery.length}
                            </span>
                            <button
                                className="text-white/70 hover:text-white disabled:opacity-30 p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(Math.min(event.gallery.length - 1, lightboxIndex + 1));
                                }}
                                disabled={lightboxIndex === event.gallery.length - 1}
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventDetail;
