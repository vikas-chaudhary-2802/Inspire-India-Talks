import LegalPage from "@/components/LegalPage";

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    effectiveDate="Effective Date: April 01, 2026"
    intro={[
      'Welcome to Inspire India Talks ("we," "our," "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit www.inspireindiatalks.com.',
      "By using our website, you agree to the practices described in this Privacy Policy.",
    ]}
    sections={[
      {
        heading: "1. Who We Are",
        blocks: [
          "Inspire India Talks is a digital media platform dedicated to sharing inspiring stories of entrepreneurs, innovators, business leaders, startups, and changemakers through articles, podcasts, interviews, videos, and events.",
          "If you have any questions regarding this Privacy Policy, you may contact us at: theinspireindiaofficial@gmail.com · www.inspireindiatalks.com",
        ],
      },
      {
        heading: "2. Information We Collect",
        blocks: [
          "Personal Information you may voluntarily provide:",
          { list: ["Name", "Email address", "Phone number", "Company or organization", "Job title", "Social media profile", "Information submitted through contact forms", "Podcast guest applications", "Event registrations", "Newsletter subscriptions"] },
          "Automatically collected information when you browse our website:",
          { list: ["IP address", "Browser type", "Device information", "Operating system", "Pages visited", "Time spent on pages", "Referral website", "General location (city/country)", "Cookies and similar technologies"] },
        ],
      },
      {
        heading: "3. How We Use Your Information",
        blocks: [
          "We use your information to:",
          { list: ["Respond to your inquiries", "Publish and manage podcast interviews", "Process event registrations", "Send newsletters and updates", "Improve our website", "Personalize user experience", "Monitor website performance", "Prevent fraud and misuse", "Comply with legal obligations"] },
          "We do not sell your personal information.",
        ],
      },
      {
        heading: "4. Newsletter & Marketing Communications",
        blocks: [
          "If you subscribe to our newsletter, we may send business insights, founder stories, event announcements, podcast updates, educational content, and promotional communications. You may unsubscribe at any time using the unsubscribe link included in our emails.",
        ],
      },
      {
        heading: "5. Cookies",
        blocks: [
          "We use cookies and similar technologies to remember user preferences, analyze website traffic, improve user experience, measure website performance, and understand visitor behavior. You can disable cookies through your browser settings, although some website features may not function properly.",
        ],
      },
      {
        heading: "6. Analytics",
        blocks: [
          "We may use analytics services such as Google Analytics or similar tools to understand visitor demographics, website traffic, popular pages, user engagement, and website performance. These services may use cookies and similar technologies.",
        ],
      },
      {
        heading: "7. Third-Party Services",
        blocks: [
          "Our website may integrate with third-party services including YouTube, Spotify, Apple Podcasts, LinkedIn, Instagram, Facebook, X (formerly Twitter), Google Forms, email marketing platforms, and webinar/event registration platforms. These services have their own privacy policies, and we encourage you to review them before sharing your information.",
        ],
      },
      {
        heading: "8. Embedded Content",
        blocks: [
          "Articles on Inspire India Talks may include embedded content such as videos, podcasts, social media posts, images, and maps. Embedded content behaves as if you visited the originating website directly and may collect data according to that provider's privacy policy.",
        ],
      },
      {
        heading: "9. Information Sharing",
        blocks: [
          "We may share information with trusted service providers who help operate our website, when required by law, to protect our legal rights, or during a merger, acquisition, or restructuring. We do not sell your personal information to advertisers or third parties.",
        ],
      },
      {
        heading: "10. Data Security",
        blocks: [
          "We implement reasonable administrative, technical, and organizational measures to protect your information against unauthorized access, disclosure, alteration, or destruction. However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "11. Data Retention",
        blocks: [
          "We retain your information only as long as necessary to provide our services, fulfill legal obligations, resolve disputes, and improve our services. When information is no longer required, it is securely deleted or anonymized where appropriate.",
        ],
      },
      {
        heading: "12. Your Rights",
        blocks: [
          "Subject to applicable law, you may have the right to:",
          { list: ["Access your personal information", "Correct inaccurate information", "Request deletion of your information", "Withdraw consent where applicable", "Object to certain processing activities", "Request information regarding how your data is processed"] },
          "To exercise these rights, please contact us at: info@inspireindiatalks.com",
        ],
      },
      {
        heading: "13. Children's Privacy",
        blocks: [
          "Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe a child has submitted personal information, please contact us so we can remove it.",
        ],
      },
      {
        heading: "14. External Links",
        blocks: [
          "Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites. We encourage you to review their privacy policies before providing personal information.",
        ],
      },
      {
        heading: "15. International Visitors",
        blocks: [
          "If you access our website from outside India, your information may be transferred to and processed in India or other jurisdictions where our service providers operate, subject to applicable legal requirements.",
        ],
      },
      {
        heading: "16. Changes to This Privacy Policy",
        blocks: [
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." Continued use of the website after changes are posted constitutes acceptance of the revised policy.',
        ],
      },
      {
        heading: "17. Contact Us",
        blocks: [
          "If you have questions, requests, or concerns regarding this Privacy Policy or your personal information, please contact: Inspire India Talks · www.inspireindiatalks.com · theinspireindiaofficial@gmail.com",
        ],
      },
    ]}
  />
);

export default PrivacyPolicy;
