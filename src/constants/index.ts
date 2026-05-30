import { Target, Heart, Lightbulb, Shield, Users, Zap, Building2, BookOpen, Award, Handshake, GraduationCap } from "lucide-react";

export const categories = ["Leadership", "Purpose", "Systems", "Kingdom Living"];



export const values = [
  { icon: Target, title: "Purpose", desc: "Every life carries a divine mandate waiting to be activated." },
  { icon: Shield, title: "Integrity", desc: "We build on truth, transparency, and ethical leadership." },
  { icon: Lightbulb, title: "Excellence", desc: "Mediocrity is not an option. We pursue mastery in all things." },
  { icon: Users, title: "Community", desc: "Transformation is relational. We grow together." },
  { icon: Heart, title: "Stewardship", desc: "Leadership is service. Influence is responsibility." },
  { icon: Zap, title: "Innovation", desc: "We create systems that solve real problems with lasting impact." },
];



export const tiers = [
  {
    icon: Users,
    title: "Personal Development & Capacity Building",
    tagline: "From Potential to Performance",
    who: "Individuals seeking purpose clarity, personal growth, and structured life development.",
    description: "We help you discover your purpose, align your gifts, and build the personal systems that turn potential into consistent performance. Through coaching, training, and strategic frameworks, you'll move from confusion to clarity.",
    outcomes: [
      "Purpose discovery and life alignment",
      "Personal productivity and discipline systems",
      "Emotional intelligence and relational capacity",
      "Goal-setting and strategic life planning",
      "Dominion capacity activation",
    ],
  },
  {
    icon: Building2,
    title: "Leadership & Organizational Consulting",
    tagline: "From Position to Influence",
    who: "Leaders, teams, churches, NGOs, and institutions seeking structural transformation.",
    description: "We consult with leaders and organizations to build value-based governance systems, develop leadership pipelines, and create structures that scale. Whether you're leading a team of 5 or an institution of 500, LBN brings the frameworks you need.",
    outcomes: [
      "Leadership development and pipeline building",
      "Organizational restructuring and governance",
      "Team alignment and culture design",
      "Strategic planning and institutional clarity",
      "Performance management systems",
    ],
  },
  {
    icon: BookOpen,
    title: "Publishing & Intellectual Product Development",
    tagline: "From Insight to Legacy",
    who: "Authors, thought leaders, and experts ready to package their knowledge into lasting products.",
    description: "Your insights deserve to outlive you. We help leaders author, publish, and distribute books, workbooks, courses, and training materials that create generational impact. From concept to market — we walk with you.",
    outcomes: [
      "Book writing and publishing support",
      "Course and curriculum development",
      "Intellectual property strategy",
      "Brand positioning for thought leaders",
      "Distribution and market entry planning",
    ],
  },
];



export const options = [
  {
    icon: Heart,
    title: "Volunteer",
    description: "Join our team of purpose-driven individuals making a difference. Contribute your skills, time, and passion to the LBN movement.",
  },
  {
    icon: Award,
    title: "Sponsor",
    description: "Support our programs, events, and community initiatives. Your sponsorship enables transformation at scale.",
  },
  {
    icon: Handshake,
    title: "Collaborate",
    description: "Partner with LBN on projects, events, and strategic initiatives. Together we can amplify impact across communities.",
  },
  {
    icon: GraduationCap,
    title: "Enroll in Programs",
    description: "Join our leadership development programs, workshops, and training cohorts designed to build capacity and unlock potential.",
  },
];



export type Product = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string[];
  outcomes: string[];
  price: number;
  pages?: number;
  format?: string;
};

