// =====================================================================
// BUSINESS INSIGHTS  —  data + shared types for all three tabs.
//
// This project has THREE business tabs, each with its OWN data file and
// its OWN image folder:
//   1. Business Insights (news)  -> this file            -> public/images/business-insights/
//   2. Business Legacy           -> businesslegacy.ts    -> public/images/business-legacy/
//   3. Startups                  -> businessstartups.ts  -> public/images/business-startups/
//
// HOW TO ADD A NEWS ARTICLE:
//   1. Copy a { } block below and paste it at the TOP of the list.
//   2. Fill in the fields. Keep the quotes and commas.
//   3. Put the image in  public/images/business-insights/
//      and reference it as "/images/business-insights/your-file.jpg".
//
// Required: id, title, date, image, excerpt, content
// Optional: category, featured, readTime
// =====================================================================
import { businesslegacy } from "./businesslegacy";
import { businessstartups } from "./businessstartups";

export interface BusinessInsight {
  id: string;
  title: string;
  date: string;        // "DD-MM-YYYY"
  image: string;
  excerpt: string;
  content: string;
  category?: string;
  featured?: boolean;
  readTime?: string;
}

export const businessinsights: BusinessInsight[] = [
  {
    id: "orange-health-posts-139cr-revenue-2026",
    title: "Y Combinator-Backed Orange Health Posts Rs 139 Cr Revenue in FY26",
    date: "20-08-2026",
    category: "HealthTech",
    image: "/images/business-insights/orange-health.png",
    excerpt: "Diagnostics and healthcare platform Orange Health saw its revenue surge to Rs 138.6 crore in FY26, as the company prepares to raise a fresh $30 million.",
    readTime: "2 min read",
    featured: false,
    content: `Diagnostics and healthcare platform Orange Health is raising $30 million in fresh funding, with the impact of the capital infusion likely to reflect in its FY27 annual results. 

According to its financial statements filed with the Registrar of Companies (RoC), the Bengaluru-based startup's revenue from operations surged 65% year-on-year to Rs 138.6 crore in the fiscal year ended March 2026, up from Rs 84 crore in FY25. However, losses widened to nearly Rs 100 crore as the company expanded across tier I cities.

Founded in 2020 by Dhruv Gupta and Tarun Bhambra, Orange Health Labs is a full-stack diagnostics platform offering on-demand testing and at-home sample collection for routine diagnostics. Beyond D2C services, Orange Health has onboarded over 2,000 clinics on its platform to enable faster diagnosis and clinical decision-making. The company claims to have added over 60 company-owned collection centres in the past year.

Employee benefits was the largest cost for the firm, rising over 43% to Rs 72.2 crore. Materials used for testing and diagnostics also increased 40% to Rs 42.9 crore. The Bertelsmann India-backed company's loss before tax increased 11% year-on-year to Rs 97 crore, with overall expenses increasing 36% to Rs 240.3 crore.

Meanwhile, the company's EBITDA loss stood at Rs 92.4 crore. However, the firm claims to have achieved 20% EBITDA profitability in Bengaluru. Prior to its upcoming $30 million round, Orange Health Labs had raised nearly $50 million in funding.`,
  },
  {
    id: "peeko-raises-7mn-series-a-2026",
    title: "Babycare Quick Commerce Platform Peeko Raises Over $7 Mn Led by Chiratae",
    date: "20-08-2026",
    category: "Quick Commerce",
    image: "/images/business-insights/peeko.png",
    excerpt: "Peeko, a babycare quick commerce platform delivering essentials within 60 minutes, raised Rs 67.4 crore (over $7 million) in a Series A funding round.",
    readTime: "2 min read",
    featured: false,
    content: `Peeko, a babycare quick commerce platform that delivers baby and kids-care essentials within 60 minutes, has raised Rs 67.4 crore (over $7 million) in a Series A funding round led by Chiratae Ventures. The round also saw participation from existing investor Stellaris Venture Partners and angel investors. 

Prior to this, the Bengaluru-based startup had secured $3.2 million in a funding round led by Stellaris Venture Partners in August last year. The proceeds will be used to invest in technology aimed at building a broader "parenting partner" proposition alongside its commerce business. 

Founded last year by Chetan Sharma, Abhijit Gairola, and Vivek Khetan, Peeko operates a vertical quick commerce platform focused on baby and kids-care essentials. The platform offers apparel, diapers, toys, and baby food, along with try-and-buy and instant return options. 

Peeko claims it has grown nearly two-fold every quarter over the past six months, with more than one lakh parents shopping on the platform since its launch. The startup currently operates three dark stores in Bengaluru, covering around 55% of the city, and plans to expand to six stores by the end of 2026 before entering two more cities next year.

The platform has expanded its assortment from around 6,000 SKUs at launch to 27,000-30,000 SKUs. Its average order value stands at around Rs 1,000, with apparel, toys, and baby gear accounting for a significant share of its business.`,
  },
  {
    id: "shiprocket-stellar-ipo-debut-2026",
    title: "Shiprocket Makes Stellar Debut, Shares List 35% Above IPO Price",
    date: "19-08-2026",
    category: "Logistics",
    image: "/images/business-insights/shiprocket-ipo.png",
    excerpt: "E-commerce logistics platform Shiprocket made a strong debut on the stock exchanges, with its shares listing at a 35% premium over its issue price.",
    readTime: "2 min read",
    featured: false,
    content: `E-commerce shipping and logistics platform Shiprocket made a strong debut on the stock exchanges on Wednesday, August 19, with its shares listing at Rs 131 on the NSE, a 35% premium over its issue price of Rs 97. 

The company's shares were listed at Rs 131 on the NSE and Rs 130 on the BSE, giving investors a solid listing gain on the first day of trading. Shiprocket had fixed the price band for its IPO at Rs 92-97 per share. The Rs 1,617 crore public issue was open for subscription between August 12 and August 14 and saw strong demand across investor categories, being subscribed 99 times by the end of the bidding period. 

Qualified institutional buyers (QIBs) led the demand, subscribing to their reserved portion 123 times. The non-institutional investor (NII) quota was subscribed 89 times, while the retail portion saw 46 times subscription. 

The strong debut comes as Indian startups continue to test investor appetite in the public markets. Shiprocket joins a growing list of new-age companies tapping the IPO route to raise capital and provide an exit opportunity to existing investors. 

The Gurugram-based company provides shipping, logistics, and ecommerce enablement services to online sellers and businesses. It is backed by investors including Temasek and Eternal. Shiprocket reported a 24% year-on-year increase in operating revenue to Rs 2,024 crore in FY26, though its net loss widened 6.8% to Rs 79 crore during the year.`,
  },
  {
    id: "yc-sells-groww-stake-1435cr-2026",
    title: "Y Combinator Sells Another Rs 1,435 Cr Stake in Groww",
    date: "19-08-2026",
    category: "FinTech",
    image: "/images/business-insights/groww-yc.png",
    excerpt: "US-based startup accelerator Y Combinator has reduced its stake in Groww, selling nearly 1.2% in the fintech company for Rs 1,435 crore through an open-market transaction.",
    readTime: "2 min read",
    featured: false,
    content: `US-based startup accelerator Y Combinator has once again reduced its stake in Groww, selling nearly 1.2% in the fintech company's parent, Billionbrains Garage Ventures, for Rs 1,435 crore through an open-market transaction. 

According to BSE bulk deal data, Y Combinator, through its affiliate YC Holdings II LLC, sold 7.47 crore shares at an average price of Rs 192.16 per share. Following the sale, YC Holdings II's stake in Groww has fallen to 7.44% from 8.63%. The buyers involved in the transaction were not disclosed. 

This is Y Combinator's second major stake sale in Groww this year. In May, the accelerator sold a 1.45% stake for Rs 1,642 crore through an open-market transaction, joining early investors like Peak XV Partners and Ribbit Capital in a collective 4.7% stake sale worth Rs 5,352 crore. 

The latest sale comes at a time when Groww continues to report strong financial growth. The Bengaluru-based fintech posted a 94% year-on-year jump in net profit to Rs 735 crore in Q1 FY27, compared with Rs 378 crore in the year-ago period. Its consolidated revenue from operations also rose 66% year-on-year to Rs 1,501 crore during the quarter. 

Groww's share is currently trading at Rs 194.8 per share with a total market capitalization of Rs 1,22,209 crore.`,
  },
  {
    id: "rezolv-12-5-mn-series-a-2026",
    title: "Norwest Leads $12.5 Mn Series A Round in AI Lending Tech Platform Rezolv",
    date: "18-08-2026",
    category: "FinTech",
    image: "/images/business-insights/rezolv.png",
    excerpt: "AI-native lending technology platform Rezolv has raised $12.5 million in a Series A round led by Norwest to strengthen its core AI capabilities across sales, risk, and collections.",
    readTime: "2 min read",
    featured: false,
    content: `Rezolv, an AI-native lending technology platform for financial services, has raised **$12.5 million** in a Series A funding round led by Norwest, with participation from Vertex Ventures Southeast Asia and India, and existing investor 3one4 Capital. Prior to this, the Mumbai-based firm raised $3.5 million in a seed round led by 3one4 Capital in March last year.

The company will deploy the fresh capital to strengthen its core AI capabilities across the lending suite, including sales, risk, underwriting, and collections.

Co-founded in October 2024 by Karan Mehta and Sonali Jindal (former co-founders of digital lending startup Kissht), Rezolv enables lenders to automate, streamline, and optimize their lending workflows. The platform leverages advanced analytics, automation, and digital engagement to drive efficiencies while improving customer experience, from welcome calling and pre-delinquency to write-offs.

Rezolv primarily serves banks and NBFCs through a debt-collection platform powered by AI. Since its inception, the startup has partnered with over 22 banks and NBFCs, including AU Small Finance Bank, ICICI Bank, Poonawalla Fincorp, Bajaj Auto Credit, and Five-Star Business Finance. 

Currently, Rezolv powers 6.5 million minutes of borrower conversations every month, enabling pan-India collections across more than 12 million loan accounts. The company claims its platform has helped improve bounce and resolution rates by 35%.`,
  },
  {
    id: "wispr-flow-280-mn-series-b-2026",
    title: "Wispr Flow Raises $280 Mn at $2 Bn Valuation",
    date: "18-08-2026",
    category: "Voice AI",
    image: "/images/business-insights/wispr-flow.png",
    excerpt: "San Francisco-based voice AI startup Wispr Flow has raised $280 million in a Series B round, nearly tripling its valuation to $2 billion in less than a year.",
    readTime: "2 min read",
    featured: false,
    content: `San Francisco-based voice AI startup Wispr Flow has raised $280 million in a Series B funding round led by Menlo Ventures. The round saw participation from existing investors including Notable Capital, NEA, Neo Ventures, and 8VC, as well as new investors like Acrew, Forerunner, Goodwater, and Peak XV. 

The round valued the company at **$2 billion**, nearly a threefold increase from its $700 million valuation when it raised $25 million less than a year ago. The fresh funding takes Wispr Flow's total capital raised to $361 million.

Founded by Tanay Kothari, Wispr Flow develops AI-powered speech-to-text software that allows users to write and perform workplace tasks using voice. The company's platform is currently used by more than 10,000 businesses. The new capital will be used to expand its product and speech AI capabilities. 

Wispr Flow has also introduced Canto, its proprietary speech recognition model designed to improve accuracy in difficult environments. The company is actively expanding beyond voice dictation into areas such as meeting notes and other workplace applications. Notably, India is the second-largest market for Wispr Flow in terms of both users and paying subscribers.`,
  },
  {
    id: "physicswallah-q1-fy27-results",
    title: "PhysicsWallah Revenue Rises 24% to Rs 1,054 Cr in Q1 FY27; Loss Drops 31%",
    date: "17-08-2026",
    category: "EdTech",
    image: "/images/business-insights/physicswallah-founder.jpg",
    excerpt: "Edtech unicorn PhysicsWallah reported a 24.4% year-on-year increase in revenue from operations to Rs 1,054 crore, while managing to narrow its net loss by 30.7%.",
    readTime: "2 min read",
    featured: false,
    content: `Edtech company PhysicsWallah reported a solid start to the financial year, with a **24.4% year-on-year increase** in revenue from operations in Q1 FY27, while successfully narrowing its losses by 30.7% during the quarter.

PhysicsWallah's revenue from operations increased to **Rs 1,054 crore** in Q1 FY27 from Rs 847 crore in Q1 FY26. The company's online business contributed Rs 549 crore, up 33.3% year-on-year. Offline revenue also grew 14.5% to Rs 490 crore. Including other income, total income stood at Rs 1,162 crore.

On the expense side, employee benefits remained the largest cost component at Rs 528 crore, up 15.8% year-on-year. Overall expenditure rose 18.3% to Rs 1,247 crore.

Due to strong revenue growth outpacing the rise in expenses, PhysicsWallah's net loss decreased to **Rs 88 crore** in Q1 FY27, down from Rs 127 crore in Q1 FY26. 

Recently, PhysicsWallah also approved a Rs 71.8 crore investment in UPSC coaching platform Sarrthi IAS, raising its stake from 40% to 51% and making it a subsidiary. The acquisition is expected to strengthen its presence in the UPSC and civil services examination preparation segment as it expands beyond its core K12 and test preparation business.`,
  },
  {
    id: "easemytrip-q1-fy27-results",
    title: "EaseMyTrip Posts Rs 135 Cr Revenue and Rs 11.7 Cr Loss in Q1 FY27",
    date: "17-08-2026",
    category: "Travel Tech",
    image: "/images/business-insights/easemytrip-founder.jpg",
    excerpt: "EaseMyTrip's operating revenue grew 18.5% year-on-year, but increased service and operating costs pushed the online travel aggregator into a net loss of Rs 11.7 crore for the quarter.",
    readTime: "2 min read",
    featured: false,
    content: `Online travel aggregator (OTA) platform EaseMyTrip announced its financial results for Q1 FY27. The company's operating revenue grew **18.5% year-on-year** to Rs 134.7 crore, up from Rs 113.7 crore in Q1 FY26. However, the company slipped into the red, reporting a net loss of Rs 11.7 crore.

Hotel packages emerged as the largest revenue contributor, accounting for over 50% of operating revenue. Revenue from the segment more than doubled to Rs 67.6 crore, compared to Rs 32.5 crore in Q1 FY26. Hotel room night bookings also rose 95.4% YoY to 6.47 lakh, averaging around 7,000 bookings per day. Air ticketing revenue, on the other hand, declined 4% YoY to Rs 54.7 crore.

Including other services and non-operating income, EaseMyTrip's total income rose to Rs 141.2 crore. 

On the expense side, the company's total expenses rose 30% year-on-year to Rs 152.6 crore in Q1 FY27. Service cost remained the largest expense at Rs 39.2 crore, more than doubling from the year-ago period. Advertisement and sales promotion expenses also increased significantly to Rs 18.5 crore. 

The rise in service costs and other operating expenses, coupled with slower revenue growth than the increase in expenses, pushed EaseMyTrip into a net loss for the quarter, compared to a profit of Rs 44 lakh in the same quarter last year.`,
  },
  {
    id: "bank-of-america-acquires-stake-jio-credit-2026",
    title: "Bank of America to Acquire 50% Stake in Jio Credit",
    date: "14-08-2026",
    category: "Financial Services",
    image: "/images/business-insights/jio-bofa.jpg",
    excerpt: "Bank of America and Jio Financial Services have announced a strategic joint venture, with the US bank set to acquire up to a 49.9% stake in Jio Credit Limited.",
    readTime: "3 min read",
    featured: false,
    content: `Bank of America and Jio Financial Services announced a strategic joint venture on August 12, 2026, under which Bank of America will acquire up to a **49.9% stake** in Jio Credit Limited, the lending subsidiary of Jio Financial Services. 

The deal is valued at approximately **₹18,268 crore** (roughly USD 1.9 billion). Under the structure of the agreement, Bank of America will initially acquire a 26.5% equity stake through a preferential allotment of shares and warrants, with the option to increase this to 49.9% upon the exercise of warrants.

The joint venture aims to combine Jio Financial Services' massive digital reach and local market knowledge with Bank of America’s global expertise in financial services, risk management, and technology. This powerful alliance is designed to accelerate credit access across India and introduce innovative lending products to a rapidly growing consumer base.

Jio Credit will maintain equal board representation from both companies, and its existing management team will continue to lead its strategy and operations. The transaction is subject to customary regulatory and statutory approvals, but it already marks one of the most significant foreign direct investments in India's booming financial sector this year.`,
  },
  {
    id: "astrotalk-becomes-unicorn-esop-buyback-2026",
    title: "Astrotalk Becomes Unicorn at USD 1 Bn Valuation Through ESOP Buyback",
    date: "14-08-2026",
    category: "Spiritual Tech",
    image: "/images/business-insights/astrotalk.jpg",
    excerpt: "Spiritual-tech platform Astrotalk has officially achieved unicorn status, reaching a USD 1 billion valuation through an ESOP buyback funded entirely from its own profits.",
    readTime: "3 min read",
    featured: false,
    content: `Spiritual-tech platform **Astrotalk** officially achieved unicorn status on August 12, 2026, reaching a massive **USD 1 billion** valuation. 

What makes this milestone remarkable is the method of valuation. Unlike most startups that reach unicorn status through a fresh venture capital funding round, Astrotalk achieved it through an **ESOP (Employee Stock Ownership Plan) buyback**. Even more impressively, the buyback was funded entirely through the company's own business profits rather than external capital.

More than 100 employees participated in the buyback, allowing them to liquidate a portion of their vested shares while remaining stakeholders in the company. This rare and elegant path to unicorn status rewards employees and validates the company's profitability without diluting equity through new venture capital.

Astrotalk has demonstrated stellar financial performance to back up its new valuation, reporting **₹1,176 crore in operating revenue** and **₹250 crore in net profit** for FY25. Its annualized revenue run rate has now surpassed ₹2,500 crore.

Founded in 2017 by Puneet Gupta and Anmol Jain, the Noida-based platform has successfully transitioned from an online astrology consultation marketplace into a broader spiritual-tech and e-commerce business via the Astrotalk Store. As the spiritual tech market continues to expand globally, Astrotalk is proving that sustainable, profitable growth is a viable alternative to the traditional growth-at-all-costs startup model.`,
  },
  {
    id: "porter-fy26-revenue-4x-profit-2026",
    title: "Porter Posts ₹6,650 Cr Revenue in FY26; Profits Jump 4X",
    date: "12-08-2026",
    category: "Logistics",
    image: "/images/business-insights/porter-logistics.jpg",
    excerpt: "Bengaluru-based intra-city logistics firm Porter has seen its operating revenue cross ₹6,650 crore, while net profits surged more than fourfold to ₹229 crore in FY26.",
    readTime: "3 min read",
    featured: false,
    content: `**Porter** has managed to keep its growth engine running even as competition heats up in India's intra-city logistics market, with Uber, Rapido and Delhivery expanding into the two-wheeler parcel delivery segment. After turning profitable for the first time in FY25, the Bengaluru-based firm's profit surged more than fourfold in the fiscal year ended March 2026. 

Its revenue also more than doubled over the past two fiscals, rising from ₹2,734 crore in FY24 to over ₹6,600 crore in FY26. Porter's revenue from operations increased **54.4% year-on-year to ₹6,650 crore in FY26** from ₹4,306 crore in FY25, according to its consolidated financial statements.

Porter operates a full-stack logistics platform that helps businesses optimise their last-mile delivery operations. Goods transportation services contributed 99% of its operating revenue, while the remaining revenue came from platform fees and other operating activities. The company primarily serves micro, small and medium enterprises (MSMEs) and has expanded its presence to more than 20 cities across India.

The growth in scale, coupled with better cost management, helped Porter increase its net profit more than fourfold to **₹229 crore in FY26** from ₹55 crore in FY25. Its return on capital employed (ROCE) improved to 16.7%. As of March 2026, the company had total current assets of ₹1,052 crore, including ₹526 crore in cash and bank balances.

Porter has raised more than $332 million to date, including a $200 million Series F round in May 2025, led by Kedaara Capital and Wellington Management. For Porter, the challenge now is less about proving that the market exists and more about defending its position as larger players step into the segment.`,
  },
  {
    id: "yulu-series-c-gef-capital-93m-2026",
    title: "Yulu Raises $93 Mn in Series C Round Led by GEF Capital",
    date: "12-08-2026",
    category: "Electric Mobility",
    image: "/images/business-insights/yulu-funding.jpg",
    excerpt: "Electric mobility-as-a-service (MaaS) platform Yulu has raised $93 million to quadruple its active fleet to 200,000 EVs and expand into new urban mobility segments.",
    readTime: "3 min read",
    featured: false,
    content: `Electric mobility-as-a-service (MaaS) platform **Yulu** has raised **$93 million** in a Series C funding round through a combination of $63 million in equity led by GEF Capital Partners and $30 million in debt. The Bengaluru-based company had previously raised $19.25 million from existing investors Magna and Bajaj Auto in February 2024. 

Yulu plans to use the fresh capital to quadruple its active fleet to **200,000 electric vehicles** over the next two years, expand into new urban mobility use cases and support its plans for a potential public market listing. The company currently operates across 12 primary metros and eight franchise-operated regional markets.

Founded in 2017 by Amit Gupta, Anuj Tewari, RK Misra, and Naveen Dachuri, Yulu operates a technology-enabled fleet of electric two-wheelers for urban mobility and last-mile delivery. Its fleet is currently around 50,000 vehicles, covering 2.5 million zero-emission kilometres and facilitating more than 750,000 doorstep deliveries every day. The company claims its vehicles support more than 15% of quick-commerce deliveries across India's top four metropolitan centres.

Yulu nearly doubled its operating revenue to **₹237.4 crore in FY25**, while its net loss declined 12% to ₹126 crore. The company has since reported positive EBITDA from April 2025 and said its revenue grew sevenfold between FY23 and FY26.

The MaaS segment spans last-mile delivery, employee transportation, urban commuting, EV rentals and fleet electrification. Startups in the space use software, fleet management and charging infrastructure to improve vehicle utilisation and reduce operating costs. Yulu also plans to enter adjacent intra-city mobility segments with Yulu Express, a full-sized, high-payload electric scooter designed for ecommerce logistics.`,
  },
  {
    id: "aum-ventures-innovation-fund-ii-2026",
    title: "Aum Ventures Announces First Close of ₹750 Crore India Innovation Fund II",
    date: "11-08-2026",
    category: "Venture Capital",
    image: "/images/business-insights/aum-ventures.jpg",
    excerpt:
      "Early-stage VC firm Aum Ventures has announced the first close of its ₹750 crore India Innovation Fund II, focusing on IP-led deep-tech startups across space tech, AI, and semiconductors.",
    readTime: "3 min read",
    featured: false,
    content: `Early-stage venture capital firm **Aum Ventures** has announced the first close of its **India Innovation Fund II at ₹225 crore**. The fund has a target corpus of **₹750 crore (approximately $80 million)** and will invest in early-stage startups building IP-led technology companies from India for global markets.

According to the Mumbai-based VC firm, the first close attracted participation from both existing and new investors, with more than 65% of commitments coming from international limited partners across the US, the Middle East, and other global markets. The investor base includes family offices, entrepreneurs, and strategic investors.

The new fund will focus on sectors such as **space tech, AI, semiconductors, aerospace, defence tech, robotics, energy transition, and advanced manufacturing**. It will primarily invest at the pre-seed and seed stages, with initial investments typically ranging from **$750,000 to $2 million**. The fund will also reserve capital for follow-on investments through Series A and Series B rounds, aiming to back 25–30 companies over its lifecycle.

Aum Ventures was an early institutional investor in **Skyroot Aerospace**, which became India's first space-tech unicorn and recently launched its Vikram-1 rocket. Fund II builds on the firm's first fund, launched in 2023, which has recorded a gross MOIC of 2.23x and a gross IRR of 53% so far. Aum Ventures' portfolio includes Skyroot Aerospace, Azimuth AI, Cosmoserve Space, Sanyark Space, Sully.ai, and Latentai.`,
  },
  {
    id: "lightspeed-discovered-materials-seed-9mn-2026",
    title: "Lightspeed India Leads $9 Million Seed Round in Deep-Tech Startup Discovered Materials",
    date: "11-08-2026",
    category: "Deep Tech",
    image: "/images/business-insights/discovered-materials.jpg",
    excerpt:
      "Deep-tech startup Discovered Materials has raised $9 million in a seed round led by Lightspeed India Partners to scale its AI research agents for semiconductor thermal management.",
    readTime: "3 min read",
    featured: false,
    content: `Deep-tech startup **Discovered Materials** has raised **$9 million (₹85 crore)** in a seed funding round led by **Lightspeed India Partners**, with participation from Y Combinator, Peak XV Partners, and global angel investors including Paul Graham, Gokul Rajaram, and Thariq Shihipar. The fresh funds will be used to expand its team, laboratory, and scale its autonomous AI research agents.

Founded by **Advaith Sridhar** and **Akash Ramdas**, Discovered Materials is an AI-driven deep-tech startup focused on thermal dissipation challenges in AI chips, which can generate more than 140W/cm². The company is developing thermally conductive dielectric materials for 3D chip packaging.

The startup operates cloud-based autonomous AI agents that run thousands of virtual material hypotheses daily, using custom model harnesses incorporating frontier AI models. The AI-generated material candidates are then evaluated through physics simulations to assess their stability, dielectric constants, and thermal properties. The company has also launched the **Material Discovery Bench** to evaluate how frontier AI systems perform on real-world semiconductor material challenges.

Discovered Materials plans to patent promising candidates and license the resulting thermal management technologies to global chipmakers. According to the company, its AI systems have already developed new thermal materials in three months with performance comparable to products that traditionally took years to develop.`,
  },
  {
    id: "nazara-preferential-issue-new-ceo-2026",
    title: "Nazara Hands Its New CEO a 4.67% Stake in a ₹733 Crore Bet on Fresh Leadership",
    date: "06-08-2026",
    category: "Gaming & Media",
    image: "/images/business-insights/nazara-preferential-issue.png",
    excerpt:
      "Gaming major Nazara has approved a ₹733.5 crore preferential share issue that will make incoming CEO Raymond Stauffer a significant shareholder — days after a weak quarter and a founder-led leadership handover.",
    readTime: "3 min read",
    featured: false,
    content: `Gaming and media company **Nazara Technologies** has approved a **preferential issue of equity shares worth up to ₹733.5 crore**, in a move that ties its next chapter of leadership directly to the company's cap table. The proposal still awaits shareholder and regulatory approvals.

The board cleared the issuance of up to **2,39,70,676 equity shares at ₹306 apiece** (including a ₹304 premium) to **six identified investors** on a preferential basis. The names point to an international cohort: **Raymond Albaladejo Stauffer, Marc Sylvester Schutze, Maxime Loppin, Alexandre Paul Jean Noirot Cosson, Alexander Osou and Hugo Rémy Gaston Blavin.** Together, the six will hold a **5.87% stake** in Nazara after the issue.

The standout is Stauffer himself. Appointed Nazara's **chief executive officer earlier this week** and set to take charge from **September 1**, he will receive the lion's share — **1,90,67,969 shares**, giving him a **4.67% stake** in the company. It is a deliberate alignment of interests: the incoming chief executive is being asked to buy into the business he is about to run, not merely draw a salary from it.

The timing is pointed. The fundraise lands just three days after Nazara reported a **soft start to FY27.** Operating revenue fell **14%** year-on-year to **₹429 crore** in the June quarter (from ₹499 crore), and the company slipped to a **net loss of ₹82 crore**, reversing a ₹51 crore profit a year earlier. The red ink was weighed down by ₹62 crore in its share of losses from associates and a ₹22 crore impairment charge — the kind of quarter that often precedes a leadership reset.

That reset is already underway. Founder **Nitish Mittersain** has stepped down as CEO and will continue as **managing director**, turning his focus to long-term strategy and strategic partnerships, while Stauffer takes the operational reins. For a company that pioneered listed gaming in India, the combination of a founder moving to a strategy role, a new CEO with real skin in the game, and fresh capital signals an attempt to steady the ship and reset expectations after a rocky quarter.`,
  },
  {
    id: "homerun-series-a-plus-nexus-2026",
    title: "The Startup Delivering Cement and Plywood to Your Doorstep in 60 Minutes Raises $12 Million",
    date: "06-08-2026",
    category: "Quick Commerce",
    image: "/images/business-insights/homerun-series-a.png",
    excerpt:
      "Bengaluru's HomeRun is applying the quick-commerce playbook to an unglamorous corner of the economy — construction materials — and has raised a $12 million Series A+ led by Nexus Venture Partners to expand.",
    readTime: "3 min read",
    featured: false,
    content: `Quick commerce has conquered groceries, medicines and meals. **HomeRun**, a Bengaluru-based startup, is betting the same ten-minutes-to-your-door logic can work for something far heavier: **cement, plywood, wires and paint.** The company has raised **$12 million** in a **Series A+** round led by **Nexus Venture Partners** to widen that bet.

The round also drew existing backers — **Sorin Investments, Titan Capital, Sparrow Capital, and Consumer Collective by Atrium** — and follows a **$6.6 million** raise earlier this year, a sign of how quickly investor appetite for the category is building. HomeRun plans to use the fresh capital to enter new markets while strengthening its supply chain, technology and product range.

Founded by **Pukhraj Grewal**, HomeRun delivers construction and interior materials to contractors and homeowners **within 60 minutes**, with a catalogue spanning cement, plywood, wires, paints, hardware and other building supplies. It is a deceptively hard problem: unlike a packet of snacks, building materials are bulky, heavy and ordered in unpredictable combinations, which makes fast, reliable fulfilment a genuine operational feat rather than a marketing promise.

The early traction suggests the model resonates. HomeRun says it has fulfilled **more than 100,000 orders** and grown **8x** over the past year, all while operating out of a single city, Bengaluru, and deepening its core product categories rather than sprawling thin. Grewal is no first-timer in the space either — before HomeRun he co-founded the interior-contracting startup **Tornado** and the construction-labour marketplace **Project Hero**, giving him an unusually close view of the messy, fragmented world of Indian construction.

He is not alone in spotting the opportunity. The rapid-delivery-of-building-materials category is heating up: just last week, fellow Bengaluru startup **Fixxly** raised $5.5 million from Accel, Fireside Ventures and Lightspeed, while HomeRun also competes with retailers and players such as IBO and Material Depot. For Nexus Venture Partners — which closed its eighth fund at $700 million to back Indian and US startups across AI, enterprise software, consumer and fintech — the deal is a bet that the next big quick-commerce winner may be found not in the kitchen, but on the construction site.`,
  },
  {
    id: "adiabatic-indigenous-battery-deeptech-2026",
    title: "The Pune Startup Building India's Own Batteries for Robots, Drones and Defence",
    date: "05-08-2026",
    category: "Deep Tech",
    image: "/images/business-insights/adiabatic-battery-tech.png",
    excerpt:
      "Adiabatic Technologies designs its lithium-ion packs, chargers and battery brains in-house — and has already put more than 20,000 of them into robots, drones, defence systems and farm machines across India.",
    readTime: "3 min read",
    featured: false,
    content: `Most of the batteries powering India's robots, drones and defence hardware are still built on imported cells and off-the-shelf electronics. A Pune-based deep-tech startup, **Adiabatic Technologies**, is trying to change that by designing the entire battery system — cell selection, pack architecture, thermal management and its own **Battery Management System (BMS)** — under one roof.

Founded in 2022 by **Darshan Meher**, Adiabatic makes custom lithium-ion battery packs, smart chargers and proprietary BMS units for OEMs in high-reliability industries — the kind of applications where a battery failure is not a nuisance but a mission risk. Its systems are engineered for high discharge performance, fast charging, intelligent monitoring and thermal safety, the qualities that matter when a pack is sitting inside a drone, an autonomous mobile robot or a piece of defence equipment.

The traction is already on the ground rather than on a pitch deck: the company says it has deployed **more than 20,000 battery systems** across **25-plus OEMs**, spanning robotics, defence, drones, agriculture equipment, electric vehicles and solar energy. That breadth is the point — by controlling the design end to end, Adiabatic can tune a pack to the punishing, specialised needs of each sector instead of forcing a generic battery to fit.

The startup now plans to sharpen its focus on specialised platforms for **robotics, autonomous mobile robots (AMRs), industrial automation and unmanned aerial systems**, where reliability and performance are non-negotiable. It intends to scale in-house manufacturing capacity to **100 MWh a year**, backed by a recent seed round co-led by Malpani Ventures and Avinya Ventures, and is building out its engineering team to match.

In a market where energy storage is increasingly strategic — for factories, farms and the armed forces alike — Adiabatic's bet is that the country's next generation of machines will run better on batteries designed in India, for India's own conditions. It competes with a growing pack of domestic energy startups including EMO Energy, Neuron Energy and Inverted Energy.`,
  },
  {
    id: "earthre-inrisk-ai-reinsurance-giftcity-2026",
    title: "India Gets Its First Home-Grown Reinsurer — Powered by Satellites and AI",
    date: "05-08-2026",
    category: "Climate Tech",
    image: "/images/business-insights/inrisk-earthre-climate-ai.png",
    excerpt:
      "InRisk Labs has won the first reinsurer licence at GIFT City's international finance hub for its subsidiary EarthRe — an AI-native platform that prices climate and catastrophe risk using satellite, geospatial and claims data.",
    readTime: "3 min read",
    featured: false,
    content: `As floods, cyclones and crop failures grow costlier and harder to predict, India has taken a notable step toward pricing that risk with its own technology. **InRisk Labs**, a technology-led risk and reinsurance platform, has crossed a regulatory milestone: its subsidiary **EarthRe Insurance IFSC Limited** has become the **first incorporated reinsurer** to receive a licence from the International Financial Services Centres Authority (IFSCA) at **GIFT City**.

The licence marks the company's shift from a pure insurtech platform into an integrated reinsurance group with its own licensed, risk-bearing balance sheet. InRisk Labs will keep building the technology, data and risk-intelligence layer, while EarthRe underwrites the actual reinsurance business — the financial backstop that insurers themselves lean on when disaster strikes.

What makes the effort a genuine tech story is the engine underneath it. EarthRe's platform fuses **climate, geospatial, satellite, exposure and claims data** to sharpen underwriting, pricing, portfolio construction and capital allocation — an "AI-native" approach to a business that has traditionally run on historical tables and human judgment. It is built for **non-life reinsurance** across natural catastrophe, climate risk, property, crop and specialty lines, and plans to offer treaty, facultative, structured and **parametric** products — the kind that pay out automatically when, say, rainfall or wind speed crosses a defined threshold.

The ambition is explicitly national. "India will be the most consequential insurance market over the next two decades. To drive sustainable growth, we must build indigenous capacity and tailored solutions built by India, for India," said Malay Kumar Poddar, CEO of EarthRe. A fresh Series A co-led by Bessemer Venture Partners and Northpoint Capital will fund the underwriting, actuarial, catastrophe-modelling and AI capabilities needed to scale.

For a country that has long depended on global reinsurers to absorb its biggest shocks, a home-grown platform that reads risk through satellites and machine learning — and designs cover for the Global South — is as much an infrastructure bet as a financial one.`,
  },
  {
    id: "alibaba-qwen-max-open-weights-2026",
    title: "Alibaba Gives Away Its Most Powerful AI Model Yet — Free to Download, and Built to Run Inside Its Rivals' Tools",
    date: "05-08-2026",
    category: "Artificial Intelligence",
    image: "/images/business-insights/alibaba-qwen-max.jpg",
    excerpt:
      "Alibaba's new Qwen3.8-Max is the first Max-class model it will release with open weights — a 2.4-trillion-parameter system that comes close to Claude and ChatGPT and ships ready to run inside its rivals' own coding tools.",
    readTime: "3 min read",
    featured: false,
    content: `Alibaba has released **Qwen3.8-Max**, calling it the most capable model it has ever built — and, in a first for the company, it is giving it away. The weights land on **Hugging Face** and **ModelScope** next week, the first time Alibaba has open-sourced a model at its top "Max" tier, after years of keeping that class of system locked behind a paid API.

The scale is enormous. Qwen3.8-Max carries **2.4 trillion parameters** in total, with about **95 billion switched on** for any given query. Parameters are simply the dials a model can turn; the trick here is that only a fraction light up at once. The effect is like a vast library where just the relevant shelf illuminates for each question — which means small businesses and research labs with capable hardware can now run a state-of-the-art model without paying for a full datacenter.

Rather than the usual benchmark-chasing pitch, Alibaba leaned on **endurance**. The company says the model spent 16 days building a coding tool entirely on its own — 265 commits, 127 pull requests and 151 issues with no human touching the keyboard. It spent five days reproducing a research paper it had never seen the code for, then beat that paper's own results by 2.7 points. And in a 24-hour machine-learning contest, it finished ahead of 458 of 526 human teams.

**Built to live inside a rival's tools.** Perhaps the most striking part is the packaging. Qwen3.8-Max ships with setup instructions for **Claude Code** and **Codex** — the coding assistants made by Anthropic and OpenAI — and its API speaks both companies' protocols. Most of Alibaba's own coding benchmarks were run inside Claude Code.

Those benchmarks are candid about where the model stands. Across 31 text tests on Alibaba's own scorecard, **Anthropic's Fable 5** takes 15 first-place spots, **OpenAI's GPT-5.6 Sol** takes nine, and Qwen takes seven; on the 12 coding tests, Qwen wins exactly one. The counterweight is price — Qwen is far cheaper to run, costing roughly **30% of what Fable 5 charges**, so even if it needs more iterations to reach an answer, the total bill can come out lower. And on multimodal work — documents, video, spatial reasoning — the ranking inverts, with Qwen leading most of that table.

The giveaway marks a sharp strategic U-turn. As recently as April, Alibaba had shut down the free tier of Qwen Code and drifted toward closed, paid models after a round of leadership departures. That door is now open again, and the timing is deliberate. Chinese open-weight models have gone from under 2% of tokens on OpenRouter in late 2024 to roughly **61% by mid-2026**, and Qwen has overtaken Meta's Llama as the most self-hosted model in the world.

The backdrop is geopolitical as much as commercial. Washington restricted Fable 5 and Mythos 5 under export controls in June, and Beijing is reportedly weighing limits of its own on Chinese models heading overseas. Alibaba, in short, is losing on paper and winning on distribution — and when the thing you can download for free comes this close, second place starts to look like a very comfortable seat.`,
  },
  {
    id: "profound-ai-rep-seed-2026",
    title: "Ex-Swiggy and Zomato Leaders Launch Profound, an AI Startup That Gives Every Professional Their Own Agent",
    date: "04-08-2026",
    category: "Artificial Intelligence",
    image: "/images/business-insights/profound-ai-rep.jpg",
    excerpt:
      "Bengaluru-based Profound has raised $1.5 million to build an AI 'representative' for every professional — starting with a voice conversation and backed by the founders of Swiggy, Zomato and Razorpay.",
    readTime: "3 min read",
    featured: false,
    content: `A new Bengaluru-based startup wants to give every working professional the kind of representation that until now was reserved for actors and athletes. **Profound**, founded by former product and technology leaders **Anuj Rathi** and **Prashant Parashar**, has launched an AI-powered platform for professional networking and hiring, and raised **$1.5 million** in a seed round to build it out.

The founders bring an unusually deep operating pedigree, with experience spanning **Swiggy, Zomato, Cleartrip, Flipkart, Ola and Walmart Labs** — and the cap table reflects it. The round drew a roll-call of India's consumer-tech elite as angels: Swiggy CEO **Sriharsha Majety**, Swiggy cofounder **Nandan Reddy**, former Zomato cofounder **Pankaj Chaddah**, Razorpay CEO **Harshil Mathur**, WhatsApp's global head **Kunal Shah**, and OfBusiness cofounder **Bhuvan Gupta**, alongside venture firms **Stellaris Venture Partners** and **3one4 Capital**.

The idea at the centre of the product is the **"AI Rep."** Each professional's representative begins with a voice conversation, learning their experience, expertise, working style and career goals. From there, the platform recommends opportunities and quietly makes professional introductions on the user's behalf — the digital equivalent of an agent working the room while you get on with your job. "Just as actors have agents and athletes have managers, Profound gives each professional their own AI Rep," said cofounder and CEO Anuj Rathi.

The same logic runs in reverse for employers. Hiring managers can create AI representatives for specific roles or teams, capturing what they actually need through a voice conversation rather than a static job description — a bet that the messy, human parts of hiring are better expressed in speech than in bullet points.

Profound plans to use the fresh capital to expand its engineering and product teams, sharpen its AI capabilities, and develop the matching-and-introductions engine that sits at its core. It has opened **early access** for a first cohort of users, with a wider beta planned later this year and an ambition to onboard **one million professionals** globally before it fully opens the doors.`,
  },
  {
    id: "leap-india-ipo-august-2026",
    title: "KKR-Backed LEAP India Files RHP for ₹2,480 Crore IPO; Issue Opens August 7",
    date: "03-08-2026",
    category: "IPO & Markets",
    image: "/images/business-insights/leap-india-ipo.png",
    excerpt:
      "Logistics firm LEAP India has filed its RHP for a ₹2,480 crore IPO opening August 7, with a ₹480 crore fresh issue and a ₹2,000 crore KKR-led offer for sale.",
    readTime: "3 min read",
    featured: false,
    content: `Logistics solutions firm LEAP India has filed its red herring prospectus (RHP) with SEBI for a ₹2,480 crore initial public offering, set to open on August 7 and close on August 11 (with the anchor book on August 6). The price band is fixed at ₹151–₹159 per share.

The company, which received SEBI's approval in December, has bumped up its fresh issue to ₹480 crore (from ₹400 crore proposed in its draft filing), with the remaining ₹2,000 crore coming as an offer for sale. The OFS is led by KKR-backed promoter entity Vertical Holdings II Pte. Ltd., selling shares worth ₹1,998.6 crore, alongside a smaller ₹13.8 crore sale by another KKR-linked entity.

Founded in 2013, LEAP India provides pallet pooling, container pooling, and related material-handling solutions, counting leading FMCG, pharma, and e-commerce players among its clients. Of the fresh-issue proceeds, ₹360 crore will go toward repaying certain borrowings, with the rest for general corporate purposes. JM Financial, Avendus Capital, IIFL Capital, and UBS Securities are the book-running lead managers.

As of the RHP, KKR's Vertical Holdings II is the largest shareholder at 73.78%, followed by founder Sunu Mathew with 21.07%; Sixth Sense Ventures, First Bridge Fund, and Madhurima International hold small stakes.

The listing comes on the back of strong numbers: for FY26, LEAP India grew operating revenue 57% year-on-year to ₹730 crore (from ₹466 crore), while profit jumped more than 70% to ₹63 crore.`,
  },
  {
    id: "matel-series-b-uc-impower",
    title: "Matel Raises ₹130 Crore Series B to Scale India-Made EV Powertrains",
    date: "03-08-2026",
    category: "EV & Mobility",
    image: "/images/business-insights/matel-series-b.png",
    excerpt:
      "Pune-based Matel Motion & Energy Solutions has raised ₹130 crore in a Series B led by UC Impower to expand manufacturing and R&D for its EV motors and powertrains.",
    readTime: "3 min read",
    featured: false,
    content: `Pune-based Matel Motion & Energy Solutions has raised ₹130 crore (around $15 million) in a Series B round led by UC Impower. The round also drew Catamaran as a new investor, with existing backer Transition VC participating again — a sharp step up from the $4 million Series A it raised in May 2024.

The startup plans to use the fresh capital to expand manufacturing capacity, deepen research and development, accelerate product development, hire across engineering and production, and support international expansion.

Founded in 2017 by Sunil Patel and Netaji Patro, Matel designs and manufactures motors, motor controllers, and integrated powertrains for automotive and industrial use. Its solutions span the full spectrum of electric vehicles — two-, three-, and four-wheelers, buses, and off-road vehicles — as well as pumping, cooling, and other industrial systems. It began mass production of its powertrains in April 2024 after securing validation and certification from multiple EV OEMs.

On the technology front, Matel has developed magnet-free motor technology and offers IE5 industrial motors, with an even more efficient IE6 motor in development. It currently supplies OEMs across the two-wheeler, three-wheeler, and industrial segments.

The founders bring deep pedigree: CEO Sunil Patel previously led the Chetak EV development programme at Bajaj Auto's R&D division, while co-founder Netaji Patro has held R&D roles at Maruti Suzuki and Bajaj Auto — experience that anchors Matel's bet on building core EV components in India.`,
  },
  {
    id: "snabbit-115000-daily-jobs-q1-fy27",
    title: "Snabbit Crosses 115,000 Daily Jobs as Burn Per Job Falls Below Rs 250",
    date: "02-08-2026",
    category: "Quick Commerce",
    image: "/images/business-insights/snabbit-daily-jobs.png",
    excerpt:
      "Quick home-services startup Snabbit has crossed 115,000 fulfilled jobs in a single day and sharpened its unit economics in Q1 FY27, with burn per job dropping below Rs 250.",
    readTime: "3 min read",
    featured: false,
    content: `Quick home-services startup Snabbit has crossed 115,000 fulfilled jobs in a single day, alongside a notable improvement in its unit economics during the first quarter of FY27.

The company completed roughly 4 million jobs in its core househelp category during Q1 FY27, while consolidated Net Order Value (NOV) — after customer discounts — crossed Rs 130. Crucially, burn per job fell by more than Rs 100 quarter-on-quarter to below Rs 250, and Snabbit maintained that its growth has not been driven mainly by aggressive discounting.

The scale-up has been rapid: Snabbit went from around 400 daily jobs to more than 115,000 a day in under two years, having crossed 50,000 daily jobs and one million monthly jobs earlier this year. It now operates across 10 cities — including Mumbai, Delhi, Pune, Gurgaon, Noida, and Hyderabad — spanning over 150 micromarkets, with early traction in newer categories like Home Cooks and Salon at Home.

Founder and CEO Aayush Agarwal said mature micromarkets now complete more than 2,500 jobs a day, with several residential communities generating over 500 daily jobs, and expects consolidated NOV to improve another 15–20% in the coming months. The platform says it enables more than 100,000 daily earning opportunities for its network of 25,000-plus "Experts."

The milestone comes months after Snabbit raised $56 million in a Series D round (taking total funding to $112 million) — and amid intensifying competition. Rival Urban Company's InstaHelp also crossed 100,000 delivered orders in a single day, and per a recent report completed about 1.9 million orders in July versus Snabbit's 1.85 million, while Pronto crossed 1.25 million bookings.`,
  },
  {
    id: "upi-record-july-2026",
    title: "UPI Hits All-Time High of 23.66 Billion Transactions in July",
    date: "01-08-2026",
    category: "Fintech & Payments",
    image: "/images/business-insights/upi-july-2026-record.png",
    excerpt:
      "UPI processed a record 23.66 billion transactions worth Rs 29.88 lakh crore in July 2026, its highest-ever monthly volume, per NPCI data.",
    readTime: "3 min read",
    featured: false,
    content: `India's Unified Payments Interface (UPI) has set a new record, clocking its highest-ever monthly volume in July 2026 with 23.66 billion transactions worth Rs 29.88 lakh crore, according to data from the National Payments Corporation of India (NPCI).

The July figure surpassed the previous volume record of 23.20 billion transactions set in May. Transaction value stayed just shy of its all-time high of Rs 29.90 lakh crore, also recorded in May. On a daily basis, UPI handled 763 million transactions, with average daily value of Rs 96,383 crore.

Growth continued month-on-month and year-on-year: volume rose 4.1% over June (from 22.72 billion) and value climbed 3.3% (from Rs 28.92 lakh crore), while on an annual basis volume grew 22% and value 19%. UPI had first crossed the 23 billion monthly mark only in May.

Among apps, PhonePe (backed by Walmart) retained its lead as of June with 10.48 billion transactions, followed by Google Pay and Paytm; notably, WhatsApp overtook CRED in monthly volume. NPCI is yet to release app-wise data for July.

UPI's global footprint also keeps widening. Following the Maldives' recent launch of a real-time payment corridor with India, UPI merchant payments are now live in 10 international markets — Bhutan, Singapore, the UAE, France, Mauritius, Sri Lanka, Nepal, Qatar, Cambodia, and the Maldives — with Greece connected for peer-to-peer transfers and remittance linkages live in Singapore and Nepal.`,
  },
  {
    id: "unbloc-yuvraj-singh-founding-team",
    title: "Yuvraj Singh Joins Healthians Founder's Stealth Health Venture UN:BLOC",
    date: "03-08-2026",
    category: "Health Tech",
    image: "/images/business-insights/unbloc-yuvraj-singh.png",
    excerpt:
      "Cricketer Yuvraj Singh has joined UN:BLOC — serial entrepreneur Deepak Sahni's new, still-stealth healthcare startup — as an investor and founding-team member, reuniting the duo behind Healthians.",
    readTime: "3 min read",
    featured: false,
    content: `Cricketer Yuvraj Singh has joined UN:BLOC, the new healthcare venture from serial entrepreneur Deepak Sahni, as both an investor and a member of its founding team — the second company the two have built together.

The partnership is a familiar one. Yuvraj was among the earliest backers of Sahni's previous company, Healthians, which grew into one of India's largest at-home diagnostics networks. This time, he's in from the very beginning.

For now, UN:BLOC is deliberately quiet. Headquartered in Gurugram and still in stealth mode, the company has yet to unveil its product or business model. It says it wants to tackle longstanding problems in healthcare by focusing on areas that have received relatively little attention. Sahni is in early conversations with a close circle from healthcare, business, and other sectors — some of whom are expected to take part in a pre-launch funding round in the coming weeks.

The move also reflects a broader shift in Indian sport: over the past decade, cricketers have gone from brand ambassadors to active startup investors. More than 20 current and former players have backed ventures across fintech, healthtech, D2C, fitness, gaming, EVs, and sports technology. Virat Kohli has built one of the largest startup portfolios among Indian athletes; Yuvraj invests through his YouWeCan Ventures; and, more recently, MS Dhoni, Jasprit Bumrah, and Hardik Pandya backed gaming startup LightFury Games.`,
  },
  {
    id: "vault-virat-kohli-investors",
    title: "Virat Kohli and Brother Vikas Join \"Vault by Virat Kohli\" as Strategic Investors",
    date: "31-07-2026",
    category: "Business & Lifestyle",
    image: "/images/business-insights/vault-virat-kohli.png",
    excerpt: "Premium fitness chain Vault by Virat Kohli has brought cricketer Virat Kohli and his brother Vikas on board as strategic investors, deepening the star's involvement as the brand plans a nationwide expansion.",
    readTime: "3 min read",
    featured: false,
    content: `Premium franchise-led fitness chain Vault by Virat Kohli has formally onboarded cricketer and entrepreneur Virat Kohli and his brother Vikas Kohli as strategic investors, cementing the family's role in the brand that carries his name. The move takes Virat beyond being the face of the chain into an active ownership role, and the backing will fund the company's next phase of national expansion through its franchise-partner model.

Founded in 2023 by Mukesh Gogia, Vault is positioned as a premium fitness and wellness destination — blending strength and functional training, structured programmes, and dedicated recovery facilities. It has partnered with global equipment and recovery names like Matrix, Torque USA, and Precor, with Hyperice powering its recovery rooms.

The Delhi-based brand already operates across Tier I and Tier II cities including Delhi NCR, Bengaluru, Gorakhpur, and Hyderabad, and now wants to push into Tier III markets, betting on rising demand for organised, premium fitness infrastructure.

For India's startup scene, the tie-up is another example of a marquee athlete moving from brand ambassador to genuine business builder — lending both capital and credibility to a homegrown consumer brand.`,
  },
  {
    id: "phonepe-pulsepro-launch",
    title: "PhonePe Launches PulsePro, Turning Payments Data into Market Intelligence",
    date: "31-07-2026",
    category: "Fintech & Innovation",
    image: "/images/business-insights/phonepe-pulsepro.png",
    excerpt: "PhonePe has launched PulsePro, an enterprise intelligence platform that turns anonymised transaction data from its vast payments network into near-real-time market insights for businesses.",
    readTime: "3 min read",
    featured: false,
    content: `PhonePe has launched PulsePro, an enterprise intelligence platform that converts aggregated, anonymised transaction data from its payments network into actionable market insights — a notable step in monetising data as a product.

PulsePro lets businesses analyse consumer spending trends, category performance, and local market dynamics to guide expansion, distribution, site selection, and category growth. PhonePe pitches it as a near-real-time alternative to slow, survey-based market research, covering more than 200 store categories and over 100 market signals down to district and postal-code level — including hyperlocal quick-commerce penetration.

The platform draws on PhonePe's enormous footprint: over 700 million registered users, more than 50 million merchants, and 99% of India's postal codes. It extends PhonePe Pulse, the free public data platform launched in 2021, with PulsePro positioned as a paid, advanced enterprise tier.

Some quirky insights PhonePe surfaced from the data: Chakan in Pune has the most OTT users nationwide, Maharashtra leads in pet-related spending, and Marathahalli in Bengaluru records the most late-night orders in the country. "Businesses today don't just need more data, they need better intelligence," said Karthik Raghupathy, Head of Strategy at PhonePe.`,
  },
  {
    id: "made-in-bharat-space-chips",
    title: "India to Power Its Rockets with Home-Grown \"Made in Bharat\" Space Chips",
    date: "30-07-2026",
    category: "Tech & Innovation",
    image: "/images/business-insights/made-in-bharat-space-chips.png",
    excerpt: "India will begin using domestically developed semiconductor chips in its space launch vehicles, marking a major step toward self-reliance in one of the hardest areas of deep tech.",
    readTime: "3 min read",
    featured: false,
    content: `India is set to take a significant leap in deep-tech self-reliance. On July 27, 2026, Union Minister Ashwini Vaishnaw announced that domestically developed semiconductor chips will soon power Indian space launch vehicles — a milestone that reduces the country's dependence on imported electronics for its most critical missions. The announcement followed a meeting with Skyroot Aerospace, after its Vikram-1 became India's first privately developed orbital-class rocket to successfully reach orbit.

Space is one of the most brutal environments for electronics. Chips that guide navigation, flight control, onboard computers, and communication must survive violent launch vibrations, extreme temperatures, intense radiation, and the vacuum of space — conditions that would destroy ordinary processors. Designing reliable space-grade chips takes years of specialised research, which is why so few countries can do it.

At the heart of India's push is VIKRAM3201, a 32-bit indigenous microprocessor jointly developed by the Semi-Conductor Laboratory (SCL) and the Vikram Sarabhai Space Centre (VSSC). Unveiled at Semicon India 2025, it was space-validated aboard the POEM-4 module on the PSLV-C60 mission. It builds on the 16-bit Vikram1601, which has flown on ISRO vehicles since 2009, and is joined by newer processors like KALPANA3201 and IRIS — a RISC-V controller co-developed by IIT Madras and ISRO on the open-source SHAKTI architecture.

The effort reflects a rare collaboration across ISRO, SCL, VSSC, IIT Madras, and private players like Skyroot — combining research, academia, and industry. As India's launch cadence and satellite ambitions grow, these home-grown chips are expected to become the quiet backbone of its next generation of rockets and spacecraft.`,
  },
  {
    id: "instamart-nandita-sinha-ceo",
    title: "Instamart Names Former Myntra CEO Nandita Sinha as CEO; Amitesh Jha Resigns",
    date: "30-07-2026",
    category: "Quick Commerce",
    image: "/images/business-insights/instamart-nandita-sinha.png",
    excerpt: "Swiggy's quick commerce arm Instamart has appointed former Myntra CEO Nandita Sinha as its chief executive, effective August 3, as Amitesh Jha steps down.",
    readTime: "3 min read",
    featured: false,
    content: `Swiggy's quick commerce arm Instamart has appointed former Myntra CEO Nandita Sinha as its Chief Executive Officer, effective August 3. She succeeds Amitesh Jha, who has resigned to pursue other opportunities; Jha had joined Instamart as CEO in August 2024 after leaving Flipkart.

Swiggy said Jha tendered his resignation on July 28 and will step out of the company's senior management from August 3. Group CEO Sriharsha Majety credited him with leading Instamart through a key phase of expansion — including the launch of Noice and improvements in contribution margins — while welcoming Sinha's "vision, customer obsession and operational rigor."

Sinha arrives with more than two decades across consumer internet, e-commerce, and FMCG. At Myntra, she led the platform through market-share gains and EBITDA profitability, and has previously held leadership roles at Flipkart, Britannia, and Hindustan Unilever. At Instamart, she will focus on expanding assortment, improving profitability, strengthening customer experience, and driving operational excellence.

The change marks the third senior-level exit at Instamart in recent months, following the departures of COO Ankit Jain and CBO Hari Kumar. Jain has since joined listed retailer Nykaa to lead its quick commerce vertical, Nykaa Now.`,
  },
  {
    id: "table-space-350mn-ipo",
    title: "Table Space to File Draft Papers for $350 Million IPO Next Month: Report",
    date: "28-07-2026",
    category: "IPO & Markets",
    image: "/images/business-insights/table-space-ipo.png",
    excerpt: "Managed workspace provider Table Space is reportedly set to file its DRHP with SEBI next month for a public issue of up to $350 million, combining a ₹1,000 crore fresh issue with an offer for sale.",
    readTime: "3 min read",
    featured: false,
    content: `Managed office solutions provider Table Space is reportedly preparing to file its draft red herring prospectus (DRHP) with SEBI next month for a public issue worth up to $350 million.

According to a Bloomberg report, the company is looking to raise up to $350 million (about ₹3,353 crore), through a mix of fresh equity shares worth around ₹1,000 crore and an offer for sale by existing shareholders. Responding to Inc42's queries, a Table Space spokesperson declined to comment on "market speculation or media reports." The company had earlier raised $300 million in equity from global private equity firm Hillhouse Capital in 2022.

Founded in 2017 by the late Amit Banerji and Karan Chopra — and now led by Chopra and Kunal Mehra as co-CEOs — Table Space provides managed workspaces for large enterprises and global capability centres (GCCs), offering customised offices, ready-to-move suites, and workplace management services. It currently manages over 11 million sq ft across 80-plus centres in nine Indian cities, serving more than 425 enterprise clients.

Financially, the company's operating revenue jumped 51% to ₹1,360 crore in FY25, from ₹908 crore in FY24, though it reported a net loss of ₹1,561 crore (versus an ₹11 crore profit the previous year), largely due to exceptional items.

The plans come amid strong investor interest in India's flexible workspace sector, with peers such as Awfis, Smartworks, WeWork India, and IndiQube having gone public in recent years.`,
  },
  {
    id: "pine-labs-q1-fy27-results",
    title: "Pine Labs Reports ₹737 Crore Revenue in Q1 FY27 as Profit Jumps Over 4x",
    date: "28-07-2026",
    category: "Fintech",
    image: "/images/business-insights/pine-labs-q1.png",
    excerpt: "Fintech major Pine Labs posted ₹737 crore in Q1 FY27 revenue, up 20% year-on-year, while net profit jumped fourfold to ₹20 crore.",
    readTime: "3 min read",
    featured: false,
    content: `Fintech major Pine Labs has reported a strong start to the fiscal year ending March 2027, with operating revenue growing 20% year-on-year and profit jumping fourfold.

Revenue from operations rose to ₹737 crore in Q1 FY27, up from ₹616 crore a year earlier. The digital infrastructure and transaction platform was the largest contributor at ₹499 crore (up 14.9%), while the issuing and acquiring platform grew 31% to ₹238 crore. Including non-operating income, total income reached ₹766 crore.

Crucially, revenue grew faster than costs. Total expenditure rose 10.6% to ₹728 crore, even as employee-benefit expenses — the company's biggest cost — actually fell 7.9% to ₹268 crore. The result: net profit surged to ₹20 crore, up from ₹5 crore in the same quarter last year. On a unit level, Pine Labs spent ₹0.99 to earn every rupee of operating revenue, an improvement from ₹1.07 a year ago.

The Bengaluru-based company's shares traded around ₹151 during the day, giving it a market capitalisation of roughly ₹17,188 crore.`,
  },
  {
    id: "snitch-acquires-berrylush",
    title: "Snitch Acquires Berrylush to Enter Women's Fashion",
    date: "28-07-2026",
    category: "Consumer & Brands",
    image: "/images/business-insights/snitch-berrylush.png",
    excerpt: "D2C fashion brand Snitch has acquired women's label Berrylush, marking its first major expansion beyond menswear as it builds a broader portfolio of fashion brands.",
    readTime: "3 min read",
    featured: false,
    content: `D2C fashion brand Snitch has acquired women's fashion label Berrylush, marking its entry into the women's apparel segment as it expands beyond its menswear roots. Financial details of the transaction were not disclosed.

Berrylush will continue to operate under its own brand while tapping Snitch's capabilities across product development, technology, supply chain, marketing, and omnichannel retail. Snitch will work with Berrylush co-founder Anusha Chandrashekar and her team to accelerate product innovation and expand the brand's presence.

"Entering women's fashion has always been part of our long-term vision. Instead of starting from zero, we saw an opportunity to build on Berrylush's strong foundation," said Siddharth Dungarwal, founder and CEO of Snitch.

The deal comes a little over a year after Snitch raised $40 million in a Series B round led by 360 ONE Asset, taking its total funding past $53 million. The company's revenue grew 81% to ₹900 crore in FY26, from ₹498 crore a year earlier — and the Berrylush acquisition marks its first step toward building a multi-brand fashion house.`,
  },
  {
    id: "apollo-eplane-electric-air-ambulance",
    title: "Apollo & The ePlane Company Join Forces for India's First Electric Air Ambulance",
    date: "28-07-2026",
    category: "Health Tech & Mobility",
    image: "/images/business-insights/apollo-eplane-air-ambulance.png",
    excerpt: "Apollo Hospitals and The ePlane Company have signed an MoU to bring electric air ambulances and medical delivery drones into India's emergency healthcare system.",
    readTime: "3 min read",
    featured: false,
    content: `In a landmark move for Indian healthcare, Apollo Hospitals and The ePlane Company have signed a Memorandum of Understanding (MoU) to introduce electric air ambulances and medical delivery drones into the country's emergency care system. The MoU was signed in Chennai and announced at the Farnborough International Airshow in the UK on July 23.

Under the partnership, Apollo Hospitals will evaluate ePlane's e200X electric vertical take-off and landing (eVTOL) aircraft for uses including inter-hospital patient transfers, trauma response, cardiac and stroke emergencies, and organ transportation. The aircraft is designed to move patients up to seven times faster than road transport — cutting the delays caused by traffic congestion and long distances that so often prove fatal in emergencies.

The collaboration will also explore medical delivery drones developed by Amber Wings, a subsidiary of The ePlane Company, to transport critical materials such as blood products, organs, vaccines, medicines, and diagnostic samples between facilities.

The ePlane Company recently unveiled the first full-scale prototype of its e200X, designated PT-01, which has entered ground testing ahead of planned certification flight tests in 2027, with commercial operations targeted from 2028. If realised, the tie-up could make emergency air mobility a practical reality for Indian patients — a significant step for the country's healthcare and deep-tech ambitions.`,
  },
  {
    id: "bombay-shaving-company-fy26-results",
    title: "Bombay Shaving Company Revenue Jumps to ₹635 Crore, Nears Break-Even",
    date: "28-07-2026",
    category: "Consumer & Brands",
    image: "/images/business-insights/bombay-shaving-company.png",
    excerpt: "Bombay Shaving Company's parent more than doubled revenue to ₹635 crore in FY26 and posted its first-ever positive adjusted EBITDA, signalling the grooming brand is closing in on profitability ahead of a planned IPO.",
    readTime: "3 min read",
    featured: false,
    content: `Visage Lines Personal Care, the parent of Bombay Shaving Company, has reported a 2.4x jump in operating revenue for FY26, alongside its first-ever positive adjusted EBITDA of ₹2 crore — a sign the grooming brand is finally converting scale into sustainable economics.

Revenue from operations surged 139% to ₹635 crore in FY26, up from ₹266 crore a year earlier. The company's core personal care products — its flagship men's grooming brand Bombay Shaving Company and women's care brand Bombae — contributed over 91% of that, at ₹581 crore. A services arm, 100Days, and interest income took total revenue to ₹641 crore.

Higher sales came with heavy investment: material costs rose 2.8x to ₹370 crore, while advertising and promotion climbed 55% to ₹158 crore. Even so, the Gurugram-based company narrowed its net loss sharply — down 85% to ₹9 crore, from ₹58 crore in FY25.

The company last raised ₹136 crore (around $15.3 million) in November 2025, in a round led by Sixth Sense Ventures with participation from founder Shantanu Deshpande and former cricketer Rahul Dravid, as it gears up for a potential IPO.`,
  },
  {
    id: "flipkart-food-delivery-push",
    title: "Flipkart Pushes Deeper Into Food Delivery",
    date: "27-07-2026",
    category: "E-commerce",
    image: "/images/business-insights/flipkart-food-delivery.jpeg",
    excerpt: "Flipkart's 'digital mall' strategy is extending into food delivery, adding a new vertical to compete with Swiggy, Zomato, and Rapido as it aims to become a one-stop consumer destination.",
    readTime: "3 min read",
    featured: false,
    content: `Flipkart's expansion beyond e-commerce continued this week as reports on July 26 detailed the company's "digital mall" strategy extending into food delivery, adding a new vertical to compete with established players like Swiggy, Zomato, and Rapido.

This follows Flipkart's confirmation days earlier that it would formally enter the food delivery space, signaling a broader ambition to transform its platform into a one-stop consumer destination spanning shopping, quick commerce, and now dining.

The move intensifies competition across India's already crowded online food and delivery ecosystem as major players jockey for a share of daily consumer spending.`,
  },
  {
    id: "meesho-q1-fy27-results",
    title: "Meesho Hits ₹3,713 Crore in Q1 Revenue and Cuts Losses by 54% as Path to Profit Sharpens",
    date: "24-07-2026",
    category: "E-commerce",
    image: "/images/business-insights/meesho-q1.png",
    excerpt: "Meesho reported Q1 FY27 revenue of ₹3,713 crore while narrowing its net loss by 54%, signalling the SoftBank-backed social commerce giant is closing in on profitability.",
    readTime: "3 min read",
    featured: false,
    content: `Meesho's latest numbers tell a simple story: the company is getting much closer to making money. In Q1 FY27, the social commerce platform posted ₹3,713 crore in revenue, roughly flat from a year ago, but its net loss shrank by 54%. For a SoftBank-backed business that has spent years chasing scale, that is the more important figure.

What has kept Meesho going is a customer that most of its rivals barely reach — the first-time online shopper in Tier 2, 3, and 4 towns, hunting for the lowest possible price. That reseller-driven, ultra-low-cost model has held up well even as quick commerce and premium e-commerce fought over the metros, because Meesho is simply playing a different game.

Most of the improvement came from the unglamorous work of running the business better: cheaper fulfilment, stronger supplier terms, and less money spent on marketing for every order placed. Put together, it has Meesho on track to potentially turn profitable in FY27 — a first for India's social commerce space.

An IPO is widely expected in 2027, and on its recent $2.1 billion valuation, this quarter only strengthens the argument that Meesho is one of the few e-commerce names in India that genuinely matters outside Flipkart and Amazon.`,
  },
  {
    id: "blinkit-spoilage-q1-fy27",
    title: "Blinkit Lost ₹308 Crore to Spoiled Goods in One Quarter — Nearly 3x Its Own EBITDA",
    date: "23-07-2026",
    category: "Quick Commerce",
    image: "/images/business-insights/blinkit-spoilage.jpeg",
    excerpt: "Blinkit lost around ₹308 crore to expired inventory, damage, transit loss, and theft in Q1 FY27 — nearly three times its quarterly adjusted EBITDA — as its inventory-led model amplifies risk.",
    readTime: "3 min read",
    featured: false,
    content: `Blinkit, India's dominant quick-commerce platform and now the largest revenue contributor for its parent Eternal, disclosed a striking operational challenge in its Q1 FY27 results: it lost approximately ₹308 crore — roughly 1.8% of its net order value — to expired inventory, damaged goods, items lost during transit, and theft. That figure is nearly three times Blinkit's quarterly adjusted EBITDA of ₹102 crore.

The disclosure comes as Blinkit has transitioned from a marketplace model to an inventory-led model, meaning it now buys and holds goods directly rather than connecting buyers and sellers. The shift has supercharged revenue — up 553% year-on-year to ₹15,664 crore — but has also amplified inventory risk.

Blinkit added 200 dark stores in the quarter, taking its network to 2,443 stores.

The spoilage figure will be a central point of scrutiny for investors tracking the company's path to sustainable profitability.`,
  },
  {
    id: "india-d2c-beyond-roas-playbook",
    title: "India's D2C Founders Are Abandoning the ROAS Playbook and Rethinking Growth",
    date: "22-07-2026",
    category: "Consumer & Brands",
    image: "/images/business-insights/d2c-roas-playbook.jpeg",
    excerpt: "India's direct-to-consumer brands are shifting away from ROAS obsession toward brand equity, owned channels, and repeat-customer economics as paid-acquisition costs climb.",
    readTime: "3 min read",
    featured: false,
    content: `A widely discussed Inc42 analysis argues that India's direct-to-consumer brands are entering a fundamental strategic reset — moving away from ROAS (Return on Ad Spend) obsession and toward brand equity, owned channels, and repeat-customer economics.

Rising performance marketing costs on Meta and Google, combined with investor pressure for profitability, have made pure paid-acquisition strategies unsustainable. Smarter D2C founders are now investing in WhatsApp, creator communities, newsletters, and offline touchpoints.

Brands such as BlueStone, Mamaearth, and SUGAR Cosmetics have already made this shift — and hit sequential quarterly profitability as a result.

The broader signal: the next generation of Indian D2C winners will be built on community and trust, not just performance ad budgets.`,
  },
  {
    id: "bharatpe-sg-finserve-succesship-paperless-credit",
    title: "BharatPe, SG Finserve and Succesship Join Forces to Bring Paperless Credit to India's Merchants",
    date: "21-07-2026",
    category: "Fintech & Lending",
    image: "/images/business-insights/bharatpe-sg-finserve.jpeg",
    excerpt: "SG Finserve has partnered with BharatPe Money and Succesship Technologies to launch a fully digital, paperless credit solution for India's merchants and MSMEs.",
    readTime: "3 min read",
    featured: false,
    content: `NBFC SG Finserve has partnered with BharatPe Money — the lending arm of payments unicorn BharatPe — and fintech infrastructure firm Succesship Technologies to launch a fully digital, paperless credit solution for India's merchants and MSMEs.

Built in compliance with RBI's Digital Lending Guidelines, the product offers faster loan approvals, minimal documentation, and seamless onboarding, targeting the large pool of small business owners who lack access to formal credit.

The collaboration connects SG Finserve's lending capital, BharatPe's merchant network of millions, and Succesship's technology infrastructure.

The partnership reflects a growing playbook in Indian fintech — stacking complementary capabilities across NBFCs, payment platforms, and B2B infrastructure players to serve the underbanked MSME segment at scale, rather than building end-to-end in-house.`,
  },
  {
    id: "physicswallah-acquires-sarrthi-ias",
    title: "PhysicsWallah Acquires UPSC Platform Sarrthi IAS, Expanding Deeper Into Competitive Exam Prep",
    date: "20-07-2026",
    category: "Edtech & M&A",
    image: "/images/business-insights/physicswallah-sarrthi-ias.jpeg",
    excerpt: "Edtech unicorn PhysicsWallah has acquired UPSC prep platform Sarrthi IAS, gaining a direct foothold in one of India's most competitive exam markets.",
    readTime: "3 min read",
    featured: false,
    content: `Edtech unicorn PhysicsWallah has acquired Sarrthi IAS, a dedicated UPSC civil services exam preparation platform, adding another brand to its rapidly growing stable of exam-prep products beyond its engineering and medical coaching roots.

The deal gives PhysicsWallah a direct foothold in the UPSC segment, one of India's most competitive and emotionally charged education markets, with hundreds of thousands of aspirants enrolling annually. PW has been on an acquisition spree as it diversifies from its flagship JEE and NEET content into competitive government job preparation, skill development, and K–12 tutoring.

Sarrthi IAS brings an established community of civil services aspirants, curated content, and experienced faculty.

The acquisition reflects a broader trend of edtech platforms consolidating niche players to build end-to-end learning ecosystems that cover a student from school through every major competitive exam they may sit in their lifetime.`,
  },
  {
    id: "india-first-hydrogen-train",
    title: "India Launches Its First Hydrogen-Powered Train",
    date: "15-07-2026",
    category: "Energy & Infrastructure",
    image: "/images/business-insights/hydrogen-train.jpg",
    excerpt: "India has launched its first hydrogen-powered train, a milestone in its green mobility journey that emits only water vapor and heat instead of greenhouse gases.",
    readTime: "3 min read",
    featured: false,
    content: `India has taken a major step toward sustainable transportation with the launch of its first hydrogen-powered train, marking a significant milestone in the country's green mobility journey. Developed under Indian Railways' broader decarbonization strategy, the train uses hydrogen fuel cells to generate electricity, emitting only water vapor and heat instead of harmful greenhouse gases.

Hydrogen-powered trains offer a cleaner alternative to diesel locomotives, particularly on non-electrified rail routes where full electrification may not be immediately feasible. This initiative aligns with India's commitment to achieving net-zero emissions by 2070 while strengthening energy security through cleaner technologies.

Beyond reducing carbon emissions, the project is expected to accelerate innovation in hydrogen production, fuel infrastructure, and advanced railway engineering.

As India continues investing in sustainable transport, hydrogen-powered railways could become a key pillar of the nation's future mobility ecosystem, reinforcing its ambition to emerge as a global leader in clean energy and green infrastructure.`,
  },
  {
    id: "india-uk-ceta-enters-force",
    title: "India–UK CETA Enters Into Force, Granting Duty-Free Access Across 99% of Tariff Lines",
    date: "15-07-2026",
    category: "Trade & Policy",
    image: "/images/business-insights/india-uk-ceta.jpeg",
    excerpt: "The India–UK Comprehensive Economic and Trade Agreement came into force on July 15, 2026, eliminating UK tariffs on 99% of Indian exports — India's most ambitious trade deal with a G7 nation.",
    readTime: "3 min read",
    featured: false,
    content: `The India–UK Comprehensive Economic and Trade Agreement (CETA), along with its companion Double Contribution Convention (DCC), officially came into force on July 15, 2026. Concluded after 14 rounds of negotiations and signed in London in July 2025, it is India's most ambitious trade deal with a G7 nation.

The UK immediately eliminates tariffs on 99% of Indian exports — removing duties of up to 70% on processed foods, 21.5% on marine products, 12% on textiles, and 8% on pharmaceuticals.

The DCC simultaneously exempts Indian professionals on temporary UK assignments from paying social security contributions for up to five years, covering over 75,000 workers across IT, engineering, healthcare, and finance.

Commerce Secretary Rajesh Agrawal described it as a "gold standard" agreement spanning 30 chapters — including digital trade, government procurement, and professional mobility — and a defining step toward Viksit Bharat 2047.`,
  },
  {
    id: "made-in-india-chocolate-brands",
    title: "Made in India: Homegrown Chocolate Brands Redefining Premium",
    date: "09-07-2026",
    category: "Consumer & Brands",
    image: "/images/business-insights/made-in-india-chocolates.jpeg",
    excerpt: "A new generation of Indian chocolatiers is combining locally sourced cacao, artisanal craft, and world-class packaging to turn homegrown chocolate into a global contender.",
    readTime: "3 min read",
    featured: false,
    content: `India's chocolate industry is quietly undergoing a remarkable transformation. While global brands have long dominated store shelves, a new generation of Indian chocolatiers is redefining what premium chocolate means — combining locally sourced cacao, artisanal craftsmanship, innovative flavours, and world-class packaging. From bean-to-bar makers working directly with farmers to luxury gifting brands crafting handmade bonbons and pralines, Indian chocolate is no longer just an alternative; it is becoming a global contender.

Entisi — Founded by entrepreneur Nikki Thakker, Entisi has built a reputation for elegant, handcrafted chocolates designed for celebrations and premium gifting. Its collection spans bonbons, pralines, dragées, bars, and curated hampers, from dark and milk chocolate to sugar-free and dietary-specific options — reflecting how Indian premium chocolate is evolving in taste, presentation, and gifting culture.

Bombay Sweet Shop — Blending India's traditional mithai heritage with modern confectionery, Bombay Sweet Shop reinvents classics like laddoos and barfis while also offering chocolate products, festive assortments, and contemporary gift boxes. It represents a new wave of Indian brands successfully merging nostalgia with innovation.

Jakobi Chocolatier — Based in Kochi, Jakobi crafts artisanal chocolates including truffles, bonbons, filled bars, and signature slabs, with seasonal collections and sugar-free options. Its focus on quality and presentation showcases India's growing expertise in handcrafted chocolate making.

Naviluna — Originating from Mysuru, Naviluna works closely with cacao farmers across Karnataka and Kerala to produce chocolate from organically grown Indian cacao. Its low-heat processing helps preserve the bean's natural flavour, resulting in distinctive dark and milk chocolate bars, and highlights India's growing bean-to-bar movement.

India is emerging as one of the most exciting destinations for premium chocolate thanks to high-quality Indian-grown cacao, direct partnerships with local farmers, flavours inspired by Indian ingredients, premium gifting-focused packaging, and rising global recognition for artisanal craftsmanship. As consumer preferences shift toward authenticity, sustainability, and locally made premium products, Indian chocolatiers are proving they can compete with the best in the world — and supporting them means backing Indian entrepreneurs, farmers, designers, and artisans building a stronger food and luxury ecosystem.`,
  },
  {
    id: "world-bank-rooftop-solar-surya-ghar",
    title: "World Bank to Mobilise $4.2 Billion for India's Rooftop Solar Drive",
    date: "09-07-2026",
    category: "Energy & Climate",
    image: "/images/business-insights/world-bank-rooftop-solar.jpeg",
    excerpt: "The World Bank is set to mobilise $4.2 billion in private financing, plus an $890 million direct package, to accelerate rooftop solar adoption under India's PM Surya Ghar scheme.",
    readTime: "3 min read",
    featured: false,
    content: `The World Bank is set to mobilise USD 4.2 billion in private financing, alongside an USD 890 million direct package, to accelerate rooftop solar adoption under India's PM Surya Ghar scheme. The initiative is a cornerstone of India's clean energy push, bringing solar power directly to millions of households nationwide.

The move comes as India navigates a delicate balancing act between energy security, industrial growth, and climate commitments, particularly amid volatile global energy markets driven by ongoing geopolitical tensions.

Separately, Gujarat unveiled its Data Centre Policy 2026–29, targeting hyperscale data centre and AI infrastructure investments to support the state's vision of a USD 3.5 trillion economy by 2047.

Together, these developments reflect a broader national strategy in which energy transition and digital infrastructure are being pursued in tandem as twin pillars of India's long-term economic ambition.`,
  },
  {
    id: "tripura-business-conclave-2026-mous",
    title: "Tripura Signs 43 MoUs Worth ₹10,000 Crore at Business Conclave 2026",
    date: "09-07-2026",
    category: "Economy & Investment",
    image: "/images/business-insights/tripura-business-conclave.png",
    excerpt: "Tripura signed 43 MoUs worth over ₹10,000 crore at the Destination Tripura Business Conclave 2026, a landmark haul for a state that has long struggled to attract large-scale private capital.",
    readTime: "3 min read",
    featured: false,
    content: `India's northeastern states have long been viewed as laggards in attracting industrial investment, but Tripura is making a pointed statement to the contrary. The state signed 43 MoUs worth over ₹10,000 crore at the Destination Tripura Business Conclave 2026 — a significant haul for a region that has historically struggled to draw large-scale private capital.

The conclave signals a broader push by northeastern states to leverage their strategic location bordering Bangladesh, Myanmar, and the wider Southeast Asian corridor as India deepens its Act East policy. Sectors including infrastructure, tourism, agro-processing, and renewable energy featured prominently among the investment commitments.

The development aligns with the central government's increasing focus on unlocking the economic potential of India's northeast as a gateway to ASEAN markets, with improved connectivity and logistics investment laying the groundwork for a new chapter in regional industrial growth.`,
  },
  {
    id: "cci-approves-upgrad-unacademy-acquisition",
    title: "CCI Clears upGrad's Acquisition of Unacademy — at a Fraction of Its Old Value",
    date: "07-07-2026",
    category: "Edtech & M&A",
    image: "/images/business-insights/upgrad-unacademy.png",
    excerpt: "India's competition regulator has approved upGrad's acquisition of Unacademy, valuing the edtech rival at around ₹2,055 crore — a steep fall from its $3.4 billion pandemic-era peak.",
    readTime: "3 min read",
    featured: false,
    content: `India's competition regulator cleared the way on July 7 for edtech platform upGrad to acquire rival Unacademy, marking one of the biggest deals in Indian online education history.

The transaction values Unacademy at roughly ₹2,055 crore ($218 million) — a dramatic fall from the $3.4 billion valuation it commanded at the height of the pandemic-era edtech boom in 2021, when investors were pouring money into online learning at an unprecedented pace. The deal is structured as an all-share transaction, meaning Unacademy shareholders will receive upGrad stock rather than cash.

For upGrad, led by entrepreneur Ronnie Screwvala, the acquisition is a strategic expansion into test preparation and K-12 learning — segments it previously had little presence in — and is expected to add around ₹500 crore to its annual revenue.

The timing is telling: upGrad only recently turned profitable after years of losses, and Unacademy has been restructuring since its post-pandemic slowdown. India's edtech sector, once defined by sky-high valuations and aggressive growth, is now consolidating around survival and scale.`,
  },
  {
    id: "india-uk-trade-pact-july-15",
    title: "India–UK Trade Pact Set to Take Effect July 15",
    date: "07-07-2026",
    category: "Trade & Policy",
    image: "/images/business-insights/india-uk-trade-pact.png",
    excerpt: "The finance ministry has notified rules of origin under the India–UK trade pact, clearing the way for the agreement to come into force from July 15.",
    readTime: "3 min read",
    featured: false,
    content: `The finance ministry has notified the rules for determining the origin of goods under the India–UK trade pact, clearing the way for the agreement to take effect from July 15. The deal has been long in the making — years of negotiations that repeatedly stalled over differences on tariffs, worker mobility, and Scotch whisky duties. Its imminent rollout marks a significant moment in India's trade diplomacy.

India's free trade agreements with the UK and the EU are expected to boost toy exports through zero-duty market access, supported by fresh investments, expanding manufacturing capacity, and favourable government policies. Beyond toys, sectors such as pharmaceuticals, textiles, and IT services stand to gain considerably.

Commerce Minister Piyush Goyal has said the Trade and Technology Council dialogue will complement the recently concluded India–EU free trade agreement, while India aims to seal a Canada FTA within six months — signalling an ambitious run of trade-deal activity on the horizon.`,
  },
  {
    id: "fizzy-goblet-kareena-kapoor-investment",
    title: "Fizzy Goblet Draws Strategic Investment from Kareena Kapoor Khan, Eyes Rs 100 Crore Run Rate",
    date: "07-07-2026",
    category: "Retail & Investment",
    image: "/images/business-insights/fizzy-goblet-kareena.png",
    excerpt: "Homegrown footwear brand Fizzy Goblet has secured a strategic investment from actor Kareena Kapoor Khan as it targets an annual revenue run rate of over Rs 100 crore.",
    readTime: "3 min read",
    featured: false,
    content: `Homegrown footwear and accessories label Fizzy Goblet has announced a strategic investment from actor Kareena Kapoor Khan, deepening a bond that started when she began wearing the brand organically in 2014 and later became its brand ambassador in 2022.

The move takes Kapoor Khan beyond endorsements into an active business role — she will now weigh in on design selection and support brand-building efforts across India and international markets.

Founded more than 12 years ago by Laksheeta Govil with a modest initial investment of just Rs 1 lakh, Fizzy Goblet built its name around traditional Indian footwear such as juttis and kolhapuris. The brand ran as a bootstrapped venture before raising institutional capital from Accel. It currently operates at an annual revenue run rate of around Rs 60 crore and is aiming to cross Rs 100 crore in the coming year.

Notably, the company says its growth has been driven entirely through its own channels — every sale flows through its website and company-owned stores, with no reliance on marketplaces or franchise partners. Its retail footprint has grown from four stores in 2022 to 16 company-owned outlets today.

"Our vision is to make Fizzy Goblet the first globally recognised Indian footwear and accessories brand. Having Kareena on board as a strategic partner is the first major step on that journey," said founder Laksheeta Govil. Kapoor Khan added that her conviction in what Govil is building "has only grown," noting the brand has "always been part of my wardrobe."`,
  },
  {
    id: "cultfit-drhp-ipo-filing",
    title: "Cult.fit Files for IPO with SEBI, Eyeing Rs 950 Crore Fresh Issue",
    date: "07-07-2026",
    category: "IPO & Markets",
    image: "/images/business-insights/cultfit-ipo.png",
    excerpt: "Fitness platform Cult.fit has filed its draft papers with SEBI for an IPO combining a Rs 950 crore fresh issue with a 17.86 crore share offer for sale by existing backers.",
    readTime: "3 min read",
    featured: false,
    content: `Fitness and wellness company Cult.fit has taken a decisive step towards the public markets, submitting its draft red herring prospectus (DRHP) to the Securities and Exchange Board of India for a proposed initial public offering.

The offering pairs a fresh issue of shares worth up to Rs 950 crore with an offer for sale of as many as 17.86 crore shares from existing investors. The company has also flagged a possible pre-IPO placement of up to Rs 190 crore, which would trim the fresh issue by an equivalent amount. The final deal size will crystallise once the price band is set.

Among the selling shareholders, Temasek-backed MacRitchie Investments is set to be the largest, parting with up to 2.47 crore shares. Others trimming their stakes include Fitness First Luxembourg, IDG Ventures India, Tata Digital, Chiratae Trust, Accel entities, Kalaari Capital and Schroders Capital, alongside co-founder Mukesh Bansal, who plans to offload up to 1.6 crore shares.

Cult.fit intends to channel roughly Rs 217.5 crore of the proceeds into lease and rental costs for its existing centres, Rs 120 crore towards paring down debt, and Rs 75 crore into marketing and brand building, with the balance earmarked for general corporate use. Ahead of the filing, the company shored up its board with independent directors Kalpana Morparia, Arun M Kumar, Indu Bhushan and Pragya Misra to satisfy governance norms.

Founded in 2016 by Mukesh Bansal and Ankit Nagori, Cult.fit now runs more than 700 fitness centres nationwide alongside its Cultsport and Carefit arms. The company has drawn over $714 million across 16 funding rounds and was last valued near Rs 12,600 crore (about $1.5 billion). For FY26, it posted revenue of Rs 1,720 crore while narrowing its net loss by 48% to Rs 252 crore. Axis Capital, Goldman Sachs (India), Jefferies India and JM Financial are steering the issue as lead managers.`,
  },
  {
    id: "ai-for-good-global-commission-indian-leaders",
    title: "Ambani, Sunil Mittal and Lakshmi Mittal Named Founding Members of AI for Good Global Commission",
    date: "07-07-2026",
    category: "Tech & AI Policy",
    image: "/images/business-insights/ai-for-good-commission.jpeg",
    excerpt: "Mukesh Ambani, Sunil Bharti Mittal, and Lakshmi N. Mittal have been named founding members of the ITU's newly launched 44-member AI for Good Global Commission.",
    readTime: "3 min read",
    featured: false,
    content: `Three of India's most prominent business leaders — Mukesh Ambani, chairman of Reliance Industries; Sunil Bharti Mittal, founder and chairman of Bharti Enterprises; and Lakshmi N. Mittal, executive chairman of ArcelorMittal — have been named founding members of the newly launched AI for Good Global Commission.

Established under the International Telecommunication Union (ITU), the 44-member body is co-chaired by Rwanda's President Paul Kagame and Salesforce CEO Marc Benioff, with ITU Secretary-General Doreen Bogdan-Martin as vice-chair. The commission brings together heads of state, industry CEOs, and UN agency leaders — including Nvidia's Jensen Huang, Amazon's Andy Jassy, and Microsoft's Brad Smith — to forge practical, responsible AI pathways that strengthen trust, expand access, and ensure developing nations are not left behind.

Its inaugural meeting opens today at the ITU's AI for Good Global Summit 2026 in Geneva, running alongside the first UN-mandated Global Dialogue on AI Governance.`,
  },
  {
    id: "world-bank-1-5-bn-job-creation-india",
    title: "World Bank Approves $1.5 Bn to Accelerate Private-Sector Job Creation in India",
    date: "07-07-2026",
    category: "Economy & Policy",
    image: "/images/business-insights/world-bank-job-creation.png",
    excerpt: "The World Bank has approved $1.5 billion in Development Policy Financing to back structural reforms aimed at generating private-sector-led employment for 11 million young Indians.",
    readTime: "3 min read",
    featured: false,
    content: `The World Bank has approved $1.5 billion in Development Policy Financing to support a sweeping programme of structural reforms in India aimed at generating private-sector-led employment. The Boosting Job Creation initiative is designed to create opportunities for 11 million young Indians expected to enter the labour market over the next two decades.

The package backs reforms in tax simplification, trade integration, and regulatory improvements, while actively targeting a reduction in barriers to entrepreneurship and a significant increase in female labour force participation. The financing complements India's broader Viksit Bharat 2047 vision.

Separately, UPI — India's flagship digital payments rail — now operates in nine countries, including Singapore, UAE, France, Qatar, and Cambodia, following the successful launch of a real-time peer-to-peer cross-border remittance link with Nepal's National Payments Interface, operational since June 6, 2026, eliminating the need for physical currency exchange.`,
  },
  {
    id: "india-japan-summit-billions-commitments",
    title: "India–Japan Summit Draws Billions in Commitments",
    date: "06-07-2026",
    category: "Trade & Diplomacy",
    image: "/images/business-insights/india-japan-summit.png",
    excerpt: "The 16th India–Japan Annual Summit delivered a first-ever defence co-development project, a Joint Statement on AI, and over $10 billion in fresh Japanese investment commitments, deepening the two countries' strategic partnership.",
    readTime: "3 min read",
    featured: false,
    content: `The 16th India–Japan Annual Summit delivered a first-ever defence co-development project, a Joint Statement on AI, and over $10 billion in fresh Japanese investment commitments, marking a substantive deepening of the two countries' strategic partnership.

More than 150 Japanese firms committed $12.5 billion in investment in India, spanning infrastructure, semiconductors, clean energy, and advanced manufacturing. Trade between the two countries has crossed $27.5 billion, with both governments aiming to further increase commerce by improving market access and promoting local currency trade.

Artificial Intelligence has emerged as a new pillar of the partnership, with both countries expanding collaboration in AI research, digital infrastructure, cybersecurity, and trusted technologies.

India and Japan are also working together to secure reliable supplies of critical minerals like lithium, cobalt, and rare earth elements, vital for electric vehicles and clean energy.`,
  },
  {
    id: "tata-electronics-overtakes-foxconn-iphone-exports",
    title: "Tata Electronics Overtakes Foxconn in iPhone Exports from India",
    date: "06-07-2026",
    category: "Manufacturing & Electronics",
    image: "/images/business-insights/tata-iphone-exports.jpeg",
    excerpt: "Despite being a late entrant, Tata Electronics has overtaken Foxconn to grab a larger share of iPhones exported from India, assembling $26.3 billion worth against Foxconn's $25.6 billion over the FY22–FY26 PLI period.",
    readTime: "3 min read",
    featured: false,
    content: `Despite being a late entrant, Tata Electronics has overtaken Taiwanese electronics manufacturing giant Foxconn to grab a larger share of assembling iPhones exported from India during the five-year PLI scheme period between FY22 and FY26. iPhones assembled by Tata Electronics for export were pegged at $26.3 billion, compared to Foxconn's $25.6 billion.

Most of these iPhones are exported to the US and Europe. Tata Electronics has also doubled its authorised share capital to ₹20,000 crore, signalling that more funds could be injected by the parent company.

The milestone firmly establishes India as a serious global electronics manufacturing hub. Beyond smartphones, Tata Electronics is making a big push into semiconductors, investing around $14 billion to build a chip fabrication plant in Gujarat and a chip assembly and testing unit in Assam.`,
  },
  {
    id: "upi-22-billion-transactions-june-2026",
    title: "India's UPI Crosses 22 Billion Transactions in June 2026",
    date: "02-07-2026",
    category: "Fintech & Payments",
    image: "/images/business-insights/upi-22-billion.png",
    excerpt: "India's UPI recorded a 23% rise in volumes, crossing 22 billion transactions in June 2026, cementing its position as a global leader in real-time digital payments.",
    readTime: "3 min read",
    featured: false,
    content: `India's UPI ecosystem recorded a 23% rise in transaction volumes, crossing 22 billion transactions in June 2026, continuing its robust growth trajectory.

The milestone cements India's position as a global leader in real-time digital payments. International adoption of UPI has also been expanding steadily, with several countries integrating the platform for cross-border remittances and retail transactions.

The strong numbers reflect India's deepening digital payments infrastructure and its growing influence in global fintech innovation. The government has been actively promoting UPI adoption through bilateral agreements, and its reach now spans markets across Southeast Asia, the Middle East, and parts of Europe.

With the National Payments Corporation of India pushing for further global rollout, UPI is increasingly being seen as a viable alternative to card-based international payment networks.`,
  },
  {
    id: "mahindra-june-record-sales",
    title: "Mahindra & Mahindra Posts Record 37% Sales Jump in June",
    date: "02-07-2026",
    category: "Auto & Sales",
    image: "/images/business-insights/mahindra-record-sales.jpg",
    excerpt: "Mahindra & Mahindra's sales surged 37% in June on strong UV and CV demand, capping a record FY26 boosted by late-2025 GST rate cuts.",
    readTime: "3 min read",
    featured: false,
    content: `Mahindra & Mahindra's sales surged 37% in June, with strong performance across its UV (utility vehicle) and CV (commercial vehicle) segments. The momentum follows a standout FY26 for the automaker.

M&M recorded its highest-ever annual sales in both SUVs — reaching 6.6 lakh units, up 20% — and light commercial vehicles at 2.89 lakh units, up 13%.

The surge has been largely driven by GST rate cuts that took effect in late 2025, which boosted consumer demand across the sector. The resilience in demand shows that lower prices have continued to outweigh concerns around geopolitical uncertainty.

However, analysts caution that demand may moderate in FY27 as CAFE 3 norms, price hikes, and new powertrain introductions could pressure affordability going forward.`,
  },
  {
    id: "sun-pharma-organon-acquisition",
    title: "Sun Pharma's $11.75 Billion Organon Acquisition — India's Biggest Pharma Deal",
    date: "02-07-2026",
    category: "Pharma & M&A",
    image: "/images/business-insights/sun-pharma-organon.jpeg",
    excerpt: "Sun Pharma agrees to acquire New Jersey-based Organon in an all-cash deal worth $11.75 billion — one of the largest outbound acquisitions by an Indian pharma firm.",
    readTime: "3 min read",
    featured: false,
    content: `Indian pharmaceutical giant Sun Pharma announced it has entered into an agreement to acquire New Jersey-headquartered Organon in an all-cash deal valued at $11.75 billion — one of the largest outbound acquisitions by an Indian pharmaceutical firm.

The acquisition will lift Sun Pharma's revenues to $12.4 billion, ranking it among the top 25 global pharmaceutical companies. Organon, which was spun off from Merck in 2021, specializes in women's health and biosimilars.

The transaction is expected to close in early 2027, subject to regulatory approvals and Organon shareholder approval.

The deal catapults Sun Pharma into biosimilars and diversifies it beyond generics into high-value specialty medicines across 140 countries — a landmark moment for India's pharmaceutical industry on the global stage.`,
  },
  {
    id: "india-sovereign-ai-governance-hurdles",
    title: "India's Sovereign AI Push Faces Governance Hurdles",
    date: "01-07-2026",
    category: "Tech & AI Policy",
    image: "/images/business-insights/india-sovereign-ai-governance.png",
    excerpt: "As India races to build sovereign AI, governance is emerging as its biggest challenge — with deepfakes, accountability gaps, and rising public-sector AI use testing policymakers' balance of innovation and trust.",
    readTime: "3 min read",
    featured: false,
    content: `As India accelerates its push to build sovereign AI capabilities, governance is emerging as its biggest challenge. Rising concerns around deepfakes, accountability, and growing public-sector use of AI are prompting policymakers to balance innovation with trust.

Debates are intensifying over whether India's AI compute infrastructure — bolstered by subsidised GPU programmes — is sufficient to close the capability gap with global leaders.

Experts warn that without robust regulatory frameworks, the rapid deployment of AI across government services and financial systems could outpace oversight, raising the stakes for policymakers as they race to scale India's AI ambitions responsibly.`,
  },
  {
    id: "hdfc-bank-rajiv-kumar-chairman-puneet-sharma-cfo",
    title: "HDFC Bank Strengthens Leadership with Rajiv Kumar as Chairman-Designate, Puneet Sharma as CFO",
    date: "01-07-2026",
    category: "Banking & Leadership",
    image: "/images/business-insights/hdfc-bank-leadership.jpg",
    excerpt: "HDFC Bank draws investor attention after appointing former Finance Secretary Rajiv Kumar as Chairman-designate and Puneet Sharma as CFO, moves analysts say strengthen the bank ahead of a growth phase.",
    readTime: "3 min read",
    featured: false,
    content: `HDFC Bank is drawing renewed investor attention following the appointment of former Finance Secretary Rajiv Kumar as Chairman-designate and Puneet Sharma as Chief Financial Officer.

Analysts say the leadership changes strengthen the bank's governance and financial oversight at a pivotal moment, as HDFC Bank enters what many expect to be a robust growth phase.

The optimism is underpinned by accelerating credit growth and easing net interest margin pressures, both of which are expected to support stronger earnings momentum for India's largest private-sector lender in the coming quarters.`,
  },
  {
    id: "titan-reinvention-lifestyle-powerhouse",
    title: "Titan's Reinvention: From Watchmaker to Lifestyle Powerhouse",
    date: "01-07-2026",
    category: "Retail & Lifestyle",
    image: "/images/business-insights/titan-reinvention-lifestyle-powerhouse.jpg",
    excerpt: "Titan crossed Rs 50,000 crore in revenue in FY25 after nearly 40 years — then added the next Rs 25,000 crore in just one year, as it expands into eyecare, fragrances, sarees, and global markets.",
    readTime: "3 min read",
    featured: false,
    content: `Titan Company, the modest 1984 joint venture between Tata Industries and the Tamil Nadu Industrial Development Corporation, has grown into the second-most valued Tata Group company after TCS, with a market capitalisation of Rs 3.6 lakh crore.

In FY25, Titan crossed Rs 50,000 crore in revenue — a milestone that took nearly 40 years to reach. It then added the next Rs 25,000 crore in just one year, in FY26, a sign of how sharply the company's growth curve has steepened.

The company is now pushing beyond its core watches and jewellery business into lifestyle adjacencies including eyecare, fragrances, and sarees, alongside a growing international footprint — most notably its 2025 acquisition of Dubai-based jewellery chain Damas.

Managing Director Ajoy Chawla describes the firm as "restless and responsible," a philosophy driven by constant product and retail innovation as Titan reinvents itself from a watchmaker into a diversified lifestyle powerhouse.`,
  },
  {
    id: "bharti-airtel-africa-stake-share-swap",
    title: "Bharti Airtel Boosts Africa Stake via Share Swap",
    date: "30-06-2026",
    category: "Telecom & M&A",
    image: "/images/business-insights/bharti-airtel-africa-stake.jpg",
    excerpt: "Bharti Airtel acquired a 16.3% stake in Airtel Africa from ICIL via a cashless ₹28,200 crore share swap, lifting its effective holding to roughly 79%.",
    readTime: "3 min read",
    featured: false,
    content: `Bharti Airtel acquired a 16.3% stake in Airtel Africa from ICIL through a cashless ₹28,200 crore share-swap deal, lifting its effective holding in the UK-listed Africa unit to roughly 79%. The move strengthens Airtel's control over its fast-growing African operations without requiring fresh cash outlay, reflecting the telecom major's continued push to consolidate its international portfolio.

This comes at a time when India's telecom sector itself is showing strong momentum, with industry-wide revenue rising steadily on the back of robust data consumption and subscriber growth.

Analysts view the swap as a strategic long-term bet on Africa's expanding telecom and digital services market, where Airtel has been investing heavily in network infrastructure and mobile money services.`,
  },
  {
    id: "india-ev-sector-sales-surge-may-2026",
    title: "India's EV Sector Sees Sharp Sales Surge",
    date: "30-06-2026",
    category: "EV & Mobility",
    image: "/images/business-insights/india-ev-sales-surge-2026.jpg",
    excerpt: "India's auto retail registrations rose 5.5% YoY in May 2026, led by a 41.2% jump in EV sales as fuel prices spiked and adoption accelerated.",
    readTime: "3 min read",
    featured: false,
    content: `India's domestic automobile retail registrations surged 5.5% year-on-year in May 2026, driven significantly by a robust 41.2% jump in electric vehicle sales. A steep surge in conventional petroleum fuel prices drove a sharp spike in electric vehicle penetration across India during May, accelerating consumer adoption.

Supporting this momentum, Bengaluru-based EV maker Simple Energy raised ₹250 crore in debt and equity, led by Thyrocare founder Velumani's family office, to scale production from 3,000 to 15,000 scooters monthly and expand stores from 80 to 250, targeting an FY28 IPO.

The move reflects strong investor confidence in India's electric two-wheeler segment, one of the fastest-growing pockets of the country's mobility transition.`,
  },
  {
    id: "rbi-holds-repo-rate-525-markets-rally",
    title: "RBI Holds Repo Rate at 5.25%, Markets Rally",
    date: "29-06-2026",
    category: "RBI & Markets",
    image: "/images/business-insights/india-stock-market-fourth-largest.jpg",
    excerpt: "Sensex and Nifty traded higher after the RBI kept the repo rate unchanged at 5.25%, retained a neutral stance, and announced measures to boost capital inflows.",
    readTime: "3 min read",
    featured: false,
    content: `Sensex and Nifty traded higher after the Reserve Bank of India kept the repo rate unchanged at 5.25%, retained a neutral policy stance, and announced measures to boost capital inflows.

The RBI also announced steps to improve foreign participation in Indian markets, including a higher investment limit in equities for Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs), along with an expansion of government securities available under the Fully Accessible Route (FAR).

Rate-sensitive sectors such as banking, financial services, and real estate outperformed following the policy announcement, while IT and metal stocks remained under pressure.`,
  },
  {
    id: "india-energy-storage-market-expansion-2032",
    title: "India's Energy Storage Market Set for Major Expansion",
    date: "29-06-2026",
    category: "Energy & Sustainability",
    image: "/images/business-insights/india-energy-storage-market-2032.jpg",
    excerpt: "India's C&I energy storage market is expected to scale to 22–31 GWh by 2032, driven by rising tariffs, renewable integration, and a push toward energy resilience.",
    readTime: "3 min read",
    featured: false,
    content: `India's commercial and industrial (C&I) energy storage market is expected to scale rapidly to 22–31 GWh by 2032, supported by rising energy tariffs, renewable energy integration, cost optimisation needs, and a shift toward energy resilience and decarbonisation.

This growth signals increasing corporate adoption of battery and storage solutions as India pushes toward its clean energy targets. The expansion is also being driven by government policy incentives for domestic manufacturing and renewable infrastructure.

Analysts expect the storage sector to attract significant private investment over the next five years, making it one of the fastest-growing segments within India's broader energy transition landscape.`,
  },
  {
    id: "meta-reliance-ai-data-centre-jamnagar",
    title: "Meta & Reliance to Build India's First AI-Enabled Data Centre in Jamnagar",
    date: "25-06-2026",
    category: "Tech & AI",
    image: "/images/business-insights/meta-reliance-data-centre.jpg",
    excerpt: "Meta and Reliance will build a 168-MW AI-enabled data centre in Jamnagar, Gujarat — powered by renewable energy and cooled using desalinated seawater.",
    readTime: "3 min read",
    featured: false,
    content: `Meta has struck a partnership with Reliance Industries to build a 168-megawatt AI-enabled data centre in Jamnagar, Gujarat — its first major built-to-suit AI infrastructure deal in India.

Under the agreement, Reliance will take end-to-end responsibility for development, while Meta will lease capacity from the facility. The data centre will be powered by renewable energy and cooled using desalinated seawater, with Meta covering all associated energy and water costs.

In a related announcement, Meta signed deals with two Indian clean energy firms — CleanMax and Fourth Partner Energy — totalling close to 1 gigawatt of new capacity across Rajasthan, Karnataka, Tamil Nadu, Maharashtra, and Uttar Pradesh.

The deal builds on a long-standing partnership between the companies that traces back to Meta's $5.7 billion investment in Jio Platforms in 2020, and a $100 million joint venture formed in 2025 to develop Llama-based enterprise AI solutions for Indian businesses. The Jamnagar facility is expected to be operational within two years.`,
  },
  {
    id: "india-us-trade-talks-july-deadline",
    title: "India-US Trade Talks Conclude Without Final Deal, July Deadline Looms",
    date: "24-06-2026",
    category: "Trade & Policy",
    image: "/images/business-insights/india-us-trade-talks.jpg",
    excerpt: "India and the US wrapped two days of talks in New Delhi but left key issues unresolved, with a temporary 10% US tariff regime set to expire on July 24.",
    readTime: "3 min read",
    featured: false,
    content: `India and the United States wrapped up two days of high-level trade talks in New Delhi on June 24, but left critical issues unresolved ahead of a pivotal deadline. Commerce and Industry Minister Piyush Goyal and visiting US Trade Representative Jamieson Greer discussed market access, digital trade, and non-tariff barriers but gave no indication that all differences had been bridged.

Both sides are racing to finalise an interim arrangement before the expiration of a temporary 10% US tariff regime on July 24 — a deadline that has added urgency to negotiations. The talks follow the Modi-Trump bilateral on the G7 sidelines in France on June 17.

India has proposed eliminating or reducing tariffs on all US industrial goods and a wide range of agricultural products, while also expressing intentions to purchase $500 billion worth of US goods — including energy, aircraft, and technology products — over the next five years. Both sides described "substantial progress" but stopped short of declaring a breakthrough.`,
  },
  {
    id: "bharatiya-vyapar-mahotsav-2026",
    title: "India Gears Up for Bharatiya Vyapar Mahotsav 2026",
    date: "24-06-2026",
    category: "Trade & MSME",
    image: "/images/business-insights/bharatiya-vyapar-mahotsav-2026.jpg",
    excerpt: "India's largest Make-in-India multi-sectoral business expo runs 12–15 August 2026 at Bharat Mandapam, with 2,000+ exhibitors and over 10 lakh visitors expected.",
    readTime: "3 min read",
    featured: true,
    content: `India's most ambitious trade exposition is set to take centre stage this Independence Day season. The Bharatiya Vyapar Mahotsav (BVM) 2026, billed as the country's largest Make-in-India multi-sectoral business expo, will be held from 12 to 15 August 2026 at Bharat Mandapam, Pragati Maidan, New Delhi.

Organised jointly by the Confederation of All India Traders (CAIT) and the India Trade Promotion Organisation (ITPO) under a landmark MoU, the event carries the theme "Made in India, Made for India, Made for the World" — an echo of Prime Minister Narendra Modi's vision of Atmanirbhar Bharat and Vocal for Local.

The four-day expo is expected to host over 2,000 exhibitors spanning sectors including MSMEs, agriculture, textiles, electronics, handicrafts, startups, and digital commerce. Organisers anticipate more than 10 lakh visitors, 2 lakh business delegates, and 5,000 international participants — making it one of India's largest commercial gatherings to date.

Union Commerce Minister Piyush Goyal, who launched the BVM portal in May, called the event a milestone for domestic trade, noting that India's exports have already reached $863 billion this year, nearly 5% higher than the previous year — with a national target of $1 trillion in sight.

Registrations are currently open across four categories — Exhibitor, Business Delegate, Speaker, and Visitor — at bharatiyavyaparmahotsav.com.`,
  },
  {
    id: "india-overtakes-japan-stock-market",
    title: "India Overtakes Japan to Become World's Fourth Largest Stock Market",
    date: "24-06-2026",
    category: "IPO & Markets",
    image: "/images/business-insights/india-stock-market-fourth-largest.jpg",
    excerpt: "India crosses the $5.5 trillion milestone in June 2026, overtaking Japan to become the world's fourth largest stock market as the Sensex tops 85,000.",
    readTime: "3 min read",
    featured: false,
    content: `India has officially overtaken Japan to become the world's fourth largest stock market by market capitalization, crossing the $5.5 trillion milestone in June 2026. The BSE Sensex crossed the 85,000 mark this month, driven by strong foreign institutional investor inflows, robust corporate earnings, and growing retail investor participation. India now trails only the United States, China, and the United Kingdom in total market cap.

The surge has been fueled by outperformance in sectors including capital goods, defence, infrastructure, and financial services. Systematic Investment Plan contributions hit an all-time high of ₹26,000 crore in May 2026, reflecting deep-rooted domestic confidence in equity markets.

Market analysts at Goldman Sachs and Morgan Stanley have both upgraded India's equity outlook to "Overweight," projecting further upside driven by a young demographic, rising middle-class consumption, and continued government capital expenditure in infrastructure and manufacturing.`,
  },
  {
    id: "tata-semiconductor-gujarat-expansion",
    title: "Tata Group Eyes $2 Billion Semiconductor Expansion in Gujarat",
    date: "24-06-2026",
    category: "Manufacturing",
    image: "/images/business-insights/tata-semiconductor-gujarat.jpg",
    excerpt: "Tata Group plans an additional $2 billion in its Dholera chip plant, boosting capacity by nearly 60% and creating an estimated 8,000 direct jobs by 2027.",
    readTime: "3 min read",
    featured: false,
    content: `The Tata Group is set to invest an additional $2 billion in expanding its semiconductor manufacturing facility in Dholera, Gujarat, as part of India's ambitious push to become a global chipmaking hub. The expansion, expected to be operational by 2027, will increase the plant's production capacity by nearly 60% and create an estimated 8,000 direct jobs.

This move comes on the back of strong government support under the India Semiconductor Mission, which has already committed over ₹76,000 crore in incentives to attract global chipmakers. Tata Electronics, which partnered with Taiwan's Powerchip Semiconductor Manufacturing Corporation for the original facility, is in advanced talks with two more global technology firms for technology transfer agreements.

Industry experts believe India's semiconductor ambitions could position the country as a credible alternative to China and Taiwan in the global supply chain, especially as Western nations aggressively diversify chip sourcing.`,
  },
  {
    id: "india-startup-funding-2026",
    title: "India's Startup Funding Slows in 2026, But Quality Deals Hold Strong",
    date: "23-06-2026",
    category: "Funding",
    image: "/images/business-insights/meta-cred.jpg",
    excerpt: "Indian startups raised $8.44 billion across 831 rounds in H1 2026 — a 14.7% drop — as investors turn more selective, prioritising quality deals over volume.",
    readTime: "3 min read",
    content: `India's startup ecosystem is going through a careful phase in 2026. While money is still flowing in, investors are being far more selective about where they put it.

Indian startups raised $8.44 billion across 831 equity funding rounds between January and June 2026 — a 14.7% drop compared to the same period last year, when $9.9 billion was raised across over 1,480 rounds. Despite the dip in volume, individual deals remain significant. The first week of June alone saw startups raise nearly $187 million, led by FirstClub's $55 million Series B round backed by Peak XV Partners and Sofina. On the policy front, the government launched Startup India Fund of Funds 2.0 with a ₹10,000 crore corpus, aimed at channelling more capital into early-stage startups through regulated investment funds.

The mood in India's startup world is shifting — from chasing growth to building real businesses. Investors are tightening their standards, but the ecosystem remains one of the most active in the world.`,
  },
  {
    id: "meta-cred-investment",
    title: "Meta Invests $900 Million in CRED, Taps Kunal Shah to Lead WhatsApp",
    date: "22-06-2026",
    category: "Deals & Fintech",
    image: "/images/business-insights/startup-funding-2026.jpg",
    excerpt: "Meta leads a $900 million round in CRED for a ~20% stake at a $4.5 billion valuation, and appoints founder Kunal Shah as the new global CEO of WhatsApp.",
    readTime: "3 min read",
    featured: false,
    content: `In a landmark deal reshaping India's tech landscape, Meta has led a $900 million financing round in Indian fintech giant CRED, structured through a combination of primary and secondary share purchases, making Meta a minority investor in the company.

The investment gives Meta a roughly 20% stake in CRED, valuing it at $4.5 billion post-money. This marks a recovery from CRED's peak valuation of $6.4 billion in 2022, which had since dipped to $3.6 billion in May 2025.

As part of the deal, CRED founder Kunal Shah has been appointed global CEO of WhatsApp, marking one of the biggest leadership changes in the platform's history. Shah will step down as CRED's chief executive while retaining his personal shareholding, with Miten Sampat taking over as interim CEO.

Shah's fintech background has fuelled speculation that Meta may deepen financial services and commerce integrations within WhatsApp in the years ahead.`,
  },
  {
    id: "jio-platforms-ipo",
    title: "Jio Files for India's Largest-Ever IPO Valued at ₹13 Lakh Crore",
    date: "22-06-2026",
    category: "IPO & Markets",
    image: "/images/business-insights/jio-ipo.jpeg",
    excerpt: "Reliance Industries officially sets the stage for India's biggest stock market debut, filing draft papers for a 100% fresh issue of Jio Platforms valued at ₹12–13 lakh crore.",
    readTime: "3 min read",
    featured: false,
    content: `Reliance Industries has officially set the stage for India's biggest stock market debut. At its 49th Annual General Meeting (AGM), chairman Mukesh Ambani confirmed that the board approved the draft papers for the Jio Platforms IPO, with the filing submitted to the Securities and Exchange Board of India (SEBI) on June 19.

Jio Platforms, Reliance's telecom and digital arm with over 527 million subscribers and a 43% revenue market share, is structured as a 100% fresh issue — meaning all proceeds go to the company, not existing shareholders. Analysts at Elara Capital have valued the entity at ₹12–13 lakh crore, with an expected fundraise of ₹35,000–52,000 crore. Akash Ambani, appointed Managing Director in May, will lead the listed entity alongside siblings Isha and Anant, marking a generational transition at Reliance.

With the SEBI review underway, the public issue is expected later in 2026. The Jio IPO is widely seen as both a market milestone and a defining chapter in India's digital economy story.`,
  },
  {
    id: "india-uk-trade",
    title: "India-UK trade pact kicks in July 15 — Scotch whisky, cars, and Indian textiles set for tariff cuts",
    date: "22-06-2026",
    category: "Economy & Trade",
    image: "/images/business-insights/india-uk-trade.png",
    excerpt: "The India-UK Comprehensive Economic and Trade Agreement will come into force on July 15, 2026, ushering in sweeping tariff reductions and expanded market access for both countries. While Scotch whisky and British automobiles will benefit from lower Indian duties, Indian exporters in textiles, footwear, marine products, and engineering goods gain duty-free access to the UK market, paving the way for stronger bilateral trade and economic cooperation.",
    readTime: "3 min read",
    content: `After years of negotiations and a signing in July 2025, the India-UK Comprehensive Economic and Trade Agreement will formally come into force on July 15, 2026 — making it India's first bilateral trade deal with a Western nation.



Indian whisky tariffs on British Scotch drop from 150% to 75% on day one, falling further to 40% over ten years. UK automobile tariffs fall from 100% to 10% under a quota. In return, India gains duty-free access on 99% of its exports to the UK from day one, with sectors like textiles, footwear, marine products, and engineering goods set to benefit immediately. The deal is projected to boost bilateral trade by £25.5 billion annually in the long run.



Experts caution that Indian exporters must upgrade product standards to meet UK regulatory norms to fully capitalise on the new terms. The government has been urged to run domestic outreach programmes for industry.`,
  },
  {
    id: "fable-5-ai",
    title: "US Restricts Anthropic's Mythos 5 and Fable 5 AI Models Over Jailbreak Concerns",
    date: "18-06-2026",
    category: "Technology — AI Policy & Export Controls",
    image: "/images/business-insights/fable-5-ai.png",
    excerpt: "Anthropic shut down its Fable 5 and Mythos 5 models worldwide after a US export directive cited a jailbreak-related security concern, a move it's complying with but disputing.",
    readTime: "4 min read",
    featured: false,
    content: `Anthropic stunned the tech world this week, hitting a $965 billion valuation that pushed it past rival OpenAI—remarkable, given OpenAI's six-year head start and the fact that Anthropic was founded by its former employees.

Strong numbers help explain the rise: revenue is projected to reach $10.9 billion this quarter, more than double the last, likely making it Anthropic's first profitable quarter.

However, the deeper driver is one word: trust.

It started internally. In 2020, a group of OpenAI staff, including CEO Dario Amodei, left over the belief that AI needs safety and alignment, not just scaling. That reputation now draws top talent—AI luminary Andrej Karpathy recently joined.

Public trust grew after a clash with the Pentagon, which cut ties over surveillance and weapons concerns. Rather than hurt Anthropic, the stand boosted its image as principled, contrasting with OpenAI's "sellout" reputation.

Users trust it too—many find Claude more accurate, balanced, and willing to push back than ChatGPT.

Investors, meanwhile, back Anthropic's clear enterprise-first path to profit, proven by tools like Claude Code.

The AI race is young, but whoever earns the most trust may win.

For now, Anthropic leads.`,
  },
  {
    id: "second-time-founder-prolearn",
    title: "Ex-Vedantu Leader Raises Rs 30 Crore to Build an AI-Native Learning Platform",
    date: "19-06-2026",
    category: "Edtech",
    image: "/images/business-insights/second-time-founder-prolearn.png",
    excerpt: "Second-time founder Ravneet Singh has raised Rs 30 crore in pre-seed funding for ProLearn, an AI-native platform aiming to replace one-size-fits-all video lectures with adaptive, personalised learning.",
    readTime: "2 min read",
    content: `Experience counts in entrepreneurship, and ProLearn is a case in point. Former Vedantu technology leader Ravneet Singh has raised Rs 30 crore in a pre-seed round for his new venture, an AI-native learning platform aiming to reimagine online education.

At the heart of ProLearn is an AI-powered learning companion designed to deliver personalised, interactive, and adaptive learning experiences — moving beyond one-size-fits-all video lectures toward education that responds to each individual student. The fresh capital will fuel product and engineering development, strengthen the platform's AI and reasoning infrastructure, expand curriculum-aligned content, and support hiring ahead of its public launch.

What makes the story compelling is the founder's pedigree. Having previously helped build technology at one of India's best-known edtech companies, Singh represents a growing wave of experienced operators taking another swing at hard problems with sharper insight and stronger networks. As AI reshapes how knowledge is delivered, seasoned founders like Singh are well placed to build the next generation of learning tools — and to do so with the wisdom of having been there before.`,
  },
  {
    id: "bigbasket-hari-menon",
    title: "Bigbasket Co-Founder Hari Menon Steps Down as CEO, Amazon Veteran Amit Nanda Takes Over",
    date: "18-06-2026",
    category: "Funding",
    image: "/images/business-insights/bigbasket-hari-menon.png",
    excerpt: "Business — Corporate Leadership / Retail & E-commerce",
    readTime: "3 min read",
    content: `BENGALURU — Bigbasket co-founder Hari Menon has stepped down as CEO of the Tata Group-backed grocery and quick-commerce company, handing the reins to former Amazon India executive Amit Nanda. The move marks the end of an era for one of India's earliest online grocery pioneers, coming as the sector races to shorten delivery times.

Menon will step back from daily operations but stay on the board alongside fellow co-founder Vipul Parekh, mentoring the leadership team.

Nanda, who spent 11 years at Amazon India—most recently leading Selling Partner Services—brings deep experience in ecommerce, technology, and consumer businesses. He earlier worked at Hindustan Unilever and Citibank.

"I am incredibly excited to join Bigbasket and build upon the phenomenal trust it has established with millions of consumers," Nanda said, noting that pairing Bigbasket's customer-first values with the Tata legacy creates a strong foundation.

Founded in 2011, Bigbasket helped popularise online grocery shopping in India and became central to Tata Digital after the group's 2021 majority acquisition. It now serves over 25 million customers across 60-plus cities through more than 900 dark stores.

Menon praised Nanda's track record, while Tata Digital CEO Sajith Sivanandan said his experience suits the company's expansion goals.`,
  },
  {
    id: "biodimension-8-crore",
    title: "Biodimension Raises ₹8 Crore to Transform Life Sciences",
    date: "15-06-2026",
    category: "Life Sciences",
    image: "/images/business-insights/biodimension.png",
    excerpt: "The Pune-based biotech startup will use the fresh capital to scale its 3D bioprinting platform and accelerate tissue-engineering research.",
    readTime: "4 min read",
    content: `Life sciences firm Biodimension, headquartered out of Bengaluru, has raised ₹8 crore in a fundraising round co-led by IAN Angel Fund and including other investors like Campus Angels Network, Dr. Sampath Srisailam, and angel investor Aaryan Baid. These funds will be utilized in product development, expanding laboratories, reinforcing its research and business teams, and commercializing its products in India and overseas.

Manojkumar S., Ranjith Kumar Velusamy, and Pradeep Arunachalam are the founders of this company that focuses on providing human tissue and organoid models, which could act as an alternative to animal testing. Biodimension's solutions provide assistance to pharmaceuticals, biotech, and cosmetics companies to make their research and safety assessments easier.

Currently, Biodimension has formed strategic collaborations with pharmaceutical companies, biotechs, research institutions, and contract research organizations both in India and Singapore. Moving forward, this company intends to ramp up their oncology research capability, scale their Bioassay-as-a-Service offering, and enter international markets, especially Southeast Asia.`,
  },
  {
    id: "deeptech-series-b",
    title: "Bengaluru Deeptech Startup Closes $40M Series B",
    date: "14-06-2026",
    category: "Funding",
    image: "/images/business-insights/deeptech.png",
    excerpt: "The round will fund global expansion and a new AI research lab in Bengaluru.",
    readTime: "3 min read",
    content: `Bangalore-based fashion-tech startup NeuroPixel.AI recently stated that it is discontinuing its services after five years of developing AI-powered products for the fashion industry. Launched in 2020 by co-founders Arvind Venugopal Nair and Amritendu Mukherjee, the company offered a suite of technologies that helped fashion companies develop virtual models, automate their product catalogs, and provide virtual try-on experiences without the expensive process of photo shoots.

NeuroPixel.AI managed to attract the interest of retail and e-commerce companies as well as investors such as Flipkart Ventures. However, with technology leaders like Google, Meta, and Alibaba developing advanced generative AI, the challenge for this small startup increased.

As explained by CEO and founder Arvind Venugopal Nair, besides difficulties in obtaining timely payments from the company's largest client, other factors such as lack of funds and limited market presence hindered the growth of NeuroPixel.AI. The company maintains its own unique set of AI technologies that can produce top quality products for less, but it has decided to end its service business while looking into other ways to make money off its technology stack.`,
  },
  {
    id: "indian-deep-tech-innotrek-uk",
    title: "Indian Deep-Tech Goes Global: Nasscom's InnoTrek UK 2026 Opens Doors in London",
    date: undefined,
    category: "Emerging Tech",
    image: "/images/business-insights/indian-deep-tech-innotrek-uk.png",
    excerpt: "Nasscom's InnoTrek UK 2026 connects Indian deep-tech startups with UK investors, enterprises, and policymakers—marking a decisive shift toward global ambitions",
    readTime: "4 min read",
    featured: false,
    content: `The firm has also announced plans of making investments worth ₹75,000 crores in its oil-to-chemicals (O2C) division, besides boosting its green energy efforts. It is expected that such an investment will be used to increase the efficiency of their refining and petrochemical production operations, thus improving the firm's international competitiveness.

On the other hand, Reliance's ambition is to have a manufacturing capacity for solar modules worth 20 GW within the next five years from its Giga complex in Jamnagar, Gujarat. The proposed facility would target solar modules, battery storage, fuel cells, and green hydrogen manufacturing operations as part of the country's efforts to boost renewable energy production.

According to Chairman Mukesh Ambani, it was imperative to address present-day needs while at the same time looking at future needs. As much as O2C continues being the largest source of revenues for the company, Reliance is heavily investing in renewable energy products.

Industry experts regard such efforts as steps towards diversifying Reliance's energy sources.`,
  },
  {
    id: "green-hydrogen-push",
    title: "Reliance Commits ₹75,000 Cr to Green Hydrogen Push",
    date: "18-06-2026",
    category: "Energy",
    image: "/images/business-insights/hydrogen.png",
    excerpt: "The investment is part of a broader plan to make clean energy cost-competitive within the decade.",
    readTime: "5 min read",
    content: `India's deep-tech ambitions took a decisive international turn this June as industry body Nasscom launched InnoTrek UK 2026, a flagship global market-access programme. From June 8 to 12, a carefully selected cohort of Indian deep-tech startups travelled to the United Kingdom for an intensive week of market insights, investor access, and business development opportunities, with several engagements timed around London Tech Week.

The initiative is more than a networking trip. It is designed to strengthen India–UK technology collaboration and help promising Indian startups build globally competitive businesses, connecting founders directly with investors, enterprises, and policymakers in one of the world's most mature innovation ecosystems.

For a generation of founders building in artificial intelligence, semiconductors, and other frontier fields, programmes like InnoTrek signal a shift in mindset: Indian startups are no longer content to serve only the domestic market. They are positioning themselves as global players from day one. As cross-border partnerships deepen, such missions could prove pivotal in turning India's deep-tech promise into worldwide commercial success.`,
  },
  {
    id: "masters-union-demo-day-2026",
    title: "India's Youngest Founders Cash In at Masters' Union Demo Day 2026",
    date: "18-06-2026",
    category: "Education & Entrepreneurship",
    image: "/images/business-insights/masters-union-demo-day-2026.png",
    excerpt: "At Masters' Union's Demo Day 2026, eighteen student startups raised Rs 4 crore across AI, fintech, mobility, and more—proof that company-building is starting before graduation.",
    readTime: "4 min read",
    content: `Entrepreneurial energy was on full display at Masters' Union's Demo Day 2026 in Gurugram, where eighteen student-led startups secured a combined Rs 4 crore in funding commitments. Remarkably, much of the backing was announced within an hour of the founders' pitches — a testament to both investor confidence and the quality of ideas on show.

The funded ventures spanned an impressively broad range of sectors, including artificial intelligence, fintech, enterprise technology, consumer brands, mobility, hospitality, and edtech. The breadth reflects a generation of young founders unafraid to tackle problems across the economy.

These companies emerged from Masters' Union's year-long Venture Initiation Programme, which has now supported more than eighty student startups. Rather than treating entrepreneurship as a post-graduation pursuit, the programme builds company-creation directly into the student experience.

The story is an encouraging one for India's startup pipeline. When students can validate ideas, build early traction, and attract real capital before they even graduate, the result is a deeper, faster-moving talent pool feeding the wider innovation ecosystem.`,
  },
];

// Look up a single article by id across ALL three tabs (used by the
// full-page article view so every article opens correctly).
export const getBusinessInsightById = (id: string): BusinessInsight | undefined =>
  businessinsights.find((a) => a.id === id) ??
  businesslegacy.find((a) => a.id === id) ??
  businessstartups.find((a) => a.id === id);
