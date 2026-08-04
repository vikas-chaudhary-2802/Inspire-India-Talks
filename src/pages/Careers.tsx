import LegalPage from "@/components/LegalPage";

const Careers = () => (
  <LegalPage
    title="Careers at Inspire India Talks"
    eyebrow="Join the Team"
    intro={[
      "Join Us in Inspiring India's Next Generation of Leaders.",
      "At Inspire India Talks, we believe every entrepreneur, innovator, and changemaker has a story that can inspire millions. Our mission is to bring those stories to life through insightful interviews, compelling articles, podcasts, and engaging digital content.",
      "If you're passionate about storytelling, startups, media, technology, and creating meaningful impact, we'd love to hear from you.",
    ]}
    sections={[
      {
        heading: "Why Work With Us?",
        blocks: [
          "At Inspire India Talks, you'll have the opportunity to:",
          { list: ["Work with founders, business leaders, investors, and innovators.", "Build a platform that celebrates entrepreneurship and innovation.", "Learn from industry experts and emerging startups.", "Contribute to impactful digital media and storytelling.", "Grow your skills in a collaborative and creative environment.", "Enjoy flexibility and opportunities for professional development."] },
        ],
      },
      {
        heading: "1. Content Writer (Business & Startups)",
        blocks: [
          "Responsibilities: research startups, entrepreneurs, and business trends; write engaging articles, founder stories, and industry insights; ensure content accuracy and quality; collaborate with editors and designers.",
          "Requirements: excellent writing and editing skills; strong research abilities; passion for entrepreneurship and business; experience in digital publishing is a plus.",
        ],
      },
      {
        heading: "2. Video Editor",
        blocks: [
          "Responsibilities: edit podcast episodes, interviews, and promotional videos; create engaging short-form content for social media; add graphics, captions, and animations; maintain consistent visual quality.",
          "Requirements: experience with Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, or similar tools; creativity and attention to detail; understanding of social media content formats.",
        ],
      },
      {
        heading: "3. Graphic Designer",
        blocks: [
          "Responsibilities: design social media creatives, banners, thumbnails, and promotional materials; create visual assets aligned with our brand identity; collaborate with content and marketing teams.",
          "Requirements: proficiency in Canva, Adobe Photoshop, Illustrator, or Figma; strong portfolio showcasing design work.",
        ],
      },
      {
        heading: "4. Social Media Executive",
        blocks: [
          "Responsibilities: manage social media platforms; schedule and publish content; engage with our online community; track performance and suggest improvements.",
          "Requirements: knowledge of Instagram, LinkedIn, Facebook, X, and YouTube; strong communication skills; familiarity with analytics tools.",
        ],
      },
      {
        heading: "5. Podcast & Production Coordinator",
        blocks: [
          "Responsibilities: coordinate podcast schedules; communicate with guests; prepare interview briefs; support recording and publishing workflows.",
          "Requirements: excellent organizational and communication skills; interest in media production and podcasts.",
        ],
      },
      {
        heading: "6. Business Development Executive",
        blocks: [
          "Responsibilities: identify partnership opportunities; build relationships with startups, incubators, investors, and organizations; support sponsorship and collaboration initiatives.",
          "Requirements: strong networking and communication skills; interest in startups and business ecosystems.",
        ],
      },
      {
        heading: "Internship Opportunities",
        blocks: [
          "We regularly offer internships in:",
          { list: ["Content Writing", "Journalism", "Digital Marketing", "Graphic Design", "Video Editing", "Social Media Management", "Business Development", "Research & Analytics"] },
          "Students and recent graduates are encouraged to apply.",
        ],
      },
      {
        heading: "What We Look For",
        blocks: [
          "We value individuals who are:",
          { list: ["Curious and eager to learn.", "Passionate about entrepreneurship and innovation.", "Creative problem-solvers.", "Strong communicators.", "Team-oriented and proactive.", "Committed to producing high-quality work."] },
        ],
      },
      {
        heading: "How to Apply",
        blocks: [
          "To apply, please send the following to theinspireindiaofficial@gmail.com:",
          { list: ["Your updated resume", "A brief cover letter explaining why you'd like to join Inspire India Talks", "Portfolio or work samples (if applicable)", "Links to your LinkedIn profile or personal website (optional)"] },
          "Please mention the position you're applying for in the subject line of your email.",
        ],
      },
      {
        heading: "Equal Opportunity Employer",
        blocks: [
          "Inspire India Talks is committed to building an inclusive and diverse workplace. We welcome applications from qualified candidates regardless of gender, age, disability, religion, caste, ethnicity, sexual orientation, or background. We believe diversity strengthens creativity, collaboration, and innovation.",
        ],
      },
    ]}
    footer={
      <>
        <p className="font-serif text-xl font-bold text-foreground">Let's Build Something Inspiring Together</p>
        <p>
          If you're passionate about sharing stories that inspire change and want to be part of a growing media platform dedicated to entrepreneurship and innovation, we'd love to hear from you.
        </p>
        <p>Email: theinspireindiaofficial@gmail.com · Website: www.inspireindiatalks.com</p>
      </>
    }
  />
);

export default Careers;
