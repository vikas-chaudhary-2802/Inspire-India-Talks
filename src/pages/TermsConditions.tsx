import LegalPage from "@/components/LegalPage";

const TermsConditions = () => (
  <LegalPage
    title="Terms & Conditions"
    effectiveDate="Effective Date: April 01, 2026"
    intro={[
      'Welcome to Inspire India Talks ("we," "our," or "us"). These Terms & Conditions ("Terms") govern your access to and use of www.inspireindiatalks.com (the "Website").',
      "By accessing or using this Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please discontinue use of the Website.",
    ]}
    sections={[
      {
        heading: "1. About Inspire India Talks",
        blocks: [
          "Inspire India Talks is an independent digital media platform dedicated to sharing inspiring stories, business insights, startup journeys, leadership perspectives, interviews, podcasts, articles, educational resources, and event-related content.",
        ],
      },
      {
        heading: "2. Acceptance of Terms",
        blocks: [
          "By accessing this Website, you confirm that you:",
          { list: ["Are at least 18 years of age or have permission from a parent or legal guardian.", "Agree to comply with these Terms.", "Agree to our Privacy Policy."] },
        ],
      },
      {
        heading: "3. Use of the Website",
        blocks: [
          "You agree to use this Website only for lawful purposes. You agree not to:",
          { list: ["Violate any applicable law or regulation.", "Upload malicious software or harmful code.", "Attempt unauthorized access to our systems.", "Interfere with the Website's functionality.", "Copy or reproduce Website content without permission.", "Use the Website for fraudulent or misleading purposes.", "Harvest user information or email addresses."] },
          "We reserve the right to restrict or terminate access to users who violate these Terms.",
        ],
      },
      {
        heading: "4. Intellectual Property",
        blocks: [
          "Unless otherwise stated, all content available on Inspire India Talks — including articles, podcasts, videos, graphics, logos, designs, photographs, infographics, branding, website layout, text, and audio recordings — is owned by or licensed to Inspire India Talks and is protected by applicable intellectual property laws.",
          "No content may be copied, reproduced, distributed, republished, or commercially exploited without prior written permission.",
        ],
      },
      {
        heading: "5. Limited License",
        blocks: [
          "You may read our articles, share links to our content, share our content on social media using proper attribution, and print content for personal, non-commercial use.",
          "You may not republish entire articles without permission, remove copyright notices, sell or commercially distribute our content, or modify our content without authorization.",
        ],
      },
      {
        heading: "6. User Submissions",
        blocks: [
          "If you submit founder stories, guest articles, comments, feedback, interview applications, event registrations, photographs, videos, or testimonials, you represent that you own or have the necessary rights to the submitted material, that your submission does not infringe any third-party rights, and that the information provided is accurate to the best of your knowledge.",
          "By submitting content, you grant Inspire India Talks a non-exclusive, worldwide, royalty-free license to use, edit, publish, reproduce, and distribute the content in connection with our platform, unless otherwise agreed in writing.",
        ],
      },
      {
        heading: "7. Editorial Rights",
        blocks: [
          "We reserve the right to edit submitted content for clarity, grammar, formatting, or length; decline publication of any submission; remove content without prior notice; and correct factual or typographical errors. Publication of submitted material is at our sole editorial discretion.",
        ],
      },
      {
        heading: "8. Accuracy of Information",
        blocks: [
          "We strive to publish accurate and reliable information. However, information may become outdated over time, opinions expressed by interviewees or guest authors are their own, and we do not guarantee the completeness, accuracy, or reliability of all content. Users should independently verify information before relying on it for business, financial, legal, or investment decisions.",
        ],
      },
      {
        heading: "9. Interviews and Podcasts",
        blocks: [
          "Guests participating in interviews or podcasts acknowledge that their participation is voluntary, recordings may be edited for clarity and production quality, published interviews may remain available indefinitely unless otherwise agreed, and Inspire India Talks may promote interviews across its digital platforms.",
        ],
      },
      {
        heading: "10. Third-Party Links",
        blocks: [
          "Our Website may contain links to external websites. We do not control or endorse third-party websites and are not responsible for their content, privacy practices, services, or availability. Accessing third-party websites is at your own risk.",
        ],
      },
      {
        heading: "11. Events",
        blocks: [
          "If you register for events organized by Inspire India Talks: registration does not guarantee admission if seats are limited, event schedules may change, speakers may change without prior notice, and we reserve the right to cancel, postpone, or modify events. Additional event-specific terms may apply.",
        ],
      },
      {
        heading: "12. Newsletter",
        blocks: [
          "By subscribing to our newsletter, you consent to receive updates about articles, podcasts, events, business insights, promotions, and platform announcements. You may unsubscribe at any time using the unsubscribe link in our emails.",
        ],
      },
      {
        heading: "13. Prohibited Conduct",
        blocks: [
          "Users must not post unlawful or offensive material, impersonate another person or organization, upload viruses or malicious software, attempt to disrupt the Website, engage in abusive or defamatory behavior, or use automated tools to scrape or harvest Website content without permission. Violations may result in suspension or permanent restriction of access.",
        ],
      },
      {
        heading: "14. Disclaimer",
        blocks: [
          "All content provided on Inspire India Talks is for informational and educational purposes only. Nothing on this Website constitutes legal, financial, investment, tax advice, or professional business consulting. Users should seek independent professional advice before making decisions based on Website content.",
        ],
      },
      {
        heading: "15. Limitation of Liability",
        blocks: [
          "To the fullest extent permitted by law, Inspire India Talks, its owners, employees, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from use of the Website, inability to access the Website, reliance on published content, technical interruptions, or third-party services or links. Your use of the Website is at your own risk.",
        ],
      },
      {
        heading: "16. Indemnification",
        blocks: [
          "You agree to indemnify and hold harmless Inspire India Talks, its owners, employees, contributors, and affiliates from any claims, losses, damages, liabilities, or expenses arising out of your misuse of the Website or violation of these Terms.",
        ],
      },
      {
        heading: "17. Privacy",
        blocks: [
          "Your use of the Website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
        ],
      },
      {
        heading: "18. Changes to These Terms",
        blocks: [
          "We may update these Terms from time to time. Changes will become effective upon publication on this page. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.",
        ],
      },
      {
        heading: "19. Governing Law",
        blocks: [
          "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or the use of the Website shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India, unless otherwise required by applicable law.",
        ],
      },
      {
        heading: "20. Contact Us",
        blocks: [
          "If you have any questions regarding these Terms & Conditions, please contact: Inspire India Talks · www.inspireindiatalks.com · theinspireindiaofficial@gmail.com",
        ],
      },
    ]}
  />
);

export default TermsConditions;
