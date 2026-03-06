export interface EventSpeaker {
    id: string;
    name: string;
    role: string;
    image: string;
}

export interface Event {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    date: string;
    location: string;
    coverImage: string;
    heroVideo?: string;
    shortDescription: string;
    fullDescription: string[];
    speakers: EventSpeaker[];
    gallery: string[];
    highlights: string[];
}

export const events: Event[] = [
    {
        id: "e1",
        slug: "from-idea-to-impact-iiit-delhi",
        title: "From Idea to Impact",
        tagline: "The Entrepreneurial Journey of Building Customer-Centric Startups and Inspiring talks by trailblazing founders and leaders.",
        date: "March 14, 2026",
        location: "IIIT Delhi",
        coverImage: "/images/events/IIIT-Delhi.jpg",
        heroVideo: "/images/events/0306(1).mp4",
        shortDescription: "An exclusive event celebrating entrepreneurship, leadership and startup's at IIIT Delhi.",
        fullDescription: [
            "The theme 'From Idea to Impact' highlighted the challenges, learnings, and strategic decisions involved in building meaningful ventures. Attendees gained insights into product-market fit, early-stage struggles, leadership mindset, and how bold ideas evolve into impactful startups."
        ],
        speakers: [
            {
                id: "s1",
                name: "Chandan Singh",
                role: "Founder & CEO, Kinzy & Ex-Cofounder of Adda247",
                image: "/images/events/Chandan-Sir.jpeg"
            },
            {
                id: "s2",
                name: "Samshad Alam",
                role: "Founder & CEO, Edunachal & Inspire India Talks",
                image: "/images/events/Shamshad-Alam.jpeg"
            },
            {
                id: "s3",
                name: "Anjali Malhotra",
                role: "Founder — C-Xcel, Venture Partner & Independent Director",
                image: "/images/events/Anjali-malhotra.jpeg"
            },
            {
                id: "s4",
                name: "Tanmay Arora",
                role: "Partner & Vice President — KRESERA™ & Managing Director — The XCLUSIVE™ Crew",
                image: "/images/events/Tanmay-arora.jpeg"
            },
            {
                id: "s5",
                name: "Dipali Kulshrestha",
                role: "AWS Hero, Principal Engineer & Building Resilient Financial Systems",
                image: "/images/events/Dipali-Kulshrestha.jpeg"
            },
            {
                id: "s6",
                name: "Amit Kumar",
                role: "Senior Solutions Architect @ Amazon Web Services & Hybrid Cloud Specialist",
                image: "/images/events/Amit-kumar.jpeg"
            }
        ],
        gallery: [
            "/images/events/IIIT-Delhi.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery2.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery3.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery4.jpg"
        ],
        highlights: [
            "Over 500+ attendees from various colleges",
            "Interactive Q&A sessions with the founders",
            "Networking opportunities with industry leaders"
        ]
    },
    {
        id: "e2",
        slug: "women-who-hustle-iiit-delhi",
        title: "Women Who Hustle",
        tagline: "Women Who Hustle, From Idea to Impact",
        date: "March 14th, 2024",
        location: "GGSIPU",
        coverImage: "/images/events/women-who-hustle-iiit-delhi/cover.jpg",
        shortDescription: "An exclusive event celebrating women leadership and entrepreneurship at IIIT Delhi.",
        fullDescription: [
            "Inspire India Talks brought together some of the most inspiring women leaders to IIIT Delhi for a day of motivation, learning, and networking.",
            "The 'Women Who Hustle' event focused on the unique challenges and triumphs of women in entrepreneurship, tech, and creative industries. Attendees had the opportunity to hear firsthand accounts of building successful ventures from the ground up."
        ],
        speakers: [
            {
                id: "s1",
                name: "Jane Doe",
                role: "Founder & CEO, TechCorp",
                image: "/images/events/women-who-hustle-iiit-delhi/speaker1.jpg"
            },
            {
                id: "s2",
                name: "Sarah Smith",
                role: "Director of Product",
                image: "/images/events/women-who-hustle-iiit-delhi/speaker2.jpg"
            }
        ],
        gallery: [
            "/images/events/women-who-hustle-iiit-delhi/gallery1.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery2.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery3.jpg",
            "/images/events/women-who-hustle-iiit-delhi/gallery4.jpg"
        ],
        highlights: [
            "Over 500+ attendees from various colleges",
            "Interactive Q&A sessions with the founders",
            "Networking opportunities with industry leaders"
        ]
    }
];
