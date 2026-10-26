export type ProjectFeature = { title: string; description: string; source: string };
export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  color: string;
  tint: string;
  headline: string;
  summary: string;
  website: string;
  app: string;
  scope: string[];
  contribution: string;
  websiteTitle: string;
  websiteDescription: string;
  websiteImage: string;
  websiteImageLabel: string;
  appImage?: string;
  appDescription?: string;
  audience: string;
  features: ProjectFeature[];
  ecosystem: string;
  ecosystemSource: string;
  references: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "contentstudio",
    number: "01",
    name: "ContentStudio",
    category: "SOCIAL MEDIA MANAGEMENT",
    color: "#1769e0",
    tint: "#d9e9fa",
    headline: "One workspace. Every social channel.",
    summary: "A social media platform that brings planning, content creation, publishing, engagement, and reporting into one connected workflow.",
    website: "https://contentstudio.io/",
    app: "https://app.contentstudio.io/",
    scope: ["Website", "Web application"],
    contribution: "I worked on both the ContentStudio website and its web application: the public-facing experience that introduces the product, and the workspace people use to manage their social media.",
    websiteTitle: "The first impression, made useful.",
    websiteDescription: "The website introduces the platform through product pages, business and network-specific solutions, integrations, educational resources, free tools, and product tours. It connects discovery with the next step: exploring the product, booking a demo, or opening the application.",
    websiteImage: "/projects/contentstudio-website.webp",
    websiteImageLabel: "ContentStudio · public website",
    appImage: "/projects/contentstudio-app.webp",
    appDescription: "Inside the application, teams move between a post composer, a shared publishing calendar, content assets, analytics, and an inbox. Workspaces and approval flows support the day-to-day collaboration between brands, agencies, teammates, and clients.",
    audience: "Creators, agencies, brands, and marketing teams",
    features: [
      { title: "Plan & publish", description: "Create posts in one composer, tailor them to each network, preview the result, and schedule them through a shared content calendar.", source: "https://contentstudio.io/social-media-publishing" },
      { title: "Create with AI", description: "AI Studio combines writing assistance with image and video tools, helping teams turn an idea into social content within the publishing workflow.", source: "https://contentstudio.io/ai-studio" },
      { title: "Measure performance", description: "Social analytics, competitor insights, campaign reporting, and shareable reports bring performance data into the same workspace as content planning.", source: "https://contentstudio.io/social-media-analytics" },
      { title: "Manage conversations", description: "A unified inbox organizes incoming messages and comments, with team notes and collaboration tools for responding consistently.", source: "https://contentstudio.io/social-inbox" },
      { title: "Collaborate & approve", description: "Shared workspaces, client access, reviewer requests, feedback, and change tracking help teams coordinate content before it goes live.", source: "https://contentstudio.io/social-media-publishing" },
      { title: "Organize & automate", description: "A content library, bulk scheduling, queues, evergreen recycling, and RSS-based publishing help keep recurring content workflows organized.", source: "https://contentstudio.io/social-media-publishing" },
    ],
    ecosystem: "The platform supports major social networks including Facebook, Instagram, LinkedIn, YouTube, TikTok, Pinterest, Threads, Bluesky, and Google Business Profile. Its wider ecosystem also includes content discovery, social listening, an API, and companion iOS and Android apps for planning, engagement, and performance checks on the move.",
    ecosystemSource: "https://contentstudio.io/mobile-app",
    references: [
      { label: "Platform", href: "https://contentstudio.io/" },
      { label: "Publishing", href: "https://contentstudio.io/social-media-publishing" },
      { label: "AI Studio", href: "https://contentstudio.io/ai-studio" },
      { label: "Analytics", href: "https://contentstudio.io/social-media-analytics" },
      { label: "Inbox", href: "https://contentstudio.io/social-inbox" },
      { label: "Mobile ecosystem", href: "https://contentstudio.io/mobile-app" },
    ],
  },
  {
    id: "replug",
    number: "02",
    name: "Replug",
    category: "LINK MANAGEMENT & CONVERSION",
    color: "#25765f",
    tint: "#d8ebdf",
    headline: "Small links. A much bigger journey.",
    summary: "A link management platform that connects branded short links, bio pages, QR codes, retargeting, and analytics in one place.",
    website: "https://replug.io/",
    app: "https://app.replug.io/",
    scope: ["Website", "Web application"],
    contribution: "I worked on Replug’s website and web application, spanning its public product experience and the application used to manage links, brands, and campaigns.",
    websiteTitle: "Explaining what a link can become.",
    websiteDescription: "Replug’s website presents the product through use cases for branded links, bio pages, QR codes, retargeting, and link performance. Feature pages and educational resources help visitors connect a familiar action—sharing a URL—with a broader marketing workflow.",
    websiteImage: "/projects/replug-website.webp",
    websiteImageLabel: "Replug · official product preview",
    appImage: "/projects/replug-app.webp",
    appDescription: "The web application brings brands, campaigns, links, and reporting together. Users can organize destinations, configure link behavior, manage tracking, and inspect performance through filters, charts, and detailed analytics views.",
    audience: "Marketers, agencies, creators, and growing brands",
    features: [
      { title: "Branded short links", description: "Create recognizable short URLs on custom domains, with options for link cloaking and password protection.", source: "https://replug.io/link-shortener" },
      { title: "Link-in-bio pages", description: "Bring links and content together on a branded bio page, with per-link performance insights.", source: "https://replug.io/" },
      { title: "Dynamic QR codes", description: "Connect printed and digital campaigns with customized QR codes, scan tracking, and editable destinations on supported plans.", source: "https://replug.io/" },
      { title: "Retargeting & CTAs", description: "Attach advertising pixels or calls to action to shared links, helping connect traffic with another step in the customer journey.", source: "https://replug.io/retargeting-pixels" },
      { title: "Analytics & optimization", description: "Understand clicks, conversions, referrers, devices, and locations; use UTM tracking, A/B testing, and routing to evaluate campaigns.", source: "https://docs.replug.io/articles/overview-of-analytics-942eee4c" },
      { title: "Agency workflows", description: "White-label options, custom domains, campaign organization, and team permissions support multi-brand collaboration.", source: "https://docs.replug.io/articles/how-to-setup-whitelabel-52054b47" },
    ],
    ecosystem: "Replug connects the link itself with the surrounding campaign: destinations, brand identity, tracking, and conversion actions. Its analytics can be explored by brand, campaign, or individual link, with graphical and tabular views for deeper investigation.",
    ecosystemSource: "https://docs.replug.io/articles/overview-of-analytics-942eee4c",
    references: [
      { label: "Platform", href: "https://replug.io/" },
      { label: "Short links", href: "https://replug.io/link-shortener" },
      { label: "Retargeting", href: "https://replug.io/retargeting-pixels" },
      { label: "Analytics", href: "https://docs.replug.io/articles/overview-of-analytics-942eee4c" },
      { label: "White label", href: "https://docs.replug.io/articles/how-to-setup-whitelabel-52054b47" },
    ],
  },
  {
    id: "usermaven",
    number: "03",
    name: "Usermaven",
    category: "ANALYTICS & MARKETING ATTRIBUTION",
    color: "#8150c6",
    tint: "#e5daf6",
    headline: "Give the numbers a clearer story.",
    summary: "An analytics and attribution platform that connects marketing, website behavior, product usage, and customer data to help teams understand growth.",
    website: "https://usermaven.com/",
    app: "https://app.usermaven.com/",
    scope: ["Website"],
    contribution: "I worked on Usermaven’s public-facing website, the experience that introduces the platform, explains its capabilities, and helps visitors explore the product.",
    websiteTitle: "Making a data-rich product approachable.",
    websiteDescription: "The website brings together platform pages, use cases, integrations, customer stories, and learning resources. It introduces a broad analytics offering through clear paths for marketing, product, and growth teams, with routes to demos and the product itself.",
    websiteImage: "/projects/usermaven-website.webp",
    websiteImageLabel: "Usermaven · public website",
    audience: "SaaS businesses, agencies, marketers, and growth teams",
    features: [
      { title: "Marketing attribution", description: "Connect channels and touchpoints with conversions, pipeline, and revenue through multi-touch attribution.", source: "https://usermaven.com/multi-touch-attribution" },
      { title: "Website analytics", description: "Explore acquisition channels, page performance, engagement, and conversion goals to understand what visitors do on a website.", source: "https://usermaven.com/website-analytics" },
      { title: "Product analytics", description: "Understand feature adoption, engagement, and retention through events, behavioral segments, and product insights.", source: "https://usermaven.com/product-analytics" },
      { title: "Funnels & journeys", description: "Follow conversion steps and customer paths to identify where people progress or drop off.", source: "https://usermaven.com/" },
      { title: "Dashboards & intelligence", description: "Bring metrics into dashboards, explore questions with Maven AI, and share information through reports and alerts.", source: "https://usermaven.com/" },
      { title: "Connected data", description: "Integrations connect advertising, CRM, ecommerce, and revenue tools so teams can work with a more unified view of performance.", source: "https://usermaven.com/" },
    ],
    ecosystem: "Usermaven’s broader platform connects acquisition and product behavior with commercial outcomes. Its ecosystem includes integrations such as Google Ads, Meta Ads, HubSpot, Salesforce, Shopify, Stripe, and Slack, alongside AI-assisted analysis and customer profiles.",
    ecosystemSource: "https://usermaven.com/",
    references: [
      { label: "Platform", href: "https://usermaven.com/" },
      { label: "Attribution", href: "https://usermaven.com/multi-touch-attribution" },
      { label: "Website analytics", href: "https://usermaven.com/website-analytics" },
      { label: "Product analytics", href: "https://usermaven.com/product-analytics" },
    ],
  },
];
