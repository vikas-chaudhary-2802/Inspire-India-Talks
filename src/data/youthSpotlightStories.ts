export interface YouthSpotlightStory {
  id: string;
  name: string;
  college: string;
  city: string;
  category: string;
  videoLink?: string;
  article?: string;
  submittedDate: string;
  approvedDate: string;
}

export const approvedYouthStories: YouthSpotlightStory[] = [
  // Example approved stories - replace with actual approved submissions
  {
    id: "youth-1",
    name: "Priya Sharma",
    college: "Delhi University",
    city: "New Delhi",
    category: "Social Impact",
    article: "I started a community library in my neighborhood where children from underprivileged backgrounds can access books and study space. What began with 50 books in my garage has grown to serve over 200 children. We organize reading sessions, provide free tutoring, and have helped 15 students secure scholarships. The joy in their eyes when they discover new worlds through books is my greatest reward.",
    submittedDate: "2024-01-15",
    approvedDate: "2024-01-20",
  },
  {
    id: "youth-2",
    name: "Arjun Mehta",
    college: "IIT Bombay",
    city: "Mumbai",
    category: "Innovation",
    videoLink: "https://drive.google.com/file/d/example-video-id/view",
    submittedDate: "2024-02-01",
    approvedDate: "2024-02-05",
  },
  {
    id: "youth-3",
    name: "Sneha Patel",
    college: "Gujarat University",
    city: "Ahmedabad",
    category: "Environment",
    article: "Plastic waste was choking our local river. I mobilized 50 volunteers and organized weekly clean-up drives. We've removed over 2 tons of plastic and established a recycling program. Now, local businesses partner with us, and the river is cleaner than it's been in decades. Change starts with one person's determination.",
    submittedDate: "2024-01-20",
    approvedDate: "2024-01-25",
  },
];
