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
    shortDescription: string;
    fullDescription: string[];
    speakers: EventSpeaker[];
    gallery: string[];
    highlights: string[];
}

export const events: Event[] = [
    {
        id: "e1",
        slug: "From Idea to Impact",
        title: "The Entrepreneurial Journey of Building Customer-Centric Startups.",
        tagline: "Inspiring talks by trailblazing founders and leaders.",
        date: "March 8, 2024",
        location: "IIIT Delhi",
        coverImage: "/images/events/women-who-hustle-iiit-delhi/cover.jpg",
        shortDescription: "An exclusive event celebrating entrepreneurship and leadership and startup's at IIIT Delhi.",
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
    },
    {
        id: "e1",
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