export const products: Product[] = [
  {
    id: "living-beyond-now",
    title: "Living Beyond Now",
    subtitle: "A Guide to Purpose-Driven Leadership",
    category: "Book",
    description: "Discover the frameworks that help you move from potential to performance.",
    longDescription: [
      "Living Beyond Now is the foundational text of the LBN movement. It introduces the language, frameworks, and convictions that have shaped thousands of leaders.",
      "Written for the gifted-but-stuck, this book confronts the gap between who you are and who you were sent to become — and offers a structured path across.",
    ],
    outcomes: ["Purpose discovery framework", "Leadership alignment principles", "Practical action steps"],
    price: 29,
    pages: 248,
    format: "Paperback / eBook",
  },
  {
    id: "capacity-framework",
    title: "The Capacity Framework",
    subtitle: "Building Systems That Scale",
    category: "Workbook",
    description: "A hands-on workbook for leaders building systems that create scalable impact.",
    longDescription: [
      "The Capacity Framework is the workbook companion to LBN's leadership consulting practice. It moves you from concept to construction.",
      "Use it solo or with a team to design the systems that turn talent into institution.",
    ],
    outcomes: ["System design templates", "Capacity assessment tools", "Growth tracking sheets"],
    price: 39,
    pages: 180,
    format: "Workbook",
  },
  {
    id: "kingdom-leadership",
    title: "Kingdom Leadership",
    subtitle: "Stewardship in the Modern Era",
    category: "Book",
    description: "The intersection of spiritual principles and executive leadership.",
    longDescription: [
      "Kingdom Leadership is for leaders who refuse to separate their convictions from their craft.",
      "It explores stewardship, succession, and significance as the operating principles of a leadership life that lasts.",
    ],
    outcomes: ["Stewardship principles", "Modern leadership applications", "Legacy-building strategies"],
    price: 32,
    pages: 220,
    format: "Paperback / eBook",
  },
  {
    id: "purpose-planner",
    title: "Purpose Planner",
    subtitle: "90-Day Strategic Life Plan",
    category: "Planner",
    description: "Align daily actions with divine purpose and long-term vision.",
    longDescription: [
      "A 90-day structured planner that translates vision into daily, measurable execution.",
      "Includes weekly reviews, monthly recalibrations, and a quarterly purpose audit.",
    ],
    outcomes: ["Daily purpose alignment", "Goal tracking system", "Reflection prompts"],
    price: 24,
    pages: 160,
    format: "Hardcover",
  },
  {
    id: "leaders-toolkit",
    title: "The Leader's Toolkit",
    subtitle: "Essential Frameworks for Impact",
    category: "Training Kit",
    description: "Leadership frameworks, assessments, and training materials.",
    longDescription: [
      "A complete kit of LBN's most-used leadership frameworks, distilled into a usable training format.",
      "Built for emerging leaders, team leads, and consultants deploying LBN principles in their organizations.",
    ],
    outcomes: ["Leadership assessment tools", "Team building frameworks", "Decision-making models"],
    price: 79,
    format: "Digital + Print Bundle",
  },
  {
    id: "legacy-institutions",
    title: "Building Legacy Institutions",
    subtitle: "From Vision to Structure",
    category: "Book",
    description: "How to build institutions that outlast you.",
    longDescription: [
      "A blueprint for founders, pastors, and executives who want their work to outlive their tenure.",
      "Covers governance, culture design, and succession with the rigor of a strategic playbook.",
    ],
    outcomes: ["Institutional design principles", "Governance frameworks", "Succession planning guides"],
    price: 34,
    pages: 264,
    format: "Paperback / eBook",
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export type BlogPost = {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
  readTime: string;
  content: string[];
  pullQuote?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "The Difference Between Purpose and Passion",
    category: "Purpose",
    excerpt: "Purpose isn't what excites you — it's what you were designed to solve. Understanding this distinction changes everything.",
    date: "Feb 28, 2026",
    slug: "purpose-vs-passion",
    author: "LBN Editorial",
    readTime: "6 min read",
    pullQuote: "Passion is the fuel. Purpose is the destination. Confuse them and you'll burn brilliantly while going nowhere.",
    content: [
      "We live in a culture that worships passion. Follow your passion. Find your passion. Monetize your passion. But passion alone has misled more leaders than it has made.",
      "Purpose is something altogether different. Purpose is the problem you were designed to solve — the gap in the world that your specific gifts, experiences, and convictions are uniquely positioned to close.",
      "When you discover purpose, passion becomes its servant, not its master. Your energy is no longer scattered across everything that excites you; it is concentrated on the one thing you were sent to do.",
      "This is the shift LBN exists to create. From confused enthusiasm to clear assignment. From gifted potential to structured contribution. From living loud to living long.",
    ],
  },
  {
    title: "Why Most Leaders Plateau — And How to Break Through",
    category: "Leadership",
    excerpt: "The ceiling isn't competence. It's structure. Here's how to build the systems that elevate your leadership to the next level.",
    date: "Feb 20, 2026",
    slug: "leaders-plateau",
    author: "LBN Editorial",
    readTime: "8 min read",
    pullQuote: "You don't rise to the level of your talent. You fall to the level of your systems.",
    content: [
      "Every leader hits a ceiling. The dangerous assumption is that the ceiling is talent. It almost never is.",
      "The real ceiling is structure — the operating system you've built (or failed to build) around your gift. Without structure, your talent simply repeats itself at higher volume.",
      "Breaking through requires three shifts: clarity of assignment, capacity through systems, and consistency through accountability. Miss any one of them and the plateau holds.",
      "The leaders who break through don't work harder. They architect smarter — and then they execute relentlessly inside the architecture they built.",
    ],
  },
  {
    title: "Building Institutions That Outlast You",
    category: "Systems",
    excerpt: "Legacy isn't about what you build for yourself — it's about what continues when you leave the room.",
    date: "Feb 12, 2026",
    slug: "institutions-that-outlast",
    author: "LBN Editorial",
    readTime: "7 min read",
    pullQuote: "If it dies when you leave, it was never an institution. It was a performance.",
    content: [
      "There's a difference between building something that works because of you and building something that works without you. The first is talent. The second is institution.",
      "Institutions are designed. They have governance, succession, culture, and documented systems that allow the mission to outlive the founder.",
      "Most leaders never make this transition. They confuse personal heroics with institutional health, and the moment they step away, the structure collapses.",
      "Legacy is what continues. Build accordingly.",
    ],
  },
  {
    title: "The Kingdom Principle of Stewardship",
    category: "Kingdom Living",
    excerpt: "True leadership begins with understanding that everything you have is entrusted, not owned.",
    date: "Feb 5, 2026",
    slug: "kingdom-stewardship",
    author: "LBN Editorial",
    readTime: "5 min read",
    pullQuote: "Ownership produces anxiety. Stewardship produces freedom.",
    content: [
      "The leaders who carry the most responsibility with the least anxiety share one conviction: nothing they hold belongs to them.",
      "Stewardship reframes everything. Your gifts are entrusted. Your platform is entrusted. Your time, money, influence — all entrusted.",
      "This isn't a posture of weakness; it's a posture of stability. You can't lose what was never yours, and you can't be threatened by what you're only carrying.",
      "Lead from stewardship. The pressure breaks. The clarity returns.",
    ],
  },
  {
    title: "From Vision to Execution: The 5-Step Framework",
    category: "Leadership",
    excerpt: "Vision without execution is hallucination. Here's the structured approach to turning your big ideas into measurable results.",
    date: "Jan 28, 2026",
    slug: "vision-to-execution",
    author: "LBN Editorial",
    readTime: "9 min read",
    pullQuote: "Vision casts the direction. Execution carries the weight.",
    content: [
      "Vision is the easy part. Anyone can see further than they can walk. The discipline of leadership is closing the distance between sight and step.",
      "The LBN execution framework moves through five stages: Clarify the assignment, Codify the system, Cascade the responsibility, Calibrate the metrics, Compound the wins.",
      "Skip a stage and you'll spend the next year fixing what better architecture would have prevented.",
      "Execute the framework. Trust the structure. Let the vision become visible.",
    ],
  },
  {
    title: "The Hidden Cost of Living Below Your Capacity",
    category: "Purpose",
    excerpt: "When you operate beneath your potential, the world doesn't just miss out on your contribution — you miss out on your own life.",
    date: "Jan 20, 2026",
    slug: "below-capacity",
    author: "LBN Editorial",
    readTime: "6 min read",
    pullQuote: "Underperformance is not humility. It is theft from the assignment you were sent to fulfill.",
    content: [
      "Most people are not failing. They are succeeding at a level far below what they were built for — and calling it contentment.",
      "Living below capacity costs you twice: the contribution the world never receives, and the version of yourself you never become.",
      "The path up isn't more hustle. It's more honesty. Name the gap. Build the structure. Step into the assignment.",
      "Your capacity was given. Your usage of it is your responsibility.",
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);